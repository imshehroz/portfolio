import React, { useState } from 'react';
import { Shield, Terminal, Cpu, CheckCircle2, Sparkles, Lock, Crosshair, Wrench } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const categoryIcons = [Shield, Crosshair, Wrench];

  return (
    <section id="skills" className="py-20 border-t border-slate-800/80 bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-xs font-semibold text-cyan-400 mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>SOC & Detection Tooling Matrix</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Core Competencies & Security Skills
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 leading-relaxed">
            Hands-on expertise across modern SIEM platforms, EDR sensors, network forensics, detection engineering, and automation scripting.
          </p>
        </div>

        {/* Skill Category Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto max-w-full no-scrollbar">
            {SKILL_CATEGORIES.map((cat, idx) => {
              const Icon = categoryIcons[idx] || Shield;
              const isActive = activeCategory === idx;
              return (
                <button
                  key={cat.title}
                  onClick={() => setActiveCategory(idx)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-cyan-600 text-slate-950 font-bold shadow-md shadow-cyan-950/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Category Grid */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
              {SKILL_CATEGORIES[activeCategory].title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              {SKILL_CATEGORIES[activeCategory].description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SKILL_CATEGORIES[activeCategory].skills.map((skill) => (
              <div
                key={skill.name}
                className="p-4 rounded-xl bg-slate-950/90 border border-slate-800/80 hover:border-cyan-500/40 transition-colors space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="text-sm font-bold text-white">
                      {skill.name}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-cyan-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {skill.experience}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
