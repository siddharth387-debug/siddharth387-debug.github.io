import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, CheckCircle2, Sparkles, Mail, User, AlertCircle, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const RecruiterChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('chat'); // 'chat' or 'email-form'
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hey! 👋 I'm Siddharth's portfolio assistant. Ask me anything about his technical stack and projects, or send him a direct message that goes straight to his email."
    }
  ]);

  // Direct Message Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, mode]);

  const handleQuickQuestion = (type) => {
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

  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Use Web3Forms free public email forwarding endpoint
      // Using default public access key or fallback to direct mailto
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'a29b47e2-cf96-419b-a7df-a72eb37651a0', // Web3Forms public forwarding key
          from_name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Inquiry from ${formData.name}`,
          to_email: 'personalsiddharth387@gmail.com'
        })
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setMessages((prev) => [
          ...prev,
          {
            sender: 'user',
            text: `[Sent Message]: "${formData.message}" (From: ${formData.name} <${formData.email}>)`
          },
          {
            sender: 'bot',
            text: `✓ Thank you, ${formData.name}! Your message has been dispatched to Siddharth's inbox (personalsiddharth387@gmail.com). He will reply to you shortly.`
          }
        ]);
        setFormData({ name: '', email: '', message: '' });
        setMode('chat');
      } else {
        throw new Error(result.message || 'Transmission failed');
      }
    } catch (err) {
      // Graceful fallback to formatted mailto trigger
      setSubmitStatus('error');
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: `Direct API transmission paused. You can reach Siddharth directly at personalsiddharth387@gmail.com!`
        }
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <aside aria-label="Portfolio Assistant" className="fixed bottom-5 right-5 z-50 font-sans">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
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
        <div className="w-[92vw] sm:w-96 h-[490px] rounded-2xl border border-[#222b38] bg-[#0d121a] shadow-2xl shadow-sky-950/30 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
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

            <div className="flex items-center gap-1">
              <button
                onClick={() => setMode(mode === 'chat' ? 'email-form' : 'chat')}
                className={`px-2 py-1 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                  mode === 'email-form'
                    ? 'bg-[#38bdf8] text-[#090d12] font-bold'
                    : 'bg-[#18202b] text-[#8b949e] hover:text-[#f0f6fc] border border-[#222b38]'
                }`}
              >
                {mode === 'email-form' ? 'Back to Chat' : '✉️ Send Email'}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#18202b] transition-colors cursor-pointer"
                title="Close chat"
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
                      className={`max-w-[85%] p-3 rounded-xl leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-[#38bdf8] text-[#090d12] font-medium rounded-tr-none shadow-sm'
                          : 'bg-[#12171f] text-[#c9d1d9] border border-[#222b38] rounded-tl-none font-mono text-[11px]'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Inquiry Buttons Footer */}
              <div className="p-3 bg-[#12171f] border-t border-[#222b38] space-y-2">
                <div className="text-[10px] font-mono text-[#8b949e] uppercase tracking-wider">
                  Quick Inquiries:
                </div>
                <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                  <button
                    onClick={() => handleQuickQuestion('stack')}
                    className="px-2 py-1 rounded bg-[#090d12] text-[#8b949e] hover:text-[#38bdf8] border border-[#222b38] hover:border-[#38bdf8]/40 transition-colors cursor-pointer"
                  >
                    🛠️ Tech Stack
                  </button>
                  <button
                    onClick={() => handleQuickQuestion('rowl')}
                    className="px-2 py-1 rounded bg-[#090d12] text-[#8b949e] hover:text-[#38bdf8] border border-[#222b38] hover:border-[#38bdf8]/40 transition-colors cursor-pointer"
                  >
                    🌸 Rowl AI
                  </button>
                  <button
                    onClick={() => handleQuickQuestion('appraisal')}
                    className="px-2 py-1 rounded bg-[#090d12] text-[#8b949e] hover:text-[#38bdf8] border border-[#222b38] hover:border-[#38bdf8]/40 transition-colors cursor-pointer"
                  >
                    🏛️ TCE Appraisal
                  </button>
                  <button
                    onClick={() => handleQuickQuestion('roles')}
                    className="px-2 py-1 rounded bg-[#090d12] text-[#8b949e] hover:text-[#38bdf8] border border-[#222b38] hover:border-[#38bdf8]/40 transition-colors cursor-pointer"
                  >
                    💼 Open to Work?
                  </button>
                </div>

                {/* Direct Message CTA Banner */}
                <button
                  onClick={() => setMode('email-form')}
                  className="w-full mt-1 py-1.5 px-3 rounded-lg bg-[#38bdf8]/10 hover:bg-[#38bdf8]/20 border border-[#38bdf8]/30 text-[#38bdf8] text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send direct message to Siddharth's email</span>
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
                    <span>Direct Email Dispatch</span>
                  </div>
                  <p className="text-[11px] text-[#8b949e] leading-snug">
                    Your note will be delivered straight to <strong className="text-[#f0f6fc]">personalsiddharth387@gmail.com</strong>.
                  </p>
                </div>

                <div className="space-y-2 font-mono text-xs">
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
                    <label className="text-[10px] text-[#8b949e] block mb-1">Message *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Hi Siddharth, we loved your projects and want to discuss..."
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
                    <span>Dispatching...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send to Inbox</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between text-[10px] font-mono text-[#8b949e]">
                  <span>Direct mailto backup:</span>
                  <a
                    href={`mailto:personalsiddharth387@gmail.com?subject=Portfolio%20Inquiry&body=Hi%20Siddharth,%0D%0A%0D%0A`}
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
