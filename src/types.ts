export type ProjectCategory = 
  | 'Detection Engineering' 
  | 'Incident Response & DFIR' 
  | 'Threat Hunting' 
  | 'Malware & Phishing Triage' 
  | 'Network & PCAP Forensics' 
  | 'Cloud Security';

export interface SOCProject {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  featured: boolean;
  bentoSpan?: 'col-span-1' | 'col-span-2' | 'col-span-3';
  thumbnailUrl: string;
  mitreTactics: string[]; // e.g. ["T1059.001 - PowerShell", "T1003 - OS Credential Dumping"]
  siemTools: string[]; // e.g. ["Splunk", "Sysmon", "Atomic Red Team", "Wireshark"]
  logSources: string[]; // e.g. ["Windows Event Logs (Security)", "Sysmon (EID 1, 3, 10)", "Zeek Conn/DNS"]
  metrics: {
    label: string;
    value: string;
  }[];
  githubUrl?: string;
  writeupUrl?: string;
  sampleQuery?: {
    engine: 'Splunk (SPL)' | 'Microsoft Sentinel (KQL)' | 'Sigma Rule' | 'YARA';
    code: string;
  };
  attackScenario?: string;
  detectionLogic?: string[];
  containmentPlaybook?: string[];
  iocs?: {
    type: 'IP' | 'Hash (SHA256)' | 'Domain' | 'RegKey' | 'Process';
    value: string;
    context: string;
  }[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId: string;
  verifyUrl?: string;
  badgeUrl?: string;
  category: 'Defense & SOC' | 'Cloud & Identity' | 'Full-Stack & Engineering' | 'Digital Strategy & Marketing' | 'Design & UI/UX' | 'Project Management' | string;
  status?: 'Verified' | 'In Progress';
  skills: string[];
}

export interface MitreTechnique {
  id: string;
  code: string;
  name: string;
  tactic: 'Initial Access' | 'Execution' | 'Persistence' | 'Privilege Escalation' | 'Defense Evasion' | 'Credential Access' | 'Lateral Movement' | 'Exfiltration';
  coverageStatus: 'Fully Covered' | 'Hunting Rule Active' | 'Telemetry Ingested';
  testedWith: string; // e.g. "Atomic Red Team T1059"
  detectionRuleName: string;
  severity: 'Critical' | 'High' | 'Medium';
}

export interface TriageScenario {
  id: string;
  alertTitle: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  timestamp: string;
  sourceHost: string;
  userAccount: string;
  logSource: string;
  description: string;
  sysmonLog: string;
  mitreMapping: string;
  iocs: {
    artifact: string;
    reputation: 'Malicious' | 'Suspicious' | 'Benign';
    details: string;
  }[];
  triageSteps: {
    step: string;
    recommendedAction: string;
    completed?: boolean;
  }[];
  verdict: 'True Positive - Containment Required' | 'False Positive - Legitimate Admin Action' | 'Inconclusive - Escalation Required';
  remediationSummary: string;
}

export interface HomeLabNode {
  id: string;
  name: string;
  role: string;
  os: string;
  specs: string;
  tools: string[];
  status: 'Online' | 'Ingesting Telemetry' | 'Target VM';
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: number; // 1-100
    experience: string;
    tag?: string;
    highlight?: boolean;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'Full-time' | 'Contract' | 'SOC Lab & Research' | 'Internship';
  description: string[];
  technologies: string[];
  metrics?: string[];
  verifiedDoc?: {
    type: 'Experience Letter' | 'Internship Certificate';
    issuedDate: string;
    details: string;
  };
}

export type ProjectLayoutMode = 'bento' | 'grid' | 'feature' | 'simulator';
