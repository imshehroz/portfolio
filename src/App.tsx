/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { TriageSimulatorSection } from './components/TriageSimulatorSection';
import { MitreCoverageSection } from './components/MitreCoverageSection';
import { CertificationsSection } from './components/CertificationsSection';
import { HomeLabTopologySection } from './components/HomeLabTopologySection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { SOCProject } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<SOCProject | null>(null);

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToSimulator = () => {
    const el = document.getElementById('triage-simulator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950 flex flex-col justify-between font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Cyber / SOC Command Hero */}
        <Hero
          onScrollToProjects={handleScrollToProjects}
          onScrollToSimulator={handleScrollToSimulator}
        />

        {/* SIEM & Detection Labs */}
        <ProjectsSection
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* Live Interactive SOC Alert Triage Simulator */}
        <TriageSimulatorSection />

        {/* MITRE ATT&CK Matrix & Detection Coverage */}
        <MitreCoverageSection />

        {/* Certifications & Verified Credentials */}
        <CertificationsSection />

        {/* Home Lab Topology & Telemetry Ingestion */}
        <HomeLabTopologySection />

        {/* Security Competencies & Skills */}
        <SkillsSection />

        {/* Operational SOC Experience */}
        <ExperienceSection />

        {/* Contact & Hiring */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Deep Dive Incident / Detection Writeup Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
