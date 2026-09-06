import React from 'react';
import { Layers } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { portfolioData } from '../data/portfolioData';

export const ProjectsSection = () => {
  const [rowlAi, collegeAppraisal, serviceMarketplace] = portfolioData.projects;

  return (
    <section id="projects" className="py-20 border-b border-[#222b38]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-[#38bdf8]">
            <Layers className="w-4 h-4" />
            <span>PORTFOLIO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f0f6fc] tracking-tight">
            Selected Work
          </h2>
          <p className="text-base text-[#8b949e] leading-relaxed">
            Real applications built across full-stack development and AI-assisted experiences.
          </p>
        </div>

        {/* Projects Display Hierarchy */}
        <div className="space-y-8">
          
          {/* Project 01: Featured - Rowl AI (Large Presentation) */}
          <ProjectCard project={rowlAi} isFeatured={true} />

          {/* Projects 02 & 03: College Appraisal & Service Marketplace */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ProjectCard project={collegeAppraisal} isFeatured={false} />
            <ProjectCard project={serviceMarketplace} isFeatured={false} />
          </div>

        </div>

      </div>
    </section>
  );
};
