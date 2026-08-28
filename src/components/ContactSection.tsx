import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  Check, 
  Copy, 
  Github, 
  Linkedin, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Terminal, 
  CheckCircle2, 
  ExternalLink,
  RefreshCw,
  Loader2,
  AlertCircle,
  Shield
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

// Sanitization utilities against CRLF header injection and malicious payload scripts
const sanitizeSingleLine = (text: string, maxLen = 100): string => {
  if (!text) return '';
  return text
    .replace(/[\r\n\0]/g, ' ') // Strip CRLF and null bytes (blocks header injection)
    .replace(/[<>]/g, '') // Strip angle brackets (blocks raw HTML/script tags)
    .trim()
    .slice(0, maxLen);
};

const sanitizeMultiLine = (text: string, maxLen = 2500): string => {
  if (!text) return '';
  return text
    .replace(/\0/g, '') // Strip null bytes
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Strip script blocks
    .trim()
    .slice(0, maxLen);
};

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedSenderEmail, setSubmittedSenderEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastSubmissionTime, setLastSubmissionTime] = useState<number>(0);
  const [honeypotValue, setHoneypotValue] = useState<string>('');

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    roleOrSubject: '',
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // 1. Anti-bot honeypot check: If automated scrapers populated the hidden trap field, drop quietly
    if (honeypotValue.trim().length > 0) {
      setIsSending(true);
      setTimeout(() => {
        setIsSending(false);
        setIsSubmitted(true);
      }, 800);
      return;
    }

    // 2. Client-side Rate Limiting / Flood Guard (15 second cooldown)
    const now = Date.now();
    if (now - lastSubmissionTime < 15000) {
      const waitSecs = Math.ceil((15000 - (now - lastSubmissionTime)) / 1000);
      setErrorMessage(`Rate limit active: Please wait ${waitSecs}s before sending another inquiry.`);
      return;
    }

    // 3. Sanitization & length boundaries
    const cleanName = sanitizeSingleLine(formState.name, 80);
    const cleanEmail = sanitizeSingleLine(formState.email, 100);
    const cleanSubjectInput = sanitizeSingleLine(formState.roleOrSubject, 120);
    const cleanMessage = sanitizeMultiLine(formState.message, 2500);

    if (!cleanName || !cleanEmail || !cleanMessage) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    // 4. Strict Email Regex Validation
    if (!EMAIL_REGEX.test(cleanEmail)) {
      setErrorMessage('Please enter a valid email address (e.g. yourname@company.com).');
      return;
    }

    setIsSending(true);

    const cleanSubject = cleanSubjectInput 
      ? `[Portfolio Contact] ${cleanSubjectInput}` 
      : `[SOC Inquiry] Contact from ${cleanName}`;

    const formattedBody = `Hi Shehroz,\n\nName: ${cleanName}\nEmail: ${cleanEmail}\nSubject: ${cleanSubjectInput || 'General Security Inquiry'}\n\nMessage:\n${cleanMessage}\n\n---\nTransmitted via Shehroz Javed's Security Portfolio`;

    try {
      // Direct AJAX transmission to deliver directly to imshehrozjaved@gmail.com
      const res = await fetch(`https://formsubmit.co/ajax/${PERSONAL_INFO.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          _replyto: cleanEmail,
          _subject: cleanSubject,
          message: formattedBody,
          _captcha: 'false'
        })
      });

      if (!res.ok) {
        // Safe fallback mailto trigger if network blocks third-party endpoint
        const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(cleanSubject)}&body=${encodeURIComponent(formattedBody)}`;
        window.location.href = mailtoUrl;
      }
    } catch {
      // Fallback
      const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(cleanSubject)}&body=${encodeURIComponent(formattedBody)}`;
      window.location.href = mailtoUrl;
    } finally {
      setIsSending(false);
      setLastSubmissionTime(Date.now());
      setSubmittedSenderEmail(cleanEmail);
      setIsSubmitted(true);
    }
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setErrorMessage(null);
    setHoneypotValue('');
    setFormState({ name: '', email: '', roleOrSubject: '', message: '' });
  };

  const cleanSubject = formState.roleOrSubject.trim() 
    ? `[Portfolio Contact] ${formState.roleOrSubject.trim()}` 
    : `[SOC Inquiry] Contact from ${formState.name.trim() || 'Recruiter'}`;
  const formattedBody = `Hi Shehroz,\n\n${formState.message.trim() || 'I would like to discuss a security role opportunity with you.'}\n\nFrom: ${formState.name.trim()} (${formState.email.trim()})`;
  const directGmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${PERSONAL_INFO.email}&su=${encodeURIComponent(cleanSubject)}&body=${encodeURIComponent(formattedBody)}`;

  return (
    <section id="contact" className="py-20 border-t border-slate-800/80 bg-slate-950/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-xs font-semibold text-cyan-400 mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Open for Hiring &amp; Inquiries</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Get In Touch
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 leading-relaxed">
            Looking for a dedicated SOC Analyst, Threat Detection Engineer, or Blue Teamer? Send an inquiry directly to my inbox at <span className="text-cyan-300 font-mono font-medium">{PERSONAL_INFO.email}</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          
          {/* Left Column: Contact Details & Security Profile Badges */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Direct Contact &amp; Profiles
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  I typically respond within 24 hours to recruiter inquiries and SOC role discussions.
                </p>
              </div>

              {/* Copy Email Card */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Primary Recipient Email
                </span>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs sm:text-sm font-mono font-bold text-cyan-300 truncate select-all">
                    {PERSONAL_INFO.email}
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex-shrink-0"
                    title="Copy Email"
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Location & Availability */}
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Ready for immediate start / SOC shift rotations</span>
                </div>
              </div>

              {/* Social / Security Profile Badges */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Security Platforms &amp; Networks
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <Github className="w-4 h-4 text-cyan-400" />
                      <span>GitHub</span>
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>

                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <Linkedin className="w-4 h-4 text-cyan-400" />
                      <span>LinkedIn</span>
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>

                  <a
                    href={PERSONAL_INFO.tryhackme}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-red-300 flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <Terminal className="w-4 h-4 text-red-400" />
                      <span>TryHackMe</span>
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>

                  <a
                    href={PERSONAL_INFO.hackthebox}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-emerald-300 flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>HackTheBox</span>
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
              
              {isSubmitted ? (
                /* Clean Confirmation View */
                <div className="py-8 px-4 text-center space-y-5 animate-fadeIn">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/50">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-white tracking-tight">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out. Your message has been dispatched to <strong className="text-cyan-300 font-mono">{PERSONAL_INFO.email}</strong>. I will review your inquiry and reply to <strong className="text-slate-200">{submittedSenderEmail || 'your email'}</strong> shortly.
                    </p>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleResetForm}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-xs font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Send Another Message</span>
                    </button>

                    <a
                      href={directGmailUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <Mail className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Open in Gmail Web</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  </div>
                </div>
              ) : (
                /* Contact Form */
                <>
                  <div className="mb-5">
                    <h3 className="text-lg font-bold text-white">
                      Send a Message or Job Opportunity
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Fill in your details below to deliver your message directly to Shehroz.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800/60 text-red-300 text-xs flex items-center gap-2.5 mb-4">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Hidden Honeypot Anti-Bot Field (Hidden from humans, catches scrapers) */}
                    <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                      <label htmlFor="_sec_honeypot_field">Leave this empty</label>
                      <input
                        type="text"
                        id="_sec_honeypot_field"
                        name="_sec_honeypot_field"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypotValue}
                        onChange={(e) => setHoneypotValue(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          Your Name <span className="text-cyan-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={80}
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          placeholder="e.g. Alex Morgan"
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          Your Email <span className="text-cyan-400">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          maxLength={100}
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          placeholder="alex@company.com"
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Subject / Role Title
                      </label>
                      <input
                        type="text"
                        maxLength={120}
                        value={formState.roleOrSubject}
                        onChange={(e) => setFormState({ ...formState, roleOrSubject: e.target.value })}
                        placeholder="e.g. SOC Analyst Role / Incident Response Inquiry"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Message <span className="text-cyan-400">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        maxLength={2500}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Hi Shehroz, we reviewed your home lab and detection rules and would like to discuss..."
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                      />
                      <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1 font-mono">
                        <span className="flex items-center gap-1">
                          <Shield className="w-3 h-3 text-cyan-400" /> Protected by Anti-CRLF &amp; Rate-Limit Filters
                        </span>
                        <span>{formState.message.length}/2500</span>
                      </div>
                    </div>

                    <div className="pt-1 flex flex-col sm:flex-row items-center gap-3">
                      <button
                        type="submit"
                        disabled={isSending}
                        className="w-full sm:flex-1 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-600/25 flex items-center justify-center gap-2 transition-all active:scale-98 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSending ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                            <span>Sending Message...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 text-slate-950" />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>

                      <a
                        href={directGmailUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
                        title="Compose and send directly in web Gmail"
                      >
                        <Mail className="w-4 h-4 text-cyan-400" />
                        <span>Send via Gmail Web</span>
                      </a>
                    </div>
                  </form>
                </>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
