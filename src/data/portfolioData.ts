import { 
  SOCProject, 
  Certification, 
  MitreTechnique, 
  TriageScenario, 
  HomeLabNode, 
  SkillCategory, 
  ExperienceItem 
} from '../types';

export const PERSONAL_INFO = {
  name: 'Shehroz Javed',
  title: 'Security Analyst & SOC Engineer',
  roleLevel: 'SOC Analyst / Threat Detection & Cloud Security',
  education: 'BS Software Engineering — SZABIST University, Islamabad (Feb 2022 – Feb 2026)',
  shortBio: 'Security-focused Software Engineering graduate with hands-on experience in vulnerability assessment, SIEM-based threat detection (Wazuh, OSSEC), and Linux system administration. Full-stack & DevOps background provides deep insight into application-layer attack surfaces, secure SDLC, and infrastructure hardening.',
  location: 'Islamabad / Rawalpindi, Pakistan (Open to Remote, Hybrid & Global Relocation)',
  phone: '+92 335 546 2084',
  email: 'imshehrozjaved@gmail.com',
  github: 'https://github.com/imshehroz',
  linkedin: 'https://linkedin.com/in/shehroz-javed',
  tryhackme: 'https://tryhackme.com',
  hackthebox: 'https://hackthebox.com',
  status: 'Actively Interviewing for SOC Analyst, Security & DevOps Roles',
  summaryBullets: [
    'Built and managed multi-node Home SOC Lab utilizing Wazuh, OSSEC, OpenVAS/GVM, and Kali Linux for real-time threat detection and vulnerability scanning.',
    'Hands-on experience administering Rocky Linux, managing user access controls, and hardening CI/CD deployment pipelines at Deister Software.',
    'Engineered secure web applications with granular Role-Based Access Control (RBAC) and SQL injection mitigation in Laravel/PHP at WebicoSoft.',
    'Pursuing CompTIA Security+ (SY0-701) and AWS Solutions Architect (SAA-C03) certifications.'
  ],
  stats: [
    { label: 'Security & Dev Projects', value: '6+' },
    { label: 'CVE Vulnerabilities Audited', value: '120+' },
    { label: 'Wazuh & OSSEC Rules Mapped', value: '35+' },
    { label: 'Industry Certifications', value: '4' },
  ]
};

