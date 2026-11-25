import React from 'react';
import { X, Download, Printer, ExternalLink, Mail, MapPin, Phone, Briefcase, GraduationCap, Award, Code2 } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { portfolioData } from '../data/portfolioData';


export const ResumeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0d121a] border border-[#222b38] rounded-2xl shadow-2xl my-8 overflow-hidden">
        
        {/* Modal Action Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#222b38] bg-[#12171f]">
          <div className="flex items-center gap-2 text-xs font-mono text-[#38bdf8]">
            <span>SIDDHARTH_K_RESUME.PDF</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#18202b] hover:bg-[#222b38] text-xs font-mono text-[#f0f6fc] border border-[#222b38] transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#38bdf8]" />
              Print / Save PDF
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
        <div className="p-6 sm:p-10 space-y-8 bg-[#090d12] text-[#c9d1d9] font-sans max-h-[80vh] overflow-y-auto print:max-h-none print:overflow-visible">
          
          {/* Header */}
          <div className="border-b border-[#222b38] pb-6 space-y-2 text-center sm:text-left">
            <h1 className="text-3xl font-bold text-[#f0f6fc] tracking-tight">
              SIDDHARTH K
            </h1>
            <p className="text-sm font-mono text-[#38bdf8]">
              Full-Stack Software Engineer | MERN Stack, PHP/MySQL & System Architecture
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-mono text-[#8b949e] pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> Tamil Nadu, India · Remote / Chennai / Relocation Anywhere
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" /> personalsiddharth387@gmail.com
              </span>

              <a
                href="https://github.com/siddharth387-debug"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#38bdf8] hover:underline"
              >
                <Github className="w-3.5 h-3.5" /> github.com/siddharth387-debug
              </a>

              <a
                href="https://www.linkedin.com/in/siddharth-k-b0a118340/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#38bdf8] hover:underline"
              >
                <Linkedin className="w-3.5 h-3.5" /> linkedin.com/in/siddharth-k-b0a118340
              </a>
            </div>

          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase text-[#38bdf8] tracking-wider border-b border-[#222b38] pb-1">
              SUMMARY
            </h2>
            <p className="text-xs leading-relaxed text-[#8b949e]">
              Full-stack software engineer with hands-on production experience in MERN stack (React 19, Node.js, Express.js, MongoDB) and PHP/MySQL development, REST API architecture, 4-tier Role-Based Access Control (RBAC), cryptographic payment webhook verification, and cloud deployment. Proven track record shipping real-world systems including an institutional faculty appraisal portal governing 350+ faculty, a mental wellness platform with sub-300ms Groq LLM inference, and a Manifest V3 Chrome Extension with custom Phonetic + Levenshtein voice DSP.
            </p>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase text-[#38bdf8] tracking-wider border-b border-[#222b38] pb-1">
              TECHNICAL SKILLS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div><strong className="text-[#f0f6fc]">Languages:</strong> JavaScript (ES6+), PHP 8.x, SQL, C, C++, Python</div>
              <div><strong className="text-[#f0f6fc]">Frontend:</strong> React 19, Tailwind CSS, HTML5, CSS3, Chrome Extensions (MV3)</div>
              <div><strong className="text-[#f0f6fc]">Backend:</strong> Node.js, Express.js, PHP, RESTful APIs, Webhook HMAC Verification</div>
              <div><strong className="text-[#f0f6fc]">Databases:</strong> MongoDB (Mongoose), MySQL (3NF Relational Schemas, PDO ACID)</div>
              <div className="sm:col-span-2">
                <strong className="text-[#f0f6fc]">Applied AI & DSP Integration:</strong> Groq Cloud LPU API, Structured JSON Schema Validation, Defensive System Guardrails, Web Speech API & Levenshtein Edit-Distance Classifiers
              </div>
              <div><strong className="text-[#f0f6fc]">DevOps & Cloud:</strong> Git, GitHub Actions CI/CD, Vercel Edge, Render, Postman, Linux CLI</div>
              <div><strong className="text-[#f0f6fc]">Security & Architecture:</strong> JWT in HTTP-only Cookies, 4-Tier RBAC, CSRF Defense, Server-Side PDF Generation</div>
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold uppercase text-[#38bdf8] tracking-wider border-b border-[#222b38] pb-1">
              PROJECTS
            </h2>

            {/* Rowl AI */}
            <div className="space-y-1.5">
              <div className="flex items-baseline justify-between text-xs">
                <span className="font-bold text-[#f0f6fc]">
                  Rowl AI — Independent Project (Completed)
                </span>
                <span className="font-mono text-[#8b949e]">2026</span>
              </div>
              <div className="text-[11px] font-mono text-[#38bdf8]">
                MERN Stack | Mental Wellness Platform | Live: rowl-ai-pink.vercel.app
              </div>
              <ul className="list-disc list-inside text-xs text-[#8b949e] space-y-1">
                <li>Independently architected, built, and deployed a full-stack mental wellness application end-to-end in a 7-week production cycle.</li>
                <li>Designed normalized MongoDB schemas, modular Express REST controllers, and strict JSON request/response validation contracts.</li>
                <li>Integrated the Groq Cloud LPU API (~280ms latency) to power Sera AI with defensive non-clinical prompt guardrails.</li>
                <li>Implemented JWT authentication in HTTP-only cookies and cryptographic SHA-256 HMAC Razorpay webhook verification, deployed on Vercel and Render.</li>
              </ul>
            </div>

            {/* Faculty Appraisal */}
            <div className="space-y-1.5">
              <div className="flex items-baseline justify-between text-xs">
                <span className="font-bold text-[#f0f6fc]">
                  TCE Faculty Appraisal Management System — Institutional Platform
                </span>
                <span className="font-mono text-[#8b949e]">2026 – Present</span>
              </div>
              <div className="text-[11px] font-mono text-[#38bdf8]">
                Full-Stack Web & 4-Tier RBAC | 350+ Faculty Governed | Live: tce-apprisal.vercel.app
              </div>
              <ul className="list-disc list-inside text-xs text-[#8b949e] space-y-1">
                <li>Architected an institutional platform digitizing the annual faculty appraisal lifecycle across a 9-section, 200-point accreditation rubric.</li>
                <li>Enforced 4-tier Role-Based Access Control (Faculty → HoD → Registrar → Principal) with hardened JWT leadership endpoint guards.</li>
                <li>Built server-side PDF dossier generation with digital verification seals and multi-year appraisal cycle tracking.</li>
              </ul>
            </div>

            {/* FlowState Lo-Fi */}
            <div className="space-y-1.5">
              <div className="flex items-baseline justify-between text-xs">
                <span className="font-bold text-[#f0f6fc]">
                  FlowState Lo-Fi — Chrome Extension (Manifest V3) & Voice DSP
                </span>
                <span className="font-mono text-[#8b949e]">2026</span>
              </div>
              <div className="text-[11px] font-mono text-[#38bdf8]">
                JavaScript (ES6+), Chrome MV3, Web Speech API, Levenshtein Classifier, MediaSession API
              </div>
              <ul className="list-disc list-inside text-xs text-[#8b949e] space-y-1">
                <li>Engineered a Manifest V3 Chrome Extension for hands-free YouTube beat looping and voice-controlled timestamp seeking.</li>
                <li>Implemented a sliding delta-cursor stream processor paired with a Phonetic Skeleton + Levenshtein Edit-Distance (d ≤ 1) fuzzy command matcher.</li>
                <li>Built smart 20% audio auto-ducking on speech onset, Trusted-Types CSP-compliant DOM injection, and Bluetooth earbud MediaSession hooks.</li>
              </ul>
            </div>

            {/* ServeHub */}
            <div className="space-y-1.5">
              <div className="flex items-baseline justify-between text-xs">
                <span className="font-bold text-[#f0f6fc]">
                  ServeHub — Independent Project
                </span>
                <span className="font-mono text-[#8b949e]">2024 – 2025</span>
              </div>
              <div className="text-[11px] font-mono text-[#38bdf8]">
                PHP, MySQL | Service Marketplace
              </div>
              <ul className="list-disc list-inside text-xs text-[#8b949e] space-y-1">
                <li>Built a full-stack service marketplace enabling users to discover, book, and manage local services.</li>
                <li>Implemented session-based authentication, service listings, booking workflows, and CRUD operations.</li>
                <li>Designed and indexed relational MySQL schemas for users, services, bookings, payments, and reviews.</li>
                <li>Enforced role-based access control (RBAC) across customer, provider, and administrator roles.</li>
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
                  <strong className="text-[#f0f6fc]">Thiagarajar College of Engineering, Madurai, TN</strong>
                  <div className="text-[#8b949e]">Master of Computer Applications (MCA) — CGPA: 8.47 / 10.0</div>
                </div>
                <span className="font-mono text-[#8b949e]">2025 – 2027</span>
              </div>
              <div className="flex justify-between items-baseline">
                <div>
                  <strong className="text-[#f0f6fc]">Nadar Mahajana Sangam S. Vellaichamy Nadar College, Madurai, TN</strong>
                  <div className="text-[#8b949e]">B.Sc. Information Technology — CGPA: 7.62 / 10.0</div>
                </div>
                <span className="font-mono text-[#8b949e]">2022 – 2025</span>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase text-[#38bdf8] tracking-wider border-b border-[#222b38] pb-1">
              CERTIFICATIONS & TRAINING
            </h2>
            <ul className="list-disc list-inside text-xs text-[#8b949e] space-y-1">
              <li>Full Stack Developer — CSC</li>
              <li>HDFD (Hardware & Networking) Full Stack Developer — CSC</li>
              <li>C/C++ Programming — Blue Perl, Madurai</li>
              <li>ANRF Certification</li>
            </ul>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[#222b38] bg-[#12171f] flex items-center justify-between">
          <span className="text-xs font-mono text-[#8b949e]">
            Resume verified against official credentials
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-md bg-[#38bdf8] text-[#090d12] text-xs font-medium hover:bg-[#7dd3fc] cursor-pointer"
          >
            Close Viewer
          </button>
        </div>

      </div>
    </div>
  );
};
