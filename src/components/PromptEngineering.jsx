import React, { useState } from 'react';
import { Terminal, Code, ArrowRight, CheckCircle2, AlertTriangle, Sparkles, Copy, Check } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const PromptEngineering = () => {
  const { heading, subheading, formula, comparison } = portfolioData.promptEngineering;
  const [activeTab, setActiveTab] = useState('structured');
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="prompting" className="py-20 border-b border-[#222b38]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-[#38bdf8]">
            <Terminal className="w-4 h-4" />
            <span>SYSTEMATIC PROMPT ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f0f6fc] tracking-tight">
            {heading}
          </h2>
          <p className="text-base text-[#8b949e] leading-relaxed">
            {subheading}
          </p>
        </div>

        {/* 5 Structural Pillars */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {formula.map((item, idx) => (
            <div
              key={item.label}
              className="p-4 rounded-lg bg-[#12171f] border border-[#222b38] space-y-1.5"
            >
              <div className="text-xs font-mono text-[#38bdf8] flex items-center justify-between">
                <span>0{idx + 1}</span>
                <span className="text-[10px] text-[#8b949e]">Pillar</span>
              </div>
              <div className="text-sm font-bold text-[#f0f6fc]">
                {item.label}
              </div>
              <p className="text-[11px] text-[#8b949e] leading-snug">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Prompt Inspector & Diff Viewer */}
        <div className="rounded-xl border border-[#222b38] bg-[#0d121a] overflow-hidden shadow-2xl">
          
          {/* Inspector Tab Bar */}
          <div className="flex items-center justify-between border-b border-[#222b38] px-4 py-3 bg-[#12171f]">
            <div className="flex items-center gap-2 font-mono text-xs text-[#8b949e]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/70"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/70"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/70"></span>
              <span className="ml-2 font-semibold text-[#f0f6fc]">prompt-evaluation-diff.ts</span>
            </div>

            {/* Toggle Buttons */}
            <div className="flex items-center gap-1.5 bg-[#090d12] p-1 rounded-lg border border-[#222b38]">
              <button
                onClick={() => setActiveTab('structured')}
                className={`px-3 py-1 rounded text-xs font-mono font-medium transition-all cursor-pointer ${
                  activeTab === 'structured'
                    ? 'bg-[#38bdf8] text-[#090d12] shadow-sm'
                    : 'text-[#8b949e] hover:text-[#f0f6fc]'
                }`}
              >
                Structured Prompt
              </button>
              <button
                onClick={() => setActiveTab('naive')}
                className={`px-3 py-1 rounded text-xs font-mono font-medium transition-all cursor-pointer ${
                  activeTab === 'naive'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'text-[#8b949e] hover:text-[#f0f6fc]'
                }`}
              >
                Weak / Vague Prompt
              </button>
            </div>
          </div>

          {/* Inspector Content */}
          <div className="p-6">
            {activeTab === 'structured' ? (
              <div className="space-y-6">
                
                {/* Structured Breakdown */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="text-[#8b949e] uppercase text-[11px] tracking-wider font-bold">
                    Prompt Breakdown (Deconstructed):
                  </div>

                  <div className="p-3 rounded bg-[#12171f] border border-[#222b38] space-y-1">
                    <span className="text-[#38bdf8] font-bold">[Role]: </span>
                    <span className="text-[#f0f6fc]">{comparison.structured.role}</span>
                  </div>

                  <div className="p-3 rounded bg-[#12171f] border border-[#222b38] space-y-1">
                    <span className="text-emerald-400 font-bold">[Context]: </span>
                    <span className="text-[#f0f6fc]">{comparison.structured.context}</span>
                  </div>

                  <div className="p-3 rounded bg-[#12171f] border border-[#222b38] space-y-1">
                    <span className="text-indigo-400 font-bold">[Task]: </span>
                    <span className="text-[#f0f6fc]">{comparison.structured.task}</span>
                  </div>

                  <div className="p-3 rounded bg-[#12171f] border border-[#222b38] space-y-1">
                    <span className="text-amber-400 font-bold">[Constraints]: </span>
                    <pre className="text-[#8b949e] whitespace-pre-wrap font-mono mt-1">
                      {comparison.structured.constraints}
                    </pre>
                  </div>

                  <div className="p-3 rounded bg-[#12171f] border border-[#222b38] space-y-1">
                    <span className="text-purple-400 font-bold">[Expected Output]: </span>
                    <span className="text-[#f0f6fc]">{comparison.structured.expectedOutput}</span>
                  </div>
                </div>

                {/* Resulting Output Preview */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-[#8b949e]">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Deterministic Production Code Output:
                    </span>
                    <button
                      onClick={() => handleCopy(comparison.structured.outputPreview)}
                      className="flex items-center gap-1 text-[11px] text-[#38bdf8] hover:underline cursor-pointer"
                    >
                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copied ? 'Copied' : 'Copy snippet'}
                    </button>
                  </div>

                  <pre className="p-4 rounded-lg bg-[#090d12] border border-[#222b38] text-[#c9d1d9] font-mono text-xs overflow-x-auto leading-relaxed">
                    {comparison.structured.outputPreview}
                  </pre>
                </div>

              </div>
            ) : (
              <div className="space-y-6">
                
                {/* Naive Prompt Display */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="text-amber-400 uppercase text-[11px] tracking-wider font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Vague Input Given To LLM:
                  </div>

                  <div className="p-4 rounded bg-[#12171f] border border-amber-500/30 text-amber-200">
                    "{comparison.naive.prompt}"
                  </div>
                </div>

                {/* Issues List */}
                <div className="space-y-2">
                  <div className="text-xs font-mono text-[#8b949e]">
                    Vulnerabilities & Shortcomings of Unstructured Prompting:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                    {comparison.naive.issues.map((issue, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded bg-[#12171f] border border-[#222b38] text-red-300/90 flex items-start gap-2"
                      >
                        <span className="text-red-400 font-bold">✕</span>
                        <span>{issue}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Naive Output Preview */}
                <div className="space-y-2">
                  <div className="text-xs font-mono text-[#8b949e]">
                    Ambiguous / Insecure Model Output:
                  </div>
                  <pre className="p-4 rounded-lg bg-[#090d12] border border-[#222b38] text-red-300/80 font-mono text-xs overflow-x-auto leading-relaxed">
                    {comparison.naive.outputPreview}
                  </pre>
                </div>

              </div>
            )}
          </div>

          {/* Footer takeaway */}
          <div className="px-6 py-3 border-t border-[#222b38] bg-[#12171f] flex items-center justify-between text-xs font-mono text-[#8b949e]">
            <span>Takeaway: Structured constraints eliminate model guesswork.</span>
            <span className="text-[#38bdf8]">Schema Validated</span>
          </div>

        </div>

      </div>
    </section>
  );
};
