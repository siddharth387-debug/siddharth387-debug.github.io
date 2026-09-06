import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText, ArrowUpRight, Terminal } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { portfolioData } from '../data/portfolioData';



export const Navbar = ({ onOpenResume }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const navLinks = [
    { name: 'Work', href: isHomePage ? '#projects' : '/#projects' },
    { name: 'About', href: isHomePage ? '#about' : '/#about' },
    { name: 'AI Workflow', href: isHomePage ? '#workflow' : '/#workflow' },
    { name: 'Prompting', href: isHomePage ? '#prompting' : '/#prompting' },
    { name: 'Contact', href: isHomePage ? '#contact' : '/#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#222b38] bg-[#090d12]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link 
          to="/" 
          className="flex items-center gap-2.5 text-base font-semibold tracking-tight text-[#f0f6fc] hover:text-[#38bdf8] transition-colors"
        >
          <div className="w-7 h-7 rounded-md bg-[#12171f] border border-[#222b38] flex items-center justify-center text-[#38bdf8]">
            <Terminal className="w-4 h-4" />
          </div>
          <span className="font-mono">{portfolioData.personal.name}</span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-mono font-normal rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hidden sm:inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            open to work
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#8b949e]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-[#f0f6fc] transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          <button
            onClick={onOpenResume}
            className="flex items-center gap-1.5 text-xs font-mono font-medium px-3 py-1.5 rounded-md bg-[#12171f] hover:bg-[#18202b] text-[#f0f6fc] border border-[#222b38] hover:border-[#38bdf8]/40 transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-[#38bdf8]" />
            Resume
          </button>

          <a
            href={portfolioData.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-1.5 rounded-md hover:bg-[#12171f] text-[#8b949e] hover:text-[#f0f6fc] border border-transparent hover:border-[#222b38] transition-all"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={portfolioData.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-1.5 rounded-md hover:bg-[#12171f] text-[#8b949e] hover:text-[#f0f6fc] border border-transparent hover:border-[#222b38] transition-all"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </nav>


        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenResume}
            className="text-xs font-mono px-2.5 py-1 rounded bg-[#12171f] text-[#38bdf8] border border-[#222b38]"
          >
            Resume
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 rounded-md text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#12171f] border border-[#222b38]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#222b38] bg-[#0d121a] px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-[#8b949e] hover:text-[#38bdf8] font-medium border-b border-[#222b38]/40"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono text-[#8b949e] hover:text-[#f0f6fc]"
            >
              <Github className="w-4 h-4" /> github.com/siddharth387-debug
            </a>
            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono text-[#8b949e] hover:text-[#f0f6fc]"
            >
              <Linkedin className="w-4 h-4" /> linkedin.com/in/siddharth-k-b0a118340
            </a>
          </div>

        </div>
      )}
    </header>
  );
};
