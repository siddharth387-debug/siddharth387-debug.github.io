import React, { useState } from 'react';
import { Mail, Copy, Check, FileText, ArrowUpRight, MessageSquare } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { portfolioData } from '../data/portfolioData';


export const Contact = ({ onOpenResume }) => {
  const [copied, setCopied] = useState(false);
  const email = portfolioData.personal.email;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#38bdf8] text-[#090d12] font-medium text-sm hover:bg-[#7dd3fc] transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                View Resume
              </button>

              <button
                onClick={onOpenResume}
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
              <span>DIRECT CHANNELS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f0f6fc] tracking-tight">
              Let's Build Something Useful.
            </h2>
            <p className="text-base text-[#8b949e]">
              I am open to discuss full-stack engineering roles, software projects, and AI-assisted development pipelines.
            </p>
          </div>

          {/* Minimal Contact Channels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Email Card with Copy Trigger */}
            <div className="p-6 rounded-xl border border-[#222b38] bg-[#12171f] space-y-3 hover:border-[#38bdf8]/40 transition-colors">
              <div className="flex items-center justify-between">
                <div className="text-xs font-mono text-[#8b949e]">EMAIL ADDRESS</div>
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
                className="text-base font-semibold text-[#f0f6fc] hover:text-[#38bdf8] transition-colors block break-all font-mono"
              >
                {email}
              </a>
              <p className="text-xs text-[#8b949e]">
                Direct inbox · Fast response for opportunities
              </p>
            </div>

            {/* GitHub Card */}
            <div className="p-6 rounded-xl border border-[#222b38] bg-[#12171f] space-y-3 hover:border-[#38bdf8]/40 transition-colors">
              <div className="text-xs font-mono text-[#8b949e]">GITHUB</div>
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-semibold text-[#f0f6fc] hover:text-[#38bdf8] transition-colors flex items-center justify-between font-mono"
              >
                <span>siddharth387-debug</span>
                <ArrowUpRight className="w-4 h-4 text-[#38bdf8]" />
              </a>
              <p className="text-xs text-[#8b949e]">
                Repositories, code commits, and project histories
              </p>
            </div>

            {/* LinkedIn Card */}
            <div className="p-6 rounded-xl border border-[#222b38] bg-[#12171f] space-y-3 hover:border-[#38bdf8]/40 transition-colors">
              <div className="text-xs font-mono text-[#8b949e]">LINKEDIN</div>
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-semibold text-[#f0f6fc] hover:text-[#38bdf8] transition-colors flex items-center justify-between font-mono"
              >
                <span>Siddharth K</span>
                <ArrowUpRight className="w-4 h-4 text-[#38bdf8]" />
              </a>
              <p className="text-xs text-[#8b949e]">
                Professional network and background details
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
