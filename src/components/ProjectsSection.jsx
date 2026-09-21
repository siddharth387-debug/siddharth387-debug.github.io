import React, { useState } from 'react';
import { Layers, Sparkles, Filter } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { portfolioData } from '../data/portfolioData';

export const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Projects', count: portfolioData.projects.length },
    { id: 'ai', label: 'AI / LLM Integrated', count: portfolioData.projects.filter(p => p.hasAi).length },
    { id: 'mern', label: 'Full-Stack MERN', count: portfolioData.projects.filter(p => p.filterTags?.includes('mern')).length },
    { id: 'php', label: 'PHP & MySQL', count: portfolioData.projects.filter(p => p.filterTags?.includes('php')).length },
  ];

  const filteredProjects = portfolioData.projects.filter(project => {
    if (activeFilter === 'all') return true;
    return project.filterTags?.includes(activeFilter) || (activeFilter === 'ai' && project.hasAi);
  });

  return (
    <section id="projects" className="py-20 border-b border-[#222b38]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Section Header with Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#38bdf8]">
              <Layers className="w-4 h-4" />
              <span>PORTFOLIO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#f0f6fc] tracking-tight">
              Selected Work
            </h2>
            <p className="text-base text-[#8b949e] leading-relaxed">
              Real applications built across full-stack engineering, secure backend workflows, and practical AI integrations.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {filters.map(filter => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#38bdf8] text-[#090d12] font-bold shadow-md shadow-sky-950/40'
                      : 'bg-[#12171f] text-[#8b949e] hover:text-[#f0f6fc] border border-[#222b38] hover:border-[#334155]'
                  }`}
                >
                  {filter.id === 'ai' && <Sparkles className="w-3 h-3" />}
                  <span>{filter.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-[#090d12]/20 text-[#090d12]' : 'bg-[#18202b] text-[#8b949e]'
                  }`}>
                    {filter.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Display Hierarchy */}
        {activeFilter === 'all' ? (
          <div className="space-y-8">
            {/* Project 01: Featured - Rowl AI (Large Hero Card) */}
            <ProjectCard project={portfolioData.projects[0]} isFeatured={true} />

            {/* Projects 02 & 03: College Appraisal & Service Marketplace */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ProjectCard project={portfolioData.projects[1]} isFeatured={false} />
              <ProjectCard project={portfolioData.projects[2]} isFeatured={false} />
            </div>

            {/* Project 04: Developer Portfolio (Full-width card) */}
            {portfolioData.projects[3] && (
              <ProjectCard project={portfolioData.projects[3]} isFeatured={false} />
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                isFeatured={project.featured}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
