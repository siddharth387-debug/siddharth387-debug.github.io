// Multi-Channel Backend Message Dispatch & Live Inbox API
// 1. Primary Cloud Message Broker (ntfy.sh pub/sub backend — <350ms, zero 522 outages, no preflight block)
// 2. Secondary Email Gateway Relay (formsubmit.co — background non-blocking with 4.5s timeout)

export const NTFY_TOPIC = 'siddharth-portfolio-dm-387';
export const NTFY_WEB_URL = `https://ntfy.sh/${NTFY_TOPIC}`;
const TARGET_EMAIL = 'personalsiddharth387@gmail.com';
const LOCAL_STORAGE_KEY = 'siddharth_portfolio_messages_v1';

/**
 * Dispatches a direct message from Contact.jsx or RecruiterChatbot.jsx
 * Returns { status: 'success' | 'error', receiptId, channel, mailtoUrl, gmailWebUrl }
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

  // 1. Primary Instant Cloud Backend API (ntfy.sh)
  // Using text/plain with JSON payload avoids CORS OPTIONS preflight blocks on strict networks
  const sendViaCloudBroker = async () => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    try {
      const payload = JSON.stringify({
        topic: NTFY_TOPIC,
        title: subjectLine,
        message: formattedBody,
        priority: 4,
        tags: ['incoming_envelope', 'briefcase'],
        click: `mailto:${cleanEmail}?subject=${encodeURIComponent(`Re: ${cleanPurpose}`)}`
      });

      const res = await fetch('https://ntfy.sh', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=UTF-8'
        },
        body: payload,
        signal: controller.signal
      });

      clearTimeout(timer);
      if (!res.ok) throw new Error(`Cloud broker returned ${res.status}`);
      const data = await res.json();
      return {
        ok: true,
        receiptId: data.id || `msg-${Date.now()}`,
        channel: 'ntfy-cloud'
      };
    } catch (err) {
      clearTimeout(timer);
      throw err;
    }
  };

  // 2. Secondary Email Gateway Relay (FormSubmit.co) with 4.5s timeout so 522 errors never hang the UI
  const sendViaFormSubmit = async () => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4500);
    try {
      const postData = new FormData();
      postData.append('Name', cleanName);
      postData.append('Email', cleanEmail);
      postData.append('Purpose', cleanPurpose);
      postData.append('Message', cleanMessage);
      postData.append('_subject', subjectLine);
      postData.append('_captcha', 'false');

      const res = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: postData,
        signal: controller.signal
      });

      clearTimeout(timer);
      const data = await res.json().catch(() => ({}));
      if (data.success === 'true' || data.success === true) {
        return { ok: true, receiptId: `fs-${Date.now()}`, channel: 'formsubmit-email' };
      }
      throw new Error(data.message || `FormSubmit HTTP ${res.status}`);
    } catch (err) {
      clearTimeout(timer);
      throw err;
    }
  };

  // Fire FormSubmit in the background (non-blocking) and await the fast Cloud Broker first
  const formSubmitPromise = sendViaFormSubmit().catch(() => null);

  try {
    const cloudResult = await sendViaCloudBroker();
    return {
      status: 'success',
      receiptId: cloudResult.receiptId,
      channel: cloudResult.channel,
      mailtoUrl,
      gmailWebUrl
    };
  } catch (cloudErr) {
    // If Cloud Broker was blocked, wait for FormSubmit result
    const fsResult = await formSubmitPromise;
    if (fsResult && fsResult.ok) {
      return {
        status: 'success',
        receiptId: fsResult.receiptId,
        channel: fsResult.channel,
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
}

/**
 * Fetches live messages from the Cloud Backend API (https://ntfy.sh/siddharth-portfolio-dm-387/json?poll=1)
 * so the developer can inspect incoming messages directly inside the portfolio or via ntfy.sh
 */
export async function fetchPortfolioInbox() {
  try {
    const res = await fetch(`https://ntfy.sh/${NTFY_TOPIC}/json?poll=1`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    const lines = text
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

    const parsed = lines
      .map((line) => {
        try {
          return JSON.parse(line);
        } catch {
          return null;
        }
      })
      .filter((item) => item && item.event === 'message')
      .reverse();

    return parsed;
  } catch (err) {
    console.warn('Could not fetch remote inbox:', err);
    return [];
  }
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
