import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { AiWorkflow } from './components/AiWorkflow';
import { PromptEngineering } from './components/PromptEngineering';
import { Philosophy } from './components/Philosophy';
import { AboutAndSkills } from './components/AboutAndSkills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CaseStudy } from './components/CaseStudy';
import { ResumeModal } from './components/ResumeModal';
import { CustomCursor } from './components/CustomCursor';
import { RecruiterChatbot } from './components/RecruiterChatbot';
import { ScrollProgress } from './components/ScrollProgress';
import { CommandPalette } from './components/CommandPalette';

function HomePage({ onOpenResume }) {
  return (
    <main>
      <Hero onOpenResume={onOpenResume} />
      <ProjectsSection />
      <AiWorkflow />
      <PromptEngineering />
      <Philosophy />
      <AboutAndSkills />
      <Contact onOpenResume={onOpenResume} />
    </main>
  );
}

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Global Ctrl + K / Cmd + K listener
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#090d12] text-[#f0f6fc] flex flex-col justify-between selection:bg-[#38bdf8]/20 selection:text-[#38bdf8] relative">
      {/* Top Viewport Scroll Progress Bar */}
      <ScrollProgress />

      {/* Precision Reticle & Smart Context Cursor (Desktop Only) */}
      <CustomCursor />

      {/* Developer Command Palette (Ctrl+K or ⌘K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Navigation Bar */}
      <Navbar 
        onOpenResume={() => setIsResumeOpen(true)} 
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Routed Content */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage onOpenResume={() => setIsResumeOpen(true)} />} />
          <Route path="/projects/:id" element={<CaseStudy />} />
          <Route path="*" element={<HomePage onOpenResume={() => setIsResumeOpen(true)} />} />
        </Routes>
      </div>

      {/* Floating Recruiter Assistant & Direct Email Dispatch */}
      <RecruiterChatbot />

      {/* Footer */}
      <Footer />

      {/* Resume Viewer Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
