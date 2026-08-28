import React from 'react';
import { ArrowUp, ShieldAlert } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-sm text-white">{PERSONAL_INFO.name}</span>
              <p className="text-xs text-slate-500">Cybersecurity SOC Analyst & Detection Engineer Portfolio</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
            <a href="#hero" className="hover:text-white transition-colors">Home</a>
            <a href="#projects" className="hover:text-white transition-colors">Labs</a>
            <a href="#triage-simulator" className="hover:text-white transition-colors">Alert Simulator</a>
            <a href="#mitre" className="hover:text-white transition-colors">MITRE Matrix</a>
            <a href="#certifications" className="hover:text-white transition-colors">Certifications</a>
            <a href="#homelab" className="hover:text-white transition-colors">Home Lab</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          <button
            id="footer-scroll-top-btn"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 text-xs font-medium transition-colors"
            title="Scroll to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-900 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved. Built with SIEM detection workflows, NIST incident handling playbooks, and responsive design.
        </div>
      </div>
    </footer>
  );
};
