import React, { useState } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Terminal, 
  Cpu, 
  Zap, 
  Crosshair, 
  Layers 
} from 'lucide-react';
import { MITRE_COVERAGE } from '../data/portfolioData';
import { MitreTechnique } from '../types';

export const MitreCoverageSection: React.FC = () => {
  const [selectedTactic, setSelectedTactic] = useState<string>('All');
  const [activeTechnique, setActiveTechnique] = useState<MitreTechnique | null>(MITRE_COVERAGE[0]);

  const tactics = [
    'All',
    'Initial Access',
    'Execution',
    'Persistence',
    'Privilege Escalation',
    'Defense Evasion',
    'Credential Access',
    'Lateral Movement',
    'Exfiltration'
  ];

  const filteredTechniques = selectedTactic === 'All' 
    ? MITRE_COVERAGE 
    : MITRE_COVERAGE.filter(t => t.tactic === selectedTactic);

  return (
    <section id="mitre" className="py-20 bg-slate-900/60 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-xs font-semibold text-cyan-400 mb-4">
            <Crosshair className="w-3.5 h-3.5" />
            <span>Adversarial Emulation & Matrix Coverage</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            MITRE ATT&CK® Detection Coverage
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
            Every detection rule is validated using Atomic Red Team or manual threat emulation to ensure verified telemetry generation across Windows and Linux endpoints.
          </p>
        </div>

        {/* Tactic Filters Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-thin scrollbar-thumb-slate-800">
          {tactics.map((tactic) => (
            <button
              key={tactic}
              onClick={() => setSelectedTactic(tactic)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedTactic === tactic
                  ? 'bg-cyan-600 text-white font-semibold shadow-md shadow-cyan-950/40'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {tactic}
            </button>
          ))}
        </div>

        {/* Matrix Grid & Detail View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Grid: Technique Cards (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredTechniques.map((tech) => {
              const isSelected = activeTechnique?.id === tech.id;
              return (
                <div
                  key={tech.id}
                  onClick={() => setActiveTechnique(tech)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500/80 shadow-lg shadow-cyan-950/30 ring-1 ring-cyan-500/50'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30">
                        {tech.code}
                      </span>
                      <span
                        className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded ${
                          tech.severity === 'Critical'
                            ? 'bg-red-950/80 text-red-400 border border-red-800'
                            : 'bg-amber-950/80 text-amber-400 border border-amber-800'
                        }`}
                      >
                        {tech.severity}
                      </span>
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-white leading-snug">
                      {tech.name}
                    </h3>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-medium">{tech.tactic}</span>
                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> {tech.coverageStatus}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Selected Technique Deep Dive Inspector (5 cols) */}
          <div className="lg:col-span-5">
            {activeTechnique ? (
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-5 sticky top-24">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="space-y-0.5">
                    <span className="text-xs font-mono text-cyan-400 font-bold">
                      {activeTechnique.code}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {activeTechnique.name}
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300 font-medium">
                    {activeTechnique.tactic}
                  </span>
                </div>

                {/* Validation Test */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" /> Adversary Emulation Method
                  </span>
                  <p className="text-xs font-mono text-amber-200">
                    {activeTechnique.testedWith}
                  </p>
                </div>

                {/* Detection Rule Name */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Production Detection Rule
                  </span>
                  <p className="text-xs font-mono text-cyan-300">
                    {activeTechnique.detectionRuleName}
                  </p>
                </div>

                {/* Telemetry Ingestion Checklist */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Telemetry Ingestion & Verification
                  </span>
                  <div className="space-y-1.5 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Windows Event Logs & Sysmon correlation active</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Atomic Red Team payload generated telemetry</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Zero noise in standard baseline testing</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 text-center text-slate-400 text-xs">
                Select a technique from the matrix to inspect detection rule and emulation details.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
