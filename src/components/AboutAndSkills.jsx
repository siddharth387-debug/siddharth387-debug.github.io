import React from 'react';
import { User, Award, GraduationCap, Code2, Database, Cpu, Terminal, ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const AboutAndSkills = () => {
  const { personal, skills, education, certifications } = portfolioData;

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
            <h2 className="text-3xl sm:text-4xl font-bold text-[#f0f6fc] tracking-tight">
              About Me
            </h2>
            <div className="pt-2 text-xs font-mono text-[#8b949e] space-y-1.5 border-l-2 border-[#222b38] pl-3">
              <div>Based in {personal.location}</div>
              <div>MCA Candidate @ TCE Madurai</div>
              <div>Full-Stack + AI Application Engineering</div>
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
              Rather than viewing AI as a replacement or gimmick, I actively apply <strong>Prompt Engineering</strong> and high-throughput inference APIs (such as Groq Cloud Inference) to build intelligent features into web software—such as conversational reflection workflows and automated evaluation synthesis.
            </p>
          </div>
        </div>

        {/* Technical Skills Grid */}
        <div className="space-y-8 pt-4">
          <div className="flex items-center justify-between border-b border-[#222b38] pb-4">
            <h3 className="text-2xl font-bold text-[#f0f6fc] tracking-tight">
              {skills.heading}
            </h3>
            <span className="text-xs font-mono text-[#8b949e]">
              Technologies in Production & Active Projects
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.categories.map((cat) => (
              <div
                key={cat.name}
                className="p-5 rounded-xl border border-[#222b38] bg-[#12171f] space-y-3"
              >
                <div className="text-xs font-mono font-bold text-[#38bdf8] uppercase tracking-wider">
                  {cat.name}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded text-xs font-mono bg-[#090d12] text-[#c9d1d9] border border-[#222b38]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
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
                  className="p-5 rounded-xl border border-[#222b38] bg-[#12171f] space-y-1.5"
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
              <span className="uppercase tracking-wider">Certifications & Training</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-[#222b38] bg-[#12171f] space-y-1"
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
