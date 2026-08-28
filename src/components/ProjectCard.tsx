import React, { useState } from 'react';
import { 
  Shield, 
  Terminal, 
  Search, 
  ExternalLink, 
  CheckCircle2, 
  Copy, 
  Check, 
  AlertTriangle, 
  Flame, 
  ArrowUpRight, 
  Layers, 
  Cpu, 
  FileCode,
  Lock,
  Eye
} from 'lucide-react';
import { SOCProject } from '../types';

interface ProjectCardProps {
  project: SOCProject;
  onSelect: (project: SOCProject) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const [copied, setCopied] = useState(false);
  const [showQueryPreview, setShowQueryPreview] = useState(false);

  const handleCopyQuery = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.sampleQuery) {
      navigator.clipboard.writeText(project.sampleQuery.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      id={`soc-project-card-${project.id}`}
      onClick={() => onSelect(project)}
      className="group relative flex flex-col rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-cyan-950/20"
    >
      {/* Thumbnail Banner */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950">
        <img
          src={project.thumbnailUrl}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-70 group-hover:opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-950/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            {project.category}
          </span>
          {project.featured && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Flame className="w-3 h-3" /> Featured Lab
            </span>
          )}
        </div>

        {/* Top right quick actions */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(project);
            }}
            className="p-1.5 rounded-lg bg-slate-950/80 hover:bg-cyan-600 text-slate-300 hover:text-white border border-slate-700 transition-all text-xs flex items-center gap-1 font-medium backdrop-blur-sm"
            title="Inspect Incident / Detection Writeup"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Details</span>
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex-1 p-5 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Title & Tagline */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
              <span>{project.title}</span>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </h3>
            <p className="text-xs text-cyan-400/90 font-medium mt-0.5">
              {project.tagline}
            </p>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          {/* MITRE ATT&CK Badges */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Lock className="w-3 h-3 text-cyan-400" /> MITRE ATT&CK Mapped:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.mitreTactics.slice(0, 3).map((tactic, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-slate-950 border border-slate-800 text-slate-300"
                >
                  {tactic}
                </span>
              ))}
              {project.mitreTactics.length > 3 && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-400">
                  +{project.mitreTactics.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="flex flex-col text-center">
              <span className="text-xs sm:text-sm font-bold text-cyan-400 font-mono">
                {m.value}
              </span>
              <span className="text-[10px] text-slate-400 truncate">
                {m.label}
              </span>
            </div>
          ))}
        </div>

        {/* Tools & Log Sources */}
        <div className="space-y-2 pt-1 border-t border-slate-800/60">
          <div className="flex flex-wrap items-center gap-1.5">
            {project.siemTools.slice(0, 4).map((tool, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800/80 text-slate-300"
              >
                {tool}
              </span>
            ))}
          </div>

          {/* Quick Query snippet toggle if present */}
          {project.sampleQuery && (
            <div className="pt-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowQueryPreview(!showQueryPreview);
                }}
                className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-mono transition-colors"
              >
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <Terminal className="w-3.5 h-3.5" />
                  {project.sampleQuery.engine} Rule
                </span>
                <span className="text-[10px] text-slate-400">
                  {showQueryPreview ? 'Hide Query' : 'Preview Query'}
                </span>
              </button>

              {showQueryPreview && (
                <div 
                  onClick={(e) => e.stopPropagation()}
                  className="mt-2 p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-200 overflow-x-auto relative"
                >
                  <button
                    onClick={handleCopyQuery}
                    className="absolute top-2 right-2 p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[10px] flex items-center gap-1 transition-colors"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <pre className="text-[11px] leading-tight text-slate-300 pr-12">
                    {project.sampleQuery.code}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
