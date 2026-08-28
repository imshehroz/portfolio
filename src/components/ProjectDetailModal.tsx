import React, { useState } from 'react';
import { 
  X, 
  Shield, 
  Terminal, 
  ExternalLink, 
  Github, 
  Copy, 
  Check, 
  Lock, 
  AlertOctagon, 
  FileText, 
  Database, 
  Activity, 
  CheckCircle2, 
  Flame,
  ArrowRight
} from 'lucide-react';
import { SOCProject } from '../types';

interface ProjectDetailModalProps {
  project: SOCProject | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [copiedQuery, setCopiedQuery] = useState(false);
  const [copiedIoc, setCopiedIoc] = useState<string | null>(null);

  if (!project) return null;

  const handleCopyQuery = () => {
    if (project.sampleQuery) {
      navigator.clipboard.writeText(project.sampleQuery.code);
      setCopiedQuery(true);
      setTimeout(() => setCopiedQuery(false), 2000);
    }
  };

  const handleCopyIoc = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedIoc(value);
    setTimeout(() => setCopiedIoc(null), 2000);
  };

  return (
    <div
      id="soc-project-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="soc-project-modal-content"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden my-auto"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                {project.category}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
                {project.title}
              </h2>
            </div>
          </div>

          <button
            id="close-soc-project-modal"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-300 text-sm">
          {/* Banner & Key Metrics */}
          <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
            <img
              src={project.thumbnailUrl}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-48 sm:h-60 object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="px-2.5 py-1 rounded bg-slate-900/90 text-cyan-300 font-mono text-xs font-semibold border border-cyan-500/30 backdrop-blur-md">
                  {project.tagline}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium backdrop-blur-md transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Lab Repository</span>
                  </a>
                )}
                {project.writeupUrl && (
                  <a
                    href={project.writeupUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Read Full Writeup</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Metrics summary */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {project.metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col items-center text-center"
              >
                <span className="text-lg sm:text-xl font-extrabold text-cyan-400 font-mono">
                  {m.value}
                </span>
                <span className="text-xs text-slate-400 mt-0.5">
                  {m.label}
                </span>
              </div>
            ))}
          </div>

          {/* Deep Dive Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-cyan-400" /> Technical Overview & Objective
            </h3>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              {project.longDescription}
            </p>
          </div>

          {/* MITRE ATT&CK Mapping & Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-cyan-400" /> MITRE ATT&CK Techniques Mapped
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.mitreTactics.map((tactic, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-slate-900 border border-cyan-500/20 text-cyan-300"
                  >
                    {tactic}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Database className="w-4 h-4 text-emerald-400" /> Log Sources & Ingestion
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.logSources.map((source, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-slate-900 border border-emerald-500/20 text-emerald-300"
                  >
                    {source}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Attack Emulation Scenario */}
          {project.attackScenario && (
            <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/40 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                <AlertOctagon className="w-4 h-4 text-red-400" /> Adversary Attack Scenario
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.attackScenario}
              </p>
            </div>
          )}

          {/* Detection Logic */}
          {project.detectionLogic && project.detectionLogic.length > 0 && (
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Detection Engineering Strategy
              </h4>
              <ul className="space-y-2">
                {project.detectionLogic.map((logic, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                    <span>{logic}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Sample Query Code Block */}
          {project.sampleQuery && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 font-mono">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>{project.sampleQuery.engine} Detection Rule</span>
                </h4>
                <button
                  onClick={handleCopyQuery}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono transition-colors"
                >
                  {copiedQuery ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedQuery ? 'Copied Rule' : 'Copy Code'}</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 overflow-x-auto text-xs font-mono text-cyan-300">
                <pre className="whitespace-pre">{project.sampleQuery.code}</pre>
              </div>
            </div>
          )}

          {/* Incident Response & Containment Steps */}
          {project.containmentPlaybook && project.containmentPlaybook.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-amber-400" /> Incident Response & Containment Playbook
              </h4>
              <div className="space-y-2">
                {project.containmentPlaybook.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <span className="px-1.5 py-0.5 rounded bg-amber-900/40 text-amber-300 font-mono text-[11px] font-bold flex-shrink-0">
                      Step {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* IOC Table */}
          {project.iocs && project.iocs.length > 0 && (
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-cyan-400" /> Indicators of Compromise (IOCs)
              </h4>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                    <tr>
                      <th className="px-3 py-2">Type</th>
                      <th className="px-3 py-2">Artifact Value</th>
                      <th className="px-3 py-2">Context</th>
                      <th className="px-3 py-2 text-right">Copy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-950/40 font-mono">
                    {project.iocs.map((ioc, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-3 py-2 font-semibold text-cyan-400 whitespace-nowrap">
                          {ioc.type}
                        </td>
                        <td className="px-3 py-2 text-slate-300 break-all select-all">
                          {ioc.value}
                        </td>
                        <td className="px-3 py-2 text-slate-400 font-sans text-xs">
                          {ioc.context}
                        </td>
                        <td className="px-3 py-2 text-right whitespace-nowrap">
                          <button
                            onClick={() => handleCopyIoc(ioc.value)}
                            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                            title="Copy IOC"
                          >
                            {copiedIoc === ioc.value ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            SOC Lab ID: <span className="font-mono text-cyan-400">{project.id}</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
