import React from 'react';
import { Check, ArrowRight, ShieldCheck, Cpu, Code2, RefreshCw } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const AiWorkflow = () => {
  const { heading, subheading, steps } = portfolioData.aiWorkflow;

  return (
    <section id="workflow" className="py-20 border-b border-[#222b38]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-[#38bdf8]">
            <Cpu className="w-4 h-4" />
            <span>ENGINEERING RIGOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f0f6fc] tracking-tight">
            {heading}
          </h2>
          <p className="text-base text-[#8b949e] leading-relaxed">
            {subheading}
          </p>
        </div>

        {/* 10-Step Sequential Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 font-mono text-xs">
          {steps.map((item, idx) => (
            <div
              key={item.step}
              className="p-4 rounded-lg bg-[#12171f] border border-[#222b38] hover:border-[#38bdf8]/40 transition-all flex flex-col justify-between space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#38bdf8] bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                  {item.step}
                </span>
                {idx < steps.length - 1 && (
                  <span className="text-[#8b949e]/40 hidden lg:inline group-hover:text-[#38bdf8] transition-colors">
                    →
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#f0f6fc] font-sans pb-1">
                  {item.name}
                </h3>
                <p className="text-[11px] text-[#8b949e] leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>

              {/* Progress line */}
              <div className="h-0.5 w-full bg-[#222b38] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#38bdf8]"
                  style={{ width: `${((idx + 1) / steps.length) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Supporting Callout */}
        <div className="p-5 rounded-xl border border-[#222b38] bg-[#0d121a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-[#8b949e]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span>
              Generated code is never shipped unreviewed. It is decomposed, unit tested, and measured against application security guidelines.
            </span>
          </div>
          <span className="text-[#38bdf8] shrink-0 font-bold">Deterministic & Audited</span>
        </div>

      </div>
    </section>
  );
};
