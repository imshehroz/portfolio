import React, { useState, useEffect, useRef } from 'react';
import { 
  Radio, 
  Activity, 
  ShieldCheck, 
  ShieldAlert, 
  Terminal, 
  Zap, 
  Pause, 
  Play, 
  RotateCcw, 
  Filter, 
  Server, 
  Cpu, 
  Wifi, 
  AlertTriangle,
  Flame,
  Bug,
  Eye
} from 'lucide-react';

interface TelemetryEvent {
  id: string;
  timestamp: string;
  source: string;
  severity: 'info' | 'low' | 'medium' | 'high' | 'critical';
  event: string;
  category: string;
  host: string;
}

const INITIAL_EVENTS: TelemetryEvent[] = [
  {
    id: 'evt-101',
    timestamp: 'Just now',
    source: 'Wazuh-HIDS',
    severity: 'critical',
    event: 'Rule 5710: High-frequency SSH brute-force (18 attempts/min)',
    category: 'Credential Access',
    host: 'SRV-ROCKY-01'
  },
  {
    id: 'evt-102',
    timestamp: '3s ago',
    source: 'OpenVAS-GVM',
    severity: 'high',
    event: 'NVT Finding: Missing HSTS & Content-Security-Policy header',
    category: 'Vulnerability Audit',
    host: 'WEB-STAGING-02'
  },
  {
    id: 'evt-103',
    timestamp: '7s ago',
    source: 'pfSense-Suricata',
    severity: 'medium',
    event: 'ET SCAN Potential Nmap Scripting Engine Probe on TCP:443',
    category: 'Reconnaissance',
    host: '192.168.56.1'
  },
  {
    id: 'evt-104',
    timestamp: '12s ago',
    source: 'OSSEC FIM',
    severity: 'low',
    event: 'Syscheck: SHA256 integrity verified for /etc/pam.d/sshd',
    category: 'Integrity Check',
    host: 'UBUNTU-SIEM'
  },
  {
    id: 'evt-105',
    timestamp: '16s ago',
    source: 'Docker / CI-CD',
    severity: 'info',
    event: 'Clean build verified: container image passed vulnerability lint',
    category: 'DevOps Security',
    host: 'BUILD-RUNNER-04'
  }
];

const SIMULATED_STREAM_POOL: Omit<TelemetryEvent, 'id' | 'timestamp'>[] = [
  {
    source: 'Wazuh Active Response',
    severity: 'high',
    event: 'Active-response firewall-drop executed against IP 192.168.1.240',
    category: 'Automated Containment',
    host: 'SRV-ROCKY-01'
  },
  {
    source: 'Laravel Audit Log',
    severity: 'medium',
    event: 'RBAC Authorization Check: Unauthorized role escalation rejected for user_id=48',
    category: 'Application Security',
    host: 'HIREFUSION-APP'
  },
  {
    source: 'Kali PenTest Node',
    severity: 'low',
    event: 'Simulated Nmap SYN sweep completed across 192.168.56.0/24 subnet',
    category: 'Emulation Lab',
    host: 'KALI-ATTACK'
  },
  {
    source: 'OpenVAS Engine',
    severity: 'info',
    event: 'CVE database definitions synchronized with Greenbone Security Feed',
    category: 'Threat Intel',
    host: 'OPENVAS-GVM'
  },
  {
    source: 'Rocky Linux Auth',
    severity: 'info',
    event: 'Successful SSH session initiated via Ed25519 public key for user admin_shehroz',
    category: 'Authentication',
    host: 'SRV-ROCKY-01'
  },
  {
    source: 'Nginx Security Header',
    severity: 'info',
    event: 'CSP & X-Frame-Options DENY validated for theroarworks.com assessment',
    category: 'Web Posture',
    host: 'THEROARWORKS-SRV'
  },
  {
    source: 'Wazuh Rootcheck',
    severity: 'critical',
    event: 'Rootcheck scan completed: 0 rootkits or trojans detected on target node',
    category: 'System Health',
    host: 'SRV-ROCKY-01'
  }
];

