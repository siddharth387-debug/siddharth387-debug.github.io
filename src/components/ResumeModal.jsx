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
              Web Developer | MERN Stack & AI-Assisted Development
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
              Full-stack web developer with hands-on experience in MERN stack development, REST API integration, authentication, database management, payment integration, and application deployment. Demonstrated practical development of real-world web applications involving user authentication, backend services, MongoDB data management, PDF generation, and third-party API integration. Currently building expertise in Prompt Engineering and Large Language Models (LLMs), with experience integrating LLM capabilities into live deployed applications. Focused on developing AI-assisted web applications by combining full-stack engineering with generative AI technologies.
            </p>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase text-[#38bdf8] tracking-wider border-b border-[#222b38] pb-1">
              TECHNICAL SKILLS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div><strong className="text-[#f0f6fc]">Languages:</strong> C, C++, JavaScript, Python</div>
              <div><strong className="text-[#f0f6fc]">Frontend:</strong> HTML, CSS, React.js</div>
              <div><strong className="text-[#f0f6fc]">Backend:</strong> Node.js, Express.js, REST APIs</div>
              <div><strong className="text-[#f0f6fc]">Databases:</strong> MongoDB, MySQL</div>
              <div className="sm:col-span-2">
                <strong className="text-[#f0f6fc]">AI-Assisted Development:</strong> Claude Code orchestration, Groq LLM API integration, prompt engineering for dev workflows
              </div>
              <div><strong className="text-[#f0f6fc]">Tools & Platforms:</strong> Git, GitHub, VS Code, Vercel, Render</div>
              <div><strong className="text-[#f0f6fc]">Core Concepts:</strong> CRUD, JWT, HTTP-only Cookies, RESTful API Design, RBAC</div>
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
                <li>Independently designed, built, and deployed a full-stack mental wellness application end-to-end in a 7-week production cycle.</li>
                <li>Used an AI-assisted development pipeline (Claude) to plan and implement database schema modeling, backend routing logic, and component architecture.</li>
                <li>Integrated the Groq Cloud Inference API to power Sera AI, a low-latency conversational wellness chatbot.</li>
                <li>Implemented JWT and HTTP-only cookie authentication, integrated Razorpay payment webhooks, validated core flows across 10+ test sessions, and deployed to production on Vercel and Render.</li>
              </ul>
            </div>

            {/* Faculty Appraisal */}
            <div className="space-y-1.5">
              <div className="flex items-baseline justify-between text-xs">
                <span className="font-bold text-[#f0f6fc]">
                  Faculty Appraisal Management System — Academic Project
                </span>
                <span className="font-mono text-[#8b949e]">2026 – Present</span>
              </div>
              <div className="text-[11px] font-mono text-[#38bdf8]">
                MERN Stack | Institutional Appraisal Platform | Live: tce-appraisal.vercel.app
              </div>
              <ul className="list-disc list-inside text-xs text-[#8b949e] space-y-1">
                <li>Building a web-based system to digitize and automate the institutional faculty appraisal lifecycle.</li>
                <li>Implemented multi-role authentication workflows separating faculty submission from HOD evaluation.</li>
                <li>Structured dynamic approval/rejection workflows to securely process appraisal requests.</li>
                <li>Integrated PDF generation to produce downloadable appraisal reports and evaluation summaries.</li>
                <li>Developed automated notifications to communicate appraisal outcomes and administrative decisions.</li>
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
