import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import {
  ExternalLink, ArrowRight, Sparkles, CheckCircle2, Shield,
  Zap, Terminal, Activity, Lock, Award, Mic, Volume2, Play, Eye, Sliders, Layers, Server, Database
} from 'lucide-react';
import { Github } from './Icons';
import { SpotlightCard } from './SpotlightCard';
import { audioSynth } from '../utils/audioSynth';
import { scrollToTarget } from '../utils/smoothScroll';
import rowlAiScreenshot from '../assets/rowl-ai-preview.png';
import tceAppraisalScreenshot from '../assets/tce-appraisal-preview.png';
import flowstateLofiScreenshot from '../assets/flowstate-lofi-preview.png';

const CARD_ARCHITECTURES = {
  'rowl-ai': [
    { tier: 'Client Layer', name: 'React 19 SPA', detail: 'HTTP-Only Cookie Auth + 4-7-8 Breathing Canvas', color: '#38bdf8' },
    { tier: 'API & Guardrail', name: 'Node + Express', detail: 'Non-Clinical Prompt Sanitizer + Razorpay HMAC-SHA256', color: '#34d399' },
    { tier: 'LLM & Storage', name: 'Groq LPU + MongoDB', detail: 'Llama-3.3-70B (~280ms JSON) + Encrypted Journals', color: '#a78bfa' }
  ],
  'college-appraisal': [
    { tier: 'Governance UI', name: '9-Section Rubric', detail: '200-Pt Cap Engine + Sec 9.2/9.3 & Utility Patents', color: '#38bdf8' },
    { tier: 'RBAC & PDF Core', name: 'PHP 8.x + JWT Guard', detail: 'Faculty → HoD → Registrar → Principal + PDF Dossier', color: '#34d399' },
    { tier: 'Relational DB', name: 'MySQL 3NF + PDO', detail: 'Parameterized Prepared SQL + Digital Audit Seal', color: '#f59e0b' }
  ],
  'flowstate-lofi': [
    { tier: 'Extension HUD', name: 'Manifest V3 DOM', detail: 'Trusted-Types Safe Overlay + Earbud MediaSession', color: '#38bdf8' },
    { tier: 'Voice DSP Core', name: 'Phonetic + Levenshtein', detail: 'Sliding Delta-Cursor + Fuzzy Match (d ≤ 1 in <12ms)', color: '#34d399' },
    { tier: 'YouTube Bridge', name: 'Auto-Duck & Loop', detail: '20% Gain Dip on Speech + 60fps A–B Timestamp Lock', color: '#a78bfa' }
  ],
  'service-marketplace': [
    { tier: 'Marketplace UI', name: 'Multi-Role Portal', detail: 'Customer Discovery + Live Provider Slot Picker', color: '#38bdf8' },
    { tier: 'Controller Tier', name: 'PHP 8 + Session RBAC', detail: 'Bcrypt Auth + CSRF Protection + State Machine', color: '#34d399' },
    { tier: 'ACID Storage', name: 'MySQL 3NF Engine', detail: 'PDO Transactions + SELECT ... FOR UPDATE Row Lock', color: '#f59e0b' }
  ],
  'developer-portfolio': [
    { tier: 'Motion & UI', name: 'React 19 + Lenis', detail: '60/120fps Inertia Scroll + GSAP 3D Magnetic Cards', color: '#38bdf8' },
    { tier: 'Interactive Sim', name: 'GSAP ScrollTrigger', detail: 'Live Project Simulators + Web Audio Synth + ⌘K', color: '#34d399' },
    { tier: 'CI/CD Pipeline', name: 'Vite 8 + GitHub Pages', detail: 'Automated Actions Build + Clarity Telemetry', color: '#a78bfa' }
  ]
};

