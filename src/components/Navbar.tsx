import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Menu, 
  X, 
  Mail 
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'projects', 'triage-simulator', 'mitre', 'certifications', 'homelab', 'skills', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Labs & Projects', href: '#projects' },
    { name: 'Alert Simulator', href: '#triage-simulator' },
    { name: 'MITRE ATT&CK', href: '#mitre' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Home Lab', href: '#homelab' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800/90 shadow-xl shadow-black/40 py-3'
          : 'bg-slate-950/80 backdrop-blur-sm border-b border-slate-800/40 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo / Brand (Static, Clean, Robust) */}
          <a
            id="nav-brand-logo"
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-xl p-1 shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-950/90 border border-cyan-500/50 flex items-center justify-center text-cyan-400 shadow-md shadow-cyan-950/60 group-hover:scale-105 group-hover:border-cyan-400 transition-all duration-200 shrink-0">
              <ShieldAlert className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-base sm:text-lg tracking-tight text-white group-hover:text-cyan-300 transition-colors whitespace-nowrap leading-tight">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-[11px] text-cyan-400 font-mono font-medium tracking-tight whitespace-nowrap leading-tight mt-0.5">
                SOC Analyst &amp; Detection Engineer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav-links" className="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-slate-900/90 px-1.5 xl:px-2 py-1.5 rounded-full border border-slate-800 shadow-inner">
            {navLinks.map((link) => {
              const targetId = link.href.replace('#', '');
              const isActive = activeSection === targetId;
              return (
                <a
                  key={link.name}
                  id={`nav-link-${targetId}`}
                  href={link.href}
                  className={`px-2.5 xl:px-3.5 py-1.5 rounded-full text-[11px] xl:text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-cyan-600 text-slate-950 shadow-md shadow-cyan-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action CTA Button (Single Direct Contact Action) */}
          <div className="hidden sm:flex items-center">
            <a
              id="nav-contact-cta"
              href="#contact"
              className="inline-flex items-center gap-2 px-3.5 xl:px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-600/30 hover:shadow-cyan-500/40 transition-all active:scale-95 whitespace-nowrap"
            >
              <Mail className="w-4 h-4 text-slate-950" />
              <span>Hire / Contact</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="#contact"
              className="sm:hidden inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-600 text-slate-950 font-bold text-xs shadow-sm"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </a>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-dropdown-menu"
          className="lg:hidden bg-slate-950/95 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 mt-3 backdrop-blur-xl shadow-2xl"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
            >
              {link.name}
            </a>
          ))}

          <div className="pt-3 border-t border-slate-800/80">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-sm shadow-md"
            >
              <Mail className="w-4 h-4" />
              <span>Hire / Contact Shehroz</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
