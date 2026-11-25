// Multi-Channel Backend Message Dispatch & Live Inbox API
// 1. Primary Email Gateway (formsubmit.co/ajax/personalsiddharth387@gmail.com — 20s timeout for full SMTP delivery)
// 2. Parallel Real-Time Cloud Broker (ntfy.sh/siddharth-portfolio-dm-387 — plain-text query-param POST, zero CORS preflight)

export const NTFY_TOPIC = 'siddharth-portfolio-dm-387';
export const NTFY_WEB_URL = `https://ntfy.sh/${NTFY_TOPIC}`;
const TARGET_EMAIL = 'personalsiddharth387@gmail.com';
const LOCAL_STORAGE_KEY = 'siddharth_portfolio_messages_v1';

/**
 * Dispatches a direct message from Contact.jsx or RecruiterChatbot.jsx
 * Delivers to BOTH Gmail (via FormSubmit AJAX) and the Live Cloud Broker (ntfy.sh) in parallel.
 */
export async function dispatchPortfolioMessage({
  name,
  email,
  purpose = 'Portfolio Opportunity / Inquiry',
  message,
  source = 'Portfolio Assistant'
}) {
  const cleanName = (name || 'Visitor').trim();
  const cleanEmail = (email || 'no-email@provided.com').trim();
  const cleanPurpose = (purpose || 'Direct Inquiry').trim();
  const cleanMessage = (message || '').trim();

  const subjectLine = `[${source}] ${cleanPurpose} from ${cleanName}`;
  const formattedBody = [
    `From: ${cleanName} <${cleanEmail}>`,
    `Purpose: ${cleanPurpose}`,
    `Source: ${source}`,
    `Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`,
    `----------------------------------------`,
    cleanMessage
  ].join('\n');

  const mailtoUrl = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(
    subjectLine
  )}&body=${encodeURIComponent(
    `Hi Siddharth,\n\n${cleanMessage}\n\nFrom: ${cleanName}\nEmail: ${cleanEmail}\nPurpose: ${cleanPurpose}`
  )}`;

  const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    TARGET_EMAIL
  )}&su=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(
    `Hi Siddharth,\n\n${cleanMessage}\n\nFrom: ${cleanName}\nEmail: ${cleanEmail}\nPurpose: ${cleanPurpose}`
  )}`;

  // Save a local copy immediately
  saveLocalMessage({
    id: `local-${Date.now()}`,
    name: cleanName,
    email: cleanEmail,
    purpose: cleanPurpose,
    message: cleanMessage,
    source,
    createdAt: new Date().toISOString()
  });

  // Channel 1: Direct Email Delivery to personalsiddharth387@gmail.com via FormSubmit AJAX
  // Uses a 20-second timeout so FormSubmit's SMTP handshake is never prematurely aborted
  const sendViaFormSubmit = async () => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    try {
      const postData = new FormData();
      postData.append('Name', cleanName);
      postData.append('Email', cleanEmail);
      postData.append('Purpose', cleanPurpose);
      postData.append('Message', cleanMessage);
      postData.append('_subject', subjectLine);
      postData.append('_template', 'table');
      postData.append('_captcha', 'false');

      const res = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: postData,
        signal: controller.signal
      });

      clearTimeout(timer);
      const data = await res.json().catch(() => ({}));
      if (data.success === 'true' || data.success === true) {
        return {
          ok: true,
          receiptId: `gmail-${Date.now().toString(36)}`,
          channel: 'formsubmit-email'
        };
      }
      throw new Error(data.message || `FormSubmit HTTP ${res.status}`);
    } catch (err) {
      clearTimeout(timer);
      throw err;
    }
  };

  // Channel 2: Real-Time Cloud Message Broker (POST https://ntfy.sh/siddharth-portfolio-dm-387?title=...)
  // Posts plain-text body directly to the topic URL with query params so it never fails JSON parsing or CORS preflight
  const sendViaCloudBroker = async () => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    try {
      const url = `https://ntfy.sh/${NTFY_TOPIC}?title=${encodeURIComponent(
        subjectLine
      )}&priority=4&tags=incoming_envelope,briefcase`;

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=UTF-8'
        },
        body: formattedBody,
        signal: controller.signal
      });

      clearTimeout(timer);
      if (!res.ok) throw new Error(`Cloud broker returned ${res.status}`);
      const data = await res.json().catch(() => ({}));
      return {
        ok: true,
        receiptId: data.id || `ntfy-${Date.now().toString(36)}`,
        channel: 'ntfy-cloud'
      };
    } catch (err) {
      clearTimeout(timer);
      throw err;
    }
  };

  // Run BOTH email delivery (FormSubmit -> Gmail) and Cloud Broker (ntfy.sh) concurrently
  const [emailSettled, cloudSettled] = await Promise.allSettled([
    sendViaFormSubmit(),
    sendViaCloudBroker()
  ]);

  const emailSuccess = emailSettled.status === 'fulfilled' ? emailSettled.value : null;
  const cloudSuccess = cloudSettled.status === 'fulfilled' ? cloudSettled.value : null;

  if (emailSuccess || cloudSuccess) {
    return {
      status: 'success',
      receiptId: cloudSuccess?.receiptId || emailSuccess?.receiptId || `msg-${Date.now().toString(36)}`,
      channel: emailSuccess && cloudSuccess ? 'dual-verified' : emailSuccess ? 'gmail' : 'cloud-broker',
      emailDelivered: Boolean(emailSuccess),
      cloudDelivered: Boolean(cloudSuccess),
      mailtoUrl,
      gmailWebUrl
    };
  }

  return {
    status: 'error',
    receiptId: null,
    channel: 'fallback',
    mailtoUrl,
    gmailWebUrl
  };
}

/**
 * Fetches live messages from the Cloud Backend API (https://ntfy.sh/siddharth-portfolio-dm-387/json?poll=1)
 * plus any locally stored messages on this device.
 */
export async function fetchPortfolioInbox() {
  let remoteMessages = [];
  try {
    const res = await fetch(`https://ntfy.sh/${NTFY_TOPIC}/json?poll=1`);
    if (res.ok) {
      const text = await res.text();
      const lines = text
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean);

      remoteMessages = lines
        .map((line) => {
          try {
            return JSON.parse(line);
          } catch {
            return null;
          }
        })
        .filter((item) => item && item.event === 'message')
        .reverse();
    }
  } catch (err) {
    console.warn('Could not fetch remote inbox:', err);
  }

  return remoteMessages;
}

function saveLocalMessage(entry) {
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    existing.unshift(entry);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing.slice(0, 30)));
  } catch {
    // Ignore storage quota errors
  }
}
