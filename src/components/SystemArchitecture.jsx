import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  Cpu, Layers, Server, Database, Shield, Zap, Mic, Award,
  ArrowRight, Play, CheckCircle2, Terminal, Lock, Activity, Sparkles
} from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';
import { audioSynth } from '../utils/audioSynth';

const ARCHITECTURES = {
  'rowl-ai': {
    id: 'rowl-ai',
    name: 'Rowl AI Platform',
    badge: 'MERN + Groq LPU + Razorpay HMAC',
    latency: '~280ms End-to-End',
    protocol: 'HTTPS / REST JSON / JWT Cookie / SHA-256 Webhook',
    tiers: [
      {
        tier: 'TIER 01 • CLIENT LAYER',
        title: 'React 19 SPA & Mindful HUD',
        subtitle: 'Vercel Edge Global CDN',
        color: '#38bdf8',
        nodes: [
          {
            name: 'Sera AI Reflection UI',
            tech: 'React 19 + Tailwind v4',
            detail: 'Streaming conversational workspace with mood check-ins & guided 4-7-8 breathing cadence.'
          },
          {
            name: 'HTTP-Only Cookie Auth',
            tech: 'Zero localStorage JWT',
            detail: 'Eliminates XSS token theft via strict SameSite/Secure HTTP-only session cookies.'
          },
          {
            name: 'Razorpay Checkout SDK',
            tech: 'Client Order Handshake',
            detail: 'Initiates premium wellness tier orders with cryptographic server verification.'
          }
        ]
      },
      {
        tier: 'TIER 02 • GATEWAY & GUARDRAILS',
        title: 'Node.js + Express API Core',
        subtitle: 'Render Cloud Runtime',
        color: '#34d399',
        nodes: [
          {
            name: 'Non-Clinical Prompt Guard',
            tech: 'Defensive Middleware',
            detail: 'Sanitizes user prompts, enforces token budgets, and blocks medical diagnosis requests.'
          },
          {
            name: 'HMAC-SHA256 Webhook Guard',
            tech: 'crypto.timingSafeEqual',
            detail: 'Verifies raw Razorpay webhook signatures against secret keys to prevent replay tampering.'
          },
          {
            name: 'Schema Validator',
            tech: 'Strict JSON Contract',
            detail: 'Validates LLM responses before dispatching structured reflections to the client.'
          }
        ]
      },
      {
        tier: 'TIER 03 • AI & PERSISTENCE',
        title: 'Groq LPU & MongoDB Atlas',
        subtitle: 'Low-Latency Inference & Storage',
        color: '#a78bfa',
        nodes: [
          {
            name: 'Groq Cloud LPU Engine',
            tech: 'Llama-3.3-70B (~280ms)',
            detail: 'Executes system-prompted empathetic reflection inference at ~280ms median latency.'
          },
          {
            name: 'MongoDB Atlas Cluster',
            tech: 'Mongoose ODM Schemas',
            detail: 'Stores encrypted journal entries, mood telemetry, and verified subscription states.'
          },
          {
            name: 'Audit & Telemetry Log',
            tech: 'Idempotent Event Store',
            detail: 'Tracks payment webhook events and session lifecycles with zero duplicate writes.'
          }
        ]
      }
    ],
    traceSteps: [
      '[00ms] Client dispatches POST /api/sera/reflect with HTTP-Only JWT cookie',
      '[42ms] Express Guardrail validates non-clinical scope & sanitizes token payload',
      '[268ms] Groq LPU streams validated JSON reflection + 4-7-8 cadence metadata',
      '[280ms] MongoDB Atlas commits encrypted reflection log • 200 OK rendered'
    ]
  },
  'college-appraisal': {
    id: 'college-appraisal',
    name: 'TCE Faculty Appraisal',
    badge: '4-Tier RBAC + 200-Pt Rubric + PDF Seal',
    latency: '350+ Faculty Scale',
    protocol: 'HTTPS / JWT Role Guards / PDO Prepared SQL / PDF Stream',
    tiers: [
      {
        tier: 'TIER 01 • GOVERNANCE PORTAL',
        title: 'Role-Adaptive Web Workspace',
        subtitle: 'Faculty • HoD • Registrar • Principal',
        color: '#38bdf8',
        nodes: [
          {
            name: '9-Section Rubric Engine',
            tech: '200-Point Accreditation UI',
            detail: 'Captures research publications, Section 9.2/9.3 metrics, and Utility Patent filings.'
          },
          {
            name: 'Real-Time Score Preview',
            tech: 'Deterministic Cap Logic',
            detail: 'Computes section caps and weighted totals dynamically before formal submission.'
          },
          {
            name: 'Leadership Review Console',
            tech: 'Side-by-Side Diff & Sign-Off',
            detail: 'Enables HoDs, Registrars, and the Principal to verify claims and append remarks.'
          }
        ]
      },
      {
        tier: 'TIER 02 • RBAC & PDF ENGINE',
        title: 'PHP 8.x Governance Server',
        subtitle: 'Strict State Machine & Auth Guards',
        color: '#34d399',
        nodes: [
          {
            name: '4-Tier RBAC State Machine',
            tech: 'JWT + Role Guard Middleware',
            detail: 'Enforces linear promotion: Draft → HoD Verified → Registrar Audited → Principal Sealed.'
          },
          {
            name: 'Server-SideScore Validator',
            tech: 'Zero Client-Trust Math',
            detail: 'Recomputes all 200-point rubric ceilings server-side to prevent payload manipulation.'
          },
          {
            name: 'Automated PDF Generator',
            tech: 'Official Institutional Dossier',
            detail: 'Compiles multi-page accreditation dossiers stamped with digital verification seals.'
          }
        ]
      },
      {
        tier: 'TIER 03 • RELATIONAL LEDGER',
        title: 'MySQL 3NF & Audit Trail',
        subtitle: 'ACID Relational Storage',
        color: '#f59e0b',
        nodes: [
          {
            name: 'Normalized 3NF Schema',
            tech: 'Foreign-Key Integrity',
            detail: 'Separates faculty profiles, academic years, rubric sections, and review signatures.'
          },
          {
            name: 'PDO Prepared Statements',
            tech: '100% SQLi Immunity',
            detail: 'All queries use parameterized PDO bindings across all 350+ faculty records.'
          },
          {
            name: 'Immutable Audit Ledger',
            tech: 'Cryptographic Timestamps',
            detail: 'Locks approved dossiers from post-sign-off edits with full reviewer attribution.'
          }
        ]
      }
    ],
    traceSteps: [
      '[Stage 1] Faculty submits 9-Section Rubric + Utility Patent evidence (142/200 pts)',
      '[Stage 2] HoD Role Guard verifies department claims & Section 9.2/9.3 (168/200 pts)',
      '[Stage 3] Registrar Audit normalizes institutional caps via PDO transaction (179/200 pts)',
      '[Stage 4] Principal Sign-Off locks record & generates sealed PDF dossier (186/200 pts)'
    ]
  },
  'flowstate-lofi': {
    id: 'flowstate-lofi',
    name: 'FlowState Lo-Fi (MV3)',
    badge: 'Chrome Extension + Phonetic DSP + Levenshtein',
    latency: '<12ms Voice Match',
    protocol: 'Manifest V3 / Web Speech API / MAIN World Bridge / MediaSession',
    tiers: [
      {
        tier: 'TIER 01 • YOUTUBE HUD & HARDWARE',
        title: 'Trusted-Types DOM & Earbuds',
        subtitle: 'Injected YouTube Overlay',
        color: '#38bdf8',
        nodes: [
          {
            name: 'Trusted-Types Safe HUD',
            tech: 'Zero innerHTML Injection',
            detail: 'Constructed via document.createElement to comply with strict YouTube CSP policies.'
          },
          {
            name: 'Bluetooth Earbud Hooks',
            tech: 'navigator.mediaSession',
            detail: 'Intercepts hardware Next/Previous earbud taps to trigger instant beat replays.'
          },
          {
            name: 'Popup Control Center',
            tech: 'Manifest V3 Popup UI',
            detail: 'Configures custom rewind seconds, sensitivity thresholds, and saved loop bookmarks.'
          }
        ]
      },
      {
        tier: 'TIER 02 • PHONETIC VOICE DSP',
        title: 'Fuzzy Speech Classifier',
        subtitle: 'Sliding Delta-Cursor Engine',
        color: '#34d399',
        nodes: [
          {
            name: 'Sliding Delta-Cursor',
            tech: 'webkitSpeechRecognition',
            detail: 'Processes only newly spoken words in continuous interim streams with zero re-triggers.'
          },
          {
            name: 'Phonetic Skeletonizer',
            tech: 'Consonant Normalization',
            detail: 'Collapses vowels and phonetic equivalents ("reeply" → "RPL") across 10 alternatives.'
          },
          {
            name: 'Levenshtein Matcher (d ≤ 1)',
            tech: 'O(m·n) Edit Distance',
            detail: 'Matches noisy spoken commands over background lo-fi music with <12ms execution.'
          }
        ]
      },
      {
        tier: 'TIER 03 • AUDIO & LOOP BRIDGE',
        title: 'Auto-Ducking & A–B Loop Core',
        subtitle: 'MAIN World Page Bridge',
        color: '#a78bfa',
        nodes: [
          {
            name: 'Smart Audio Auto-Ducking',
            tech: '20% Gain Dip on Speech',
            detail: 'Automatically dips YouTube player volume to 20% on speech start and restores on end.'
          },
          {
            name: '60fps A–B Loop Enforcer',
            tech: 'HTML5 <video> Time Lock',
            detail: 'Locks start/end beat timestamps with sub-frame precision for seamless looping.'
          },
          {
            name: 'Persistent Beat Storage',
            tech: 'chrome.storage.local',
            detail: 'Saves named beat drops and A–B loop regions per YouTube video ID.'
          }
        ]
      }
    ],
    traceSteps: [
      '[Speech Start] Speechonset detected → Smart Auto-Ducking dips YouTube gain to 20%',
      '[Delta Cursor] Interim stream captures "reeply 30" → Phonetic Skeleton: "RPL 30"',
      '[Levenshtein] Edit distance d = 1 matches REPLAY(30) in 4.2ms',
      '[Page Bridge] video.currentTime -= 30s executed & YouTube volume restored to 100%'
    ]
  },
  'service-marketplace': {
    id: 'service-marketplace',
    name: 'ServeHub Marketplace',
    badge: 'PHP 8 + MySQL 3NF + ACID Locking',
    latency: 'Zero Double-Bookings',
    protocol: 'HTTPS / Session RBAC / PDO Transactions / 3NF SQL',
    tiers: [
      {
        tier: 'TIER 01 • MARKETPLACE UI',
        title: 'Multi-Role Booking Portal',
        subtitle: 'Customer • Service Provider • Admin',
        color: '#38bdf8',
        nodes: [
          {
            name: 'Service Discovery Engine',
            tech: 'Dynamic Category Filter',
            detail: 'Filters verified local providers by category, rating, pricing tier, and city.'
          },
          {
            name: 'Live Slot Calendar',
            tech: 'Conflict-Free Picker',
            detail: 'Displays real-time provider availability and prevents stale slot selection.'
          },
          {
            name: 'Verified Review System',
            tech: 'Post-Completion Gate',
            detail: 'Restricts rating submissions exclusively to customers with completed bookings.'
          }
        ]
      },
      {
        tier: 'TIER 02 • TRANSACTIONAL CORE',
        title: 'PHP 8.x Controller Layer',
        subtitle: 'RBAC & Security Middleware',
        color: '#34d399',
        nodes: [
          {
            name: 'Bcrypt Auth & RBAC',
            tech: 'Password_Hash + Sessions',
            detail: 'Separates customer, provider, and admin route permissions with CSRF tokens.'
          },
          {
            name: 'Booking State Machine',
            tech: 'Lifecycle Orchestrator',
            detail: 'Manages PENDING → CONFIRMED → IN_PROGRESS → COMPLETED state transitions.'
          },
          {
            name: 'Input Sanitization Layer',
            tech: 'Strict Type Validation',
            detail: 'Sanitizes all form payloads and escapes output to prevent XSS injection.'
          }
        ]
      },
      {
        tier: 'TIER 03 • ACID DATA LAYER',
        title: 'MySQL 3NF Relational Engine',
        subtitle: 'Row-Level Concurrency Control',
        color: '#f59e0b',
        nodes: [
          {
            name: 'Row-Level Slot Locking',
            tech: 'SELECT ... FOR UPDATE',
            detail: 'Acquires exclusive row locks during booking creation to eliminate race conditions.'
          },
          {
            name: 'ACID Commit / Rollback',
            tech: 'PDO::beginTransaction()',
            detail: 'Guarantees atomic booking creation and provider schedule updates.'
          },
          {
            name: '3NF Normalized Tables',
            tech: 'users • services • bookings',
            detail: 'Enforces cascading foreign keys and composite indexes for fast lookups.'
          }
        ]
      }
    ],
    traceSteps: [
      '[Step 1] Customer requests slot 10:00 AM → Session RBAC & CSRF token verified',
      '[Step 2] PDO::beginTransaction() executes SELECT ... FOR UPDATE on provider slot',
      '[Step 3]INSERT INTO bookings confirmed + provider availability updated atomically',
      '[Step 4] COMMIT executed in 11ms • Zero double-booking race condition guaranteed'
    ]
  }
};

