import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ArrowRight, ExternalLink, Sparkles, CheckCircle2, Shield, 
  Layers, Server, Database, Cpu, FileCheck, Users, Award, FileText, 
  Heart, Compass, Calendar, BookOpen, Lock, Terminal, Activity, Check, Copy
} from 'lucide-react';
import { Github } from './Icons';
import { portfolioData } from '../data/portfolioData';
import rowlAiScreenshot from '../assets/rowl-ai-preview.png';
import tceAppraisalScreenshot from '../assets/tce-appraisal-preview.png';

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
          className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-md bg-[#38bdf8] text-[#090d12] text-sm font-medium hover:bg-[#7dd3fc] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Homepage
        </Link>
      </div>
    );
  }

  // Reciprocal Navigation: Prev & Next projects
  const totalProjects = portfolioData.projects.length;
  const prevProject = portfolioData.projects[(projectIndex - 1 + totalProjects) % totalProjects];
  const nextProject = portfolioData.projects[(projectIndex + 1) % totalProjects];

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-16">
      
      {/* Breadcrumb Back Link */}
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
                    : project.id === 'college-appraisal'
                    ? 'Backend LLM Evaluation & Accomplishment Synthesis'
                    : 'Interactive Client-Side Prompt State Inspector'}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-sky-500/10 text-[#38bdf8] border border-sky-500/20 text-[10px]">
                {project.id === 'developer-portfolio' ? 'Client State Engine' : 'External API Integration'}
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

      {/* 4. Interactive Feature & Interface Walkthrough */}
      <ProjectFeatureWalkthrough project={project} />

      {/* 5. AI Integration (Only for projects with AI) */}
      {project.hasAi && project.caseStudy.aiWorkflow && (
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-[#f0f6fc] flex items-center gap-2 font-mono">
            <span className="text-[#38bdf8]">04.</span> AI Integration & Pipeline
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

      {/* 6. Engineering Decisions */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-[#f0f6fc] flex items-center gap-2 font-mono">
          <span className="text-[#38bdf8]">
            {project.hasAi ? '05.' : '04.'}
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

// ==========================================
// Interactive Project Feature Walkthrough
// ==========================================
const ProjectFeatureWalkthrough = ({ project }) => {
  const [tab, setTab] = useState(
    project.id === 'college-appraisal' ? 'screenshot' : project.id === 'rowl-ai' ? 'screenshot' : 'details'
  );

  // 1. TCE Appraisal Walkthrough
  if (project.id === 'college-appraisal') {
    return (
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222b38] pb-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[#f0f6fc] flex items-center gap-2 font-mono">
              <span className="text-[#38bdf8]">03.</span> Interactive Governance & Feature Walkthrough
            </h2>
            <p className="text-xs text-[#8b949e] font-mono">
              Interactive preview of multi-role permissions, evaluation rubrics, and automated export tools.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-[#090d12] p-1 rounded-lg border border-[#222b38] font-mono text-xs shrink-0 flex-wrap">
            <button
              onClick={() => setTab('screenshot')}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                tab === 'screenshot' ? 'bg-[#38bdf8] text-[#090d12] font-bold shadow-sm' : 'text-[#8b949e] hover:text-[#f0f6fc]'
              }`}
            >
              📸 Live Screenshot
            </button>
            <button
              onClick={() => setTab('roles')}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                tab === 'roles' ? 'bg-[#38bdf8] text-[#090d12] font-bold shadow-sm' : 'text-[#8b949e] hover:text-[#f0f6fc]'
              }`}
            >
              4-Tier Roles
            </button>
            <button
              onClick={() => setTab('rubric')}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                tab === 'rubric' ? 'bg-[#38bdf8] text-[#090d12] font-bold shadow-sm' : 'text-[#8b949e] hover:text-[#f0f6fc]'
              }`}
            >
              9-Section Rubric
            </button>
            <button
              onClick={() => setTab('export')}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                tab === 'export' ? 'bg-[#38bdf8] text-[#090d12] font-bold shadow-sm' : 'text-[#8b949e] hover:text-[#f0f6fc]'
              }`}
            >
              PDF Dossier Engine
            </button>
          </div>
        </div>

        {/* Recruiter Access Callout */}
        <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-start gap-3 text-xs font-mono text-sky-200">
          <Shield className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-[#f0f6fc]">Institutional Access Notice for Evaluators:</strong> The live production deployment at{' '}
            <a href="https://tce-appraisal.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-[#38bdf8] underline font-bold">
              tce-appraisal.vercel.app
            </a>{' '}
            is actively secured behind Google OAuth restricted to verified <code className="text-[#f0f6fc]">@tce.edu</code> institutional accounts. This interactive walkthrough showcases the live application interface, role views, scoring logic, and report exports engineered into the system.
          </div>
        </div>

        {/* Tab 0: Real Live Screenshot */}
        {tab === 'screenshot' && (
          <div className="rounded-xl overflow-hidden border border-[#222b38] bg-[#090d12] shadow-2xl p-2 space-y-2">
            <div className="relative rounded-lg overflow-hidden border border-[#222b38]">
              <img
                src={tceAppraisalScreenshot}
                alt="TCE Faculty Appraisal System Screenshot"
                className="w-full object-cover max-h-[500px] object-top"
              />
            </div>
            <div className="flex items-center justify-between px-3 py-1.5 text-xs font-mono text-[#8b949e]">
              <span>Official Portal UI: https://tce-appraisal.vercel.app/</span>
              <span className="text-emerald-400 font-bold">● Deployed on Vercel</span>
            </div>
          </div>
        )}

        {/* Tab 1: 4-Tier Governance Roles */}
        {tab === 'roles' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-5 rounded-xl border border-[#222b38] bg-[#12171f] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-amber-400 font-bold flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> 1. Principal Mode
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 text-[10px] border border-amber-500/20">Apex Executive</span>
              </div>
              <p className="text-[11px] text-[#8b949e] leading-relaxed">
                College-wide NAAC/NIRF benchmark analytics, cross-department score oversight, and 1-click permanent audit locking (<code className="text-[#38bdf8]">POST /api/appraisals/endorse</code>) applying digital ratification stamps.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-[#222b38] bg-[#12171f] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-purple-400 font-bold flex items-center gap-1.5">
                  <Users className="w-4 h-4" /> 2. Registrar Governance
                </span>
                <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 text-[10px] border border-purple-500/20">Institutional Oversight</span>
              </div>
              <p className="text-[11px] text-[#8b949e] leading-relaxed">
                Manages directory across all 16 departments (350+ faculty), controls Dynamic HoD Rotation Handover (<code className="text-[#38bdf8]">/api/directory/change-hod</code>), and enforces accreditation filing deadlines.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-[#222b38] bg-[#12171f] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[#38bdf8] font-bold flex items-center gap-1.5">
                  <Layers className="w-4 h-4" /> 3. HoD Dual-Workspace
                </span>
                <span className="px-2 py-0.5 rounded bg-sky-500/10 text-[#38bdf8] text-[10px] border border-sky-500/20">Evaluator + Author</span>
              </div>
              <p className="text-[11px] text-[#8b949e] leading-relaxed">
                Dual-mode switcher allowing HoDs to switch between departmental evaluation inbox (line-by-line mark validation & AI-assisted feedback) and submitting their own faculty appraisal.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-[#222b38] bg-[#12171f] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> 4. Faculty Workbench
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 text-[10px] border border-emerald-500/20">Author Mode</span>
              </div>
              <p className="text-[11px] text-[#8b949e] leading-relaxed">
                Fill out 9-section accreditation submissions, auto-save drafts locally, upload verifiable hyperlink proofs, monitor review statuses in real-time, and download official PDF/Excel reports.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: 9-Section Rubric Breakdown */}
        {tab === 'rubric' && (
          <div className="p-6 rounded-xl border border-[#222b38] bg-[#0d121a] space-y-5 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#222b38] pb-3 text-[#8b949e]">
              <span>Section Rubric (NAAC & NBA Standardized)</span>
              <span className="text-[#38bdf8] font-bold">Total: 200 Marks</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { sec: "I", title: "Teaching & Learning", marks: "50", desc: "Courses, pass %, CO attainment, student feedback" },
                { sec: "II", title: "Research & Publications", marks: "50", desc: "SCI/Scopus, h-index, books, citations" },
                { sec: "III", title: "Patents & Innovation", marks: "20", desc: "Patents published/granted, tech transfers" },
                { sec: "IV", title: "Sponsored R&D", marks: "20", desc: "Sanctioned funding, industrial consultancy" },
                { sec: "V", title: "International Engagement", marks: "10", desc: "Foreign universities, visiting faculty" },
                { sec: "VI", title: "Faculty Development", marks: "20", desc: "FDP/STTP attended, keynotes delivered" },
                { sec: "VII", title: "Industry Interaction", marks: "10", desc: "Industrial internships, corporate visits" },
                { sec: "VIII", title: "Student Development", marks: "5", desc: "Project publications, student hackathons" },
                { sec: "IX", title: "Institutional Governance", marks: "20", desc: "Dean/HoD/CoE roles, statutory committees" }
              ].map((s) => (
                <div key={s.sec} className="p-3 rounded bg-[#12171f] border border-[#222b38] space-y-1">
                  <div className="flex items-center justify-between text-[#38bdf8] font-bold">
                    <span>Sec {s.sec}</span>
                    <span className="px-1.5 py-0.5 rounded bg-sky-500/10 text-[10px]">{s.marks} pts</span>
                  </div>
                  <div className="text-[#f0f6fc] font-medium truncate">{s.title}</div>
                  <div className="text-[10px] text-[#8b949e] line-clamp-2">{s.desc}</div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded bg-[#12171f] border border-[#222b38] flex items-center gap-2 text-[#8b949e]">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong className="text-[#f0f6fc]">Zero Ghost-Marks Scoring Engine:</strong> Dynamic sanitization automatically discards empty rows and default dropdown states upon submission, preventing artificial mark inflation.
              </span>
            </div>
          </div>
        )}

        {/* Tab 3: PDF Export Engine Preview */}
        {tab === 'export' && (
          <div className="p-6 rounded-xl border border-[#222b38] bg-[#0d121a] space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#222b38] pb-3 text-[#8b949e]">
              <span>Automated PDF Generator (jspdf-autotable)</span>
              <span className="text-emerald-400 font-bold">Audit-Certified Format</span>
            </div>

            <div className="p-6 rounded-lg bg-[#12171f] border border-[#222b38] space-y-4 max-w-xl mx-auto shadow-inner text-[#f0f6fc]">
              {/* Document Header Mock */}
              <div className="text-center border-b border-[#222b38] pb-3 space-y-1">
                <div className="text-amber-400 font-bold text-sm tracking-wide">THIAGARAJAR COLLEGE OF ENGINEERING</div>
                <div className="text-[10px] text-[#8b949e]">Madurai - 625 015 | Autonomous Institution Affiliated to Anna University</div>
                <div className="text-xs text-[#38bdf8] font-bold pt-1">ANNUAL FACULTY PERFORMANCE APPRAISAL REPORT</div>
              </div>

              {/* Dossier Matrix */}
              <div className="space-y-2 text-[11px]">
                <div className="flex justify-between py-1 border-b border-[#222b38]/50">
                  <span className="text-[#8b949e]">Faculty Member:</span>
                  <span className="font-bold">Dr. K. Ramanathan (Associate Professor / CSE)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#222b38]/50">
                  <span className="text-[#8b949e]">Evaluation Period:</span>
                  <span>Academic Year 2025 – 2026</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#222b38]/50">
                  <span className="text-[#8b949e]">Normalized Score:</span>
                  <span className="font-bold text-emerald-400">178.5 / 200 (Grade: Outstanding)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#222b38]/50">
                  <span className="text-[#8b949e]">Institutional Ratification:</span>
                  <span className="text-sky-300 font-bold flex items-center gap-1">
                    <Lock className="w-3 h-3 text-[#38bdf8]" /> Endorsed by Principal (Tamper-Locked)
                  </span>
                </div>
              </div>

              {/* Digital Seal Stamp */}
              <div className="pt-2 flex items-center justify-between text-[10px] text-[#8b949e]">
                <div>Verified Digital Digest: <code className="text-[#38bdf8]">SHA256:7f4a...e12b</code></div>
                <div className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  ✓ VERIFIED TCE SEAL
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    );
  }

  // 2. Rowl AI Walkthrough
  if (project.id === 'rowl-ai') {
    return (
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222b38] pb-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[#f0f6fc] flex items-center gap-2 font-mono">
              <span className="text-[#38bdf8]">03.</span> Interactive UX & Companion Walkthrough
            </h2>
            <p className="text-xs text-[#8b949e] font-mono">
              Simulating the conversational AI check-in flow and mindfulness interaction architecture.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-[#090d12] p-1 rounded-lg border border-[#222b38] font-mono text-xs shrink-0 flex-wrap">
            <button
              onClick={() => setTab('screenshot')}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                tab === 'screenshot' ? 'bg-[#38bdf8] text-[#090d12] font-bold shadow-sm' : 'text-[#8b949e] hover:text-[#f0f6fc]'
              }`}
            >
              📸 Live Screenshot
            </button>
            <button
              onClick={() => setTab('chat')}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                tab === 'chat' ? 'bg-[#38bdf8] text-[#090d12] font-bold shadow-sm' : 'text-[#8b949e] hover:text-[#f0f6fc]'
              }`}
            >
              Sera AI Companion
            </button>
            <button
              onClick={() => setTab('modules')}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                tab === 'modules' ? 'bg-[#38bdf8] text-[#090d12] font-bold shadow-sm' : 'text-[#8b949e] hover:text-[#f0f6fc]'
              }`}
            >
              6 Healing Modules
            </button>
          </div>
        </div>

        {/* Tab 0: Real Live Screenshot */}
        {tab === 'screenshot' && (
          <div className="rounded-xl overflow-hidden border border-[#222b38] bg-[#090d12] shadow-2xl p-2 space-y-2">
            <div className="relative rounded-lg overflow-hidden border border-[#222b38]">
              <img
                src={rowlAiScreenshot}
                alt="Rowl AI Healing Sanctuary Platform Screenshot"
                className="w-full object-cover max-h-[500px] object-top"
              />
            </div>
            <div className="flex items-center justify-between px-3 py-1.5 text-xs font-mono text-[#8b949e]">
              <span>Live Application UI: https://rowl-ai-pink.vercel.app/</span>
              <span className="text-emerald-400 font-bold">● Deployed on Vercel</span>
            </div>
          </div>
        )}

        {/* Tab 1: Sera AI Chat Mockup */}
        {tab === 'chat' && (
          <div className="rounded-xl border border-[#222b38] bg-[#0d121a] overflow-hidden font-mono text-xs shadow-xl">
            <div className="flex items-center justify-between px-4 py-3 bg-[#12171f] border-b border-[#222b38]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-bold text-[#f0f6fc]">Sera AI — Reflection Partner</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-[#8b949e]">
                <span>Engine: Groq Cloud</span>
                <span className="text-[#38bdf8] font-bold">Latency: 280ms</span>
              </div>
            </div>

            <div className="p-6 space-y-4 max-w-2xl mx-auto">
              {/* User Message */}
              <div className="flex justify-end">
                <div className="p-3.5 rounded-2xl rounded-tr-none bg-[#38bdf8] text-[#090d12] font-sans text-sm max-w-md shadow-sm">
                  I've been feeling deeply overwhelmed by my project deadlines and can't seem to focus today.
                </div>
              </div>

              {/* Sera AI Response */}
              <div className="flex justify-start">
                <div className="p-4 rounded-2xl rounded-tl-none bg-[#12171f] border border-[#222b38] text-[#c9d1d9] font-sans text-sm max-w-lg space-y-2">
                  <p>
                    I hear you. When deadlines stack up, our nervous system often triggers a fight-or-flight response, which makes focus even harder to sustain.
                  </p>
                  <p>
                    Before you tackle your next task, would you like to take a 60-second guided breathing pause, or break down just the very first task together?
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                    <span className="px-2.5 py-1 rounded bg-[#090d12] text-[#38bdf8] border border-[#222b38] cursor-pointer hover:border-[#38bdf8]/40">
                      🌿 60s Breathing Pause
                    </span>
                    <span className="px-2.5 py-1 rounded bg-[#090d12] text-[#8b949e] border border-[#222b38] cursor-pointer hover:text-[#f0f6fc]">
                      ✍️ Break down next step
                    </span>
                  </div>
                </div>
              </div>

              {/* Guardrails Info Badge */}
              <div className="p-3 rounded-lg bg-[#090d12] border border-[#222b38] flex items-center justify-between text-[11px] text-[#8b949e]">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Strict Non-Clinical Guardrails Applied
                </span>
                <span className="text-[#38bdf8]">HTTP-Only Cookie Auth Active</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: 6 Modules */}
        {tab === 'modules' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 font-mono text-xs">
            {[
              { icon: Compass, name: "Healing Journey", path: "/healing", desc: "PTSD & wellbeing assessment with customized 4-stage path" },
              { icon: Heart, name: "Community Circle", path: "/community", desc: "Anonymous safe space for peer support, comments, and milestones" },
              { icon: Activity, name: "Mindful Breathing", path: "/hero", desc: "Pulsing CSS circle replicating 4-7-8 parasympathetic calming" },
              { icon: Calendar, name: "Appointments", path: "/appointments", desc: "Doctor booking flow with trauma-informed certified specialists" },
              { icon: BookOpen, name: "Resource Library", path: "/resources", desc: "Grounding exercises (5-4-3-2-1 sensory) and psychoeducation" },
              { icon: FileText, name: "Mindful Journal", path: "/healing", desc: "Private emotional tracking tied to personal reflection stages" }
            ].map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.name} className="p-4 rounded-xl border border-[#222b38] bg-[#12171f] space-y-2">
                  <div className="flex items-center justify-between text-[#38bdf8]">
                    <div className="flex items-center gap-2 font-bold">
                      <Icon className="w-4 h-4" />
                      <span>{m.name}</span>
                    </div>
                    <span className="text-[10px] text-[#8b949e]">{m.path}</span>
                  </div>
                  <p className="text-[11px] text-[#8b949e] leading-snug">
                    {m.desc}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </section>
    );
  }

  // 3. ServeHub Walkthrough
  if (project.id === 'service-marketplace') {
    return (
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-[#f0f6fc] flex items-center gap-2 font-mono">
          <span className="text-[#38bdf8]">03.</span> Relational Schema & State Machine
        </h2>

        <div className="p-6 rounded-xl border border-[#222b38] bg-[#0d121a] space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-[#222b38] pb-3 text-[#8b949e]">
            <span>Normalized MySQL Relational Schema (3NF)</span>
            <span className="text-amber-400 font-bold">ACID Transaction Guarantees</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            {[
              { table: "users", keys: "id, role, password_hash, email", desc: "Role separation (Customer, Provider, Admin)" },
              { table: "services", keys: "id, provider_id, category, price", desc: "Indexed provider service catalog" },
              { table: "bookings", keys: "id, user_id, service_id, status", desc: "Status state machine (pending/confirmed/done)" },
              { table: "reviews", keys: "id, booking_id, rating, comment", desc: "Verified customer reviews with FK constraints" }
            ].map((t) => (
              <div key={t.table} className="p-3.5 rounded bg-[#12171f] border border-[#222b38] space-y-1.5">
                <div className="text-amber-400 font-bold">{t.table}</div>
                <div className="text-[10px] text-[#38bdf8] truncate">{t.keys}</div>
                <div className="text-[10px] text-[#8b949e]">{t.desc}</div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded bg-[#12171f] border border-[#222b38] text-[11px] text-[#8b949e]">
            <strong className="text-[#f0f6fc]">Defensive Backend Implementation:</strong> All database queries utilize PHP Data Objects (PDO) with strict prepared statements and parameter binding, eliminating SQL injection risks by design.
          </div>
        </div>
      </section>
    );
  }

  // 4. Developer Portfolio Walkthrough
  if (project.id === 'developer-portfolio') {
    return (
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-[#f0f6fc] flex items-center gap-2 font-mono">
          <span className="text-[#38bdf8]">03.</span> CI/CD Pipeline & Static Hosting Strategy
        </h2>

        <div className="p-6 rounded-xl border border-[#222b38] bg-[#0d121a] space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-[#222b38] pb-3 text-[#8b949e]">
            <span>Continuous Deployment via GitHub Actions (.github/workflows/deploy.yml)</span>
            <span className="text-emerald-400 font-bold">Zero-Downtime Builds</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded bg-[#12171f] border border-[#222b38] space-y-1">
              <div className="text-[#38bdf8] font-bold">1. Trigger on Push</div>
              <p className="text-[11px] text-[#8b949e]">Push to main triggers automated Linux container runner</p>
            </div>
            <div className="p-4 rounded bg-[#12171f] border border-[#222b38] space-y-1">
              <div className="text-emerald-400 font-bold">2. Vite Build & Lint</div>
              <p className="text-[11px] text-[#8b949e]">Compiles React 19 SPA into optimized chunks (&lt;100kB gzip)</p>
            </div>
            <div className="p-4 rounded bg-[#12171f] border border-[#222b38] space-y-1">
              <div className="text-purple-400 font-bold">3. Pages Deployment</div>
              <p className="text-[11px] text-[#8b949e]">Atomic publish to GitHub Pages edge network</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return null;
};