export const SOC_PROJECTS: SOCProject[] = [
  {
    id: 'home-soc-lab',
    title: 'Home SOC Lab — SIEM & Threat Detection',
    tagline: 'Wazuh SIEM, OSSEC log aggregation, OpenVAS/GVM vulnerability auditing & Kali exploitation exercises',
    description: 'Constructed an end-to-end security operations center lab across virtualized Linux & Windows endpoints to ingest logs, detect brute-force attacks, execute LOLBAS exploits, and perform CVE-based vulnerability remediation.',
    longDescription: 'Engineered a multi-tier virtualized SOC environment in an isolated subnet. Configured Wazuh Manager and OSSEC agents to stream endpoint telemetry, File Integrity Monitoring (FIM) alerts, and rootcheck logs. Deployed OpenVAS (Greenbone Vulnerability Management) to audit network services for known CVEs, generate risk scoring matrices, and formulate patch remediation plans. Executed controlled Kali Linux penetration tests (hydra brute force, Nmap NSE scripts, and web exploitation) to validate SIEM alerting rules.',
    category: 'Detection Engineering',
    featured: true,
    bentoSpan: 'col-span-2',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    mitreTactics: ['T1110 - Brute Force', 'T1059.004 - Unix Shell', 'T1595.002 - Vulnerability Scanning', 'T1078 - Valid Accounts'],
    siemTools: ['Wazuh SIEM 4.7', 'OSSEC HIDS', 'OpenVAS / GVM', 'Kali Linux', 'Nmap & Hydra', 'Wireshark'],
    logSources: ['/var/log/auth.log (SSH)', 'Wazuh Syscheck (FIM)', 'OSSEC Alert Stream', 'OpenVAS CVE XML Reports'],
    metrics: [
      { label: 'False Positive Reduction', value: '94%' },
      { label: 'CVEs Identified & Remediated', value: '40+' },
      { label: 'Real-time Ingestion', value: '5 Endpoints' }
    ],
    githubUrl: 'https://github.com/imshehroz',
    sampleQuery: {
      engine: 'Sigma Rule',
      code: `title: Wazuh SSH Brute Force and Root Login Attempt
id: a87492c1-3f18-4a92-802b-9273619a9101
status: production
description: Detects multiple failed SSH authentication attempts followed by successful logon
logsource:
    product: linux
    service: auth
detection:
    failed_attempts:
        message|contains: 'Failed password for'
    root_target:
        message|contains: 'invalid user root'
    timeframe: 2m
    condition: failed_attempts | count() > 5 or root_target
level: high`
    },
    attackScenario: 'Simulated adversary performing automated dictionary attacks against SSH port 22 and unauthorized enumeration of vulnerable Apache service.',
    detectionLogic: [
      'Configured custom Wazuh XML rules (Rule ID 5710/5712) to correlate >5 failed login attempts in 120s.',
      'Monitored OpenVAS vulnerability scan signatures and correlated with Nmap reconnaissance traces in pfSense firewall logs.',
      'Active Response trigger automatically generated iptables firewall drop rule for offending attacker IP for 60 minutes.'
    ],
    containmentPlaybook: [
      'Step 1: Automated active-response null-route of source attacker IP via Wazuh/iptables.',
      'Step 2: Enforce SSH key-only authentication (disable PasswordAuthentication and PermitRootLogin in /etc/ssh/sshd_config).',
      'Step 3: Run OpenVAS delta scan to confirm service remediation and generate post-incident report.'
    ],
    iocs: [
      { type: 'IP', value: '192.168.56.120', context: 'Attacker Kali VM generating high-velocity SSH login requests' },
      { type: 'Process', value: 'hydra -l root -P /usr/share/wordlists/rockyou.txt ssh://...', context: 'Brute force utility process artifact' },
      { type: 'RegKey', value: '/etc/pam.d/sshd & /etc/shadow', context: 'File Integrity Monitoring alert trigger' }
    ]
  },
  {
    id: 'hirefusion-fyp',
    title: 'HireFusion — AI-Based Hiring Management System (FYP)',
    tagline: 'Full-stack recruitment ecosystem with RBAC, secure authentication, and AI resume authenticity verification',
    description: 'Designed and developed a comprehensive hiring management platform with embedded security controls throughout the SDLC: granular Role-Based Access Control (RBAC), parameterized SQL queries, threat modeling, and AI-driven candidate verification.',
    longDescription: 'Final Year Project (FYP) at SZABIST University. Architected a multi-role recruitment system that leverages AI models for resume parsing, candidate-job matching, and automated interview preparation. Security was treated as a core pillar: formulated comprehensive architectural diagrams (ERDs, DFDs, sequence diagrams), implemented secure JWT/session authentication, strict input validation against XSS/SQLi, and audit trail logging for all administrative privilege actions.',
    category: 'Cloud Security',
    featured: true,
    bentoSpan: 'col-span-2',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    mitreTactics: ['T1078.004 - Cloud Accounts', 'T1190 - Exploit Public-Facing App', 'T1056.001 - Keylogging / Form Snatching'],
    siemTools: ['Python & FastAPI', 'Laravel / PHP Backend', 'MySQL Database', 'Docker Containerization', 'Git Audit Trails'],
    logSources: ['Application Audit Logs (Auth & Role Changes)', 'Nginx Access/Error Logs', 'API Authentication Requests'],
    metrics: [
      { label: 'Security Controls', value: '100% OWASP Mapped' },
      { label: 'RBAC Roles Managed', value: '4 Levels' },
      { label: 'Threat Models Documented', value: 'DFD & STRIDE' }
    ],
    githubUrl: 'https://github.com/imshehroz',
    sampleQuery: {
      engine: 'Microsoft Sentinel (KQL)',
      code: `AppRequests
| where TimeGenerated > ago(24h)
| where ResultCode in (401, 403) or Url has_any ("admin", "eval", "union", "select")
| summarize FailedAuthAttempts = count(), DistinctIPs = dcount(ClientIP) by bin(TimeGenerated, 5m), OperationName
| where FailedAuthAttempts > 20
| order by FailedAuthAttempts desc`
    },
    attackScenario: 'Malicious actor attempting authentication bypass and privilege escalation from Candidate role to Super Admin via IDOR and HTTP parameter tampering.',
    detectionLogic: [
      'Enforced server-side session role validation on every API route; rejected unauthorized client-supplied role payloads.',
      'Logged all role alteration events to immutable audit table with actor timestamp and IP origin.',
      'Sanitized and validated all uploaded resume PDF/DOCX files using MIME verification to prevent malicious webshell uploads.'
    ],
    containmentPlaybook: [
      'Immediate invalidation of compromised user session tokens across Redis/database.',
      'Automated rate-limiting on authentication and verification API endpoints.',
      'Security audit of database queries to ensure strict parameterization and ORM binding.'
    ],
    iocs: [
      { type: 'Domain', value: 'hirefusion-api.internal.szabist', context: 'Protected internal API gateway endpoint' },
      { type: 'Hash (SHA256)', value: 'b4c810d7e23194a8fbc8921473104e1201948210394812039481203948120394', context: 'Verified clean application container build artifact' }
    ]
  },
  {
    id: 'theroarworks-security-assessment',
    title: 'Web Application Security Assessment — theroarworks.com',
    tagline: 'Comprehensive external attack surface mapping, SSL/TLS cypher audit, and HTTP header hardening',
    description: 'Conducted a structured passive & active security audit of theroarworks.com. Mapped DNS attack surface, verified SSL/TLS cyphers, analyzed certificate chains, and delivered actionable remediation achieving an A+ security header rating.',
    longDescription: 'Executed an end-to-end web posture assessment following OWASP testing methodology. Conducted subdomain discovery, WHOIS and DNS zone inspection, and SSL/TLS configuration audits using testssl.sh and SSL Labs. Identified missing security headers (HSTS, Content-Security-Policy, X-Frame-Options) and CORS misconfigurations. Prepared an executive vulnerability report with prioritized CVSS remediation steps implemented on production Nginx servers.',
    category: 'Network & PCAP Forensics',
    featured: true,
    bentoSpan: 'col-span-1',
    thumbnailUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    mitreTactics: ['T1595.002 - Vulnerability Scanning', 'T1596 - Search Open Technical Databases', 'T1590 - Gather Victim Network Info'],
    siemTools: ['Nmap & Nikto', 'testssl.sh', 'Burp Suite Community', 'Dig / Whois', 'Nginx Security Hardening'],
    logSources: ['Web Server Access Logs', 'TLS Handshake Logs', 'DNS Query Logs'],
    metrics: [
      { label: 'Security Grade', value: 'Grade A+' },
      { label: 'Headers Hardened', value: '6 Key Directives' },
      { label: 'Attack Surface', value: 'Audited & Scoped' }
    ],
    githubUrl: 'https://github.com/imshehroz',
    sampleQuery: {
      engine: 'Sigma Rule',
      code: `title: Suspicious Web Scanning with Nikto/Nmap User-Agents
logsource:
    category: webserver
detection:
    selection:
        c-useragent|contains:
            - 'Nikto'
            - 'sqlmap'
            - 'Nmap Scripting Engine'
            - 'dirbuster'
    condition: selection
level: medium`
    },
    attackScenario: 'Automated adversary executing directory brute-forcing and vulnerability scanning against web application roots.',
    detectionLogic: [
      'Monitored web server logs for anomalous User-Agents and 404 error frequency spikes exceeding 50 req/min.',
      'Verified presence of strict Content-Security-Policy (CSP) and HSTS max-age headers to mitigate Clickjacking and downgrade attacks.'
    ],
    containmentPlaybook: [
      'Deploy Cloudflare/WAF rate limiting against scanner IP ranges.',
      'Inject hardened security headers (CSP, X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin) into server blocks.'
    ],
    iocs: [
      { type: 'Domain', value: 'theroarworks.com', context: 'Target production web application audited' }
    ]
  },
  {
    id: 'ai-resume-builder',
    title: 'AI Resume Builder & Smart Parser',
    tagline: 'Python & JavaScript platform with secure file handling and intelligent ATS keyword optimization',
    description: 'Built a lightweight AI-assisted resume formatting and optimization utility with secure backend data processing, input sanitization, and structured export formats.',
    longDescription: 'Created a developer and job-seeker tool featuring dynamic markdown/PDF rendering, AI-driven keyword matching against job descriptions, and privacy-conscious local processing. Engineered input validation routines to guard against Prompt Injection and arbitrary payload uploads.',
    category: 'Malware & Phishing Triage',
    featured: false,
    bentoSpan: 'col-span-1',
    thumbnailUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
    mitreTactics: ['T1059.006 - Python', 'T1204 - User Execution'],
    siemTools: ['Python 3.11', 'JavaScript / React', 'Tailwind CSS', 'JSON Schema Validation'],
    logSources: ['API Transaction Logs', 'File Parsing Telemetry'],
    metrics: [
      { label: 'Parsing Accuracy', value: '98%' },
      { label: 'Export Time', value: '< 1.5s' }
    ],
    githubUrl: 'https://github.com/imshehroz'
  },
  {
    id: 'university-management-system',
    title: 'University Management System with RBAC',
    tagline: 'Secure Laravel/PHP application with strict role segmentation, student records, and audit logging',
    description: 'Engineered a centralized campus administrative portal in Laravel and MySQL featuring multi-tier access control for administrators, faculty, and students with audit trail logging.',
    longDescription: 'Developed during academic coursework at SZABIST. Engineered secure authentication modules, protected against SQL injection and Cross-Site Request Forgery (CSRF) via Laravel ORM and CSRF tokens. Formulated complete relational schema with database triggers to maintain audit logs for grade alterations and fee records.',
    category: 'Incident Response & DFIR',
    featured: false,
    bentoSpan: 'col-span-1',
    thumbnailUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    mitreTactics: ['T1078.002 - Domain Accounts', 'T1056 - Input Capture'],
    siemTools: ['Laravel / PHP', 'MySQL Database', 'Git Version Control', 'PHPUnit Testing'],
    logSources: ['Laravel Activity Logs', 'MySQL General Query & Error Logs'],
    metrics: [
      { label: 'RBAC Tiers', value: '3 Separate Levels' },
      { label: 'SQLi Protection', value: '100% Parameterized' }
    ],
    githubUrl: 'https://github.com/imshehroz'
  },
  {
    id: 'linux-hardening-devops',
    title: 'Linux Server Hardening & DevOps Pipeline Security',
    tagline: 'Rocky Linux security hardening, AirTool deployments, and automated CI/CD checks at Deister Software',
    description: 'Hardened production Rocky Linux servers, implemented restrictive user permissions (sudoers, SSH keys), configured firewall rules, and built secure deployment pipelines with zero misconfigurations.',
    longDescription: 'During my Linux Administrator & DevOps internship at Deister Software Pakistan, I managed Rocky Linux server infrastructure. Implemented security hardening guidelines (disabling legacy protocols, enforcing least-privilege ACLs), monitored system journal logs for performance anomalies, and maintained deployments using AirTool across staging and production clusters.',
    category: 'Cloud Security',
    featured: false,
    bentoSpan: 'col-span-1',
    thumbnailUrl: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=800&q=80',
    mitreTactics: ['T1562.001 - Impair Defenses', 'T1078 - Valid Accounts', 'T1082 - System Information Discovery'],
    siemTools: ['Rocky Linux', 'Bash Scripting', 'AirTool Deployment', 'SSH / Key Management', 'Docker / CI/CD'],
    logSources: ['/var/log/secure & messages', 'Systemd Journald', 'Deployment Pipeline Execution Logs'],
    metrics: [
      { label: 'Server Hardening', value: 'Enforced' },
      { label: 'Deployment Uptime', value: '99.9%' }
    ],
    githubUrl: 'https://github.com/imshehroz'
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-google-digital-marketing',
    name: 'The Fundamentals of Digital Marketing',
    issuer: 'Google Digital Garage (IAB Europe & Open University)',
    issueDate: '09/07/2022',
    credentialId: 'RTQ CR6 JYR',
    verifyUrl: 'https://learndigital.withgoogle.com/link/1qsdpcedm9s',
    category: 'Digital Strategy & Marketing',
    status: 'Verified',
    skills: ['Web Analytics & Strategy', 'Search Optimization (SEO)', 'Content Strategy & Planning', 'Online Security & Identity']
  },
  {
    id: 'cert-pftp-fullstack',
    name: 'Full Stack Web Development Certification',
    issuer: 'Professional Freelancing Training Program (PFTP)',
    issueDate: '01-OCT-2022',
    credentialId: 'Serial: B719776 (Reg: pftp375417107685)',
    verifyUrl: 'https://pftp.edu.pk',
    category: 'Full-Stack & Engineering',
    status: 'Verified',
    skills: ['Full-Stack Web Architecture', 'PHP / Laravel', 'RESTful API Engineering', 'Database Design & SQL', 'Secure Coding']
  },
  {
    id: 'cert-pftp-graphic-design',
    name: 'Graphic Designing Certification',
    issuer: 'Professional Freelancing Training Program (PFTP)',
    issueDate: '01-OCT-2022',
    credentialId: 'Serial: B719775 (Reg: pftp375417107685)',
    verifyUrl: 'https://pftp.edu.pk',
    category: 'Design & UI/UX',
    status: 'Verified',
    skills: ['UI/UX & Visual Communication', 'Digital Asset Creation', 'Brand Identity', 'Layout & Typography']
  },
  {
    id: 'cert-great-learning-smm',
    name: 'Social Media Management Certification',
    issuer: 'Great Learning Academy',
    issueDate: 'July 2022',
    credentialId: 'DDOGSNFD',
    verifyUrl: 'https://verify.mygreatlearning.com/DDOGSNFD',
    category: 'Digital Strategy & Marketing',
    status: 'Verified',
    skills: ['Social Media Marketing Strategy', 'Audience Analytics & Engagement', 'Campaign Management', 'Digital Content Distribution']
  },
  {
    id: 'cert-secplus-in-progress',
    name: 'CompTIA Security+ (SY0-701)',
    issuer: 'CompTIA',
    issueDate: 'In Progress (Target 2026)',
    credentialId: 'CANDIDATE-IN-PROGRESS',
    verifyUrl: 'https://www.comptia.org/certifications/security',
    category: 'Defense & SOC',
    status: 'In Progress',
    skills: ['Threats, Attacks & Vulnerabilities', 'Architecture & Design', 'Incident Response & Triage', 'Governance, Risk & Compliance']
  },
  {
    id: 'cert-aws-cloud',
    name: 'AWS Certified Cloud Practitioner / Solutions Architect',
    issuer: 'Amazon Web Services (AWS)',
    issueDate: 'In Progress',
    credentialId: 'AWS-TRACK-ACTIVE',
    verifyUrl: 'https://aws.amazon.com/certification',
    category: 'Cloud & Identity',
    status: 'In Progress',
    skills: ['AWS EC2, S3, IAM, VPC Security', 'Cloud Infrastructure Design', 'Security Groups & ACLs', 'High Availability']
  }
];

