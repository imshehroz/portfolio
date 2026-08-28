import React, { useState } from 'react';
import { 
  Server, 
  Cpu, 
  Network, 
  Shield, 
  Layers, 
  Activity, 
  CheckCircle2, 
  Radio, 
  HardDrive, 
  Terminal 
} from 'lucide-react';
import { HOME_LAB_TOPOLOGY } from '../data/portfolioData';
import { HomeLabNode } from '../types';

export const HomeLabTopologySection: React.FC = () => {
  const [activeNode, setActiveNode] = useState<HomeLabNode>(HOME_LAB_TOPOLOGY[0]);

  return (
    <section id="homelab" className="py-20 bg-slate-900/60 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-xs font-semibold text-cyan-400 mb-4">
            <Server className="w-3.5 h-3.5" />
            <span>Virtualization & Telemetry Pipeline</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Attack & Defense Home Lab Architecture
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
            A self-hosted, virtualized SOC environment featuring Wazuh SIEM &amp; OSSEC log analysis, OpenVAS (GVM) vulnerability auditing, Rocky Linux hardened servers, and pfSense network traffic inspection.
          </p>
        </div>

        {/* Interactive Architecture View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Node Selector List (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            {HOME_LAB_TOPOLOGY.map((node) => {
              const isSelected = activeNode.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setActiveNode(node)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500/80 shadow-lg shadow-cyan-950/30 ring-1 ring-cyan-500/50'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}>
                      <Server className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm sm:text-base font-bold text-white">
                          {node.name}
                        </h3>
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                            node.status === 'Online'
                              ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                              : node.status === 'Ingesting Telemetry'
                              ? 'bg-cyan-950/80 text-cyan-400 border border-cyan-800'
                              : 'bg-amber-950/80 text-amber-400 border border-amber-800'
                          }`}
                        >
                          ● {node.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {node.role} • <span className="font-mono text-cyan-300">{node.os}</span>
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-slate-400 sm:text-right">
                    {node.specs.split('/')[0]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Detailed Node Inspector (5 cols) */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-5 sticky top-24">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[11px] font-mono uppercase text-cyan-400 font-semibold">
                    Node Specifications
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {activeNode.name}
                  </h3>
                </div>
                <span className="p-2 rounded-xl bg-cyan-950 border border-cyan-500/30 text-cyan-400">
                  <HardDrive className="w-5 h-5" />
                </span>
              </div>

              {/* Hardware Specs */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Allocated Resources
                </span>
                <p className="text-xs font-mono text-slate-200">
                  {activeNode.specs}
                </p>
              </div>

              {/* Operating System */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" /> Platform & OS
                </span>
                <p className="text-xs font-mono text-emerald-300">
                  {activeNode.os}
                </p>
              </div>

              {/* Installed Tools & Services */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Configured Services & Ingestion Tools
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeNode.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-slate-900 border border-slate-800 text-cyan-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
