import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Terminal, 
  Sparkles, 
  ArrowRight, 
  FileCode2, 
  FileText, 
  Github, 
  Linkedin, 
  Mail, 
  Phone,
  CheckCircle2, 
  Crosshair, 
  Activity, 
  ExternalLink,
  Lock,
  Layers,
  ChevronRight,
  Edit3,
  Server,
  Zap
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { LiveTelemetryRadar } from './LiveTelemetryRadar';

interface HeroProps {
  onScrollToProjects: () => void;
  onScrollToSimulator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onScrollToProjects, 
  onScrollToSimulator 
}) => {
  const [activeQueryTab, setActiveQueryTab] = useState<'wazuh' | 'splunk' | 'kql' | 'sigma'>('wazuh');

  const demoQueries = {
    wazuh: `<rule id="100101" level="10">
  <if_sid>5710</if_sid>
  <match>Failed password for</match>
  <description>High Frequency SSH Brute Force against Rocky Linux Host</description>
  <mitre>
    <id>T1110.001</id>
  </mitre>
  <group>authentication_failures,pci_dss_10.2.4,</group>
</rule>`,
    splunk: `index=linux_auth (sourcetype="linux_secure" OR sourcetype="syslog") "Failed password"
| stats count as failed_attempts, earliest(_time) as first_seen, latest(_time) as last_seen by src_ip, user, host
| where failed_attempts > 10
| eval duration_mins=round((last_seen-first_seen)/60, 2)
| sort - failed_attempts`,
    kql: `SecurityEvent
| where EventID == 4625 // Failed Logon
| where LogonType in (3, 10) // Network or RemoteInteractive
| summarize FailedCount = count(), TargetUsers = make_set(TargetUserName) by bin(TimeGenerated, 5m), IpAddress, Computer
| where FailedCount >= 5
| order by FailedCount desc`,
    sigma: `title: Wazuh SSH Brute Force & Unauthorized Root Logon
logsource:
    product: linux
    service: auth
detection:
    failed_attempts:
        message|contains: 'Failed password for'
    target:
        message|contains: 'invalid user root'
    timeframe: 2m
    condition: failed_attempts | count() > 5 or target
level: high`
  };

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Cyber radar / glow background effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[350px] bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Status Badge */}
          <div
            id="hero-status-badge"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs sm:text-sm font-medium text-slate-300 shadow-inner mb-6 hover:border-cyan-500/50 transition-colors"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-cyan-300">{PERSONAL_INFO.status}</span>
          </div>

          {/* Main Title */}
          <h1
            id="hero-main-title"
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-5"
          >
            Security Analyst &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-300">
              SOC Detection Engineer
            </span>
          </h1>

          {/* Subtitle / Bio */}
          <p
            id="hero-bio-text"
            className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mb-8 leading-relaxed font-normal"
          >
            Hi, I'm <strong className="text-white font-semibold">{PERSONAL_INFO.name}</strong> — Software Engineering graduate from <span className="text-cyan-300 font-semibold">SZABIST University</span> with hands-on experience in vulnerability assessment, SIEM threat detection (<strong className="text-white font-medium">Wazuh, OSSEC, OpenVAS</strong>), Linux administration (<strong className="text-white font-medium">Rocky Linux</strong>), and secure full-stack SDLC.
          </p>

          {/* Quick Contact & Profile Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8 text-xs font-mono text-slate-300">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>{PERSONAL_INFO.email}</span>
            </a>

            <a
              href={`tel:${PERSONAL_INFO.phone.replace(/[^0-9+]/g, '')}`}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>{PERSONAL_INFO.phone}</span>
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
              <span>LinkedIn</span>
            </a>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors"
            >
              <Github className="w-3.5 h-3.5 text-cyan-400" />
              <span>GitHub</span>
            </a>
          </div>

          {/* Action CTAs */}
          <div id="hero-actions-group" className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full mb-12">
            <button
              id="hero-btn-explore-projects"
              onClick={onScrollToProjects}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-sm sm:text-base transition-all duration-200 shadow-lg shadow-cyan-600/25 active:scale-95 group"
            >
              <span>Explore Security Labs &amp; Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="hero-btn-triage-simulator"
              onClick={onScrollToSimulator}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-cyan-300 font-semibold text-sm sm:text-base transition-all duration-200 shadow-sm hover:border-cyan-500/50"
            >
              <ShieldAlert className="w-4 h-4 text-cyan-400" />
              <span>SOC Alert Triage Simulator</span>
            </button>

            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-medium text-sm sm:text-base transition-all duration-200"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Get in Touch</span>
            </a>
          </div>

          {/* Interactive Live Query Terminal Preview */}
          <div className="w-full max-w-3xl rounded-2xl bg-slate-950 border border-slate-800/90 shadow-2xl overflow-hidden mb-12 text-left">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs font-mono text-slate-400 ml-2 hidden sm:inline">
                  shehroz@wazuh-siem ~ detection-rules
                </span>
              </div>

              {/* Engine Switcher */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 overflow-x-auto">
                <button
                  onClick={() => setActiveQueryTab('wazuh')}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-medium transition-colors whitespace-nowrap ${
                    activeQueryTab === 'wazuh'
                      ? 'bg-cyan-600 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Wazuh XML
                </button>
                <button
                  onClick={() => setActiveQueryTab('splunk')}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-medium transition-colors whitespace-nowrap ${
                    activeQueryTab === 'splunk'
                      ? 'bg-cyan-600 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Splunk (SPL)
                </button>
                <button
                  onClick={() => setActiveQueryTab('kql')}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-medium transition-colors whitespace-nowrap ${
                    activeQueryTab === 'kql'
                      ? 'bg-cyan-600 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Sentinel (KQL)
                </button>
                <button
                  onClick={() => setActiveQueryTab('sigma')}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-medium transition-colors whitespace-nowrap ${
                    activeQueryTab === 'sigma'
                      ? 'bg-cyan-600 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Sigma
                </button>
              </div>
            </div>

            <div className="p-4 font-mono text-xs sm:text-sm text-cyan-300 overflow-x-auto leading-relaxed bg-slate-950 select-all max-h-[160px]">
              <pre>{demoQueries[activeQueryTab]}</pre>
            </div>
          </div>

          {/* LIVE ANIMATION SECTION: Real-Time SOC Telemetry Radar */}
          <div className="w-full mb-12">
            <LiveTelemetryRadar />
          </div>

          {/* Key Metrics / Highlights Grid */}
          <div
            id="hero-stats-grid"
            className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl pt-4 border-t border-slate-800/80"
          >
            {PERSONAL_INFO.stats.map((stat, idx) => (
              <div
                key={idx}
                id={`hero-stat-card-${idx}`}
                className="flex flex-col items-center p-3.5 sm:p-4 rounded-xl bg-slate-900/50 border border-slate-800/60 hover:border-cyan-500/40 transition-colors"
              >
                <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400 tracking-tight mb-1 font-mono">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-slate-400 font-medium text-center">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