export const MITRE_COVERAGE: MitreTechnique[] = [
  {
    id: 'mitre-1',
    code: 'T1110.001',
    name: 'Brute Force: Password Guessing',
    tactic: 'Credential Access',
    coverageStatus: 'Fully Covered',
    testedWith: 'Hydra SSH password spraying in Home SOC Lab',
    detectionRuleName: 'Multiple Failed SSH Authentication Events in Auth.log (Wazuh Rule 5710)',
    severity: 'High'
  },
  {
    id: 'mitre-2',
    code: 'T1595.002',
    name: 'Active Scanning: Vulnerability Scanning',
    tactic: 'Initial Access',
    coverageStatus: 'Fully Covered',
    testedWith: 'OpenVAS / GVM automated network sweeps & Nmap NSE',
    detectionRuleName: 'Port Sweep & CVE Probe Traffic Correlation',
    severity: 'Medium'
  },
  {
    id: 'mitre-3',
    code: 'T1059.004',
    name: 'Command and Scripting: Unix Shell',
    tactic: 'Execution',
    coverageStatus: 'Fully Covered',
    testedWith: 'Bash reverse shell invocation in isolated sandbox',
    detectionRuleName: 'Interactive Shell Spawned from Web Server Daemon (www-data)',
    severity: 'Critical'
  },
  {
    id: 'mitre-4',
    code: 'T1078.002',
    name: 'Valid Accounts: Domain & System Accounts',
    tactic: 'Defense Evasion',
    coverageStatus: 'Fully Covered',
    testedWith: 'Unauthorized sudo escalation and account privilege modification',
    detectionRuleName: 'Sudoers File Modification & Non-Standard Group Assignment',
    severity: 'High'
  },
  {
    id: 'mitre-5',
    code: 'T1190',
    name: 'Exploit Public-Facing Application',
    tactic: 'Initial Access',
    coverageStatus: 'Fully Covered',
    testedWith: 'SQL injection payload simulation and XSS injection tests',
    detectionRuleName: 'Web Application Firewall (WAF) Rule Violation & Error Spikes',
    severity: 'Critical'
  },
  {
    id: 'mitre-6',
    code: 'T1562.001',
    name: 'Impair Defenses: Disable or Modify Tools',
    tactic: 'Defense Evasion',
    coverageStatus: 'Hunting Rule Active',
    testedWith: 'Service stop commands targeting wazuh-agent / ossec daemons',
    detectionRuleName: 'Security Agent Daemon Termination Alert',
    severity: 'Critical'
  },
  {
    id: 'mitre-7',
    code: 'T1071.001',
    name: 'Application Layer Protocol: Web Traffic',
    tactic: 'Exfiltration',
    coverageStatus: 'Telemetry Ingested',
    testedWith: 'Anomalous POST request volume to external uncategorized IPs',
    detectionRuleName: 'High Volume Outbound HTTP Payload Transfer',
    severity: 'High'
  }
];

