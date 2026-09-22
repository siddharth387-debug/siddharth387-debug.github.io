import React from 'react';
import { User, Award, GraduationCap, Code2, Database, Cpu, Terminal, Sparkles, Layers, Server, Shield, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { SpotlightCard } from './SpotlightCard';
import { GitHubTelemetry } from './GitHubTelemetry';

export const AboutAndSkills = () => {
  const { personal, education, certifications } = portfolioData;

  return (
    <section id="about" className="py-20 border-b border-[#222b38]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        
        {/* About Positioning */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-mono text-[#38bdf8] uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>BACKGROUND</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#f0f6fc] tracking-tight font-sans">
              About Me
            </h2>
            <div className="pt-2 text-xs font-mono text-[#8b949e] space-y-1.5 border-l-2 border-[#222b38] pl-3">
              <div>Based in Tamil Nadu · <span className="text-[#38bdf8]">Remote</span> & <span className="text-[#f0f6fc]">Chennai / Anywhere</span></div>
              <div>MCA Candidate @ TCE Madurai (8.47 CGPA)</div>
              <div>Full-Stack + AI-Assisted Web Development</div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4 text-base text-[#8b949e] leading-relaxed">
            <p className="text-lg text-[#f0f6fc] font-medium leading-relaxed">
              I am a <span className="text-[#38bdf8]">full-stack web developer</span> exploring the intersection of web engineering, AI-assisted development, and LLM-powered applications.
            </p>
            <p>
              My foundation is built on practical web engineering: developing full-stack applications with the <strong>MERN stack</strong> (React, Node.js, Express, MongoDB) and <strong>PHP / MySQL</strong>. I have built real applications incorporating secure session and token authentication (JWT in HTTP-only cookies), role-based access control (RBAC), relational and document databases, and third-party integrations like Razorpay webhooks.
            </p>
            <p>
              Rather than viewing AI as a replacement or gimmick, I actively apply <strong>Prompt Engineering</strong> and inference APIs (such as Groq Cloud) to build useful capabilities into web applications—such as conversational reflection workflows and automated evaluation synthesis.
            </p>
          </div>
        </div>

        {/* Technical Architecture & Skills Bento Grid */}
        <div className="space-y-8 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#222b38] pb-4 gap-2">
            <div>
              <h3 className="text-2xl font-bold text-[#f0f6fc] tracking-tight font-sans">
                Technical Architecture & Stack
              </h3>
              <p className="text-xs text-[#8b949e] mt-0.5">
                Modern full-stack systems engineering paired with LLM inference
              </p>
            </div>
            <span className="text-xs font-mono text-[#38bdf8] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              2025 – 2026 Production Standards
            </span>
          </div>

          {/* Asymmetrical Bento Grid with Mouse-Following Spotlight */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* Tile 1: Core Full-Stack Engine (Spans 2 columns on lg) */}
            <SpotlightCard className="lg:col-span-2 p-6 hover:border-[#38bdf8]/40 transition-all group relative flex flex-col justify-between">
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-sky-500/10 text-[#38bdf8] border border-sky-500/20">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[#f0f6fc]">Full-Stack Web Architecture</h4>
                      <p className="text-xs text-[#8b949e]">Production-grade MERN stack systems</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Core Engine
                  </span>
                </div>

                <p className="text-sm text-[#8b949e] leading-relaxed">
                  End-to-end single page applications engineered with React 19, Express.js micro-routes, and MongoDB persistence. Designed with layered controllers, centralized error handling, and strict environment isolation.
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {["React.js", "Node.js", "Express.js", "JavaScript (ES6+)", "REST APIs", "Tailwind CSS", "HTML5 / CSS3"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#090d12] text-[#c9d1d9] border border-[#222b38] group-hover:border-[#222b38]/80 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Security & Robustness Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#222b38]/70">
                  <div className="p-2.5 rounded-lg bg-[#090d12]/60 border border-[#222b38]/80">
                    <div className="text-[11px] font-mono text-[#38bdf8] flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      <span>Cookie Sessions</span>
                    </div>
                    <div className="text-xs text-[#8b949e] mt-1">JWT in HTTP-only cookies with CSRF defense</div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#090d12]/60 border border-[#222b38]/80">
                    <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Razorpay HMAC</span>
                    </div>
                    <div className="text-xs text-[#8b949e] mt-1">Cryptographic SHA-256 webhook validation</div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#090d12]/60 border border-[#222b38]/80">
                    <div className="text-[11px] font-mono text-amber-400 flex items-center gap-1">
                      <Code2 className="w-3 h-3" />
                      <span>Clean Contracts</span>
                    </div>
                    <div className="text-xs text-[#8b949e] mt-1">Structured JSON request & response schemas</div>
                  </div>
                </div>
              </div>
            </SpotlightCard>

            {/* Tile 2: AI & LLM Systems (Span 1) */}
            <SpotlightCard className="p-6 hover:border-[#38bdf8]/40 transition-all group relative flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-sky-500/10 text-[#38bdf8] border border-sky-500/20">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[#f0f6fc]">AI & LLM Tier</h4>
                      <p className="text-xs text-[#8b949e]">Practical model integration</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-[#38bdf8] border border-sky-500/20">
                    Inference
                  </span>
                </div>

                <p className="text-sm text-[#8b949e] leading-relaxed">
                  Integrating LLM inference directly into production workflows. Grounded in defensive prompt engineering, schema enforcement, and non-clinical guardrails.
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {["Groq Cloud API", "Prompt Engineering", "Structured JSON", "Claude Code", "Input Guardrails", "Output Validation"].map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#090d12] text-[#c9d1d9] border border-[#222b38]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#222b38]/70 flex items-center justify-between text-xs font-mono text-[#8b949e]">
                <span>Speed Benchmark</span>
                <span className="text-[#38bdf8] font-bold">~280ms Endpoint Latency</span>
              </div>
            </SpotlightCard>

            {/* Tile 3: Relational & Document Data Persistence (Span 1) */}
            <SpotlightCard className="p-6 hover:border-[#38bdf8]/40 transition-all group relative flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Database className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[#f0f6fc]">Databases & Storage</h4>
                      <p className="text-xs text-[#8b949e]">Relational & Document</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#161b22] text-[#8b949e] border border-[#222b38]">
                    Hybrid
                  </span>
                </div>

                <p className="text-sm text-[#8b949e] leading-relaxed">
                  Dual proficiency across normalized transactional databases and flexible document stores for session logs and journal records.
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {["MongoDB", "MySQL", "Mongoose ODM", "3NF Normalization", "PDO Prepared", "Indexes & Queries"].map((db) => (
                    <span
                      key={db}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#090d12] text-[#c9d1d9] border border-[#222b38]"
                    >
                      {db}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#222b38]/70 text-xs font-mono text-[#8b949e] flex items-center justify-between">
                <span>Data Integrity</span>
                <span className="text-emerald-400">Zero Injection Vulnerability</span>
              </div>
            </SpotlightCard>

            {/* Tile 4: Enterprise & Systems Engineering (Span 1) */}
            <SpotlightCard className="p-6 hover:border-[#38bdf8]/40 transition-all group relative flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <Server className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[#f0f6fc]">Systems & PHP Backend</h4>
                      <p className="text-xs text-[#8b949e]">Enterprise & Campus Scale</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Campus App
                  </span>
                </div>

                <p className="text-sm text-[#8b949e] leading-relaxed">
                  Architected TCE Faculty Appraisal System supporting 350+ faculty with 3-tier Role-Based Access Control and automated PDF dispatch.
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {["PHP 8.x", "3-Tier RBAC", "PDF Generation", "Faculty Governance", "Audit Trail", "Session State"].map((sys) => (
                    <span
                      key={sys}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#090d12] text-[#c9d1d9] border border-[#222b38]"
                    >
                      {sys}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#222b38]/70 text-xs font-mono text-[#8b949e] flex items-center justify-between">
                <span>Scale Deployed</span>
                <span className="text-amber-400 font-bold">350+ Users Governed</span>
              </div>
            </SpotlightCard>

            {/* Tile 5: DevOps & Delivery Pipeline (Span 1) */}
            <SpotlightCard className="p-6 hover:border-[#38bdf8]/40 transition-all group relative flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-[#161b22] text-[#c9d1d9] border border-[#222b38]">
                      <Terminal className="w-5 h-5 text-[#38bdf8]" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[#f0f6fc]">DevOps & Delivery</h4>
                      <p className="text-xs text-[#8b949e]">Cloud deployment & tools</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#161b22] text-[#8b949e] border border-[#222b38]">
                    CI / CD
                  </span>
                </div>

                <p className="text-sm text-[#8b949e] leading-relaxed">
                  Decoupled cloud distribution pairing Vercel global edge for single page frontends with containerized Render environments for APIs.
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {["Git & GitHub", "GitHub Actions", "Vercel Edge", "Render", "Postman", "Linux CLI", "VS Code"].map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#090d12] text-[#c9d1d9] border border-[#222b38]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#222b38]/70 text-xs font-mono text-[#8b949e] flex items-center justify-between">
                <span>Automation</span>
                <span className="text-[#38bdf8]">GitHub Actions CI/CD</span>
              </div>
            </SpotlightCard>

            {/* Tile 6: Live GitHub Activity Telemetry Card */}
            <div className="md:col-span-2 lg:col-span-3">
              <GitHubTelemetry />
            </div>

          </div>
        </div>

        {/* Education & Formal Certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
          
          {/* Education */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-mono text-[#38bdf8]">
              <GraduationCap className="w-4 h-4" />
              <span className="uppercase tracking-wider">Academic Education</span>
            </div>

            <div className="space-y-3">
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-[#222b38] bg-[#12171f] hover:border-[#38bdf8]/30 transition-colors space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-base font-bold text-[#f0f6fc]">
                      {edu.degree}
                    </h4>
                    <span className="text-xs font-mono text-[#38bdf8] px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20 shrink-0">
                      {edu.grade}
                    </span>
                  </div>
                  <div className="text-sm text-[#8b949e]">
                    {edu.institution}
                  </div>
                  <div className="text-xs font-mono text-[#8b949e]/80 flex items-center justify-between pt-1">
                    <span>{edu.period}</span>
                    <span className="text-emerald-400">{edu.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-mono text-[#38bdf8]">
              <Award className="w-4 h-4" />
              <span className="uppercase tracking-wider">Certifications & Recognition</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-[#222b38] bg-[#12171f] hover:border-[#38bdf8]/30 transition-colors space-y-1"
                >
                  <h4 className="text-sm font-bold text-[#f0f6fc] leading-snug">
                    {cert.title}
                  </h4>
                  <div className="text-xs text-[#8b949e]">
                    {cert.issuer}
                  </div>
                  <div className="text-[10px] font-mono text-[#38bdf8] pt-1">
                    {cert.type}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
