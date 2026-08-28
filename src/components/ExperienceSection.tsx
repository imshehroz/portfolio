import React from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  Award, 
  CheckCircle, 
  CheckCircle2,
  FileCheck,
  ShieldAlert, 
  Activity, 
  GraduationCap,
  BookOpen,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { EXPERIENCES, EDUCATION_DATA } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 border-t border-slate-800/80 relative bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-xs font-semibold text-cyan-400 mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Track Record & Academic Foundation</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Work Experience & Education
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 leading-relaxed">
            Hands-on professional experience spanning Linux server administration, enterprise web development security (RBAC/SQLi mitigation), and ongoing SOC operations.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Work Experience Stream */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-base font-bold text-white mb-2">
              <Briefcase className="w-5 h-5 text-cyan-400" />
              <span>Professional Experience</span>
            </div>

            {EXPERIENCES.map((exp) => (
              <div
                key={exp.id}
                className="p-6 sm:p-8 rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-cyan-500/40 transition-colors relative overflow-hidden space-y-4 shadow-lg"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                        {exp.role}
                      </h3>
                      {exp.verifiedDoc && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>Letter on File</span>
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-cyan-400 font-semibold mt-0.5">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-400">
                    <span className="inline-flex items-center gap-1 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {exp.period}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {exp.location}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-cyan-300 border border-slate-800 font-medium">
                      {exp.type}
                    </span>
                  </div>
                </div>

                {/* Responsibilities */}
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-cyan-400 font-bold mt-0.5">›</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Verified Letter Details Callout */}
                {exp.verifiedDoc && (
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/90 flex items-start gap-2.5 text-xs text-slate-300">
                    <FileCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                        <span>{exp.verifiedDoc.type}</span>
                        <span className="text-slate-500 font-normal">({exp.verifiedDoc.issuedDate})</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {exp.verifiedDoc.details}
                      </p>
                    </div>
                  </div>
                )}

                {/* Key Metrics if available */}
                {exp.metrics && exp.metrics.length > 0 && (
                  <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 flex flex-wrap gap-3">
                    {exp.metrics.map((metric, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs font-mono text-cyan-300">
                        <Activity className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Technologies */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Education Block */}
          <div className="space-y-4 pt-4 border-t border-slate-800/80">
            <div className="flex items-center gap-2 text-base font-bold text-white mb-2">
              <GraduationCap className="w-5 h-5 text-emerald-400" />
              <span>Higher Education</span>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-emerald-500/40 transition-colors space-y-4 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {EDUCATION_DATA.degree}
                  </h3>
                  <div className="text-sm text-emerald-400 font-semibold mt-0.5">
                    {EDUCATION_DATA.institution}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    {EDUCATION_DATA.period}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {EDUCATION_DATA.location}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/70 text-emerald-300 border border-emerald-800 font-medium">
                    Feb 2022 – Feb 2026
                  </span>
                </div>
              </div>

              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {EDUCATION_DATA.highlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-emerald-400 font-bold mt-0.5">›</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
