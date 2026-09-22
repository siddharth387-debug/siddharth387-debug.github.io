import React, { useState } from 'react';
import { Mail, Copy, Check, FileText, ArrowUpRight, MessageSquare, Send, Clock, Sparkles, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { portfolioData } from '../data/portfolioData';
import { SpotlightCard } from './SpotlightCard';
import { audioSynth } from '../utils/audioSynth';

export const Contact = ({ onOpenResume }) => {
  const [copied, setCopied] = useState(false);
  const email = portfolioData.personal.email;

  // Direct Message Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    purpose: 'Full-Time / Internship Role',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'activation_pending' | 'error' | null
  const [copiedFallback, setCopiedFallback] = useState(false);

  const handleCopyEmail = () => {
    audioSynth.playClick();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyFallback = () => {
    audioSynth.playClick();
    const text = `From: ${formData.name} <${formData.email}>\nPurpose: ${formData.purpose}\n\n${formData.message}`;
    navigator.clipboard.writeText(text);
    setCopiedFallback(true);
    setTimeout(() => setCopiedFallback(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    audioSynth.playPop();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: `[Portfolio DM] ${formData.purpose} from ${formData.name}`,
          purpose: formData.purpose,
          message: formData.message,
          _captcha: 'false',
          _template: 'table'
        })
      });

      const data = await response.json().catch(() => ({}));

      if (data.success === 'true' || data.success === true) {
        setSubmitStatus('success');
      } else if (data.message && data.message.toLowerCase().includes('activation')) {
        setSubmitStatus('activation_pending');
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      console.warn('Direct messaging transmission notice:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
    `[Portfolio DM] ${formData.purpose} from ${formData.name || 'Visitor'}`
  )}&body=${encodeURIComponent(
    `Hi Siddharth,\n\n${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}\nPurpose: ${formData.purpose}`
  )}`;

  const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(
    `[Portfolio DM] ${formData.purpose} from ${formData.name || 'Visitor'}`
  )}&body=${encodeURIComponent(
    `Hi Siddharth,\n\n${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}\nPurpose: ${formData.purpose}`
  )}`;

  return (
    <div id="contact" className="space-y-16">
      
      {/* Resume Banner Section (Section 14) */}
      <section id="resume" className="py-16 border-b border-[#222b38] bg-[#0c1017]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="p-8 sm:p-10 rounded-2xl border border-[#222b38] bg-[#12171f] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="text-xs font-mono text-[#38bdf8] uppercase tracking-wider">
                DOCUMENTATION
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#f0f6fc] tracking-tight">
                Interested in the Full Picture?
              </h3>
              <p className="text-sm text-[#8b949e] leading-relaxed">
                Explore my resume for a complete overview of my education, technical skills, projects, and practical development experience.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => {
                  audioSynth.playClick();
                  onOpenResume();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#38bdf8] text-[#090d12] font-medium text-sm hover:bg-[#7dd3fc] transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                View Resume
              </button>

              <button
                onClick={() => {
                  audioSynth.playClick();
                  onOpenResume();
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-[#18202b] text-[#f0f6fc] hover:text-[#38bdf8] font-mono text-xs border border-[#222b38] hover:border-[#38bdf8]/40 transition-colors cursor-pointer"
              >
                Print / PDF Export
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section (Section 15) */}
      <section className="py-16 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
          
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-mono text-[#38bdf8] uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span>DIRECT CHANNELS & MESSAGING</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f0f6fc] tracking-tight">
              Let's Build Something Useful.
            </h2>
            <p className="text-base text-[#8b949e]">
              I am open to discuss full-stack engineering roles, software projects, and AI-assisted development pipelines. Send a direct message to my primary inbox below.
            </p>
          </div>

          {/* 2-Column Responsive Layout: Channels + Direct Message Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Direct Contact Channels & Availability (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Email Card with Copy Trigger */}
              <SpotlightCard className="p-6 rounded-xl border border-[#222b38] bg-[#12171f] space-y-3 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono text-[#8b949e] flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>PRIMARY INBOX</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-[#38bdf8] hover:underline cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <a
                  href={`mailto:${email}`}
                  onClick={() => audioSynth.playClick()}
                  className="text-base font-semibold text-[#f0f6fc] hover:text-[#38bdf8] transition-colors block break-all font-mono"
                >
                  {email}
                </a>
                <p className="text-xs text-[#8b949e]">
                  Direct delivery · Monitored daily for engineering inquiries
                </p>
              </SpotlightCard>

              {/* GitHub Card */}
              <SpotlightCard className="p-6 rounded-xl border border-[#222b38] bg-[#12171f] space-y-3 transition-colors">
                <div className="text-xs font-mono text-[#8b949e] flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>GITHUB PROFILE</span>
                </div>
                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => audioSynth.playClick()}
                  className="text-base font-semibold text-[#f0f6fc] hover:text-[#38bdf8] transition-colors flex items-center justify-between font-mono"
                >
                  <span>siddharth387-debug</span>
                  <ArrowUpRight className="w-4 h-4 text-[#38bdf8]" />
                </a>
                <p className="text-xs text-[#8b949e]">
                  Repositories, code commits, and project histories
                </p>
              </SpotlightCard>

              {/* LinkedIn Card */}
              <SpotlightCard className="p-6 rounded-xl border border-[#222b38] bg-[#12171f] space-y-3 transition-colors">
                <div className="text-xs font-mono text-[#8b949e] flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>LINKEDIN NETWORK</span>
                </div>
                <a
                  href={portfolioData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => audioSynth.playClick()}
                  className="text-base font-semibold text-[#f0f6fc] hover:text-[#38bdf8] transition-colors flex items-center justify-between font-mono"
                >
                  <span>Siddharth K</span>
                  <ArrowUpRight className="w-4 h-4 text-[#38bdf8]" />
                </a>
                <p className="text-xs text-[#8b949e]">
                  Professional network and background details
                </p>
              </SpotlightCard>

              {/* Status & Response SLA Card */}
              <div className="p-5 rounded-xl border border-[#222b38]/70 bg-[#0d121a] space-y-2.5 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#8b949e]">Current Availability</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Available
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-[#222b38]/40 pt-2">
                  <span className="text-[#8b949e]">Response SLA</span>
                  <span className="text-[#f0f6fc] font-semibold">&lt; 24 Hours</span>
                </div>
                <div className="flex items-center justify-between border-t border-[#222b38]/40 pt-2">
                  <span className="text-[#8b949e]">Target Roles</span>
                  <span className="text-[#38bdf8]">Full-Stack / Frontend / AI Web</span>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Direct Message (DM) Form (7 Cols) */}
            <div className="lg:col-span-7">
              <SpotlightCard className="p-6 sm:p-8 rounded-2xl border border-[#222b38] bg-[#12171f] relative overflow-hidden">
                
                {/* Form Header Terminal Bar */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#222b38]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                    <span className="text-xs font-mono text-[#8b949e] ml-2">direct_message.sh</span>
                  </div>
                  <div className="text-[11px] font-mono text-[#38bdf8] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Instant Dispatch</span>
                  </div>
                </div>

                {submitStatus === 'success' ? (
                  /* Success State */
                  <div className="py-8 space-y-5 text-center">
                    <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold text-[#f0f6fc]">Message Dispatched Successfully!</h4>
                      <p className="text-sm text-[#8b949e] max-w-md mx-auto">
                        Your direct inquiry has been sent to Siddharth's inbox (<span className="text-[#38bdf8] font-mono">{email}</span>). He will respond within 24 hours.
                      </p>
                    </div>
                    <div className="pt-3">
                      <button
                        onClick={() => {
                          audioSynth.playClick();
                          setSubmitStatus(null);
                          setFormData({ name: '', email: '', purpose: 'Full-Time / Internship Role', message: '' });
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#18202b] text-xs font-mono text-[#f0f6fc] border border-[#222b38] hover:border-[#38bdf8]/40 hover:text-[#38bdf8] transition-colors cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Send Another Message</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Active Form */
                  <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Activation Notice Alert if FormSubmit is awaiting confirmation */}
                    {submitStatus === 'activation_pending' && (
                      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-3 font-mono text-xs text-amber-200">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <p className="text-[11px] leading-relaxed">
                            FormSubmit activation is pending for the developer's inbox. To guarantee your inquiry reaches Siddharth immediately without waiting:
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <a
                            href={gmailWebUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => audioSynth.playClick()}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-400 text-[#090d12] font-bold text-xs hover:bg-amber-300 transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Open in Gmail (Web)</span>
                          </a>
                          <a
                            href={mailtoUrl}
                            onClick={() => audioSynth.playClick()}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#18202b] text-amber-200 border border-amber-400/40 text-xs hover:text-white transition-colors"
                          >
                            <span>Mail App</span>
                          </a>
                          <button
                            type="button"
                            onClick={handleCopyFallback}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#18202b] text-xs border border-amber-400/40 text-amber-200 hover:text-white transition-colors cursor-pointer"
                          >
                            {copiedFallback ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedFallback ? 'Copied!' : 'Copy Draft'}</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Generic Network Error Alert */}
                    {submitStatus === 'error' && (
                      <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-3 font-mono text-xs text-rose-200">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                          <p className="text-[11px] leading-relaxed">
                            Direct transmission encountered a network block. Click below to send directly via Gmail or your mail app:
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <a
                            href={gmailWebUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => audioSynth.playClick()}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-rose-500 text-white font-bold text-xs hover:bg-rose-400 transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Open in Gmail (Web)</span>
                          </a>
                          <a
                            href={mailtoUrl}
                            onClick={() => audioSynth.playClick()}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#18202b] text-rose-200 border border-rose-400/40 text-xs hover:text-white transition-colors"
                          >
                            <span>Mail App</span>
                          </a>
                          <button
                            type="button"
                            onClick={handleCopyFallback}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#18202b] text-xs border border-rose-400/40 text-rose-200 hover:text-white transition-colors cursor-pointer"
                          >
                            {copiedFallback ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedFallback ? 'Copied!' : 'Copy Message'}</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-[#8b949e] block">
                          Your Name / Organization <span className="text-[#38bdf8]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Alex Rivers"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#090d12] border border-[#222b38] text-sm text-[#f0f6fc] placeholder-[#8b949e]/50 focus:outline-none focus:border-[#38bdf8] transition-colors font-sans"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-[#8b949e] block">
                          Your Email Address <span className="text-[#38bdf8]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="alex@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#090d12] border border-[#222b38] text-sm text-[#f0f6fc] placeholder-[#8b949e]/50 focus:outline-none focus:border-[#38bdf8] transition-colors font-sans"
                        />
                      </div>
                    </div>

                    {/* Purpose Selection Pills */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-[#8b949e] block">
                        Inquiry Purpose
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {['Full-Time / Internship Role', 'Project / Freelance', 'Technical Discussion'].map((pill) => (
                          <button
                            key={pill}
                            type="button"
                            onClick={() => {
                              audioSynth.playClick();
                              setFormData({ ...formData, purpose: pill });
                            }}
                            className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer ${
                              formData.purpose === pill
                                ? 'bg-sky-500/15 text-[#38bdf8] border border-[#38bdf8]/50'
                                : 'bg-[#090d12] text-[#8b949e] border border-[#222b38] hover:text-[#f0f6fc]'
                            }`}
                          >
                            {pill}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message Area */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-[#8b949e] block">
                        Message <span className="text-[#38bdf8]">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Hi Siddharth, we came across your work on Rowl AI and the TCE Appraisal system and would like to discuss..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#090d12] border border-[#222b38] text-sm text-[#f0f6fc] placeholder-[#8b949e]/50 focus:outline-none focus:border-[#38bdf8] transition-colors resize-none font-sans leading-relaxed"
                      />
                    </div>

                    {/* Submit Bar */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#38bdf8] hover:bg-[#7dd3fc] text-[#090d12] font-mono font-bold text-xs tracking-wider transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-sky-500/10"
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>DISPATCHING...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>SEND DIRECT MESSAGE</span>
                          </>
                        )}
                      </button>

                      <span className="text-[11px] font-mono text-[#8b949e]">
                        Direct SSL-encrypted transmission
                      </span>
                    </div>

                  </form>
                )}

              </SpotlightCard>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