export const ProjectCard = ({ project, isFeatured = false }) => {
  // 'simulator' | 'architecture' — both sit right below the screenshot so GSAP graphics & architecture are ALWAYS visible!
  const [deckTab, setDeckTab] = useState('simulator');

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

  // Architecture nodes ref for GSAP animation
  const archNodesRef = useRef([]);

  const rowlScenarios = [
    {
      prompt: '"Feeling overwhelmed balancing MCA coursework and project deadlines."',
      guardrail: 'PASS • Non-Clinical Reflection',
      latency: '274ms',
      response: "Sera AI: Let's pause and break that weight into one small step. Which deadline feels most urgent right now? Try a 4-second inhale with me first."
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

  // GSAP Animation for Rowl AI simulator (runs automatically when visible!)
  useEffect(() => {
    if (deckTab !== 'simulator' || project.id !== 'rowl-ai') return;
    if (rowlTextRef.current) {
      gsap.fromTo(
        rowlTextRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    }
    if (breathCircleRef.current) {
      gsap.to(breathCircleRef.current, {
        scale: 1.5,
        opacity: 0.95,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
    return () => {
      if (breathCircleRef.current) gsap.killTweensOf(breathCircleRef.current);
    };
  }, [deckTab, rowlScenario, project.id]);

  // GSAP Animation for TCE Appraisal simulator
  useEffect(() => {
    if (deckTab !== 'simulator' || project.id !== 'college-appraisal') return;
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
  }, [deckTab, appraisalStage, project.id]);

  // Continuous + Reactive GSAP Animation for FlowState Lo-Fi equalizer & auto-ducking
  useEffect(() => {
    if (deckTab !== 'simulator' || project.id !== 'flowstate-lofi') return;
    const bars = eqBarsRef.current.filter(Boolean);
    if (!bars.length) return;

    setIsDucking(true);
    const duckTimer = setTimeout(() => setIsDucking(false), 450);

    // First duck down to 20% on command change, then start continuous lively equalizer bounce
    const tl = gsap.timeline();
    tl.to(bars, {
      scaleY: 0.2,
      opacity: 0.45,
      duration: 0.2,
      stagger: 0.012,
      ease: 'power2.out'
    }).to(bars, {
      scaleY: () => 0.35 + Math.random() * 0.65,
      opacity: 1,
      duration: 0.45,
      stagger: {
        each: 0.03,
        repeat: -1,
        yoyo: true
      },
      ease: 'sine.inOut'
    });

    if (loopBracketRef.current) {
      gsap.to(loopBracketRef.current, {
        left: flowstateCommands[voiceCmdIdx].loopLeft,
        width: flowstateCommands[voiceCmdIdx].loopWidth,
        duration: 0.45,
        ease: 'power3.out'
      });
    }

    return () => {
      clearTimeout(duckTimer);
      tl.kill();
    };
  }, [deckTab, voiceCmdIdx, project.id]);

  // GSAP Animation when switching to System Architecture tab inside card
  useEffect(() => {
    if (deckTab !== 'architecture') return;
    const nodes = archNodesRef.current.filter(Boolean);
    if (!nodes.length) return;
    gsap.fromTo(
      nodes,
      { opacity: 0, y: 10, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.38, stagger: 0.07, ease: 'power2.out' }
    );
  }, [deckTab]);

  const handleInspectPrompt = (e) => {
    e.preventDefault();
    audioSynth.playClick();
    scrollToTarget('#prompting');
  };

  const handleJumpArchitecture = (e) => {
    e.preventDefault();
    audioSynth.playClick();
    scrollToTarget('#architecture');
  };

  const archTiers = CARD_ARCHITECTURES[project.id] || CARD_ARCHITECTURES['rowl-ai'];

  const screenshotSrc =
    project.id === 'rowl-ai'
      ? rowlAiScreenshot
      : project.id === 'college-appraisal'
      ? tceAppraisalScreenshot
      : project.id === 'flowstate-lofi'
      ? flowstateLofiScreenshot
      : null;

  return (
    <SpotlightCard
      data-cursor="CASE STUDY"
      maxTilt={isFeatured ? 2.5 : 3.8}
      className={`w-full transition-all duration-300 ${
        isFeatured
          ? 'border-[#38bdf8]/40 bg-[#12171f] shadow-xl shadow-sky-950/20 hover:border-[#38bdf8]/80'
          : 'border-[#222b38] bg-[#12171f] hover:border-[#38bdf8]/50'
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

        {/* Unified Visual Preview + Always-On GSAP Live Simulator & System Architecture Deck */}
        <div className="rounded-xl border border-[#222b38] bg-[#090d12] overflow-hidden shadow-inner">
          {/* Mockup Window Titlebar */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 bg-[#0e131b] border-b border-[#222b38]/70 text-[#8b949e] font-mono text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80"></div>
              <span className="ml-1.5 text-[11px] text-[#8b949e] truncate max-w-[170px] sm:max-w-none">
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

            {/* Interactive Deck Switcher: Live GSAP Simulator vs System Architecture */}
            <div className="flex items-center gap-1 bg-[#090d12] p-0.5 rounded-md border border-[#222b38]">
              <button
                type="button"
                onClick={() => {
                  audioSynth.playPop();
                  setDeckTab('simulator');
                }}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-mono transition-all cursor-pointer ${
                  deckTab === 'simulator'
                    ? 'bg-[#38bdf8] text-[#090d12] font-bold shadow-sm'
                    : 'text-[#8b949e] hover:text-[#38bdf8]'
                }`}
              >
                <Sliders className="w-3 h-3" />
                <span>⚡ Live GSAP Sim</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  audioSynth.playClick();
                  setDeckTab('architecture');
                }}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-mono transition-all cursor-pointer ${
                  deckTab === 'architecture'
                    ? 'bg-[#38bdf8] text-[#090d12] font-bold shadow-sm'
                    : 'text-[#8b949e] hover:text-[#f0f6fc]'
                }`}
              >
                <Layers className="w-3 h-3" />
                <span>🏗️ Architecture</span>
              </button>
            </div>
          </div>

          {/* 16:9 High-Resolution Visual Screenshot Banner (For Rowl AI, TCE Appraisal, FlowState Lo-Fi) */}
          {screenshotSrc && (
            <div className="p-3 pb-0">
              <div className="relative rounded-lg overflow-hidden border border-[#222b38] aspect-[16/9] max-h-52 group-hover:border-[#38bdf8]/50 transition-colors">
                <img
                  src={screenshotSrc}
                  alt={`${project.name} Live Preview`}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090d12] via-[#090d12]/20 to-transparent opacity-85"></div>
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-[#090d12]/90 text-[#38bdf8] border border-[#222b38] backdrop-blur-sm text-[11px] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-ping" />
                    {project.id === 'rowl-ai' && 'Sera AI Companion • Mindful Breathing'}
                    {project.id === 'college-appraisal' && '4-Tier Governance • 9-Section Rubric'}
                    {project.id === 'flowstate-lofi' && 'Phonetic + Levenshtein Voice HUD'}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-sm text-[10px]">
                    {project.id === 'rowl-ai' && '● Groq ~280ms'}
                    {project.id === 'college-appraisal' && '● 200 Pts Rubric'}
                    {project.id === 'flowstate-lofi' && '● Auto-Ducking 20%'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              TAB A: SYSTEM ARCHITECTURE PIPELINE (Available on ALL cards)
             ========================================================= */}
          {deckTab === 'architecture' ? (
            <div className="p-4 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#38bdf8] font-semibold flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5" />
                  <span>3-Tier System Architecture Pipeline</span>
                </span>
                <button
                  type="button"
                  onClick={handleJumpArchitecture}
                  className="text-[10px] text-emerald-400 hover:underline cursor-pointer"
                >
                  Open Full Blueprint ↓
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {archTiers.map((t, idx) => (
                  <div
                    key={t.tier}
                    ref={(el) => (archNodesRef.current[idx] = el)}
                    className="p-3 rounded-lg bg-[#12171f] border border-[#222b38] hover:border-[#38bdf8]/50 transition-all space-y-1 relative"
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span style={{ color: t.color }} className="font-bold uppercase">
                        0{idx + 1} • {t.tier}
                      </span>
                      {idx < 2 && <span className="text-[#8b949e] hidden sm:inline">→</span>}
                    </div>
                    <div className="text-xs font-bold text-[#f0f6fc] font-sans">{t.name}</div>
                    <div className="text-[10px] text-[#8b949e] leading-snug font-sans">{t.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* =========================================================
               TAB B: LIVE GSAP GRAPHICS & INTERACTIVE SIMULATORS (Default Active!)
               ========================================================= */
            <>
              {/* 1. ROWL AI LIVE GSAP SIMULATOR */}
              {project.id === 'rowl-ai' && (
                <div className="p-4 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-[11px] text-[#8b949e]">
                    <span className="text-[#38bdf8] font-semibold flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-[#38bdf8]" />
                      <span>Interactive Sera AI Guardrail & Breathing Simulator</span>
                    </span>
                    <span className="text-emerald-400">Latency: {rowlScenarios[rowlScenario].latency}</span>
                  </div>

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
                    <div className="text-[10px] text-[#8b949e]">
                      Input: <span className="text-[#c9d1d9]">{rowlScenarios[rowlScenario].prompt}</span>
                    </div>
                    <div className="text-[11px] text-[#f0f6fc] leading-relaxed border-l-2 border-[#38bdf8] pl-2.5">
                      {rowlScenarios[rowlScenario].response}
                    </div>
                    <div className="flex items-center justify-between pt-1 text-[10px]">
                      <span className={rowlScenario === 1 ? 'text-amber-400 font-semibold' : 'text-emerald-400 font-semibold'}>
                        ● {rowlScenarios[rowlScenario].guardrail}
                      </span>
                      <span className="flex items-center gap-2 text-[#38bdf8]">
                        <span
                          ref={breathCircleRef}
                          className="inline-block w-2.5 h-2.5 rounded-full bg-[#38bdf8] shadow-[0_0_10px_#38bdf8]"
                        />
                        <span>GSAP Breathing Cadence</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. TCE APPRAISAL LIVE GSAP SIMULATOR */}
              {project.id === 'college-appraisal' && (
                <div className="p-4 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#38bdf8] font-semibold">4-Tier RBAC Governance Simulator</span>
                    <span className="text-emerald-400 font-bold">{appraisalStages[appraisalStage].score} / 200 Pts</span>
                  </div>

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

                  <div className="space-y-1.5 p-3 rounded-lg bg-[#12171f] border border-[#222b38]">
                    <div className="w-full h-2.5 rounded-full bg-[#090d12] overflow-hidden border border-[#222b38]">
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
              )}

              {/* 3. FLOWSTATE LO-FI LIVE GSAP VOICE & EQUALIZER SIMULATOR */}
              {project.id === 'flowstate-lofi' && (
                <div className="p-4 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#38bdf8] font-semibold flex items-center gap-1.5">
                      <Mic className="w-3.5 h-3.5 text-[#38bdf8] animate-pulse" />
                      <span>Phonetic Stream & GSAP Equalizer</span>
                    </span>
                    <span className={isDucking ? 'text-amber-400 font-bold' : 'text-emerald-400'}>
                      {isDucking ? '🔉 Auto-Ducking → 20%' : '🔊 YouTube Gain: 100%'}
                    </span>
                  </div>

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

                  <div className="p-3 rounded-lg bg-[#12171f] border border-[#222b38] space-y-2.5">
                    <div className="flex items-end justify-between h-9 gap-1 px-1">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div
                          key={i}
                          ref={(el) => (eqBarsRef.current[i] = el)}
                          style={{ height: `${40 + ((i * 19) % 55)}%` }}
                          className="flex-1 bg-gradient-to-t from-[#38bdf8] to-emerald-400 rounded-t origin-bottom"
                        />
                      ))}
                    </div>

                    <div className="relative w-full h-2.5 rounded-full bg-[#090d12] border border-[#222b38] overflow-hidden">
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
                      <span>
                        Skeleton: <strong className="text-[#f0f6fc]">{flowstateCommands[voiceCmdIdx].skeleton}</strong>
                      </span>
                      <span className="text-emerald-400">{flowstateCommands[voiceCmdIdx].action}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. SERVEHUB LIVE ACID SIMULATOR */}
              {project.id === 'service-marketplace' && (
                <div className="p-4 space-y-3 font-mono text-xs">
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

                  <div className="flex items-center justify-between text-[11px] pt-1">
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
              )}

              {/* 5. DEVELOPER PORTFOLIO LIVE TELEMETRY & SIMULATOR */}
              {project.id === 'developer-portfolio' && (
                <div className="p-4 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-[11px] text-[#8b949e]">
                    <span className="text-[#38bdf8] font-semibold">React 19 + Lenis Smooth Scroll + GSAP 3D Tilt</span>
                    <span className="text-emerald-400">● 60/120fps Active</span>
                  </div>
                  <div className="p-3 rounded bg-[#12171f] border border-[#222b38] flex flex-wrap items-center justify-between gap-2 text-[11px]">
                    <span className="text-[#c9d1d9]">Inspect System Blueprints or Prompt Engineering Diff:</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleJumpArchitecture}
                        className="px-2.5 py-1 rounded bg-[#18202b] text-[#38bdf8] border border-[#38bdf8]/40 font-bold text-[10px] cursor-pointer"
                      >
                        System Blueprints ↑
                      </button>
                      <button
                        type="button"
                        onClick={handleInspectPrompt}
                        className="px-2.5 py-1 rounded bg-[#38bdf8] text-[#090d12] font-bold text-[10px] cursor-pointer"
                      >
                        Prompt Inspector ↓
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
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
                setDeckTab(deckTab === 'architecture' ? 'simulator' : 'architecture');
              }}
              data-cursor="ARCHITECTURE"
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md bg-[#38bdf8] text-[#090d12] hover:bg-[#7dd3fc] transition-colors cursor-pointer font-sans"
            >
              <Layers className="w-3.5 h-3.5" />
              {deckTab === 'architecture' ? 'Show Voice Simulator' : 'View MV3 Architecture'}
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