export const SystemArchitecture = () => {
  const [activeArch, setActiveArch] = useState('rowl-ai');
  const [activeTraceIdx, setActiveTraceIdx] = useState(3);
  const [isSimulating, setIsSimulating] = useState(false);

  const diagramRef = useRef(null);
  const packet1Ref = useRef(null);
  const packet2Ref = useRef(null);
  const tierCardsRef = useRef([]);

  const current = ARCHITECTURES[activeArch];

  // Continuous GSAP data-packet pulse animation + tier entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate tier columns on switch
      const cards = tierCardsRef.current.filter(Boolean);
      if (cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 18, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            stagger: 0.08,
            ease: 'power3.out',
            clearProps: 'transform'
          }
        );
      }

      // Continuous flowing data packets between Tier 1 -> Tier 2 -> Tier 3
      if (packet1Ref.current) {
        gsap.fromTo(
          packet1Ref.current,
          { x: '-10%', opacity: 0.2 },
          {
            x: '110%',
            opacity: 1,
            duration: 1.8,
            repeat: -1,
            ease: 'power1.inOut'
          }
        );
      }
      if (packet2Ref.current) {
        gsap.fromTo(
          packet2Ref.current,
          { x: '-10%', opacity: 0.2 },
          {
            x: '110%',
            opacity: 1,
            duration: 1.8,
            delay: 0.9,
            repeat: -1,
            ease: 'power1.inOut'
          }
        );
      }
    }, diagramRef);

    return () => ctx.revert();
  }, [activeArch]);

  const handleSimulateTrace = () => {
    if (isSimulating) return;
    audioSynth.playPop();
    setIsSimulating(true);
    setActiveTraceIdx(0);

    const cards = tierCardsRef.current.filter(Boolean);
    if (cards.length) {
      gsap.fromTo(
        cards,
        { boxShadow: '0 0 0px rgba(56,189,248,0)' },
        {
          boxShadow: '0 0 28px rgba(56,189,248,0.28)',
          duration: 0.28,
          stagger: 0.25,
          yoyo: true,
          repeat: 1,
          ease: 'power2.out'
        }
      );
    }

    [1, 2, 3].forEach((step, idx) => {
      setTimeout(() => {
        audioSynth.playClick();
        setActiveTraceIdx(step);
        if (step === 3) setIsSimulating(false);
      }, (idx + 1) * 380);
    });
  };

  return (
    <section id="architecture" className="py-20 border-b border-[#222b38] bg-[#090d12] relative overflow-hidden">
      {/* Subtle Blueprint Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10 relative z-10">
        {/* Section Header */}
        <div data-gsap="section-header" className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#38bdf8]">
              <Server className="w-4 h-4" />
              <span>SYSTEM ARCHITECTURE • LIVE DATA-FLOW BLUEPRINTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#f0f6fc] tracking-tight">
              End-to-End System Architecture
            </h2>
            <p className="text-base text-[#8b949e] leading-relaxed">
              Interactive 3-tier engineering blueprints across my flagship systems. Select any project below or click{' '}
              <span className="text-[#38bdf8] font-mono text-xs">⚡ Simulate Request Trace</span> to watch GSAP data packets traverse the stack.
            </p>
          </div>

          {/* Project Architecture Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {Object.values(ARCHITECTURES).map((arch) => {
              const isSelected = activeArch === arch.id;
              return (
                <button
                  key={arch.id}
                  type="button"
                  onClick={() => {
                    audioSynth.playClick();
                    setActiveArch(arch.id);
                    setActiveTraceIdx(3);
                  }}
                  className={`px-3.5 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#38bdf8] text-[#090d12] font-bold border-[#38bdf8] shadow-lg shadow-sky-500/20'
                      : 'bg-[#12171f] text-[#8b949e] hover:text-[#f0f6fc] border-[#222b38] hover:border-[#38bdf8]/40'
                  }`}
                >
                  {arch.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Blueprint Top Telemetry Bar */}
        <div className="p-4 rounded-xl bg-[#12171f] border border-[#222b38] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-sky-500/10 text-[#38bdf8] border border-sky-500/30 font-bold">
              {current.badge}
            </span>
            <span className="text-[#8b949e] hidden sm:inline">Protocol:</span>
            <span className="text-[#c9d1d9]">{current.protocol}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              ● {current.latency}
            </span>
            <button
              type="button"
              onClick={handleSimulateTrace}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#38bdf8] hover:bg-[#7dd3fc] text-[#090d12] font-bold text-xs transition-all cursor-pointer shadow-sm"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isSimulating ? 'Tracing Stack...' : 'Simulate Request Trace'}</span>
            </button>
          </div>
        </div>

        {/* 3-Tier Interactive Architecture Diagram with GSAP Flowing Conduits */}
        <div ref={diagramRef} className="relative">
          {/* Desktop Animated Conduit Pipes between Tier 1 -> Tier 2 -> Tier 3 */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none z-0 px-12">
            <div className="grid grid-cols-2 gap-8">
              <div className="h-1 bg-[#18202b] rounded-full overflow-hidden relative border border-[#222b38]">
                <div
                  ref={packet1Ref}
                  className="w-24 h-full bg-gradient-to-r from-transparent via-[#38bdf8] to-emerald-400 rounded-full shadow-[0_0_12px_#38bdf8]"
                />
              </div>
              <div className="h-1 bg-[#18202b] rounded-full overflow-hidden relative border border-[#222b38]">
                <div
                  ref={packet2Ref}
                  className="w-24 h-full bg-gradient-to-r from-transparent via-emerald-400 to-purple-400 rounded-full shadow-[0_0_12px_#34d399]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
            {current.tiers.map((tierObj, tIdx) => (
              <div
                key={tierObj.tier}
                ref={(el) => (tierCardsRef.current[tIdx] = el)}
                className="rounded-2xl border border-[#222b38] bg-[#12171f]/95 backdrop-blur-md p-5 flex flex-col justify-between space-y-4 hover:border-[#38bdf8]/50 transition-all shadow-xl"
              >
                {/* Tier Header */}
                <div className="border-b border-[#222b38] pb-3.5 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span style={{ color: tierObj.color }} className="font-bold tracking-wider">
                      {tierObj.tier}
                    </span>
                    <span className="text-[#8b949e] bg-[#090d12] px-2 py-0.5 rounded border border-[#222b38]">
                      Stage 0{tIdx + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#f0f6fc]">{tierObj.title}</h3>
                  <p className="text-xs font-mono text-[#8b949e]">{tierObj.subtitle}</p>
                </div>

                {/* Tier Sub-Nodes with Hover Elevation */}
                <div className="space-y-3">
                  {tierObj.nodes.map((node) => (
                    <SpotlightCard
                      key={node.name}
                      enableTilt={false}
                      className="p-3.5 rounded-xl bg-[#090d12] border border-[#222b38] hover:border-[#38bdf8]/50 transition-all group"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-bold text-[#f0f6fc] group-hover:text-[#38bdf8] transition-colors">
                          {node.name}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#12171f] text-[#38bdf8] border border-[#222b38] shrink-0">
                          {node.tech}
                        </span>
                      </div>
                      <p className="text-xs text-[#8b949e] leading-relaxed">
                        {node.detail}
                      </p>
                    </SpotlightCard>
                  ))}
                </div>

                {/* Tier Footer Status */}
                <div className="pt-2 border-t border-[#222b38]/60 flex items-center justify-between text-[11px] font-mono text-[#8b949e]">
                  <span>Telemetry Status</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Verified Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Request Trace Terminal Footer */}
        <div className="rounded-xl border border-[#222b38] bg-[#0d121a] overflow-hidden shadow-lg">
          <div className="px-4 py-2.5 bg-[#12171f] border-b border-[#222b38] flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-[#f0f6fc]">
              <Terminal className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>live-execution-trace.log — {current.name}</span>
            </div>
            <span className="text-[11px] text-emerald-400">
              ● Step {activeTraceIdx + 1} / {current.traceSteps.length} Complete
            </span>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
            {current.traceSteps.map((stepText, idx) => {
              const isReached = idx <= activeTraceIdx;
              return (
                <div
                  key={stepText}
                  onClick={() => {
                    audioSynth.playClick();
                    setActiveTraceIdx(idx);
                  }}
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${
                    isReached
                      ? 'bg-[#12171f] border-[#38bdf8]/40 text-[#f0f6fc]'
                      : 'bg-[#090d12] border-[#222b38] text-[#8b949e]/50'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className={isReached ? 'text-[#38bdf8] font-bold' : 'text-[#8b949e]'}>
                      TRACE 0{idx + 1}
                    </span>
                    {isReached && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <div className="text-[11px] leading-relaxed">{stepText}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
