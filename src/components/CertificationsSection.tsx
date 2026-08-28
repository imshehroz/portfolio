import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  ExternalLink, 
  Shield, 
  Clock,
  Calendar, 
  Hash, 
  Filter
} from 'lucide-react';
import { CERTIFICATIONS } from '../data/portfolioData';

export const CertificationsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Defense & SOC',
    'Full-Stack & Engineering',
    'Digital Strategy & Marketing',
    'Design & UI/UX',
    'Cloud & Identity'
  ];

  const filteredCertifications = activeCategory === 'All'
    ? CERTIFICATIONS
    : CERTIFICATIONS.filter(cert => cert.category === activeCategory);

  return (
    <section id="certifications" className="py-20 bg-slate-950 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-xs font-semibold text-cyan-400 mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Credentials &amp; Industry Accreditations</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Professional Certifications &amp; Badges
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
            Verified qualifications across Cybersecurity Operations, Full-Stack Software Engineering, Digital Marketing, and UI/UX Design.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((category) => {
            const isSelected = activeCategory === category;
            const count = category === 'All' 
              ? CERTIFICATIONS.length 
              : CERTIFICATIONS.filter(c => c.category === category).length;
            
            if (count === 0 && category !== 'All') return null;

            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-cyan-600 text-slate-950 shadow-md shadow-cyan-600/30 font-bold'
                    : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span>{category}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-cyan-950/40 text-slate-950 font-mono' : 'bg-slate-800 text-slate-400 font-mono'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertifications.map((cert) => {
            const isVerified = cert.status === 'Verified' || (!cert.status && cert.credentialId !== 'CANDIDATE-IN-PROGRESS' && cert.credentialId !== 'AWS-TRACK-ACTIVE');

            return (
              <div
                key={cert.id}
                id={`cert-card-${cert.id}`}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between space-y-4 hover:shadow-xl hover:shadow-cyan-950/20 group"
              >
                <div className="space-y-3.5">
                  {/* Header with Icon, Category, and Status */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                        {cert.category}
                      </span>
                      {isVerified ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>Verified</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-950/70 border border-amber-500/30 text-amber-300">
                          <Clock className="w-3 h-3 text-amber-400" />
                          <span>In Progress</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Cert Name & Issuer */}
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {cert.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium mt-1">
                      Issued by <strong className="text-slate-200 font-semibold">{cert.issuer}</strong>
                    </p>
                  </div>

                  {/* Credential ID & Date */}
                  <div className="space-y-1.5 text-[11px] font-mono text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-1 text-slate-500 shrink-0">
                        <Hash className="w-3 h-3 text-cyan-400" /> Credential:
                      </span>
                      <span className="text-slate-300 font-semibold truncate text-right">{cert.credentialId}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-slate-500">
                        <Calendar className="w-3 h-3 text-cyan-400" /> Date:
                      </span>
                      <span className="text-slate-300">{cert.issueDate}</span>
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cert.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-slate-800/70 text-slate-300 border border-slate-700/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Verify Link */}
                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-cyan-950/60 border border-slate-800 hover:border-cyan-500/40 text-xs font-semibold text-cyan-300 flex items-center justify-center gap-1.5 transition-all group-hover:border-cyan-500/30"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Verify Official Credential</span>
                    <ExternalLink className="w-3 h-3 text-cyan-400" />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

