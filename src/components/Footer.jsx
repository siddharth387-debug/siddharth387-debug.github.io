import React from 'react';
import { ArrowUp, Terminal, Heart } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { portfolioData } from '../data/portfolioData';


export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#222b38] bg-[#090d12] py-10 text-xs font-mono text-[#8b949e]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#38bdf8]" />
          <span>{portfolioData.personal.name}</span>
          <span className="text-[#38bdf8]">/</span>
          <span>AI-Assisted Web Developer</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href={portfolioData.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#f0f6fc] transition-colors flex items-center gap-1.5"
          >
            <Github className="w-3.5 h-3.5" />
            GitHub
          </a>

          <a
            href={portfolioData.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#f0f6fc] transition-colors flex items-center gap-1.5"
          >
            <Linkedin className="w-3.5 h-3.5" />
            LinkedIn
          </a>


          <button
            onClick={scrollToTop}
            className="hover:text-[#38bdf8] transition-colors flex items-center gap-1 cursor-pointer"
          >
            Back to top
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
