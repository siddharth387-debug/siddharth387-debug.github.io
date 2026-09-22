import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, ArrowRight, ExternalLink, FileText, Mail, 
  Sparkles, Volume2, VolumeX, Check,
  Layers, Code2, Terminal, X, CornerDownLeft
} from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { audioSynth } from '../utils/audioSynth';
import { portfolioData } from '../data/portfolioData';

export const CommandPalette = ({ isOpen, onClose, onOpenResume }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedText, setCopiedText] = useState('');
  const [isSoundOn, setIsSoundOn] = useState(audioSynth.isSoundEnabled());
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const commands = [
    // Navigation
    {
      id: 'nav-projects',
      category: 'Navigation',
      title: 'Work & Projects',
      subtitle: 'View full-stack MERN & PHP systems',
      icon: Layers,
      action: () => {
        window.location.hash = '#projects';
        const el = document.getElementById('projects');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'nav-about',
      category: 'Navigation',
      title: 'About & Bento Grid Stack',
      subtitle: 'Background, education, and architecture bento',
      icon: Terminal,
      action: () => {
        window.location.hash = '#about';
        const el = document.getElementById('about');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'nav-workflow',
      category: 'Navigation',
      title: 'How I Build With AI (Workflow)',
      subtitle: '10-step rigorous engineering process',
      icon: Sparkles,
      action: () => {
        window.location.hash = '#workflow';
        const el = document.getElementById('workflow');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'nav-prompting',
      category: 'Navigation',
      title: 'Prompt Engineering Inspector',
      subtitle: 'Interactive structured vs weak prompt diff',
      icon: Code2,
      action: () => {
        window.location.hash = '#prompting';
        const el = document.getElementById('prompting');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'nav-contact',
      category: 'Navigation',
      title: 'Contact Channels',
      subtitle: 'Reach Siddharth directly for opportunities',
      icon: Mail,
      action: () => {
        window.location.hash = '#contact';
        const el = document.getElementById('contact');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },

    // Projects
    {
      id: 'proj-rowl',
      category: 'Live Project Demos',
      title: 'Rowl AI — Live Demo',
      subtitle: 'Groq Cloud API inference, Sera AI companion',
      icon: ExternalLink,
      badge: 'Live Vercel',
      action: () => window.open('https://rowl-ai-pink.vercel.app/', '_blank')
    },
    {
      id: 'proj-appraisal',
      category: 'Live Project Demos',
      title: 'TCE Appraisal System — Live Demo',
      subtitle: 'Institutional governance portal for 350+ faculty',
      icon: ExternalLink,
      badge: 'Live Portal',
      action: () => window.open('https://tce-appraisal.vercel.app/', '_blank')
    },
    {
      id: 'proj-study-rowl',
      category: 'Case Studies',
      title: 'Rowl AI Technical Deep-Dive',
      subtitle: 'Read architectural decisions, JWT cookies & webhooks',
      icon: ArrowRight,
      action: () => navigate('/projects/rowl-ai')
    },
    {
      id: 'proj-study-appraisal',
      category: 'Case Studies',
      title: 'TCE Appraisal Technical Deep-Dive',
      subtitle: 'Read 4-tier RBAC, PDF generation & rubric modeling',
      icon: ArrowRight,
      action: () => navigate('/projects/college-appraisal')
    },

    // Quick Actions
    {
      id: 'action-resume',
      category: 'Quick Actions',
      title: 'View Resume & PDF Export',
      subtitle: 'Open full academic & professional documentation',
      icon: FileText,
      badge: 'Doc',
      action: () => onOpenResume()
    },
    {
      id: 'action-copy-email',
      category: 'Quick Actions',
      title: 'Copy Email Address',
      subtitle: portfolioData.personal.email,
      icon: Mail,
      badge: copiedText === 'email' ? 'Copied!' : 'Copy',
      action: () => {
        navigator.clipboard.writeText(portfolioData.personal.email);
        setCopiedText('email');
        setTimeout(() => setCopiedText(''), 2000);
      }
    },
    {
      id: 'action-github',
      category: 'Quick Actions',
      title: 'Open GitHub Profile',
      subtitle: 'siddharth387-debug repos and commits',
      icon: Github,
      action: () => window.open(portfolioData.personal.github, '_blank')
    },
    {
      id: 'action-linkedin',
      category: 'Quick Actions',
      title: 'Open LinkedIn Profile',
      subtitle: 'Connect with Siddharth K on LinkedIn',
      icon: Linkedin,
      action: () => window.open(portfolioData.personal.linkedin, '_blank')
    },
    {
      id: 'action-sound',
      category: 'Preferences',
      title: isSoundOn ? 'Disable Tactile Sound FX' : 'Enable Tactile Sound FX',
      subtitle: isSoundOn ? 'Sound feedback is currently ON' : 'Synthesized mechanical click feedback',
      icon: isSoundOn ? VolumeX : Volume2,
      badge: isSoundOn ? 'ON' : 'OFF',
      action: () => {
        const next = audioSynth.toggleSound();
        setIsSoundOn(next);
      }
    }
  ];

  const filtered = commands.filter((cmd) => {
    const q = query.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.subtitle.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setIsSoundOn(audioSynth.isSoundEnabled());
    }
  }, [isOpen]);

  const executeCommand = (cmd) => {
    audioSynth.playClick();
    cmd.action();
    if (cmd.id !== 'action-copy-email' && cmd.id !== 'action-sound') {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      audioSynth.playKey();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      audioSynth.playKey();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        executeCommand(filtered[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xl rounded-2xl border border-[#222b38] bg-[#0d121a] shadow-2xl shadow-sky-950/40 overflow-hidden flex flex-col font-sans animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#222b38] bg-[#12171f]/80 gap-3">
          <Search className="w-4 h-4 text-[#38bdf8] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command, project, or jump to section..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-[#f0f6fc] placeholder-[#8b949e] focus:outline-none font-sans"
          />
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#18202b] text-[#8b949e] border border-[#222b38]">
              ESC
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#18202b] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs font-mono text-[#8b949e]">
              No matching commands or projects found.
            </div>
          ) : (
            filtered.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  onClick={() => executeCommand(cmd)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#162130] text-[#f0f6fc] border border-[#38bdf8]/40 shadow-sm'
                      : 'text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#12171f] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2 rounded-lg ${
                      isSelected ? 'bg-sky-500/20 text-[#38bdf8]' : 'bg-[#18202b] text-[#8b949e]'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-[#f0f6fc] truncate flex items-center gap-2">
                        <span>{cmd.title}</span>
                        {cmd.badge && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-sky-500/10 text-[#38bdf8] border border-sky-500/30">
                            {cmd.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#8b949e] truncate">
                        {cmd.subtitle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 pl-3">
                    <span className="text-[10px] font-mono text-[#8b949e] uppercase">
                      {cmd.category}
                    </span>
                    {isSelected && (
                      <CornerDownLeft className="w-3.5 h-3.5 text-[#38bdf8]" />
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Hints */}
        <div className="px-4 py-2.5 bg-[#090d12] border-t border-[#222b38] flex items-center justify-between text-[11px] font-mono text-[#8b949e]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-[#18202b] border border-[#222b38] text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-[#18202b] border border-[#222b38] text-[10px]">↓</kbd>
              <span>navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-[#18202b] border border-[#222b38] text-[10px]">↵</kbd>
              <span>select</span>
            </span>
          </div>
          <span className="text-[#38bdf8]">
            Siddharth K • 2026
          </span>
        </div>
      </div>
    </div>
  );
};
