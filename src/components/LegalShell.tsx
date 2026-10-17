import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  Shield,
  Scale,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  Clock,
  CheckCircle2,
  HelpCircle,
  Mail,
  Copy,
  Check
} from 'lucide-react';
import codniteLogo from '@/assets/horizontal_logo.png';
import Footer from '@/components/Footer';

export interface TocSection {
  id: string;
  number: string;
  title: string;
  icon?: React.ReactNode;
}

interface LegalShellProps {
  title: string;
  subtitle: string;
  badge: string;
  badgeIcon: React.ReactNode;
  lastUpdated: string;
  version: string;
  readingTime: string;
  sections: TocSection[];
  highlights: { title: string; desc: string; icon: React.ReactNode }[];
  children: React.ReactNode;
}

export default function LegalShell({
  title,
  subtitle,
  badge,
  badgeIcon,
  lastUpdated,
  version,
  readingTime,
  sections,
  highlights,
  children,
}: LegalShellProps) {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Active scroll-spy tracker with IntersectionObserver
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleCopyPageLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const isPrivacy = location.pathname.includes('privacy');
  const isTerms = location.pathname.includes('terms');

  return (
    <div className="bg-[#080808] min-h-screen text-zinc-300 selection:bg-orange-500/30 selection:text-orange-200 font-sans antialiased">
      {/* ── Top Navigation Bar ── */}
      <header className="sticky top-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/[0.06] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          {/* Logo - Matching Landing Page Navbar Exactly */}
          <Link to="/" className="flex items-center space-x-2.5 group shrink-0" data-cursor-hover>
            <img
              src={codniteLogo}
              alt="Codnite Logo"
              className="h-12 md:h-[56px] w-auto transition-transform duration-300 hover:scale-105"
            />
          </Link>

          {/* Segmented Tab Switcher (Privacy <-> Terms) */}
          <div className="flex items-center bg-white/[0.04] p-1 rounded-xl border border-white/[0.08]">
            <Link
              to="/privacy"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isPrivacy
                  ? 'bg-[#FF6A00] text-black font-semibold'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Privacy Policy</span>
              <span className="xs:hidden">Privacy</span>
            </Link>
            <Link
              to="/terms"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isTerms
                  ? 'bg-[#FF6A00] text-black font-semibold'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Terms of Service</span>
              <span className="xs:hidden">Terms</span>
            </Link>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 hover:text-white px-3.5 py-1.5 rounded-lg border border-white/10 hover:border-white/20 bg-white/[0.03] transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Document Hero Header ── */}
      <section className="relative overflow-hidden border-b border-white/[0.08] bg-[#0A0A0A] pt-12 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            {/* Meta badges row */}
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-orange-500/10 border border-orange-500/25 text-orange-400">
                {badgeIcon}
                {badge}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Live & Enforced
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono text-zinc-400 bg-white/[0.03] border border-white/[0.06]">
                <Clock className="w-3 h-3 text-zinc-500" />
                {readingTime}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono text-zinc-500 bg-white/[0.03] border border-white/[0.06]">
                {version}
              </span>
            </div>

            {/* Title & Subtitle */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {title}
            </h1>
            <p className="mt-3 text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl font-normal">
              {subtitle}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500">
              <span>Last updated: {lastUpdated}</span>
              <span>•</span>
              <span>Jurisdiction: Global Developers & Colleges</span>
              <span>•</span>
              <button
                onClick={handleCopyPageLink}
                className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 transition-colors"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Link Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Document Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick "At A Glance" Key Takeaways Strip */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-6 border-t border-white/[0.06]">
            {highlights.map((h, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-orange-500/20 transition-colors"
              >
                <div className="p-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-[#FF6A00] shrink-0 mt-0.5">
                  {h.icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white tracking-wide uppercase">{h.title}</h4>
                  <p className="text-xs text-zinc-400 mt-0.5 leading-snug">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mobile Sticky Jump Bar ── */}
      <div className="lg:hidden sticky top-16 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/[0.08] px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <span className="text-[#FF6A00] font-bold">Jump to:</span>
          <span className="text-white font-medium truncate max-w-[200px]">
            {sections.find((s) => s.id === activeSection)?.title || 'Contents'}
          </span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.1] text-xs font-medium text-white"
        >
          {mobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
          <span>{mobileMenuOpen ? 'Close' : 'Outline'}</span>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[110px] bottom-0 z-40 bg-[#0A0A0A]/98 backdrop-blur-xl border-b border-white/10 p-5 overflow-y-auto">
          <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
            Table of Contents
          </h4>
          <nav className="space-y-1">
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm transition-all ${
                  activeSection === sec.id
                    ? 'bg-orange-500/10 text-orange-400 font-semibold border border-orange-500/25'
                    : 'text-zinc-300 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="font-mono text-xs text-zinc-500">{sec.number}</span>
                  <span>{sec.title}</span>
                </span>
                <ChevronRight className="w-4 h-4 text-zinc-600" />
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* ── Main Layout (Sticky Sidebar + Content) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Desktop Sticky Sidebar (TOC) */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              
              {/* Table of Contents Card */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                    Table of Contents
                  </span>
                  <span className="text-[11px] font-mono text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-md border border-orange-500/20">
                    {sections.length} Sections
                  </span>
                </div>

                <nav className="space-y-1">
                  {sections.map((sec) => {
                    const isActive = activeSection === sec.id;
                    return (
                      <button
                        key={sec.id}
                        onClick={() => scrollToSection(sec.id)}
                        className={`group w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors duration-150 ${
                          isActive
                            ? 'bg-white/[0.06] text-white font-semibold border-l-2 border-[#FF6A00] pl-2.5'
                            : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]'
                        }`}
                      >
                        <span className="flex items-center gap-2 truncate">
                          <span
                            className={`font-mono text-[11px] ${
                              isActive ? 'text-[#FF6A00]' : 'text-zinc-500 group-hover:text-zinc-400'
                            }`}
                          >
                            {sec.number}
                          </span>
                          <span className="truncate">{sec.title}</span>
                        </span>
                        <ChevronRight
                          className={`w-3.5 h-3.5 transition-transform ${
                            isActive
                              ? 'text-[#FF6A00] translate-x-0.5'
                              : 'text-transparent group-hover:text-zinc-600'
                          }`}
                        />
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Direct Help / DPO Contact Card */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] text-xs">
                <div className="flex items-center gap-2 font-bold text-white mb-1.5">
                  <HelpCircle className="w-4 h-4 text-[#FF6A00]" />
                  <span>Legal & Compliance Inquiries</span>
                </div>
                <p className="text-zinc-400 leading-relaxed mb-3">
                  Have a question about your code rights, data retention, or institutional onboarding?
                </p>
                <a
                  href="mailto:codnite.dev@gmail.com"
                  className="inline-flex items-center gap-1.5 font-medium text-orange-400 hover:text-orange-300 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>codnite.dev@gmail.com</span>
                </a>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-8 space-y-12">
            {children}
          </main>
        </div>
      </div>

      {/* Official Platform Footer */}
      <Footer />
    </div>
  );
}