export const TRIAGE_SCENARIOS: TriageScenario[] = [
  {
    id: 'scenario-1',
    alertTitle: 'ALERT: Wazuh Rule 5710 — High Frequency SSH Brute-Force on Rocky Linux Server',
    severity: 'Critical',
    timestamp: '2025-08-14T11:42:19Z',
    sourceHost: 'SRV-ROCKY-01 (192.168.1.105)',
    userAccount: 'root / invalid_user',
    logSource: 'Wazuh Agent /var/log/auth.log',
    description: 'Wazuh SIEM triggered a high-severity alert. Multiple consecutive failed authentication attempts were recorded against port 22 within 60 seconds, followed by an unauthorized interactive shell invocation.',
    sysmonLog: `Wazuh Alert Data:
  Rule ID: 5710 (Level: 10) - SSH brute force attempt detected.
  Timestamp: 2025-08-14 11:42:19
  Agent: SRV-ROCKY-01 (ID: 004, IP: 192.168.1.105)
  Source IP: 192.168.1.240
  Target User: root
  Log Message: Aug 14 11:42:18 srv-rocky-01 sshd[4912]: Failed password for invalid user root from 192.168.1.240 port 44821 ssh2
  Trigger Count: 14 failed attempts in 35 seconds.
  Action Taken: Active Response (firewall-drop) initiated.`,
    mitreMapping: 'T1110.001 (Brute Force: Password Guessing) ➔ T1078 (Valid Accounts) ➔ T1059.004 (Unix Shell)',
    iocs: [
      {
        artifact: 'Source IP: 192.168.1.240',
        reputation: 'Malicious',
        details: 'Offending host performing automated dictionary credential stuffing against internal subnet.'
      },
      {
        artifact: 'Target Account: root',
        reputation: 'Malicious',
        details: 'Attempt to compromise superuser credentials directly via password authentication.'
      }
    ],
    triageSteps: [
      {
        step: '1. Inspect Wazuh Alert Telemetry',
        recommendedAction: 'Verified 14 rapid authentication failures from IP 192.168.1.240 in /var/log/auth.log.',
        completed: true
      },
      {
        step: '2. Check Active Response Firewall Status',
        recommendedAction: 'Confirmed active-response script executed: iptables -I INPUT -s 192.168.1.240 -j DROP.',
        completed: true
      },
      {
        step: '3. Validate SSH Hardening Configuration',
        recommendedAction: 'Verified sshd_config enforces PermitRootLogin no and PasswordAuthentication no.',
        completed: true
      },
      {
        step: '4. Perform OpenVAS CVE Scan on Target',
        recommendedAction: 'Executed delta vulnerability audit confirming no open unpatched OpenSSH vulnerabilities.',
        completed: true
      }
    ],
    verdict: 'True Positive - Containment Required',
    remediationSummary: 'Attacker IP automatically blocked by Wazuh active-response. SSH configuration verified to prohibit root password logins; no lateral movement or successful breach confirmed.'
  },
  {
    id: 'scenario-2',
    alertTitle: 'ALERT: OpenVAS High Severity CVE Finding — Vulnerable Web Service & Header Exposure',
    severity: 'High',
    timestamp: '2025-08-15T09:15:00Z',
    sourceHost: 'WEB-STAGING-02 (10.0.4.15)',
    userAccount: 'www-data',
    logSource: 'OpenVAS / Greenbone Vulnerability Management Scan',
    description: 'Automated vulnerability scanner flagged missing HTTP security headers (HSTS, CSP), outdated PHP version headers exposing fingerprint information, and potential SQL injection vector on public endpoint.',
    sysmonLog: `OpenVAS NVTD Report:
  Vulnerability: Missing HTTP Strict-Transport-Security (HSTS) & Content-Security-Policy
  Host: WEB-STAGING-02 (10.0.4.15)
  Port: 443/tcp (https)
  CVSS Base Score: 7.5 (High)
  CVE: CVE-2023-XXXXX (Information Disclosure / Missing Security Directives)
  Finding: Server banner leaks "Server: Apache/2.4.52 (Ubuntu)" and "X-Powered-By: PHP/8.1.2". Missing X-Frame-Options allows clickjacking.`,
    mitreMapping: 'T1595.002 (Vulnerability Scanning) ➔ T1190 (Exploit Public-Facing App)',
    iocs: [
      {
        artifact: 'Fingerprinted Banner: PHP/8.1.2 & Apache/2.4.52',
        reputation: 'Suspicious',
        details: 'Exposed technical information enabling targeted exploit selection.'
      }
    ],
    triageSteps: [
      {
        step: '1. Verify Severity & Exploitability',
        recommendedAction: 'Assessed risk of Clickjacking and MIME-sniffing based on missing HTTP response headers.',
        completed: true
      },
      {
        step: '2. Apply Web Server Security Directives',
        recommendedAction: 'Injected ServerTokens Prod, expose_php = Off, and added CSP, HSTS, and X-Content-Type-Options headers.',
        completed: true
      },
      {
        step: '3. Re-scan Endpoint with OpenVAS / Nikto',
        recommendedAction: 'Re-tested target achieving clean pass with Grade A+ security posture.',
        completed: true
      }
    ],
    verdict: 'True Positive - Containment Required',
    remediationSummary: 'Web server security headers hardened on Nginx/Apache. Information disclosure banners silenced, and zero open high-risk CVEs remaining.'
  }
];

