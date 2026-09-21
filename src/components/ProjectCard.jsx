import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, Sparkles, CheckCircle2, Shield, Zap, Terminal, Activity, Lock, Award, Heart, Compass } from 'lucide-react';
import { Github } from './Icons';

export const ProjectCard = ({ project, isFeatured = false }) => {
  return (
    <div
      data-cursor="CASE STUDY"
      className={`rounded-2xl border transition-all duration-300 ${
        isFeatured
          ? 'border-[#38bdf8]/40 bg-[#12171f] shadow-xl shadow-sky-950/20 hover:border-[#38bdf8]/70'
          : 'border-[#222b38] bg-[#12171f] hover:border-[#334155]'
      } overflow-hidden flex flex-col justify-between group`}
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
            <h3 className="text-2xl sm:text-3xl font-bold text-[#f0f6fc] tracking-tight group-hover:text-[#38bdf8] transition-colors">
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

        {/* High-Fidelity Visual Preview / Architectural Mockup */}
        <div className="rounded-xl border border-[#222b38] bg-[#090d12] p-4 font-mono text-xs overflow-hidden shadow-inner">
          
          {/* Mockup Window Titlebar */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#222b38]/70 text-[#8b949e]">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80"></div>
              <span className="ml-2 text-[11px] text-[#8b949e]">
                {project.id === 'rowl-ai'
                  ? 'rowl-ai-sanctuary // sera-engine'
                  : project.id === 'college-appraisal'
                  ? 'tce-governance // accreditation-portal'
                  : project.id === 'developer-portfolio'
                  ? 'github-actions // static-deploy'
                  : 'mysql-relational // pdo-engine'}
              </span>
            </div>
            <span className="text-[10px] text-[#38bdf8] font-bold">
              {project.liveUrl ? '● Deployed' : '● Verified'}
            </span>
          </div>

          {/* 1. Rowl AI Visual Showcase */}
          {project.id === 'rowl-ai' && (
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-[#FAF6F1]/5 border border-[#F4A896]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </div>
                  <div>
                    <span className="font-bold text-[#f0f6fc]">Sera AI Reflection Companion</span>
                    <span className="text-[10px] text-[#8b949e] block">Groq Cloud Inference (280ms latency)</span>
                  </div>
                </div>

                {/* Animated Breathing Circle Preview */}
                <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#F4A896]/10 border border-[#F4A896]/30 text-[#F4A896] text-[11px]">
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  <span>4-7-8 Mindful Breathing Engine</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#12171f] border border-[#222b38] text-[11px] text-[#8b949e] flex items-center justify-between">
                <span>Auth: JWT in HTTP-Only Cookies</span>
                <span className="text-emerald-400">Razorpay HMAC-SHA256 Verified</span>
              </div>
            </div>
          )}

          {/* 2. TCE Appraisal Visual Showcase */}
          {project.id === 'college-appraisal' && (
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-sky-950/20 border border-sky-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[#38bdf8] font-bold text-xs flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" /> TCE Institutional Governance
                  </span>
                  <span className="px-2 py-0.5 rounded bg-sky-500/10 text-[#38bdf8] text-[10px]">
                    4-Tier Roles
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[10px] text-[#c9d1d9]">
                  <span className="p-1 rounded bg-[#12171f] text-center">Principal</span>
                  <span className="p-1 rounded bg-[#12171f] text-center">Registrar</span>
                  <span className="p-1 rounded bg-[#12171f] text-center">HoD Dual-Mode</span>
                  <span className="p-1 rounded bg-[#12171f] text-center">Faculty</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#12171f] border border-[#222b38] text-[11px] flex items-center justify-between">
                <span className="text-[#8b949e]">9-Section Rubric (200 Pts Total)</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> PDF Dossier & Digital Seal
                </span>
              </div>
            </div>
          )}

          {/* 3. ServeHub Visual Showcase */}
          {project.id === 'service-marketplace' && (
            <div className="space-y-2 text-[#c9d1d9]">
              <div className="flex items-center justify-between text-[11px] text-[#8b949e]">
                <span>Architecture: PHP + Relational MySQL</span>
                <span className="text-amber-400">ACID Transactions</span>
              </div>
              <div className="p-2 rounded bg-[#12171f] border border-[#222b38] flex items-center justify-between text-[11px]">
                <span className="text-[#c9d1d9]">Normalized 3NF: users, services, bookings, reviews</span>
                <span className="text-emerald-400">PDO Prepared Statements</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-[#8b949e]">
                <span className="px-1.5 py-0.5 rounded bg-[#161b22] text-[#8b949e] border border-[#222b38]">Multi-tenant RBAC (Client / Provider / Admin)</span>
              </div>
            </div>
          )}

          {/* 4. Developer Portfolio Visual Showcase */}
          {project.id === 'developer-portfolio' && (
            <div className="space-y-2 text-[#c9d1d9]">
              <div className="flex items-center justify-between text-[11px] text-[#8b949e]">
                <span>Framework: React 19 + Tailwind CSS v4</span>
                <span className="text-[#38bdf8]">Vite 8 Build &lt;1s</span>
              </div>
              <div className="p-2 rounded bg-[#12171f] border border-[#222b38] flex items-center justify-between text-[11px]">
                <span className="text-[#c9d1d9]">Routing: HashRouter (Zero 404s)</span>
                <span className="text-emerald-400">GitHub Actions CI/CD</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-[#8b949e]">
                <span className="px-1.5 py-0.5 rounded bg-[#161b22] text-[#38bdf8] border border-[#38bdf8]/30">Interactive Prompt Inspector</span>
                <span className="px-1.5 py-0.5 rounded bg-[#161b22] text-[#8b949e] border border-[#222b38]">Precision Reticle Cursor</span>
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
              data-cursor="LIVE DEMO"
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md bg-[#38bdf8] text-[#090d12] hover:bg-[#7dd3fc] transition-colors cursor-pointer"
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
            data-cursor="VIEW CODE"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#8b949e] hover:text-[#f0f6fc] px-3 py-1.5 rounded-md border border-[#222b38] hover:border-[#38bdf8]/40 transition-colors cursor-pointer"
          >
            <Github className="w-3.5 h-3.5" />
            GitHub
          </a>
        </div>

        <Link
          to={`/projects/${project.id}`}
          data-cursor="CASE STUDY"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#38bdf8] hover:text-[#7dd3fc] transition-colors ml-auto cursor-pointer"
        >
          Case Study
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

    </div>
  );
};
