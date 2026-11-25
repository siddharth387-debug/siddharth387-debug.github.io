import React from 'react';
import { X, Download, Printer, ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { Github, Linkedin } from './Icons';

export const ResumeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.open('./Siddharth_K_Resume.pdf', '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0d121a] border border-[#222b38] rounded-2xl shadow-2xl my-8 overflow-hidden">
        
        {/* Modal Action Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-6 py-4 border-b border-[#222b38] bg-[#12171f]">
          <div className="flex items-center gap-2 text-xs font-mono text-[#38bdf8]">
            <span>SIDDHARTH_K_RESUME_FULLSTACK.PDF (1-PAGE ATS VERIFIED)</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="./Siddharth_K_Resume.pdf"
              download="Siddharth_K_Resume_FullStack.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#38bdf8] hover:bg-[#7dd3fc] text-xs font-mono font-bold text-[#090d12] transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Download 1-Page PDF
            </a>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#18202b] hover:bg-[#222b38] text-xs font-mono text-[#f0f6fc] border border-[#222b38] transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#38bdf8]" />
              Open / Print PDF
            </button>

            <button
              onClick={onClose}
              aria-label="Close resume viewer"
              className="p-1.5 rounded-md hover:bg-[#18202b] text-[#8b949e] hover:text-[#f0f6fc] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Body */}
        <div className="p-6 sm:p-10 space-y-7 bg-[#090d12] text-[#c9d1d9] font-sans max-h-[80vh] overflow-y-auto">
          
          {/* Header */}
          <div className="border-b border-[#222b38] pb-6 space-y-2 text-center sm:text-left">
            <h1 className="text-3xl font-bold text-[#f0f6fc] tracking-tight">
              SIDDHARTH K
            </h1>
            <p className="text-sm font-mono text-[#38bdf8] font-bold">
              Full-Stack Software Engineer | MERN Stack &amp; Backend Systems
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-mono text-[#8b949e] pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#38bdf8]" /> Madurai, Tamil Nadu (Open to Chennai, Remote &amp; Relocation)
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-[#38bdf8]" /> +91 6380686416
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[#38bdf8]" /> personalsiddharth387@gmail.com
              </span>
              <a
                href="https://github.com/siddharth387-debug"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#38bdf8] hover:underline"
              >
                <Github className="w-3.5 h-3.5" /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/siddharth-k-b0a118340/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#38bdf8] hover:underline"
              >
                <Linkedin className="w-3.5 h-3.5" /> LinkedIn
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase text-[#38bdf8] tracking-wider border-b border-[#222b38] pb-1">
              SUMMARY
            </h2>
            <p className="text-xs leading-relaxed text-[#c9d1d9]">
              Full-Stack Software Engineer and MCA candidate (CGPA 8.47) who architects, tests, and deploys production MERN stack applications with React, Node.js, Express.js, and MongoDB. Engineered an institutional faculty appraisal platform live across 16 academic departments with 61+ faculty onboarded, and a deployed LLM-powered mental wellness platform backed by automated Jest and Supertest suites. Experienced in REST API design, JWT and Google OAuth authentication, 5-tier Role-Based Access Control (RBAC), HMAC-SHA256 webhook security, and fault-tolerant LLM API integration (Groq, Gemini).
            </p>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase text-[#38bdf8] tracking-wider border-b border-[#222b38] pb-1">
              TECHNICAL SKILLS
            </h2>
            <div className="space-y-1.5 text-xs font-mono text-[#8b949e]">
              <div><strong className="text-[#f0f6fc]">Web Development (MERN Stack):</strong> JavaScript (ES6+), React.js, Node.js, Express.js, MongoDB, Mongoose, REST APIs, HTML5, CSS3</div>
              <div><strong className="text-[#f0f6fc]">Authentication &amp; Security:</strong> JWT (HTTP-Only Cookies), Google OAuth 2.0, Role-Based Access Control (RBAC), HMAC-SHA256 Webhooks, Session Security</div>
              <div><strong className="text-[#f0f6fc]">LLM &amp; Applied AI Integration:</strong> Groq Cloud API (Llama 3.1/3.3), Google Gemini API, Multi-Model Fallback Cascades, Timeout &amp; Rate-Limit Handling, System Prompt Guardrails</div>
              <div><strong className="text-[#f0f6fc]">Testing, DevOps &amp; Deployment:</strong> Jest, Supertest, Git, GitHub Actions CI/CD, Vercel, Render, Razorpay Payment Webhooks</div>
              <div><strong className="text-[#f0f6fc]">Languages &amp; Databases:</strong> SQL, MySQL (3NF Relational Schemas), PHP, Python, C, C++, PDF &amp; Excel Report Generation, Web Speech API</div>
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold uppercase text-[#38bdf8] tracking-wider border-b border-[#222b38] pb-1">
              PROJECTS
            </h2>

            {/* Faculty Appraisal */}
            <div className="space-y-1.5">
              <div className="flex items-baseline justify-between text-xs">
                <span className="font-bold text-[#f0f6fc]">
                  Faculty Appraisal Management System
                </span>
                <span className="font-mono text-[#8b949e]">2026 – Present</span>
              </div>
              <div className="text-[11px] font-mono text-[#38bdf8] flex flex-wrap items-center gap-1.5">
                <span>MERN Stack | Institutional Governance Platform | Live:</span>
                <a href="https://tfpep.tceapps.in/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#7dd3fc]">tfpep.tceapps.in</a>
                <span>|</span>
                <a href="https://github.com/siddharth387-debug/Tce-apprisal" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#7dd3fc]">GitHub Repository</a>
                <span>|</span>
                <a href="https://www.loom.com/share/2c768659961f43c486b898fe0e4a0f28" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#7dd3fc] font-bold">Loom Demo</a>
              </div>
              <ul className="list-disc list-inside text-xs text-[#8b949e] space-y-1">
                <li>Architected and deployed an institutional appraisal platform active across 16 academic departments, with 61 faculty members onboarded.</li>
                <li>Implemented institution-domain Google OAuth, five governance roles (Faculty, HoD, IQAC, Registrar, Principal), and dual-layer session security: single-active-session enforcement plus a 15-minute inactivity timeout with draft auto-save.</li>
                <li>Secured the ERP staff-sync webhook with HMAC-SHA256 signature verification, institutional-domain filtering, and a privilege lockout preventing automated assignment of leadership roles.</li>
                <li>Designed four-level approval and rejection workflows with server-side PDF and Excel reports, automated email notifications, and scheduled daily database backups.</li>
                <li>Integrated the Gemini API with a three-model fallback cascade and a deterministic rule-based fallback for evaluator feedback synthesis; resolved a production outage caused by a retired Gemini model by migrating to supported endpoints.</li>
              </ul>
            </div>

            {/* Rowl AI */}
            <div className="space-y-1.5">
              <div className="flex items-baseline justify-between text-xs">
                <span className="font-bold text-[#f0f6fc]">
                  Rowl AI
                </span>
                <span className="font-mono text-[#8b949e]">2026</span>
              </div>
              <div className="text-[11px] font-mono text-[#38bdf8] flex flex-wrap items-center gap-1.5">
                <span>MERN Stack | Mental Wellness &amp; Reflection Platform | Live:</span>
                <a href="https://rowl-ai-pink.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#7dd3fc]">rowl-ai-pink.vercel.app</a>
                <span>|</span>
                <a href="https://github.com/siddharth387-debug/rowl-ai" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#7dd3fc]">GitHub Repository</a>
                <span>|</span>
                <a href="https://www.loom.com/share/3acb715328d84e7f90f9ac460a537dcd" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#7dd3fc] font-bold">Loom Demo</a>
              </div>
              <ul className="list-disc list-inside text-xs text-[#8b949e] space-y-1">
                <li>Built and deployed a six-module full-stack web application featuring Sera, a conversational wellness companion powered by Llama 3.1/3.3 through the Groq Cloud Inference API (~280ms latency).</li>
                <li>Engineered defensive non-clinical system prompt guardrails, input sanitization, and structured JSON response validation for safe reflection flows.</li>
                <li>Implemented HTTP-only JWT authentication and cryptographic Razorpay HMAC-SHA256 payment webhooks; wrote 11 automated integration tests (9 backend, 2 frontend) using Jest and Supertest.</li>
                <li>Architected the MongoDB document schemas, modular Express REST routing, and React component hierarchy, shipping end-to-end production deployments on Vercel and Render in a seven-week cycle.</li>
              </ul>
            </div>

            {/* FlowState Lo-Fi */}
            <div className="space-y-1.5">
              <div className="flex items-baseline justify-between text-xs">
                <span className="font-bold text-[#f0f6fc]">
                  Lofi Loop and Voice Replay (FlowState Lo-Fi)
                </span>
                <span className="font-mono text-[#8b949e]">2026</span>
              </div>
              <div className="text-[11px] font-mono text-[#38bdf8]">
                JavaScript (ES6+), Chrome Extension (Manifest V3), Web Speech API | GitHub: github.com/siddharth387-debug/flowstate-lofi
              </div>
              <ul className="list-disc list-inside text-xs text-[#8b949e] space-y-1">
                <li>Built hands-free voice and hotkey controls for YouTube with 10 voice commands, smart 20% audio auto-ducking, content scripts, and a Manifest V3 service worker.</li>
                <li>Handled accents and background music interference by classifying interim speech streams with a sliding delta-cursor, phonetic consonant normalization, and Levenshtein edit distance (d ≤ 1).</li>
                <li>Added Bluetooth headset hardware tap control through the MediaSession API and Trusted-Types CSP-compliant DOM rendering.</li>
              </ul>
            </div>

            {/* ServeHub */}
            <div className="space-y-1.5">
              <div className="flex items-baseline justify-between text-xs">
                <span className="font-bold text-[#f0f6fc]">
                  ServeHub
                </span>
                <span className="font-mono text-[#8b949e]">2024 – 2025</span>
              </div>
              <div className="text-[11px] font-mono text-[#38bdf8]">
                PHP, MySQL | Transactional Service Marketplace | GitHub: github.com/siddharth387-debug/serviceMarketplace
              </div>
              <ul className="list-disc list-inside text-xs text-[#8b949e] space-y-1">
                <li>Developed a full-stack PHP and MySQL service marketplace with multi-role booking workflows, Bcrypt session authentication, role-based access control (Customer, Provider, Admin), and normalized 3NF relational schemas.</li>
              </ul>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase text-[#38bdf8] tracking-wider border-b border-[#222b38] pb-1">
              EDUCATION
            </h2>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-baseline">
                <div>
                  <strong className="text-[#f0f6fc]">Thiagarajar College of Engineering, Madurai, Tamil Nadu</strong>
                  <div className="text-[#8b949e]">Master of Computer Applications (MCA) — CGPA: 8.47 / 10.0</div>
                </div>
                <span className="font-mono text-[#8b949e]">2025 – 2027</span>
              </div>
              <div className="flex justify-between items-baseline">
                <div>
                  <strong className="text-[#f0f6fc]">Nadar Mahajana Sangam S. Vellaichamy Nadar College, Madurai, Tamil Nadu</strong>
                  <div className="text-[#8b949e]">B.Sc. Information Technology — CGPA: 7.62 / 10.0</div>
                </div>
                <span className="font-mono text-[#8b949e]">2022 – 2025</span>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase text-[#38bdf8] tracking-wider border-b border-[#222b38] pb-1">
              CERTIFICATIONS
            </h2>
            <ul className="list-disc list-inside text-xs text-[#8b949e] space-y-1">
              <li>Foundations of Prompt Engineering, AWS Training and Certification</li>
              <li>AI Literacy and Cybersecurity Fundamentals, IBM SkillsBuild</li>
              <li>Full Stack Developer Course (HDFD), Grade A, CSC Computer Software College, Thirumangalam (Mar 2025)</li>
            </ul>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[#222b38] bg-[#12171f] flex items-center justify-between">
          <span className="text-xs font-mono text-[#8b949e]">
            1-Page ATS PDF available for immediate download
          </span>
          <div className="flex items-center gap-2">
            <a
              href="./Siddharth_K_Resume.pdf"
              download="Siddharth_K_Resume_FullStack.pdf"
              className="px-4 py-1.5 rounded-md bg-[#38bdf8] text-[#090d12] text-xs font-bold hover:bg-[#7dd3fc] cursor-pointer"
            >
              Download PDF
            </a>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-md bg-[#18202b] text-[#f0f6fc] border border-[#222b38] text-xs font-medium hover:bg-[#222b38] cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