export const HOME_LAB_TOPOLOGY: HomeLabNode[] = [
  {
    id: 'lab-1',
    name: 'Wazuh & OSSEC SIEM Server',
    role: 'Centralized Security Event Monitoring & Log Analysis',
    os: 'Ubuntu Server 22.04 LTS',
    specs: '4 vCPU / 8GB RAM / Static IP 192.168.56.10',
    tools: ['Wazuh Manager & Indexer 4.7', 'Wazuh Dashboard (OpenSearch)', 'OSSEC HIDS Core', 'Active Response Automation'],
    status: 'Online'
  },
  {
    id: 'lab-2',
    name: 'OpenVAS / GVM Scanner Node',
    role: 'Vulnerability Management & CVE Auditing Engine',
    os: 'Kali Linux / Greenbone Community Edition',
    specs: '4 vCPU / 8GB RAM / Static IP 192.168.56.20',
    tools: ['Greenbone Vulnerability Manager (GVM)', 'NVT Feed Synchronization', 'Nmap & NSE Scripting', 'Nikto Web Scanner'],
    status: 'Online'
  },
  {
    id: 'lab-3',
    name: 'Rocky Linux Hardened Server (SRV-ROCKY)',
    role: 'Protected Enterprise Linux & Application Host',
    os: 'Rocky Linux 9.3',
    specs: '2 vCPU / 4GB RAM / Static IP 192.168.56.30',
    tools: ['Wazuh Agent (FIM & Rootcheck)', 'SELinux Enforcing', 'Firewalld & Iptables', 'AirTool Deployment Agent'],
    status: 'Ingesting Telemetry'
  },
  {
    id: 'lab-4',
    name: 'Attacker VM (KALI-ATTACK)',
    role: 'Adversary Simulation & Penetration Testing',
    os: 'Kali Linux 2024.2',
    specs: '2 vCPU / 4GB RAM / Static IP 192.168.56.50',
    tools: ['Hydra & Medusa (Brute Force)', 'Metasploit Framework', 'Burp Suite Community', 'Wireshark & Tshark PCAP'],
    status: 'Target VM'
  },
  {
    id: 'lab-5',
    name: 'pfSense Firewall & Network Gateway',
    role: 'Virtual Subnet Routing & Network Traffic Inspection',
    os: 'pfSense CE 2.7.2',
    specs: '2 vCPU / 2GB RAM / Dual Virtual NICs',
    tools: ['Snort / Suricata IDS', 'pfBlockerNG DNS Sinkhole', 'VLAN Segmentation (Management / Target / SOC)'],
    status: 'Online'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'SIEM, Threat Detection & Vulnerability Assessment',
    description: 'Hands-on log analysis, alert triage, vulnerability scanning with OpenVAS, and endpoint telemetry.',
    skills: [
      { name: 'Wazuh SIEM & OSSEC HIDS Deployment', level: 94, experience: 'Hands-on Lab', highlight: true },
      { name: 'Vulnerability Assessment (OpenVAS / GVM & Nmap)', level: 90, experience: 'Hands-on Lab', highlight: true },
      { name: 'Security Event Monitoring & Alert Triage', level: 92, experience: 'Hands-on Lab', highlight: true },
      { name: 'MITRE ATT&CK & OWASP Top 10 Mapping', level: 88, experience: 'Academic & Lab', highlight: true },
      { name: 'TCP/IP Networking, DNS, Firewalls & PCAP (Wireshark)', level: 86, experience: 'Academic & Lab' },
      { name: 'Active Directory & Windows Security Auditing', level: 82, experience: 'Academic & Lab' },
    ]
  },
  {
    title: 'DevOps, Cloud & Linux Administration',
    description: 'Server hardening, user access controls, deployment pipelines, and cloud fundamentals.',
    skills: [
      { name: 'Linux Administration (Rocky Linux, Ubuntu, Kali)', level: 92, experience: 'Deister Software', highlight: true },
      { name: 'AWS Cloud Services (EC2, S3, IAM Security)', level: 84, experience: 'Cert In-Progress', highlight: true },
      { name: 'Bash Scripting & Log Parsing Automation', level: 88, experience: 'Professional', highlight: true },
      { name: 'Git & Version-Controlled CI/CD Pipelines', level: 90, experience: 'Professional', highlight: true },
      { name: 'Docker Fundamentals & Virtualization', level: 82, experience: 'Projects' },
      { name: 'System Hardening & Permissions Management', level: 90, experience: 'Deister Software' },
    ]
  },
  {
    title: 'Full-Stack Development & Secure SDLC',
    description: 'Application security, secure authentication, RBAC design, and structured threat modeling.',
    skills: [
      { name: 'PHP & Laravel (RBAC, SQLi Protection, Auth)', level: 94, experience: 'WebicoSoft', highlight: true },
      { name: 'Python (Scripting, Automation, AI Integrations)', level: 88, experience: 'FYP & Labs', highlight: true },
      { name: 'MySQL & Relational Database Architecture', level: 90, experience: 'Professional', highlight: true },
      { name: 'JavaScript / React & RESTful APIs', level: 86, experience: 'PFTP & FYP' },
      { name: 'Threat Modeling (DFDs, ERDs, STRIDE Concepts)', level: 88, experience: 'SZABIST FYP' },
      { name: 'Code Review & Application Vulnerability Remediation', level: 86, experience: 'WebicoSoft' },
    ]
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-absoluit',
    role: 'Cybersecurity Intern',
    company: 'Absoluit',
    location: 'Islamabad, Pakistan',
    period: 'Current — 3-Month Trainee Track',
    type: 'Internship',
    description: [
      'Engaging in hands-on cybersecurity operations, threat monitoring, vulnerability triage, and enterprise security control assessments.',
      'Analyzing security event logs, assisting with incident documentation, and participating in blue team operational exercises targeting full-time conversion.'
    ],
    technologies: ['Security Operations', 'Vulnerability Assessment', 'Incident Response', 'Threat Triage'],
    metrics: ['Targeting Full-Time Conversion', 'Active Security Operations Focus']
  },
  {
    id: 'exp-deister',
    role: 'Linux Administrator & System Management Intern',
    company: 'Deister Software Pakistan SMC PVT Ltd',
    location: 'G-11 Markaz, Islamabad, Pakistan',
    period: 'July 2025 – September 2025 (3 Months)',
    type: 'Internship',
    description: [
      'Actively involved in daily corporate operations covering technical documentation, system management, and application development with high discipline and innovation.',
      'Administered Rocky Linux servers — configured user permissions, sudoers privileges, SSH key authentication, and enforced system hardening best practices.',
      'Monitored system logs and resource performance, identifying infrastructure anomalies to guarantee 99.9% deployment uptime.',
      'Managed deployment pipelines using AirTool across staging and production clusters with zero configuration drift.'
    ],
    technologies: ['Rocky Linux', 'System Management', 'Documentation', 'AirTool', 'Bash Scripting', 'SSH Hardening'],
    metrics: ['Official Internship Certificate on File', 'Zero Configuration Drift on Staging Servers'],
    verifiedDoc: {
      type: 'Internship Certificate',
      issuedDate: '30th September 2025',
      details: 'Issued by CEO, Deister Software Pakistan SMC PVT Ltd (Rehman Arcade, G11 Markaz Islamabad)'
    }
  },
  {
    id: 'exp-webicosoft',
    role: 'Full-Stack Web Developer',
    company: 'Webicosoft (Private) Limited',
    location: 'F-11 Markaz, Islamabad, Pakistan',
    period: '1st July 2024 – 31st December 2024 (6 Months)',
    type: 'Full-time',
    description: [
      'Served as a full-time Web Developer delivering production-grade web applications utilizing HTML, CSS, JavaScript, Bootstrap, PHP, and Laravel.',
      'Spearheaded front-end design, back-end architecture, and seamless API integrations enhancing user experience across multi-device enterprise products.',
      'Implemented secure authentication and role-based access control (RBAC), preventing unauthorized access and privilege escalation.',
      'Protected database operations against SQL injection via strict input validation, parameterized queries, and Laravel Eloquent ORM.'
    ],
    technologies: ['PHP', 'Laravel', 'JavaScript', 'Bootstrap', 'MySQL', 'REST APIs', 'RBAC Security', 'Git'],
    metrics: ['Official Experience Letter on File', 'Full-Time Engineering Service'],
    verifiedDoc: {
      type: 'Experience Letter',
      issuedDate: '31st December 2024',
      details: 'Issued by Adeel Arshad (CEO), Webicosoft (Private) Limited (Abu Dhabi Tower, F-11 Markaz Islamabad)'
    }
  }
];

export const EDUCATION_DATA = {
  degree: 'BS in Software Engineering',
  institution: 'SZABIST University, Islamabad',
  period: 'Feb 2022 – Feb 2026',
  location: 'Islamabad, Pakistan',
  highlights: [
    'Focused on Information Security, Secure Software Engineering, Network Security, and Distributed Systems.',
    'Final Year Project: HireFusion — AI-Based Hiring Management Platform with built-in RBAC and resume authenticity validation.',
    'Formulated comprehensive system documentation (ERDs, DFDs, sequence diagrams) reflecting structured threat modeling and access control principles.'
  ]
};
