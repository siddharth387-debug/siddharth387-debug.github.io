import React, { useState } from 'react';
import { ArrowRight, FileText, Database, Server, Cpu, Layers, Terminal, Sparkles, Copy, Check, Zap, Award, Clock, Shield, Code2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { SpotlightCard } from './SpotlightCard';
import { audioSynth } from '../utils/audioSynth';

export const Hero = ({ onOpenResume }) => {
  const [copied, setCopied] = useState(false);
  const [heroTab, setHeroTab] = useState('architecture');
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const snippets = {
    groq: {
      file: 'groq-inference.ts (Rowl AI)',
      code: `// Rowl AI: Defensive Groq LLM Inference Pipeline
export async function streamMentalReflection(userCheckin: string) {
  const prompt = sanitizePrompt(userCheckin, { maxTokens: 400 });
  
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: NON_CLINICAL_MINDFULNESS_GUARDRAIL },
      { role: "user", content: prompt }
    ],
    temperature: 0.6,
    response_format: { type: "json_object" }
  });

  return validateSchema(completion.choices[0].message.content);
}`
    },
    rbac: {
      file: 'rbac-auth.php (TCE Appraisal)',
      code: `<?php
// TCE Appraisal: 4-Tier RBAC & Prepared Session Defense
function verifyFacultyAccess(PDO $pdo, int $staffId, string $reqRole): bool {
    $stmt = $pdo->prepare("SELECT role, is_active FROM faculty_governance 
                           WHERE staff_id = :id AND status = 'APPROVED'");
    $stmt->execute(['id' => $staffId]);
    $faculty = $stmt->fetch();
    
    if (!$faculty || $faculty['role'] !== $reqRole) {
        http_response_code(403);
        exit(json_encode(['error' => 'RBAC Permission Denied']));
    }
    return true;
}`
    },
    hmac: {
      file: 'razorpay-hmac.ts (Rowl AI)',
      code: `// Webhook Verification: Cryptographic SHA-256 HMAC
export function verifyPaymentWebhook(rawBody: string, signature: string): boolean {
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(rawBody)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}`
    }
  };

  const handleTabChange = (tab) => {
    audioSynth.playClick();
    setHeroTab(tab);
  };

  const handleCopySnippet = (code) => {
    audioSynth.playClick();
    navigator.clipboard.writeText(code);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  const handleCopyEmail = () => {
    audioSynth.playClick();
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-[#222b38] overflow-hidden">
      {/* Subtle grid background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#f0f6fc 1px, transparent 1px), linear-gradient(90deg, #f0f6fc 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Identity & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Context Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#12171f] border border-[#222b38] text-xs font-mono text-[#8b949e]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Available for Full-Stack Roles</span>
              <span className="text-[#38bdf8]">/</span>
              <span className="text-[#38bdf8] font-semibold">Remote</span>
              <span>·</span>
              <span>Chennai / Anywhere</span>
            </div>

            {/* Primary Title */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#f0f6fc] font-sans">
                {portfolioData.personal.title}
              </h1>
              <p className="text-lg sm:text-xl text-[#8b949e] font-normal leading-relaxed max-w-2xl">
                {portfolioData.personal.supportingStatement}
              </p>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {portfolioData.personal.primaryTech.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-mono rounded bg-[#12171f] text-[#c9d1d9] border border-[#222b38] hover:border-[#38bdf8]/40 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#38bdf8] text-[#090d12] font-medium text-sm hover:bg-[#7dd3fc] transition-colors shadow-sm font-sans"
              >
                View Projects
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#12171f] text-[#f0f6fc] hover:text-[#38bdf8] font-medium text-sm border border-[#222b38] hover:border-[#38bdf8]/50 transition-all cursor-pointer font-sans"
              >
                <FileText className="w-4 h-4 text-[#38bdf8]" />
                View Resume
              </button>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-[#12171f] text-[#8b949e] hover:text-[#f0f6fc] font-mono text-xs border border-[#222b38] hover:border-[#38bdf8]/40 transition-all cursor-pointer"
                title="Copy email address to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>

            {/* Subtle disclaimer / positioning */}
            <p className="text-xs text-[#8b949e]/80 font-mono pt-2">
              * Grounded in full-stack engineering principles — using AI for orchestration, prompt architecture, and practical web integration.
            </p>
          </div>

          {/* Right Column: Interactive Architecture ↔ Code Terminal */}
          <div className="lg:col-span-5">
            <SpotlightCard className="p-5 shadow-2xl relative">
              {/* Terminal Titlebar with switchable tabs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 mb-3.5 border-b border-[#222b38] gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80"></div>
                  <span className="text-[11px] font-mono text-[#8b949e] ml-1 hidden sm:inline">terminal</span>
                </div>

                {/* Switchable Tabs */}
                <div className="flex items-center gap-1 font-mono text-[10px] overflow-x-auto pb-0.5">
                  <button
                    onClick={() => handleTabChange('architecture')}
                    className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                      heroTab === 'architecture'
                        ? 'bg-[#38bdf8] text-[#090d12] font-bold'
                        : 'bg-[#18202b] text-[#8b949e] hover:text-[#f0f6fc]'
                    }`}
                  >
                    Architecture
                  </button>
                  <button
                    onClick={() => handleTabChange('groq')}
                    className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                      heroTab === 'groq'
                        ? 'bg-[#38bdf8] text-[#090d12] font-bold'
                        : 'bg-[#18202b] text-[#8b949e] hover:text-[#f0f6fc]'
                    }`}
                  >
                    groq.ts
                  </button>
                  <button
                    onClick={() => handleTabChange('rbac')}
                    className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                      heroTab === 'rbac'
                        ? 'bg-[#38bdf8] text-[#090d12] font-bold'
                        : 'bg-[#18202b] text-[#8b949e] hover:text-[#f0f6fc]'
                    }`}
                  >
                    rbac.php
                  </button>
                  <button
                    onClick={() => handleTabChange('hmac')}
                    className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                      heroTab === 'hmac'
                        ? 'bg-[#38bdf8] text-[#090d12] font-bold'
                        : 'bg-[#18202b] text-[#8b949e] hover:text-[#f0f6fc]'
                    }`}
                  >
                    hmac.ts
                  </button>
                </div>
              </div>

              {/* View 1: Interactive Pipeline Architecture Schematic */}
              {heroTab === 'architecture' && (
                <div className="space-y-3 font-mono text-xs animate-in fade-in duration-150">
                  {/* Node 1: Web Client */}
                  <div className="p-3 rounded-lg bg-[#090d12] border border-[#222b38] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded bg-[#161b22] text-[#38bdf8]">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[#f0f6fc] font-semibold">Web Client Layer</div>
                        <div className="text-[10px] text-[#8b949e]">React 19 · SPA · HTTP Cookies · Razorpay</div>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      Frontend
                    </span>
                  </div>

                  {/* Arrow indicator */}
                  <div className="flex justify-center text-[#8b949e]/60">
                    <span className="text-[11px]">↕ REST API / JWT Authentication</span>
                  </div>

                  {/* Node 2: Backend & Database */}
                  <div className="p-3 rounded-lg bg-[#090d12] border border-[#222b38] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded bg-[#161b22] text-emerald-400">
                        <Server className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[#f0f6fc] font-semibold">Application Server</div>
                        <div className="text-[10px] text-[#8b949e]">Node.js · Express / PHP · MongoDB / MySQL</div>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Backend
                    </span>
                  </div>

                  {/* Arrow indicator */}
                  <div className="flex justify-center text-[#38bdf8]">
                    <span className="text-[11px]">↕ Structured Prompts / JSON Schemas</span>
                  </div>

                  {/* Node 3: AI Inference Engine */}
                  <div className="p-3 rounded-lg bg-[#090d12] border border-[#38bdf8]/40 shadow-[0_0_15px_rgba(56,189,248,0.06)] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded bg-sky-500/10 text-[#38bdf8]">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[#f0f6fc] font-semibold flex items-center gap-1.5">
                          <span>AI Inference Engine</span>
                          <Sparkles className="w-3 h-3 text-[#38bdf8]" />
                        </div>
                        <div className="text-[10px] text-[#8b949e]">Groq Cloud API · Claude Code · Guardrails</div>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-sky-400/20 text-[#38bdf8] border border-sky-400/40">
                      LLM Layer
                    </span>
                  </div>
                </div>
              )}

              {/* View 2: Code Snippet Views with Copy action */}
              {heroTab !== 'architecture' && (
                <div className="space-y-2 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#8b949e] px-1">
                    <span className="text-[#38bdf8]">{snippets[heroTab].file}</span>
                    <button
                      onClick={() => handleCopySnippet(snippets[heroTab].code)}
                      className="inline-flex items-center gap-1 text-[10px] hover:text-[#f0f6fc] transition-colors cursor-pointer"
                    >
                      {copiedSnippet ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="p-3.5 rounded-lg bg-[#090d12] border border-[#222b38] overflow-x-auto text-[11px] font-mono leading-relaxed text-[#c9d1d9] max-h-[220px]">
                    <code>{snippets[heroTab].code}</code>
                  </pre>
                </div>
              )}

              {/* Status footer */}
              <div className="mt-4 pt-3 border-t border-[#222b38] flex items-center justify-between text-[11px] font-mono text-[#8b949e]">
                <span>Status: Deployed & Active</span>
                <span className="text-[#38bdf8] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse"></span>
                  Production Validated
                </span>
              </div>
            </SpotlightCard>
          </div>

        </div>

        {/* Engineering Metrics Ticker Bar */}
        <div className="mt-12 pt-8 border-t border-[#222b38]/80 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <SpotlightCard className="p-4 hover:border-[#38bdf8]/40 transition-all group">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-mono text-[#8b949e] uppercase tracking-wider">Inference Speed</span>
              <Zap className="w-4 h-4 text-[#38bdf8] group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-[#f0f6fc]">~280ms</div>
            <p className="text-xs text-[#8b949e] mt-1">Groq LLM endpoint latency in Rowl AI</p>
          </SpotlightCard>

          <SpotlightCard className="p-4 hover:border-[#38bdf8]/40 transition-all group">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-mono text-[#8b949e] uppercase tracking-wider">Institutional Scale</span>
              <Award className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-[#f0f6fc]">350+</div>
            <p className="text-xs text-[#8b949e] mt-1">Faculty & staff governed in TCE Appraisal</p>
          </SpotlightCard>

          <SpotlightCard className="p-4 hover:border-[#38bdf8]/40 transition-all group">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-mono text-[#8b949e] uppercase tracking-wider">Delivery Velocity</span>
              <Clock className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-[#f0f6fc]">7-Week</div>
            <p className="text-xs text-[#8b949e] mt-1">From discovery to campus-wide production</p>
          </SpotlightCard>

          <SpotlightCard className="p-4 hover:border-[#38bdf8]/40 transition-all group">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-mono text-[#8b949e] uppercase tracking-wider">Security Integrity</span>
              <Shield className="w-4 h-4 text-[#38bdf8] group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-[#f0f6fc]">100%</div>
            <p className="text-xs text-[#8b949e] mt-1">HMAC webhook verification & HTTP-only cookies</p>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};
