import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, CheckCircle2, Sparkles, Mail, User, AlertCircle, ArrowUpRight, Copy, Check, RefreshCw } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { audioSynth } from '../utils/audioSynth';

export const RecruiterChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('chat'); // 'chat' or 'email-form'
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hey! 👋 I'm Siddharth's portfolio assistant. Ask me anything about his technical stack, engineering architecture, or send him a direct message that goes straight to his inbox."
    }
  ]);

  // Chat Input State
  const [userInput, setUserInput] = useState('');

  // Direct Message Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedDraftIdx, setCopiedDraftIdx] = useState(null);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, mode]);

  const getBotResponse = (input) => {
    const q = input.toLowerCase().trim();
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    const foundEmail = input.match(emailRegex);

    if (foundEmail) {
      return {
        text: `I noticed your email address (${foundEmail[0]}). Would you like to dispatch your note directly to Siddharth's inbox right now?`,
        suggestDm: true,
        detectedEmail: foundEmail[0],
        detectedMessage: input
      };
    }

    if (q.includes('stack') || q.includes('skill') || q.includes('tech') || q.includes('technolog') || q.includes('framework')) {
      return {
        text: "Siddharth specializes in the MERN Stack (React 19, Node.js, Express, MongoDB) alongside PHP & MySQL. He is hands-on with JWT in HTTP-only cookies, normalized 3NF database schemas, REST APIs, and low-latency LLM inference via the Groq Cloud API (~280ms)."
      };
    }
    if (q.includes('rowl') || q.includes('mental') || q.includes('sera') || q.includes('psycholog')) {
      return {
        text: "Rowl AI is a full-stack mental wellness platform engineered with the MERN stack. It integrates the Groq Cloud API to power Sera AI, an empathetic companion built with defensive prompt boundaries and Razorpay payment webhooks. Deployed live at rowl-ai-pink.vercel.app."
      };
    }
    if (q.includes('appraisal') || q.includes('tce') || q.includes('college') || q.includes('faculty')) {
      return {
        text: "The TCE Faculty Appraisal Management System was engineered for Thiagarajar College of Engineering. It digitizes annual faculty performance for 350+ faculty with 4-tier Role-Based Access Control, a 9-section accreditation rubric, and automated PDF dossier generation."
      };
    }
    if (q.includes('hire') || q.includes('job') || q.includes('role') || q.includes('open') || q.includes('opportunity') || q.includes('intern') || q.includes('work') || q.includes('available')) {
      return {
        text: "Yes! Siddharth is actively open for Full-Stack, Frontend, and AI-assisted web engineering roles and internships. He is pursuing his MCA at TCE Madurai with an 8.47 CGPA. You can send him a direct message right here by clicking '✉️ Send Message'!",
        suggestDm: true,
        detectedMessage: input
      };
    }
    if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('phone') || q.includes('message')) {
      return {
        text: "You can reach Siddharth directly at personalsiddharth387@gmail.com, connect on LinkedIn (linkedin.com/in/siddharth-k-b0a118340), or click '✉️ Send Message' above to send a note directly to his inbox.",
        suggestDm: true,
        detectedMessage: input
      };
    }
    if (q.includes('education') || q.includes('degree') || q.includes('cgpa') || q.includes('college') || q.includes('school')) {
      return {
        text: "Siddharth is pursuing his Master of Computer Applications (MCA) at Thiagarajar College of Engineering (2025–2027) with a CGPA of 8.47 / 10.0. He completed his B.Sc. in Information Technology with a 7.62 CGPA."
      };
    }
    if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
      return {
        text: "Hello! Great to connect with you. Ask me anything about Siddharth's engineering projects, technical stack, or feel free to send him a direct message!"
      };
    }
    return {
      text: `Thanks for your inquiry! Siddharth builds production full-stack web applications and integrates practical LLM inference. Would you like to know about his projects (Rowl AI, TCE Appraisal), his tech stack, or send him a direct message?`
    };
  };

  const handleQuickQuestion = (type) => {
    audioSynth.playClick();
    let questionText = '';
    let answerText = '';

    if (type === 'stack') {
      questionText = "What is Siddharth's primary tech stack?";
      answerText = "Siddharth specializes in the MERN Stack (React 19, Node.js, Express, MongoDB) alongside PHP & MySQL. He is hands-on with JWT in HTTP-only cookies, normalized database schemas, REST APIs, and high-throughput LLM integrations via the Groq Cloud API.";
    } else if (type === 'rowl') {
      questionText = "Tell me about Rowl AI.";
      answerText = "Rowl AI is a full-stack mental wellness platform built with MERN. It integrates the Groq Cloud API to power Sera AI, an empathetic companion with non-clinical guardrails. It features Razorpay payment webhooks and is live at rowl-ai-pink.vercel.app.";
    } else if (type === 'appraisal') {
      questionText = "How does the TCE Appraisal system work?";
      answerText = "Engineered for Thiagarajar College of Engineering, it features a 4-tier governance hierarchy (Principal, Registrar, HoD, Faculty) across a 9-section accreditation rubric (200 marks). It includes automated server-side PDF generation with digital audit seals.";
    } else if (type === 'roles') {
      questionText = "Is Siddharth open to opportunities?";
      answerText = "Yes! Siddharth is actively pursuing his MCA at Thiagarajar College of Engineering (CGPA: 8.47) and is available for Full-Stack, Frontend, and AI-assisted web development internships and full-time roles.";
    }

    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: questionText },
      { sender: 'bot', text: answerText }
    ]);
  };

  const handleSendMessageInChat = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    audioSynth.playPop();
    const query = userInput.trim();
    setUserInput('');

    const botReply = getBotResponse(query);

    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: query },
      { 
        sender: 'bot', 
        text: botReply.text,
        suggestDm: botReply.suggestDm,
        detectedEmail: botReply.detectedEmail,
        detectedMessage: botReply.detectedMessage
      }
    ]);
  };

  const handleSwitchToDmFromChat = (emailVal, msgVal) => {
    audioSynth.playClick();
    setFormData((prev) => ({
      ...prev,
      email: emailVal || prev.email,
      message: msgVal || prev.message
    }));
    setMode('email-form');
  };

  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    audioSynth.playPop();
    setIsSubmitting(true);

    const mailtoLink = `mailto:personalsiddharth387@gmail.com?subject=${encodeURIComponent(
      `Portfolio Message from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Hi Siddharth,\n\n${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`
    )}`;

    let deliveryStatus = 'error';

    try {
      const res = await fetch('https://formsubmit.co/ajax/personalsiddharth387@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`,
          _captcha: 'false',
          _template: 'table'
        })
      });

      const data = await res.json().catch(() => ({}));

      if (data.success === 'true' || data.success === true) {
        deliveryStatus = 'success';
      } else if (data.message && data.message.toLowerCase().includes('activation')) {
        deliveryStatus = 'activation_pending';
      } else {
        deliveryStatus = 'error';
      }
    } catch (err) {
      console.warn('Direct endpoint transmission notice:', err);
      deliveryStatus = 'error';
    } finally {
      setIsSubmitting(false);

      let botText = '';
      if (deliveryStatus === 'success') {
        botText = `✓ Your message has been delivered directly to Siddharth's inbox (personalsiddharth387@gmail.com)! He typically responds within 24 hours.`;
      } else if (deliveryStatus === 'activation_pending') {
        botText = `⚠️ FormSubmit one-time email activation is pending for the developer. To make sure your note is delivered right away, please click "Open in Mail App" or copy the message below!`;
      } else {
        botText = `⚠️ Direct web submission encountered a network block. Please click "Open in Mail App" below to send your note directly via your email client.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'user',
          text: `[Sent to Developer]: "${formData.message}" (From: ${formData.name} <${formData.email}>)`
        },
        {
          sender: 'bot',
          text: botText,
          isConfirmation: true,
          statusType: deliveryStatus,
          mailtoUrl: mailtoLink,
          copyContent: `From: ${formData.name} <${formData.email}>\nMessage:\n${formData.message}`
        }
      ]);

      setFormData({ name: '', email: '', message: '' });
      setMode('chat');
    }
  };

  const handleCopyConfirmation = (content, idx) => {
    audioSynth.playClick();
    navigator.clipboard.writeText(content);
    setCopiedDraftIdx(idx);
    setTimeout(() => setCopiedDraftIdx(null), 2000);
  };

  return (
    <aside aria-label="Portfolio Assistant" className="fixed bottom-5 right-5 z-50 font-sans">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => {
            audioSynth.playClick();
            setIsOpen(true);
          }}
          data-cursor="CHAT"
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#12171f] hover:bg-[#18202b] text-[#f0f6fc] border border-[#222b38] hover:border-[#38bdf8]/50 shadow-2xl transition-all duration-200 cursor-pointer"
          title="Open Portfolio Assistant & Direct Messaging"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <Bot className="w-4 h-4 text-[#38bdf8]" />
            <span className="font-bold">Assistant</span>
            <span className="text-[#8b949e] hidden sm:inline">• Message Siddharth</span>
          </div>
        </button>
      )}

      {/* Floating Chatbot Window */}
      {isOpen && (
        <div className="w-[92vw] sm:w-96 h-[510px] rounded-2xl border border-[#222b38] bg-[#0d121a] shadow-2xl shadow-sky-950/30 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header */}
          <div className="px-4 py-3 bg-[#12171f] border-b border-[#222b38] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]/80 animate-pulse"></div>
              <div>
                <div className="text-xs font-mono font-bold text-[#f0f6fc] flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>Siddharth's Assistant</span>
                </div>
                <div className="text-[10px] font-mono text-emerald-400">
                  ● Available for Full-Stack Roles
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  audioSynth.playClick();
                  setMode(mode === 'chat' ? 'email-form' : 'chat');
                }}
                className={`px-2.5 py-1 rounded-md text-[10px] font-mono transition-colors cursor-pointer ${
                  mode === 'email-form'
                    ? 'bg-[#38bdf8] text-[#090d12] font-bold'
                    : 'bg-[#18202b] text-[#38bdf8] hover:bg-[#222b38] border border-[#222b38]'
                }`}
              >
                {mode === 'email-form' ? '← Back to Chat' : '✉️ Send Message'}
              </button>

              <button
                onClick={() => {
                  audioSynth.playClick();
                  setIsOpen(false);
                }}
                className="p-1 rounded text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#18202b] transition-colors cursor-pointer"
                title="Close assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mode 1: Interactive Chat View */}
          {mode === 'chat' ? (
            <div className="flex-1 flex flex-col justify-between overflow-hidden bg-[#090d12]">
              {/* Message Log */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[88%] p-3 rounded-xl leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-[#38bdf8] text-[#090d12] font-medium rounded-tr-none shadow-sm'
                          : 'bg-[#12171f] text-[#c9d1d9] border border-[#222b38] rounded-tl-none font-mono text-[11px]'
                      }`}
                    >
                      {m.text}

                      {/* Suggest DM quick trigger if user expressed inquiry intent */}
                      {m.suggestDm && (
                        <div className="mt-2.5 pt-2 border-t border-[#222b38] flex items-center justify-between gap-2">
                          <button
                            onClick={() => handleSwitchToDmFromChat(m.detectedEmail, m.detectedMessage)}
                            className="px-2.5 py-1 rounded bg-[#38bdf8]/15 hover:bg-[#38bdf8]/25 text-[#38bdf8] border border-[#38bdf8]/40 font-mono text-[10px] flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Mail className="w-3 h-3" />
                            <span>✉️ Dispatch Note to Inbox</span>
                          </button>
                        </div>
                      )}

                      {/* Confirmation card when message is sent to developer */}
                      {m.isConfirmation && (
                        <div className="mt-2.5 pt-2 border-t border-[#222b38] flex flex-wrap items-center justify-between gap-2 text-[10px]">
                          {m.statusType === 'success' ? (
                            <span className="text-emerald-400 font-bold flex items-center gap-1 font-mono">
                              <CheckCircle2 className="w-3 h-3" /> Delivered to Inbox
                            </span>
                          ) : (
                            <span className="text-amber-400 font-bold flex items-center gap-1 font-mono">
                              <AlertCircle className="w-3 h-3" /> Direct Fallback Ready
                            </span>
                          )}

                          <div className="flex items-center gap-2">
                            {m.mailtoUrl && (
                              <a
                                href={m.mailtoUrl}
                                onClick={() => audioSynth.playClick()}
                                className="text-[#38bdf8] hover:underline flex items-center gap-1 font-mono"
                              >
                                Open in Mail <ArrowUpRight className="w-2.5 h-2.5" />
                              </a>
                            )}
                            {m.copyContent && (
                              <button
                                onClick={() => handleCopyConfirmation(m.copyContent, idx)}
                                className="text-[#8b949e] hover:text-[#f0f6fc] flex items-center gap-1 font-mono cursor-pointer"
                              >
                                {copiedDraftIdx === idx ? <Check className="w-2.5 h-2.5 text-emerald-400" /> : <Copy className="w-2.5 h-2.5" />}
                                <span>{copiedDraftIdx === idx ? 'Copied' : 'Copy'}</span>
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input & Controls */}
              <div className="bg-[#12171f] border-t border-[#222b38] space-y-2 p-2.5">
                {/* Quick Inquiry Buttons */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 font-mono text-[10px] no-scrollbar">
                  <button
                    onClick={() => handleQuickQuestion('stack')}
                    className="px-2 py-1 rounded bg-[#090d12] text-[#8b949e] hover:text-[#38bdf8] border border-[#222b38] hover:border-[#38bdf8]/40 transition-colors cursor-pointer shrink-0"
                  >
                    🛠️ Tech Stack
                  </button>
                  <button
                    onClick={() => handleQuickQuestion('rowl')}
                    className="px-2 py-1 rounded bg-[#090d12] text-[#8b949e] hover:text-[#38bdf8] border border-[#222b38] hover:border-[#38bdf8]/40 transition-colors cursor-pointer shrink-0"
                  >
                    🌸 Rowl AI
                  </button>
                  <button
                    onClick={() => handleQuickQuestion('appraisal')}
                    className="px-2 py-1 rounded bg-[#090d12] text-[#8b949e] hover:text-[#38bdf8] border border-[#222b38] hover:border-[#38bdf8]/40 transition-colors cursor-pointer shrink-0"
                  >
                    🏛️ TCE Appraisal
                  </button>
                  <button
                    onClick={() => handleQuickQuestion('roles')}
                    className="px-2 py-1 rounded bg-[#090d12] text-[#8b949e] hover:text-[#38bdf8] border border-[#222b38] hover:border-[#38bdf8]/40 transition-colors cursor-pointer shrink-0"
                  >
                    💼 Open to Work?
                  </button>
                </div>

                {/* Freeform Interactive Input Form */}
                <form onSubmit={handleSendMessageInChat} className="flex items-center gap-1.5">
                  <input
                    type="text"
                    placeholder="Ask assistant or send a message..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-[#090d12] border border-[#222b38] text-xs text-[#f0f6fc] placeholder-[#8b949e]/60 focus:outline-none focus:border-[#38bdf8] transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!userInput.trim()}
                    className="p-2 rounded-lg bg-[#38bdf8] hover:bg-[#7dd3fc] text-[#090d12] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    title="Send query"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>

                {/* Direct Message CTA banner */}
                <button
                  onClick={() => {
                    audioSynth.playClick();
                    setMode('email-form');
                  }}
                  className="w-full py-1 text-[11px] font-mono text-[#8b949e] hover:text-[#38bdf8] flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <Mail className="w-3 h-3 text-[#38bdf8]" />
                  <span>Send direct message to personalsiddharth387@gmail.com →</span>
                </button>
              </div>
            </div>
          ) : (
            /* Mode 2: Direct Email Form */
            <form onSubmit={handleSubmitMessage} className="flex-1 p-4 overflow-y-auto bg-[#090d12] flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="text-xs font-mono font-bold text-[#f0f6fc] flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>Direct Message to Developer</span>
                  </div>
                  <p className="text-[11px] text-[#8b949e] leading-snug">
                    Your message will be dispatched directly to Siddharth's primary inbox: <strong className="text-[#f0f6fc]">personalsiddharth387@gmail.com</strong>.
                  </p>
                </div>

                <div className="space-y-2.5 font-mono text-xs">
                  <div>
                    <label className="text-[10px] text-[#8b949e] block mb-1">Your Name / Company *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex (Engineering Recruiter)"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#12171f] border border-[#222b38] text-[#f0f6fc] placeholder-[#8b949e]/50 focus:outline-none focus:border-[#38bdf8] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-[#8b949e] block mb-1">Your Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="recruiter@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#12171f] border border-[#222b38] text-[#f0f6fc] placeholder-[#8b949e]/50 focus:outline-none focus:border-[#38bdf8] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-[#8b949e] block mb-1">Message for Siddharth *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Hi Siddharth, we reviewed your projects and would like to connect regarding..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#12171f] border border-[#222b38] text-[#f0f6fc] placeholder-[#8b949e]/50 focus:outline-none focus:border-[#38bdf8] transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#222b38]">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#38bdf8] hover:bg-[#7dd3fc] text-[#090d12] font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Dispatching to Developer...
                    </span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send to Developer</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between text-[10px] font-mono text-[#8b949e]">
                  <span>Direct mailto backup:</span>
                  <a
                    href={`mailto:personalsiddharth387@gmail.com?subject=Portfolio%20Inquiry&body=Hi%20Siddharth,%0D%0A%0D%0A`}
                    onClick={() => audioSynth.playClick()}
                    className="text-[#38bdf8] hover:underline flex items-center gap-1"
                  >
                    Open in Mail App <ArrowUpRight className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            </form>
          )}

        </div>
      )}
    </aside>
  );
};
