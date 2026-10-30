import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import {
  ExternalLink, ArrowRight, Sparkles, CheckCircle2, Shield,
  Zap, Terminal, Activity, Lock, Award, Mic, Volume2, Play, Eye, Sliders
} from 'lucide-react';
import { Github } from './Icons';
import { SpotlightCard } from './SpotlightCard';
import { audioSynth } from '../utils/audioSynth';
import { scrollToTarget } from '../utils/smoothScroll';
import rowlAiScreenshot from '../assets/rowl-ai-preview.png';
import tceAppraisalScreenshot from '../assets/tce-appraisal-preview.png';
import flowstateLofiScreenshot from '../assets/flowstate-lofi-preview.png';

export const ProjectCard = ({ project, isFeatured = false }) => {
  const [viewMode, setViewMode] = useState('preview'); // 'preview' | 'simulator'

  // Rowl AI Simulator State
  const [rowlScenario, setRowlScenario] = useState(0);
  const rowlTextRef = useRef(null);
  const breathCircleRef = useRef(null);

  // TCE Appraisal Simulator State
  const [appraisalStage, setAppraisalStage] = useState(3);
  const scoreBarRef = useRef(null);
  const sealBadgeRef = useRef(null);

  // FlowState Lo-Fi Simulator State
  const [voiceCmdIdx, setVoiceCmdIdx] = useState(0);
  const [isDucking, setIsDucking] = useState(false);
  const eqBarsRef = useRef([]);
  const loopBracketRef = useRef(null);

  // ServeHub Simulator State
  const [acidStep, setAcidStep] = useState(2);

  const rowlScenarios = [
    {
      prompt: '"Feeling overwhelmed balancing MCA coursework and project deadlines."',
      guardrail: 'PASS • Non-Clinical Reflection',
      latency: '274ms',
      response: 'Sera AI: Let\'s pause and break that weight into one small step. Which deadline feels most urgent right now? Try a 4-second inhale with me first.'
    },
    {
      prompt: '"Can you diagnose my insomnia and prescribe me sleeping pills?"',
      guardrail: 'BLOCKED • Clinical Boundary Triggered',
      latency: '190ms',
      response: 'Sera AI [Guardrail]: I cannot provide medical diagnoses or prescriptions. I can guide you through a calming 4-7-8 wind-down reflection or share wellness resources.'
    },
    {
      prompt: '"Start 4-7-8 mindful breathing cadence before my coding sprint."',
      guardrail: 'PASS • Guided Mindfulness Mode',
      latency: '245ms',
      response: 'Sera AI: Synchronizing breathing ring: Inhale 4s → Hold 7s → Exhale 8s. Notice your shoulders dropping as the cycle completes.'
    }
  ];

  const appraisalStages = [
    { role: '1. Faculty Draft', score: 142, status: 'Self-Appraisal & Utility Patent Logged', seal: false },
    { role: '2. HoD Review', score: 168, status: 'Section 9.2/9.3 Verified by Head of Dept', seal: false },
    { role: '3. Registrar Audit', score: 179, status: 'Rubric Normalized & JWT Role Guard Verified', seal: false },
    { role: '4. Principal Sign-Off', score: 186, status: 'Approved • Official PDF Dossier Sealed', seal: true }
  ];

  const flowstateCommands = [
    {
      spoken: '"reeply 30"',
      skeleton: 'RPL 30 → REPLAY (30s)',
      distance: 'd = 1 (Fuzzy Match)',
      action: 'video.currentTime -= 30s',
      loopWidth: '38%',
      loopLeft: '24%'
    },
    {
      spoken: '"looop beat"',
      skeleton: 'LP BT → LOOP_SECTION',
      distance: 'd = 1 (Fuzzy Match)',
      action: 'Locked A–B [01:14:20 – 01:14:50]',
      loopWidth: '45%',
      loopLeft: '36%'
    },
    {
      spoken: '"save drop"',
      skeleton: 'SV DRP → BOOKMARK_DROP',
      distance: 'd = 0 (Exact Match)',
      action: 'Saved Beat #04 to chrome.storage',
      loopWidth: '30%',
      loopLeft: '52%'
    },
    {
      spoken: '"volum 25"',
      skeleton: 'VLM 25 → SET_VOLUME(0.25)',
      distance: 'd = 1 (Fuzzy Match)',
      action: 'YouTube Player Gain → 25%',
      loopWidth: '35%',
      loopLeft: '18%'
    }
  ];

  // GSAP Animation for Rowl AI simulator
  useEffect(() => {
    if (viewMode !== 'simulator' || project.id !== 'rowl-ai') return;
    if (rowlTextRef.current) {
      gsap.fromTo(
        rowlTextRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    }
    if (breathCircleRef.current) {
      gsap.to(breathCircleRef.current, {
        scale: 1.25,
        opacity: 0.9,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
    return () => {
      if (breathCircleRef.current) gsap.killTweensOf(breathCircleRef.current);
    };
  }, [viewMode, rowlScenario, project.id]);

  // GSAP Animation for TCE Appraisal simulator
  useEffect(() => {
    if (viewMode !== 'simulator' || project.id !== 'college-appraisal') return;
    const targetPct = (appraisalStages[appraisalStage].score / 200) * 100;
    if (scoreBarRef.current) {
      gsap.to(scoreBarRef.current, {
        width: `${targetPct}%`,
        duration: 0.55,
        ease: 'power3.out'
      });
    }
    if (sealBadgeRef.current && appraisalStages[appraisalStage].seal) {
      gsap.fromTo(
        sealBadgeRef.current,
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' }
      );
    }
  }, [viewMode, appraisalStage, project.id]);

  // GSAP Animation for FlowState Lo-Fi equalizer & auto-ducking
  useEffect(() => {
    if (viewMode !== 'simulator' || project.id !== 'flowstate-lofi') return;
    const bars = eqBarsRef.current.filter(Boolean);
    if (!bars.length) return;

    setIsDucking(true);
    const tl = gsap.timeline({
      onComplete: () => setIsDucking(false)
    });

    // Duck down to 20% when voice command fires, then restore lively equalizer bounce
    tl.to(bars, {
      scaleY: 0.2,
      opacity: 0.45,
      duration: 0.22,
      stagger: 0.015,
      ease: 'power2.out'
    }).to(bars, {
      scaleY: () => 0.35 + Math.random() * 0.65,
      opacity: 1,
      duration: 0.4,
      stagger: 0.02,
      ease: 'elastic.out(1, 0.5)'
    });

    if (loopBracketRef.current) {
      gsap.to(loopBracketRef.current, {
        left: flowstateCommands[voiceCmdIdx].loopLeft,
        width: flowstateCommands[voiceCmdIdx].loopWidth,
        duration: 0.45,
        ease: 'power3.out'
      });
    }

    return () => tl.kill();
  }, [viewMode, voiceCmdIdx, project.id]);

  const handleInspectPrompt = (e) => {
    e.preventDefault();
    audioSynth.playClick();
    scrollToTarget('#prompting');
  };

  return (
    <SpotlightCard
      data-cursor="CASE STUDY"
      className={`transition-all duration-300 ${
        isFeatured
          ? 'border-[#38bdf8]/40 bg-[#12171f] shadow-xl shadow-sky-950/20 hover:border-[#38bdf8]/70'
          : 'border-[#222b38] bg-[#12171f] hover:border-[#334155]'
      } flex flex-col justify-between group`}
    >
      <div className="p-6 sm:p-8 space-y-6">
        
        {/* Top bar: Number, Category, AI badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#222b38] pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-[#38bdf8]">
              {project.number}
            </span>
            <span className="text-xs font-mono text-[#8b949e] uppercase tracking-wider">
              {project.category}
            </span>
          </div>

          {project.hasAi && project.aiBadge ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-sky-500/10 text-[#38bdf8] border border-sky-500/30">
              <Sparkles className="w-3 h-3 text-[#38bdf8]" />
              {project.aiBadge}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono text-[#8b949e] bg-[#18202b] border border-[#222b38]">
              Conventional Full-Stack
            </span>
          )}
        </div>

        {/* Project Header */}
        <div className="space-y-2">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#f0f6fc] tracking-tight group-hover:text-[#38bdf8] transition-colors">
              {project.name}
            </h3>
            <span className="text-xs font-mono text-[#8b949e] shrink-0 hidden sm:inline">
              {project.timeline}
            </span>
          </div>
          <p className="text-sm sm:text-base text-[#8b949e] leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Visual Showcase & Interactive GSAP Simulator Container */}
        <div className="rounded-xl border border-[#222b38] bg-[#090d12] overflow-hidden shadow-inner">
          
          {/* Mockup Window Titlebar with Mode Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 bg-[#0e131b] border-b border-[#222b38]/70 text-[#8b949e] font-mono text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80"></div>
              <span className="ml-1.5 text-[11px] text-[#8b949e] truncate max-w-[180px] sm:max-w-none">
                {project.id === 'rowl-ai'
                  ? 'rowl-ai-pink.vercel.app'
                  : project.id === 'college-appraisal'
                  ? 'tce-apprisal.vercel.app'
                  : project.id === 'flowstate-lofi'
                  ? 'youtube.com // flowstate-mv3'
                  : project.id === 'developer-portfolio'
                  ? 'siddharth387-debug.github.io'
                  : 'servehub // mysql-acid'}
              </span>
            </div>

            {/* Interactive Toggle: UI Preview vs Live GSAP Simulator */}
            <div className="flex items-center gap-1 bg-[#090d12] p-0.5 rounded-md border border-[#222b38]">
              <button
                type="button"
                onClick={() => {
                  audioSynth.playClick();
                  setViewMode('preview');
                }}
                className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-mono transition-all cursor-pointer ${
                  viewMode === 'preview'
                    ? 'bg-[#18202b] text-[#38bdf8] border border-[#38bdf8]/40 font-semibold'
                    : 'text-[#8b949e] hover:text-[#f0f6fc]'
                }`}
              >
                <Eye className="w-3 h-3" />
                <span>UI Preview</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  audioSynth.playPop();
                  setViewMode('simulator');
                }}
                className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-mono transition-all cursor-pointer ${
                  viewMode === 'simulator'
                    ? 'bg-[#38bdf8] text-[#090d12] font-bold shadow-sm'
                    : 'text-[#8b949e] hover:text-[#38bdf8]'
                }`}
              >
                <Sliders className="w-3 h-3" />
                <span>⚡ Live Simulator</span>
              </button>
            </div>
          </div>

          {/* =========================================================
              1. ROWL AI: PREVIEW & LIVE GSAP SIMULATOR
             ========================================================= */}
          {project.id === 'rowl-ai' && (
            viewMode === 'preview' ? (
              <div className="space-y-3 p-3">
                <div className="relative rounded-lg overflow-hidden border border-[#222b38] aspect-[16/9] max-h-56 group-hover:border-[#38bdf8]/50 transition-colors">
                  <img
                    src={rowlAiScreenshot}
                    alt="Rowl AI Live Platform Screenshot"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090d12] via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs font-mono">
                    <span className="px-2 py-0.5 rounded bg-[#090d12]/90 text-[#38bdf8] border border-[#222b38] backdrop-blur-sm text-[11px] flex items-center gap-1">
                      <Activity className="w-3 h-3 text-[#F4A896] animate-pulse" />
                      Sera AI Companion • Mindful Breathing
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-sm text-[10px]">
                      ● Groq 280ms
                    </span>
                  </div>
                </div>
                <div className="px-1 flex items-center justify-between text-[11px] font-mono text-[#8b949e]">
                  <span>Auth: JWT in HTTP-Only Cookies</span>
                  <span className="text-emerald-400">Razorpay HMAC-SHA256 Verified</span>
                </div>
              </div>
            ) : (
              <div className="p-4 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-[11px] text-[#8b949e]">
                  <span className="text-[#38bdf8] font-semibold">Sera AI Guardrail & Inference Simulator</span>
                  <span className="text-emerald-400">Latency: {rowlScenarios[rowlScenario].latency}</span>
                </div>

                {/* Scenario Selector Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {['Stress Reflection', 'Clinical Guardrail Test', '4-7-8 Breathing Sync'].map((label, idx) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => {
                        audioSynth.playClick();
                        setRowlScenario(idx);
                      }}
                      className={`px-2.5 py-1 rounded text-[10px] transition-all cursor-pointer border ${
                        rowlScenario === idx
                          ? 'bg-sky-500/15 text-[#38bdf8] border-[#38bdf8]/50 font-semibold'
                          : 'bg-[#12171f] text-[#8b949e] border-[#222b38] hover:text-[#f0f6fc]'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <div ref={rowlTextRef} className="p-3 rounded-lg bg-[#12171f] border border-[#222b38] space-y-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-[#8b949e]">Input: {rowlScenarios[rowlScenario].prompt}</span>
                  </div>
                  <div className="text-[11px] text-[#f0f6fc] leading-relaxed border-l-2 border-[#38bdf8] pl-2.5">
                    {rowlScenarios[rowlScenario].response}
                  </div>
                  <div className="flex items-center justify-between pt-1 text-[10px]">
                    <span className={rowlScenario === 1 ? 'text-amber-400 font-semibold' : 'text-emerald-400 font-semibold'}>
                      ● {rowlScenarios[rowlScenario].guardrail}
                    </span>
                    <span className="flex items-center gap-1.5 text-[#38bdf8]">
                      <span ref={breathCircleRef} className="inline-block w-2 h-2 rounded-full bg-[#38bdf8]"></span>
                      Mindful Cadence Active
                    </span>
                  </div>
                </div>
              </div>
            )
          )}

          {/* =========================================================
              2. TCE APPRAISAL: PREVIEW & LIVE GSAP SIMULATOR
             ========================================================= */}
          {project.id === 'college-appraisal' && (
            viewMode === 'preview' ? (
              <div className="space-y-3 p-3">
                <div className="relative rounded-lg overflow-hidden border border-[#222b38] aspect-[16/9] max-h-56 group-hover:border-[#38bdf8]/50 transition-colors">
                  <img
                    src={tceAppraisalScreenshot}
                    alt="TCE Faculty Appraisal System Screenshot"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090d12] via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs font-mono">
                    <span className="px-2 py-0.5 rounded bg-[#090d12]/90 text-[#38bdf8] border border-[#222b38] backdrop-blur-sm text-[11px] flex items-center gap-1">
                      <Award className="w-3 h-3 text-[#38bdf8]" />
                      4-Tier Governance • 9-Section Rubric
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-sm text-[10px]">
                      ● 200 Pts Rubric
                    </span>
                  </div>
                </div>
                <div className="px-1 flex items-center justify-between text-[11px] font-mono text-[#8b949e]">
                  <span>Thiagarajar College of Engineering Portal</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> PDF Dossier & Digital Seal
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-4 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#38bdf8] font-semibold">4-Tier RBAC Governance Simulator</span>
                  <span className="text-emerald-400 font-bold">{appraisalStages[appraisalStage].score} / 200 Pts</span>
                </div>

                {/* Role Stage Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {appraisalStages.map((st, idx) => (
                    <button
                      key={st.role}
                      type="button"
                      onClick={() => {
                        audioSynth.playClick();
                        setAppraisalStage(idx);
                      }}
                      className={`px-2 py-1.5 rounded text-[10px] transition-all cursor-pointer border text-center ${
                        appraisalStage === idx
                          ? 'bg-sky-500/15 text-[#38bdf8] border-[#38bdf8]/50 font-bold'
                          : 'bg-[#12171f] text-[#8b949e] border-[#222b38] hover:text-[#f0f6fc]'
                      }`}
                    >
                      {st.role}
                    </button>
                  ))}
                </div>

                {/* Animated GSAP Score Progress Bar */}
                <div className="space-y-1.5 p-3 rounded-lg bg-[#12171f] border border-[#222b38]">
                  <div className="w-full h-2 rounded-full bg-[#090d12] overflow-hidden border border-[#222b38]">
                    <div
                      ref={scoreBarRef}
                      style={{ width: '93%' }}
                      className="h-full bg-gradient-to-r from-[#38bdf8] to-emerald-400 rounded-full"
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] pt-1">
                    <span className="text-[#c9d1d9]">{appraisalStages[appraisalStage].status}</span>
                    {appraisalStages[appraisalStage].seal && (
                      <span
                        ref={sealBadgeRef}
                        className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold"
                      >
                        ✓ SEALED PDF
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          )}

          {/* =========================================================
              3. FLOWSTATE LO-FI: PREVIEW & LIVE GSAP VOICE SIMULATOR
             ========================================================= */}
          {project.id === 'flowstate-lofi' && (
            viewMode === 'preview' ? (
              <div className="space-y-3 p-3">
                <div className="relative rounded-lg overflow-hidden border border-[#222b38] aspect-[16/9] max-h-56 group-hover:border-[#38bdf8]/50 transition-colors">
                  <img
                    src={flowstateLofiScreenshot}
                    alt="FlowState Lo-Fi Chrome Extension Screenshot"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090d12] via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs font-mono">
                    <span className="px-2 py-0.5 rounded bg-[#090d12]/90 text-[#38bdf8] border border-[#222b38] backdrop-blur-sm text-[11px] flex items-center gap-1">
                      <Mic className="w-3 h-3 text-[#38bdf8] animate-pulse" />
                      Phonetic + Levenshtein Voice Classifier
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-sm text-[10px]">
                      ● Auto-Ducking 20%
                    </span>
                  </div>
                </div>
                <div className="px-1 flex items-center justify-between text-[11px] font-mono text-[#8b949e]">
                  <span>YouTube Trusted-Types DOM Engine</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5" /> Bluetooth Earbud MediaSession
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-4 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#38bdf8] font-semibold flex items-center gap-1.5">
                    <Mic className="w-3.5 h-3.5 text-[#38bdf8] animate-pulse" />
                    <span>Phonetic Stream & Audio Auto-Ducking</span>
                  </span>
                  <span className={isDucking ? 'text-amber-400 font-bold' : 'text-emerald-400'}>
                    {isDucking ? '🔉 Ducking Gain → 20%' : '🔊 YouTube Gain: 100%'}
                  </span>
                </div>

                {/* Spoken Command Triggers */}
                <div className="flex flex-wrap gap-1.5">
                  {flowstateCommands.map((cmd, idx) => (
                    <button
                      key={cmd.spoken}
                      type="button"
                      onClick={() => {
                        audioSynth.playClick();
                        setVoiceCmdIdx(idx);
                      }}
                      className={`px-2 py-1 rounded text-[10px] transition-all cursor-pointer border ${
                        voiceCmdIdx === idx
                          ? 'bg-sky-500/15 text-[#38bdf8] border-[#38bdf8]/50 font-bold'
                          : 'bg-[#12171f] text-[#8b949e] border-[#222b38] hover:text-[#f0f6fc]'
                      }`}
                    >
                      🎙️ {cmd.spoken}
                    </button>
                  ))}
                </div>

                {/* GSAP 16-Bar Equalizer + A-B Loop Timeline */}
                <div className="p-3 rounded-lg bg-[#12171f] border border-[#222b38] space-y-2.5">
                  <div className="flex items-end justify-between h-8 gap-1 px-1">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div
                        key={i}
                        ref={(el) => (eqBarsRef.current[i] = el)}
                        style={{ height: `${35 + ((i * 19) % 60)}%` }}
                        className="flex-1 bg-gradient-to-t from-[#38bdf8] to-emerald-400 rounded-t origin-bottom"
                      />
                    ))}
                  </div>

                  {/* Simulated YouTube A-B Loop Scrubber */}
                  <div className="relative w-full h-2 rounded-full bg-[#090d12] border border-[#222b38] overflow-hidden">
                    <div
                      ref={loopBracketRef}
                      style={{
                        left: flowstateCommands[voiceCmdIdx].loopLeft,
                        width: flowstateCommands[voiceCmdIdx].loopWidth
                      }}
                      className="absolute top-0 bottom-0 bg-[#38bdf8]/40 border-x-2 border-[#38bdf8]"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-[#8b949e]">
                    <span>Skeleton: <strong className="text-[#f0f6fc]">{flowstateCommands[voiceCmdIdx].skeleton}</strong></span>
                    <span className="text-emerald-400">{flowstateCommands[voiceCmdIdx].action}</span>
                  </div>
                </div>
              </div>
            )
          )}

          {/* =========================================================
              4. SERVEHUB: VISUAL SHOWCASE & ACID SIMULATOR
             ========================================================= */}
          {project.id === 'service-marketplace' && (
            viewMode === 'preview' ? (
              <div className="p-4 space-y-3 text-[#c9d1d9] font-mono text-xs">
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-lg bg-[#12171f] border border-[#222b38] space-y-1">
                    <div className="text-[10px] text-[#38bdf8]">TABLE 01</div>
                    <div className="font-bold text-[#f0f6fc]">users & roles</div>
                    <div className="text-[10px] text-[#8b949e]">Bcrypt + Session RBAC</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#12171f] border border-[#222b38] space-y-1">
                    <div className="text-[10px] text-emerald-400">TABLE 02</div>
                    <div className="font-bold text-[#f0f6fc]">bookings</div>
                    <div className="text-[10px] text-[#8b949e]">Foreign Key 3NF</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#12171f] border border-[#222b38] space-y-1">
                    <div className="text-[10px] text-amber-400">TABLE 03</div>
                    <div className="font-bold text-[#f0f6fc]">reviews</div>
                    <div className="text-[10px] text-[#8b949e]">Verified Ratings</div>
                  </div>
                </div>
                <div className="p-2.5 rounded bg-[#12171f] border border-[#222b38] flex items-center justify-between text-[11px]">
                  <span className="text-[#c9d1d9]">Normalized 3NF Relational Schema</span>
                  <span className="text-emerald-400">PDO Prepared Statements</span>
                </div>
              </div>
            ) : (
              <div className="p-4 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#38bdf8] font-semibold">MySQL ACID Booking State Machine</span>
                  <span className="text-emerald-400">PDO::beginTransaction()</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {['1. Slot Check', '2. Row Lock', '3. ACID Commit'].map((st, idx) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => {
                        audioSynth.playClick();
                        setAcidStep(idx);
                      }}
                      className={`px-2 py-1.5 rounded text-[10px] border cursor-pointer ${
                        acidStep === idx
                          ? 'bg-sky-500/15 text-[#38bdf8] border-[#38bdf8]/50 font-bold'
                          : 'bg-[#12171f] text-[#8b949e] border-[#222b38]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
                <div className="p-2.5 rounded bg-[#12171f] border border-[#222b38] text-[11px] text-[#c9d1d9]">
                  {acidStep === 0 && 'SELECT id FROM bookings WHERE provider_id = ? AND slot = ? FOR UPDATE;'}
                  {acidStep === 1 && 'INSERT INTO bookings (client_id, service_id, status) VALUES (?, ?, "CONFIRMED");'}
                  {acidStep === 2 && 'COMMIT; -- Booking guaranteed with zero double-booking race condition.'}
                </div>
              </div>
            )
          )}

          {/* =========================================================
              5. DEVELOPER PORTFOLIO: VISUAL SHOWCASE & SIMULATOR
             ========================================================= */}
          {project.id === 'developer-portfolio' && (
            viewMode === 'preview' ? (
              <div className="p-4 space-y-2.5 text-[#c9d1d9] font-mono text-xs">
                <div className="flex items-center justify-between text-[11px] text-[#8b949e]">
                  <span>Engine: React 19 + Tailwind v4 + Lenis + GSAP</span>
                  <span className="text-[#38bdf8]">Vite 8 Build &lt;1s</span>
                </div>
                <div className="p-2.5 rounded bg-[#12171f] border border-[#222b38] flex items-center justify-between text-[11px]">
                  <span className="text-[#c9d1d9]">60/120fps Lenis Inertia + GSAP ScrollTrigger</span>
                  <span className="text-emerald-400">GitHub Actions CI/CD</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[10px] text-[#8b949e]">
                  <span className="px-2 py-0.5 rounded bg-[#161b22] text-[#38bdf8] border border-[#38bdf8]/30">Interactive Project Simulators</span>
                  <span className="px-2 py-0.5 rounded bg-[#161b22] text-[#8b949e] border border-[#222b38]">Command Palette (⌘K)</span>
                </div>
              </div>
            ) : (
              <div className="p-4 space-y-2.5 font-mono text-xs">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#38bdf8] font-semibold">Live Portfolio Telemetry</span>
                  <span className="text-emerald-400">Lenis RAF + GSAP Ticker Synced</span>
                </div>
                <div className="p-3 rounded bg-[#12171f] border border-[#222b38] flex items-center justify-between text-[11px]">
                  <span>Test the full side-by-side LLM Prompt Inspector below:</span>
                  <button
                    type="button"
                    onClick={handleInspectPrompt}
                    className="px-2.5 py-1 rounded bg-[#38bdf8] text-[#090d12] font-bold text-[10px] cursor-pointer"
                  >
                    Jump to Inspector ↓
                  </button>
                </div>
              </div>
            )
          )}

        </div>

        {/* Technology Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs font-mono rounded bg-[#18202b] text-[#8b949e] border border-[#222b38]"
            >
              {tech}
            </span>
          ))}
        </div>

      </div>

      {/* Card Actions Footer */}
      <div className="px-6 sm:px-8 py-4 border-t border-[#222b38] bg-[#0d121a]/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {project.id === 'developer-portfolio' ? (
            <>
              <button
                type="button"
                onClick={handleInspectPrompt}
                data-cursor="INSPECTOR"
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md bg-[#38bdf8] text-[#090d12] hover:bg-[#7dd3fc] transition-colors cursor-pointer font-sans"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Try Prompt Inspector
              </button>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Active Site
              </span>
            </>
          ) : project.id === 'flowstate-lofi' ? (
            <button
              type="button"
              onClick={() => {
                audioSynth.playPop();
                setViewMode(viewMode === 'simulator' ? 'preview' : 'simulator');
              }}
              data-cursor="SIMULATOR"
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md bg-[#38bdf8] text-[#090d12] hover:bg-[#7dd3fc] transition-colors cursor-pointer font-sans"
            >
              <Play className="w-3.5 h-3.5" />
              {viewMode === 'simulator' ? 'Show UI Screenshot' : 'Test Voice Simulator'}
            </button>
          ) : project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="LIVE DEMO"
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md bg-[#38bdf8] text-[#090d12] hover:bg-[#7dd3fc] transition-colors cursor-pointer font-sans"
            >
              Live Demo
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-mono text-[#8b949e] px-2.5 py-1 rounded bg-[#12171f] border border-[#222b38]">
              Localhost Verified
            </span>
          )}

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="VIEW CODE"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#8b949e] hover:text-[#f0f6fc] px-3 py-1.5 rounded-md border border-[#222b38] hover:border-[#38bdf8]/40 transition-colors cursor-pointer"
          >
            <Github className="w-3.5 h-3.5" />
            GitHub
          </a>
        </div>

        <Link
          to={`/projects/${project.id}`}
          data-cursor="CASE STUDY"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#38bdf8] hover:text-[#7dd3fc] transition-colors ml-auto cursor-pointer"
        >
          Case Study
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

    </SpotlightCard>
  );
};
