import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink, Sparkles, CheckCircle2, Shield, Layers, Server, Database, Cpu, FileCheck } from 'lucide-react';
import { Github } from './Icons';
import { portfolioData } from '../data/portfolioData';


export const CaseStudy = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find current project
  const projectIndex = portfolioData.projects.findIndex((p) => p.id === id);
  const project = portfolioData.projects[projectIndex];

  // Scroll to top on load or route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-[#f0f6fc]">Project Not Found</h2>
        <p className="text-[#8b949e] mt-2">The requested project case study could not be located.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-md bg-[#38bdf8] text-[#090d12] text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Selected Work
        </Link>
      </div>
    );
  }

  // Calculate previous and next projects
  const prevProject =
    portfolioData.projects[
      (projectIndex - 1 + portfolioData.projects.length) % portfolioData.projects.length
    ];
  const nextProject =
    portfolioData.projects[(projectIndex + 1) % portfolioData.projects.length];

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-16">
      
      {/* Top Navigation */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-mono text-[#8b949e] hover:text-[#38bdf8] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>
      </div>

      {/* Case Study Header */}
      <header className="space-y-6 border-b border-[#222b38] pb-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs font-bold text-[#38bdf8] px-2.5 py-1 rounded bg-[#12171f] border border-[#222b38]">
            PROJECT {project.number}
          </span>
          <span className="text-xs font-mono text-[#8b949e]">
            {project.category}
          </span>
          {project.hasAi && project.aiBadge && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono text-[#38bdf8] bg-sky-500/10 border border-sky-500/30">
              <Sparkles className="w-3 h-3 text-[#38bdf8]" />
              {project.aiBadge}
            </span>
          )}
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f0f6fc] tracking-tight">
            {project.name}
          </h1>
          <p className="text-lg text-[#8b949e] leading-relaxed">
            {project.headline} — {project.timeline}
          </p>
        </div>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs font-mono rounded bg-[#12171f] text-[#c9d1d9] border border-[#222b38]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-3 pt-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#38bdf8] text-[#090d12] text-xs font-medium hover:bg-[#7dd3fc] transition-colors"
            >
              Live Demo
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#12171f] text-[#f0f6fc] text-xs font-mono border border-[#222b38] hover:border-[#38bdf8]/40 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            GitHub Repository
          </a>
        </div>
      </header>

      {/* 1. Overview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#f0f6fc] flex items-center gap-2 font-mono">
          <span className="text-[#38bdf8]">01.</span> Overview
        </h2>
        <p className="text-[#8b949e] leading-relaxed">
          {project.caseStudy.overview}
        </p>
      </section>

      {/* 2. Problem & Solution Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-[#222b38] bg-[#12171f] space-y-3">
          <h3 className="text-base font-bold text-[#f0f6fc] font-mono text-red-400/90 flex items-center gap-2">
            The Problem
          </h3>
          <p className="text-sm text-[#8b949e] leading-relaxed">
            {project.caseStudy.problem}
          </p>
        </div>

        <div className="p-6 rounded-xl border border-[#222b38] bg-[#12171f] space-y-3">
          <h3 className="text-base font-bold text-[#f0f6fc] font-mono text-emerald-400/90 flex items-center gap-2">
            The Solution
          </h3>
          <p className="text-sm text-[#8b949e] leading-relaxed">
            {project.caseStudy.solution}
          </p>
        </div>
      </section>

      {/* 3. System Architecture (Visual Technical Diagram) */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-[#f0f6fc] flex items-center gap-2 font-mono">
          <span className="text-[#38bdf8]">02.</span> System Architecture
        </h2>

        <div className="rounded-xl border border-[#222b38] bg-[#0d121a] p-6 space-y-6">
          <div className="flex items-center justify-between text-xs font-mono text-[#8b949e] border-b border-[#222b38] pb-3">
            <span>Architecture Flow Diagram</span>
            <span className="text-[#38bdf8]">Application Data Flow</span>
          </div>

          {/* Architecture Nodes Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            
            {/* Frontend Node */}
            <div className="p-4 rounded-lg bg-[#12171f] border border-[#222b38] space-y-2">
              <div className="flex items-center gap-2 text-[#38bdf8]">
                <Layers className="w-4 h-4" />
                <span className="font-bold">Client Tier</span>
              </div>
              <p className="text-[11px] text-[#8b949e]">
                {project.id === 'service-marketplace'
                  ? 'HTML5, CSS3, Vanilla JS Form Controllers'
                  : 'React.js SPA with stateful component hierarchy'}
              </p>
            </div>

            {/* Backend Node */}
            <div className="p-4 rounded-lg bg-[#12171f] border border-[#222b38] space-y-2">
              <div className="flex items-center gap-2 text-emerald-400">
                <Server className="w-4 h-4" />
                <span className="font-bold">Server Tier</span>
              </div>
              <p className="text-[11px] text-[#8b949e]">
                {project.id === 'service-marketplace'
                  ? 'PHP MVC / Procedural backend with session management'
                  : 'Node.js & Express.js REST API with JWT validation'}
              </p>
            </div>

            {/* Database Node */}
            <div className="p-4 rounded-lg bg-[#12171f] border border-[#222b38] space-y-2">
              <div className="flex items-center gap-2 text-amber-400">
                <Database className="w-4 h-4" />
                <span className="font-bold">Data Tier</span>
              </div>
              <p className="text-[11px] text-[#8b949e]">
                {project.id === 'service-marketplace'
                  ? 'MySQL Relational Schema (Normalized with indexes)'
                  : 'MongoDB document collections with indexed schemas'}
              </p>
            </div>
          </div>

          {/* Additional Layer: AI or PDF generation */}
          {project.hasAi && (
            <div className="p-4 rounded-lg bg-[#12171f] border border-[#38bdf8]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2.5 text-[#38bdf8]">
                <Cpu className="w-4 h-4" />
                <span className="font-bold">AI / LLM Integration Layer:</span>
                <span className="text-[#8b949e]">
                  {project.id === 'rowl-ai'
                    ? 'Groq Cloud API (Sera AI conversational reflection)'
                    : 'Backend LLM Evaluation & Accomplishment Synthesis'}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-sky-500/10 text-[#38bdf8] border border-sky-500/20 text-[10px]">
                External API Integration
              </span>
            </div>
          )}

          {project.id === 'college-appraisal' && (
            <div className="p-4 rounded-lg bg-[#12171f] border border-[#222b38] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2.5 text-indigo-400">
                <FileCheck className="w-4 h-4" />
                <span className="font-bold">Document Engine:</span>
                <span className="text-[#8b949e]">
                  Structured Appraisal Data → PDF Generation Pipeline → Evaluation Dossier
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px]">
                Institutional Format
              </span>
            </div>
          )}

        </div>
      </section>

      {/* 4. AI Integration (Only for projects with AI) */}
      {project.hasAi && project.caseStudy.aiWorkflow && (
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-[#f0f6fc] flex items-center gap-2 font-mono">
            <span className="text-[#38bdf8]">03.</span> AI Integration & Pipeline
          </h2>

          <div className="rounded-xl border border-[#222b38] bg-[#12171f] p-6 space-y-4">
            <p className="text-sm text-[#8b949e] leading-relaxed">
              Conceptual data flow for how AI capabilities are mediated safely through the backend:
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded bg-[#090d12] border border-[#222b38] flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#161b22] text-[#38bdf8] flex items-center justify-center font-bold">1</span>
                <div>
                  <span className="text-[#f0f6fc] font-medium">User Interaction: </span>
                  <span className="text-[#8b949e]">{project.caseStudy.aiWorkflow.step1}</span>
                </div>
              </div>

              <div className="p-3 rounded bg-[#090d12] border border-[#222b38] flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#161b22] text-[#38bdf8] flex items-center justify-center font-bold">2</span>
                <div>
                  <span className="text-[#f0f6fc] font-medium">Context & Sanitization: </span>
                  <span className="text-[#8b949e]">{project.caseStudy.aiWorkflow.step2}</span>
                </div>
              </div>

              <div className="p-3 rounded bg-[#090d12] border border-[#222b38] flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#161b22] text-[#38bdf8] flex items-center justify-center font-bold">3</span>
                <div>
                  <span className="text-[#f0f6fc] font-medium">Structured Prompt Construction: </span>
                  <span className="text-[#8b949e]">{project.caseStudy.aiWorkflow.step3}</span>
                </div>
              </div>

              <div className="p-3 rounded bg-[#090d12] border border-[#222b38] flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#161b22] text-[#38bdf8] flex items-center justify-center font-bold">4</span>
                <div>
                  <span className="text-[#f0f6fc] font-medium">High-Throughput Inference Call: </span>
                  <span className="text-[#8b949e]">{project.caseStudy.aiWorkflow.step4}</span>
                </div>
              </div>

              <div className="p-3 rounded bg-[#090d12] border border-[#222b38] flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#161b22] text-[#38bdf8] flex items-center justify-center font-bold">5</span>
                <div>
                  <span className="text-[#f0f6fc] font-medium">Validation & Application UI Update: </span>
                  <span className="text-[#8b949e]">{project.caseStudy.aiWorkflow.step5}</span>
                </div>
              </div>
            </div>

            {project.caseStudy.nonClinicalNotice && (
              <div className="mt-4 p-3 rounded-md bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 font-mono">
                <strong>Responsible AI Notice:</strong> {project.caseStudy.nonClinicalNotice}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 5. Engineering Decisions */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-[#f0f6fc] flex items-center gap-2 font-mono">
          <span className="text-[#38bdf8]">
            {project.hasAi ? '04.' : '03.'}
          </span>{' '}
          Engineering Decisions & Implementation
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {project.caseStudy.engineeringDecisions.map((decision, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-[#222b38] bg-[#12171f] space-y-2"
            >
              <h3 className="text-sm font-bold text-[#f0f6fc] flex items-center gap-2 font-mono">
                <CheckCircle2 className="w-4 h-4 text-[#38bdf8] shrink-0" />
                {decision.title}
              </h3>
              <p className="text-xs text-[#8b949e] leading-relaxed">
                {decision.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Navigation: Previous & Next Project */}
      <footer className="pt-8 border-t border-[#222b38] flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          to={`/projects/${prevProject.id}`}
          className="w-full sm:w-auto p-4 rounded-lg border border-[#222b38] bg-[#12171f] hover:border-[#38bdf8]/40 transition-colors flex items-center gap-3 text-left group"
        >
          <ArrowLeft className="w-4 h-4 text-[#8b949e] group-hover:-translate-x-1 transition-transform" />
          <div>
            <div className="text-[11px] font-mono text-[#8b949e]">Previous Project</div>
            <div className="text-sm font-semibold text-[#f0f6fc] group-hover:text-[#38bdf8] transition-colors">
              {prevProject.name}
            </div>
          </div>
        </Link>

        <Link
          to={`/projects/${nextProject.id}`}
          className="w-full sm:w-auto p-4 rounded-lg border border-[#222b38] bg-[#12171f] hover:border-[#38bdf8]/40 transition-colors flex items-center justify-end gap-3 text-right group"
        >
          <div>
            <div className="text-[11px] font-mono text-[#8b949e]">Next Project</div>
            <div className="text-sm font-semibold text-[#f0f6fc] group-hover:text-[#38bdf8] transition-colors">
              {nextProject.name}
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#8b949e] group-hover:translate-x-1 transition-transform" />
        </Link>
      </footer>

    </article>
  );
};
