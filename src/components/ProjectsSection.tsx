import React, { useState, useMemo } from 'react';
import { 
  ShieldAlert, 
  Terminal, 
  Search, 
  Filter, 
  Sparkles, 
  Layers, 
  LayoutGrid, 
  Flame, 
  Lock, 
  Database,
  SlidersHorizontal
} from 'lucide-react';
import { SOCProject, ProjectCategory } from '../types';
import { SOC_PROJECTS } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';

interface ProjectsSectionProps {
  onSelectProject: (project: SOCProject) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedToolFilter, setSelectedToolFilter] = useState<string>('All');

  const categories: string[] = [
    'All',
    'Detection Engineering',
    'Incident Response & DFIR',
    'Threat Hunting',
    'Malware & Phishing Triage',
    'Network & PCAP Forensics',
    'Cloud Security'
  ];

  const siemToolsList = ['All', 'Wazuh', 'OSSEC', 'OpenVAS', 'Nmap', 'Rocky Linux', 'Python', 'Laravel', 'Docker'];

  const filteredProjects = useMemo(() => {
    return SOC_PROJECTS.filter((project) => {
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      const matchesTool =
        selectedToolFilter === 'All' ||
        project.siemTools.some((t) => t.toLowerCase().includes(selectedToolFilter.toLowerCase()));
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.mitreTactics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        project.siemTools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesTool && matchesSearch;
    });
  }, [selectedCategory, selectedToolFilter, searchQuery]);

  return (
    <section id="projects" className="py-20 bg-slate-950 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-xs font-semibold text-cyan-400 mb-3">
              <Terminal className="w-3.5 h-3.5" />
              <span>SIEM & Detection Engineering Labs</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              SOC Case Studies & Detection Labs
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Hands-on detection engineering projects, malware triage workflows, DFIR investigations, and custom SPL/KQL correlation rules mapped to real adversary tradecraft.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
              Showing {filteredProjects.length} of {SOC_PROJECTS.length} Labs
            </span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 mb-8 space-y-4 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full lg:max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="soc-projects-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by technique (e.g. T1003, Kerberoasting), tool, or keyword..."
                className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            {/* Quick SIEM Tool Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" /> Tool:
              </span>
              {siemToolsList.map((tool) => (
                <button
                  key={tool}
                  onClick={() => setSelectedToolFilter(tool)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-all ${
                    selectedToolFilter === tool
                      ? 'bg-cyan-600 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {tool}
                </button>
              ))}
            </div>
          </div>

          {/* Category Chips Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 border-t border-slate-800/80">
            {categories.map((category) => (
              <button
                key={category}
                id={`filter-category-${category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-cyan-950 border border-cyan-500/50 text-cyan-300 shadow-sm'
                    : 'bg-slate-950/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
            <ShieldAlert className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-300">No detection labs match your criteria</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting your search terms or clearing the selected category filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedToolFilter('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-xs font-bold transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={onSelectProject}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