export const LiveTelemetryRadar: React.FC = () => {
  const [events, setEvents] = useState<TelemetryEvent[]>(INITIAL_EVENTS);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [packetCount, setPacketCount] = useState<number>(142980);
  const [radarDegree, setRadarDegree] = useState<number>(0);
  const [blips, setBlips] = useState<{ id: number; x: number; y: number; label: string; severity: string; opacity: number }[]>([
    { id: 1, x: 68, y: 35, label: 'SSH Brute-Force', severity: 'critical', opacity: 1 },
    { id: 2, x: 30, y: 70, label: 'Nmap SYN Sweep', severity: 'medium', opacity: 0.9 },
    { id: 3, x: 80, y: 78, label: 'OpenVAS CVE Probe', severity: 'high', opacity: 0.85 },
    { id: 4, x: 45, y: 25, label: 'FIM Check OK', severity: 'low', opacity: 0.7 }
  ]);

  // Animated radar sweep
  useEffect(() => {
    let animationFrame: number;
    const animateRadar = () => {
      setRadarDegree((prev) => (prev + 1.2) % 360);
      animationFrame = requestAnimationFrame(animateRadar);
    };
    animationFrame = requestAnimationFrame(animateRadar);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Real-time packet counter animation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setPacketCount((prev) => prev + Math.floor(Math.random() * 24) + 12);
    }, 400);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Live telemetry event feeder
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      const randomItem = SIMULATED_STREAM_POOL[Math.floor(Math.random() * SIMULATED_STREAM_POOL.length)];
      const newEvent: TelemetryEvent = {
        ...randomItem,
        id: `evt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        timestamp: 'Just now'
      };

      setEvents((prev) => [newEvent, ...prev.slice(0, 7)]);

      // Spawn random radar blip
      if (Math.random() > 0.4) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 20 + Math.random() * 65; // percentage
        const x = 50 + (radius / 2) * Math.cos(angle);
        const y = 50 + (radius / 2) * Math.sin(angle);
        
        setBlips((prevBlips) => [
          {
            id: Date.now(),
            x: Math.min(Math.max(x, 10), 90),
            y: Math.min(Math.max(y, 10), 90),
            label: randomItem.source,
            severity: randomItem.severity,
            opacity: 1
          },
          ...prevBlips.slice(0, 5)
        ]);
      }
    }, 2800);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Manual inject attack simulation button
  const handleInjectSimulation = () => {
    const attackEvent: TelemetryEvent = {
      id: `evt-injected-${Date.now()}`,
      timestamp: 'Just now',
      source: 'Kali PenTest Simulation',
      severity: 'critical',
      event: 'INJECTED: Simulated Hydra SSH dictionary spray + Wazuh Active Response triggered',
      category: 'Simulated Adversary',
      host: 'SRV-ROCKY-01'
    };
    setEvents((prev) => [attackEvent, ...prev.slice(0, 7)]);
    setBlips((prev) => [
      { id: Date.now(), x: 50, y: 48, label: 'MANUAL ATTACK INJECTED', severity: 'critical', opacity: 1 },
      ...prev.slice(0, 5)
    ]);
  };

  const filteredEvents = events.filter((e) => {
    if (filterSeverity === 'all') return true;
    return e.severity === filterSeverity;
  });

  const getSeverityBadge = (sev: TelemetryEvent['severity']) => {
    switch (sev) {
      case 'critical':
        return 'bg-red-950/80 text-red-400 border border-red-500/40 animate-pulse';
      case 'high':
        return 'bg-amber-950/80 text-amber-400 border border-amber-500/40';
      case 'medium':
        return 'bg-cyan-950/80 text-cyan-400 border border-cyan-500/40';
      case 'low':
        return 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40';
      default:
        return 'bg-slate-900 text-slate-400 border border-slate-800';
    }
  };

  return (
    <div className="w-full bg-slate-950/90 border border-cyan-500/30 rounded-2xl p-5 sm:p-7 shadow-2xl relative overflow-hidden backdrop-blur-md">
      
      {/* Background Grid Pattern & Live Scan Line */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d408_1px,transparent_1px),linear-gradient(to_bottom,#06b6d408_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      {/* Live Animated Scanning Line across the top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />

      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-800/80 relative z-10">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
            <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
              Live SOC Telemetry Radar &amp; Ingestion Feed
            </h3>
            <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-500/40 font-semibold tracking-wider">
              Active Lab Stream
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Real-time event stream from Wazuh SIEM, OSSEC HIDS, OpenVAS scans, and Rocky Linux hosts.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={handleInjectSimulation}
            className="px-3 py-1.5 rounded-xl bg-red-950/90 hover:bg-red-900 border border-red-500/50 text-red-300 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
            title="Inject attack simulation"
          >
            <Zap className="w-3.5 h-3.5 text-red-400" />
            <span>Simulate Threat</span>
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-400" />
                <span>Pause Feed</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                <span>Resume Feed</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-800 rounded-xl p-1 text-xs">
            <span className="text-[11px] text-slate-400 px-1.5">Filter:</span>
            {['all', 'critical', 'high'].map((sev) => (
              <button
                key={sev}
                onClick={() => setFilterSeverity(sev)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono capitalize transition-all ${
                  filterSeverity === sev
                    ? 'bg-cyan-600 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Radar Screen on Left + Live Log Stream on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 relative z-10">
        
        {/* Left Column: Live Cyber Radar Scope */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 rounded-xl bg-slate-950 border border-slate-800/90 relative overflow-hidden">
          
          <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-3 font-mono">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Radio className="w-3.5 h-3.5 animate-spin" />
              <span>RADAR: 192.168.56.0/24</span>
            </span>
            <span className="text-slate-400">SWEEP: {Math.round(radarDegree)}°</span>
          </div>

          {/* Interactive Circular Radar Canvas Area */}
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full border-2 border-cyan-500/30 bg-slate-950 flex items-center justify-center shadow-[inset_0_0_30px_rgba(6,182,212,0.15)] overflow-hidden">
            
            {/* Concentric Circles */}
            <div className="absolute w-44 h-44 sm:w-50 sm:h-50 rounded-full border border-cyan-500/20" />
            <div className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-cyan-500/20" />
            <div className="absolute w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-cyan-500/20" />
            <div className="absolute w-full h-[1px] bg-cyan-500/20" />
            <div className="absolute h-full w-[1px] bg-cyan-500/20" />

            {/* Sweep Needle Line with Gradient Trail */}
            <div 
              className="absolute top-0 left-0 w-full h-full origin-center pointer-events-none"
              style={{ transform: `rotate(${radarDegree}deg)` }}
            >
              <div className="w-1/2 h-1/2 absolute top-0 right-0 bg-gradient-to-br from-cyan-400/40 via-cyan-500/10 to-transparent [clip-path:polygon(0_100%,100%_0,100%_100%)] origin-bottom-left" />
              <div className="w-[2px] h-1/2 bg-cyan-300 shadow-[0_0_8px_#22d3ee] absolute top-0 left-1/2" />
            </div>

            {/* Center Blip */}
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] z-10" />

            {/* Animated Threat Blips */}
            {blips.map((blip) => (
              <div
                key={blip.id}
                className="absolute flex items-center justify-center pointer-events-none transition-all duration-700"
                style={{
                  left: `${blip.x}%`,
                  top: `${blip.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div
                  className={`w-3 h-3 rounded-full animate-ping absolute ${
                    blip.severity === 'critical'
                      ? 'bg-red-400'
                      : blip.severity === 'high'
                      ? 'bg-amber-400'
                      : 'bg-cyan-400'
                  }`}
                />
                <div
                  className={`w-2 h-2 rounded-full z-10 ${
                    blip.severity === 'critical'
                      ? 'bg-red-500'
                      : blip.severity === 'high'
                      ? 'bg-amber-500'
                      : 'bg-cyan-400'
                  }`}
                />
                <span className="absolute left-3 top-[-6px] text-[9px] font-mono whitespace-nowrap bg-slate-900/90 px-1 py-0.5 rounded text-slate-300 border border-slate-800">
                  {blip.label}
                </span>
              </div>
            ))}
          </div>

          {/* Radar Metrics Footer */}
          <div className="w-full grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-900 text-center">
            <div className="bg-slate-900/60 p-1.5 rounded-lg">
              <span className="text-[10px] text-slate-400 block font-mono">PACKETS</span>
              <span className="text-xs font-mono font-bold text-cyan-300">
                {packetCount.toLocaleString()}
              </span>
            </div>
            <div className="bg-slate-900/60 p-1.5 rounded-lg">
              <span className="text-[10px] text-slate-400 block font-mono">LATENCY</span>
              <span className="text-xs font-mono font-bold text-emerald-400">1.4 ms</span>
            </div>
            <div className="bg-slate-900/60 p-1.5 rounded-lg">
              <span className="text-[10px] text-slate-400 block font-mono">SENSORS</span>
              <span className="text-xs font-mono font-bold text-cyan-300">5 Active</span>
            </div>
          </div>

        </div>

        {/* Right Column: Real-Time Event Log Stream */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span className="font-mono flex items-center gap-1.5 text-slate-300">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>SIEM EVENT STREAM (SYSCHECK & ALERTS)</span>
            </span>
            <span className="text-[11px] font-mono text-cyan-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              {filteredEvents.length} Events Listed
            </span>
          </div>

          {/* Event Stream Container */}
          <div className="space-y-2 overflow-y-auto max-h-[300px] pr-1">
            {filteredEvents.map((evt, index) => (
              <div
                key={evt.id}
                className={`p-3 rounded-xl bg-slate-900/80 border border-slate-800/90 hover:border-cyan-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 ${
                  index === 0 ? 'border-cyan-500/50 bg-cyan-950/20' : ''
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 shrink-0">
                    {evt.severity === 'critical' ? (
                      <Flame className="w-4 h-4 text-red-400 animate-pulse" />
                    ) : evt.severity === 'high' ? (
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Activity className="w-4 h-4 text-cyan-400" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-white leading-tight">
                        {evt.event}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400 font-mono flex-wrap">
                      <span className="text-cyan-300">{evt.source}</span>
                      <span>•</span>
                      <span className="text-slate-300">Host: {evt.host}</span>
                      <span>•</span>
                      <span className="text-slate-400">{evt.category}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center sm:flex-col items-end gap-1 shrink-0">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${getSeverityBadge(evt.severity)}`}>
                    {evt.severity}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {evt.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Micro Status Ribbon */}
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Endpoints Hardened: <strong className="text-white">Rocky Linux 9.3</strong> &amp; <strong className="text-white">Ubuntu 22.04 LTS</strong></span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <span className="text-emerald-400">● OWASP Top 10 Mapped</span>
              <span className="text-cyan-400">● Wazuh Active-Response OK</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
