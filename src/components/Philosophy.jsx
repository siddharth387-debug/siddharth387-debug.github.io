import React from 'react';
import { Shield, BrainCircuit, Sliders, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Philosophy = () => {
  const { heading, statement, principles } = portfolioData.engineeringPhilosophy;

  return (
    <section className="py-20 border-b border-[#222b38] bg-[#0c1017]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Core Statement */}
        <div className="max-w-3xl space-y-4">
          <div className="text-xs font-mono text-[#38bdf8] uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4" />
            <span>DISCIPLINED INTEGRATION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#f0f6fc] tracking-tight">
            {heading}
          </h2>
          <blockquote className="border-l-2 border-[#38bdf8] pl-4 py-1 text-base sm:text-lg text-[#c9d1d9] italic font-normal leading-relaxed">
            "{statement}"
          </blockquote>
        </div>

        {/* 3 Foundational Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {principles.map((p, idx) => (
            <div
              key={p.title}
              className="p-6 rounded-xl border border-[#222b38] bg-[#12171f] hover:border-[#38bdf8]/40 transition-colors space-y-3"
            >
              <div className="text-xs font-mono text-[#38bdf8]">
                0{idx + 1} / PRINCIPLE
              </div>
              <h3 className="text-lg font-bold text-[#f0f6fc]">
                {p.title}
              </h3>
              <p className="text-sm text-[#8b949e] leading-relaxed">
                {p.detail}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
