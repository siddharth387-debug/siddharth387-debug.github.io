import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, Sparkles, CheckCircle2, Shield, Zap, Terminal, Activity, Lock, Award, Heart, Compass } from 'lucide-react';
import { Github } from './Icons';
import rowlAiScreenshot from '../assets/rowl-ai-preview.png';
import tceAppraisalScreenshot from '../assets/tce-appraisal-preview.png';

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

        {/* Real Screenshot Showcase & Visual Preview */}
        <div className="rounded-xl border border-[#222b38] bg-[#090d12] overflow-hidden shadow-inner">
          
          {/* Mockup Window Titlebar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#0e131b] border-b border-[#222b38]/70 text-[#8b949e] font-mono text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80"></div>
              <span className="ml-2 text-[11px] text-[#8b949e]">
                {project.id === 'rowl-ai'
                  ? 'rowl-ai-pink.vercel.app // live-preview'
                  : project.id === 'college-appraisal'
                  ? 'tce-appraisal.vercel.app // faculty-portal'
                  : project.id === 'developer-portfolio'
                  ? 'siddharth387-debug.github.io // production'
                  : 'localhost // service-marketplace'}
              </span>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              {project.liveUrl ? 'Live Production' : 'Verified'}
            </span>
          </div>

          {/* 1. Rowl AI Screenshot Showcase */}
          {project.id === 'rowl-ai' && (
            <div className="space-y-3 p-3">
              <div className="relative rounded-lg overflow-hidden border border-[#222b38] aspect-[16/9] max-h-56 group-hover:border-[#38bdf8]/50 transition-colors">
                <img
                  src={rowlAiScreenshot}
                  alt="Rowl AI Live Platform Screenshot"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090d12] via-transparent to-transparent opacity-80"></div>
                
                {/* Floating pill tags on the screenshot */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-[#090d12]/90 text-[#38bdf8] border border-[#222b38] backdrop-blur-sm text-[11px] flex items-center gap-1">
                    <Activity className="w-3 h-3 text-[#F4A896] animate-pulse" />
                    Sera AI Companion • Mindful Breathing
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-sm text-[10px]">
                    ● Groq 280ms
                  </span>
                </div>
              </div>

              <div className="px-1 flex items-center justify-between text-[11px] font-mono text-[#8b949e]">
                <span>Auth: JWT in HTTP-Only Cookies</span>
                <span className="text-emerald-400">Razorpay HMAC-SHA256 Verified</span>
              </div>
            </div>
          )}

          {/* 2. TCE Appraisal Screenshot Showcase */}
          {project.id === 'college-appraisal' && (
            <div className="space-y-3 p-3">
              <div className="relative rounded-lg overflow-hidden border border-[#222b38] aspect-[16/9] max-h-56 group-hover:border-[#38bdf8]/50 transition-colors">
                <img
                  src={tceAppraisalScreenshot}
                  alt="TCE Faculty Appraisal System Screenshot"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090d12] via-transparent to-transparent opacity-80"></div>
                
                {/* Floating pill tags on the screenshot */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-[#090d12]/90 text-[#38bdf8] border border-[#222b38] backdrop-blur-sm text-[11px] flex items-center gap-1">
                    <Award className="w-3 h-3 text-[#38bdf8]" />
                    4-Tier Governance • 9-Section Rubric
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-sm text-[10px]">
                    ● 200 Pts Rubric
                  </span>
                </div>
              </div>

              <div className="px-1 flex items-center justify-between text-[11px] font-mono text-[#8b949e]">
                <span>Thiagarajar College of Engineering Portal</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> PDF Dossier & Digital Seal
                </span>
              </div>
            </div>
          )}

          {/* 3. ServeHub Visual Showcase */}
          {project.id === 'service-marketplace' && (
            <div className="p-4 space-y-2 text-[#c9d1d9] font-mono text-xs">
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
            <div className="p-4 space-y-2 text-[#c9d1d9] font-mono text-xs">
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
