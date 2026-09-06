import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, Sparkles, FileText, CheckCircle2, Shield, Zap, Terminal } from 'lucide-react';
import { Github } from './Icons';


export const ProjectCard = ({ project, isFeatured = false }) => {
  return (
    <div
      className={`rounded-xl border transition-all duration-300 ${
        isFeatured
          ? 'border-[#38bdf8]/40 bg-[#12171f] shadow-lg shadow-sky-950/20 hover:border-[#38bdf8]/60'
          : 'border-[#222b38] bg-[#12171f] hover:border-[#334155]'
      } overflow-hidden flex flex-col justify-between`}
    >
      <div className="p-6 sm:p-8 space-y-6">
        
        {/* Top bar: Number, Category, AI badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#222b38] pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-[#38bdf8]">
              {project.number}
            </span>
            <span className="text-xs font-mono text-[#8b949e] uppercase tracking-wider">
              {project.category}
            </span>
          </div>

          {/* AI Badge ONLY if applicable */}
          {project.hasAi && project.aiBadge ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-sky-500/10 text-[#38bdf8] border border-sky-500/30">
              <Sparkles className="w-3 h-3 text-[#38bdf8]" />
              {project.aiBadge}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono text-[#8b949e] bg-[#18202b] border border-[#222b38]">
              Conventional Full-Stack
            </span>
          )}
        </div>

        {/* Project Header */}
        <div className="space-y-2">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#f0f6fc] tracking-tight">
              {project.name}
            </h3>
            <span className="text-xs font-mono text-[#8b949e] shrink-0 hidden sm:inline">
              {project.timeline}
            </span>
          </div>
          <p className="text-sm sm:text-base text-[#8b949e] leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Interactive UI Mockup / Architectural Preview */}
        <div className="rounded-lg border border-[#222b38] bg-[#090d12] p-4 font-mono text-xs overflow-hidden">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#222b38]/70 text-[#8b949e]">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#ff5f56]/70"></div>
              <div className="w-2 h-2 rounded-full bg-[#ffbd2e]/70"></div>
              <div className="w-2 h-2 rounded-full bg-[#27c93f]/70"></div>
              <span className="ml-2 text-[11px] text-[#8b949e]">
                {project.id === 'rowl-ai'
                  ? 'preview://sera-ai-reflection-session'
                  : project.id === 'college-appraisal'
                  ? 'preview://faculty-appraisal-review-dashboard'
                  : 'preview://service-marketplace-directory'}
              </span>
            </div>
            <span className="text-[10px] text-[#38bdf8]">
              {project.id === 'rowl-ai' ? 'Live on Vercel & Render' : project.id === 'college-appraisal' ? 'Staging / Academic' : 'Localhost / Verified'}
            </span>
          </div>

          {/* Project Specific Architectural Snippet */}
          {project.id === 'rowl-ai' && (
            <div className="space-y-2 text-[#c9d1d9]">
              <div className="flex items-center justify-between text-[11px] text-[#8b949e]">
                <span>Inference: Groq Cloud (Low-latency)</span>
                <span>Auth: JWT in HTTP-Only Cookies</span>
              </div>
              <div className="p-2.5 rounded bg-[#12171f] border border-[#222b38] text-[11px] text-[#8b949e]">
                <span className="text-[#38bdf8] font-bold">Sera AI Companion:</span> "Hello Siddharth. How did today's development and research flow go? Let's log your reflection."
              </div>
              <div className="flex items-center gap-2 text-[10px] text-[#8b949e]">
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Razorpay Verified</span>
                <span className="px-1.5 py-0.5 rounded bg-[#161b22] text-[#8b949e] border border-[#222b38]">10+ Test Sessions Completed</span>
              </div>
            </div>
          )}

          {project.id === 'college-appraisal' && (
            <div className="space-y-2 text-[#c9d1d9]">
              <div className="flex items-center justify-between text-[11px] text-[#8b949e]">
                <span>Role: Multi-Role RBAC (Faculty / HOD / Admin)</span>
                <span>Output: PDF Dossier Engine</span>
              </div>
              <div className="p-2 rounded bg-[#12171f] border border-[#222b38] flex items-center justify-between text-[11px]">
                <span className="text-emerald-400">● Submission: Research & Teaching Portfolio</span>
                <span className="text-[#38bdf8]">HOD Review: Pending Signature</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-[#8b949e]">
                <span className="px-1.5 py-0.5 rounded bg-[#161b22] text-[#38bdf8] border border-[#38bdf8]/30">Automated Summary Synthesis</span>
                <span className="px-1.5 py-0.5 rounded bg-[#161b22] text-[#8b949e] border border-[#222b38]">Institutional Export Ready</span>
              </div>
            </div>
          )}

          {project.id === 'service-marketplace' && (
            <div className="space-y-2 text-[#c9d1d9]">
              <div className="flex items-center justify-between text-[11px] text-[#8b949e]">
                <span>Architecture: PHP + Relational MySQL</span>
                <span>Sessions: Bcrypt + Protected Prepared Statements</span>
              </div>
              <div className="p-2 rounded bg-[#12171f] border border-[#222b38] flex items-center justify-between text-[11px]">
                <span className="text-[#c9d1d9]">Tables: users, services, bookings, reviews</span>
                <span className="text-amber-400">ACID Transactions</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-[#8b949e]">
                <span className="px-1.5 py-0.5 rounded bg-[#161b22] text-[#8b949e] border border-[#222b38]">Multi-tenant RBAC (Client / Provider / Admin)</span>
              </div>
            </div>
          )}
        </div>

        {/* Technology Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs font-mono rounded bg-[#18202b] text-[#8b949e] border border-[#222b38]"
            >
              {tech}
            </span>
          ))}
        </div>

      </div>

      {/* Card Actions Footer */}
      <div className="px-6 sm:px-8 py-4 border-t border-[#222b38] bg-[#0d121a]/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md bg-[#38bdf8] text-[#090d12] hover:bg-[#7dd3fc] transition-colors"
            >
              Live Demo
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-mono text-[#8b949e] px-2.5 py-1 rounded bg-[#12171f] border border-[#222b38]">
              {project.id === 'service-marketplace' ? 'Localhost Verified' : 'Campus Network Staging'}
            </span>
          )}

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#8b949e] hover:text-[#f0f6fc] px-3 py-1.5 rounded-md border border-[#222b38] hover:border-[#38bdf8]/40 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            GitHub
          </a>
        </div>

        <Link
          to={`/projects/${project.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#38bdf8] hover:text-[#7dd3fc] transition-colors ml-auto"
        >
          Case Study
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
};
