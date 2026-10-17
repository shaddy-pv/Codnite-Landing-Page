import React, { useEffect } from 'react';
import LegalShell, { TocSection } from '@/components/LegalShell';
import {
  Scale,
  ShieldAlert,
  FileCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Code2,
  Terminal,
  Trophy,
  GraduationCap,
  Users,
  Cpu,
  Mail,
  Zap,
  Flame,
  Ban
} from 'lucide-react';

const SECTIONS: TocSection[] = [
  { id: 'acceptance', number: '01', title: 'Acceptance of Terms & Eligibility' },
  { id: 'account-integrity', number: '02', title: 'Account Integrity & 1-Person Policy' },
  { id: 'fair-play', number: '03', title: '1v1 Arena Fair Play Matrix' },
  { id: 'sandbox-limits', number: '04', title: 'Cloud Sandbox & Code Execution Bounds' },
  { id: 'college-verification', number: '05', title: 'Campus Rosters & Institutional Badges' },
  { id: 'intellectual-property', number: '06', title: 'Code Ownership & Platform Rights' },
  { id: 'suspension-appeal', number: '07', title: 'Enforcement, Bans & Appeal Process' },
  { id: 'liability-disclaimers', number: '08', title: 'Platform Availability & Disclaimers' },
  { id: 'dispute-contact', number: '09', title: 'Jurisdiction & Legal Inquiries' },
];

const HIGHLIGHTS = [
  {
    title: '1 Human = 1 Account',
    desc: 'Solver bots, smurfing, and proxy accounts are strictly prohibited. Violators face permanent leaderboard removal.',
    icon: <Users className="w-4 h-4" />,
  },
  {
    title: '100% Code Ownership',
    desc: 'You retain full intellectual property of the algorithm code you write on Codnite. We never claim ownership.',
    icon: <Code2 className="w-4 h-4" />,
  },
  {
    title: 'Protected Sandbox',
    desc: 'Cloud code execution is guarded by 10s CPU timeouts and memory caps. Exploit scripts result in immediate IP bans.',
    icon: <Terminal className="w-4 h-4" />,
  },
];

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LegalShell
      title="Terms of Service"
      subtitle="The binding rules governing fair play in 1v1 battle duels, cloud code execution sandboxes, campus roster verification, and developer code rights."
      badge="Legal Agreement & Rules"
      badgeIcon={<Scale className="w-3.5 h-3.5" />}
      lastUpdated="October 2026"
      version="Terms Version 2.4"
      readingTime="6 min read"
      sections={SECTIONS}
      highlights={HIGHLIGHTS}
    >
      {/* ── 01: Acceptance of Terms & Eligibility ── */}
      <section id="acceptance" className="scroll-mt-28 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-baseline gap-2.5">
          <span className="font-mono text-base sm:text-lg font-bold text-[#FF6A00]">01.</span>
          <span>Acceptance of Terms & Eligibility</span>
        </h2>

        {/* TL;DR Callout */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] text-xs sm:text-sm text-zinc-300 leading-relaxed flex items-start gap-3">
          <Zap className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white font-semibold">Plain-English Summary: </strong>
            By accessing or playing on Codnite, you enter into a legally binding contract. You must be at least 13 years old (or the legal age required in your country) to compete, maintain a profile, and represent your college.
          </div>
        </div>

        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          These Terms of Service govern your access to the Codnite website (<a href="https://codnite.com" className="text-orange-400 hover:underline">codnite.com</a>), browser IDE, diagnostic assessment engine, real-time WebSocket duels, and campus community boards. If you do not accept these terms in full, you may not register, submit code, or participate in platform tournaments.
        </p>
      </section>

      {/* ── 02: Account Integrity & 1-Person Policy ── */}
      <section id="account-integrity" className="scroll-mt-28 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-baseline gap-2.5">
          <span className="font-mono text-base sm:text-lg font-bold text-[#FF6A00]">02.</span>
          <span>Account Integrity & 1-Person Policy</span>
        </h2>

        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          To maintain fair competitive rankings, accurate campus leaderboards, and credible placement diagnostics, Codnite strictly enforces individual account authenticity:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
            <h4 className="font-bold text-white mb-1.5 flex items-center gap-2">
              <Users className="w-4 h-4 text-orange-400" />
              <span>One Account Per Developer</span>
            </h4>
            <p className="text-zinc-400 leading-relaxed text-xs">
              Each user is permitted exactly one active account. "Smurfing" (creating alternate secondary accounts to prey on beginner ratings or manipulate win streaks) is strictly prohibited and leads to rating reset across all associated profiles.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
            <h4 className="font-bold text-white mb-1.5 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-orange-400" />
              <span>No Credential Sharing or Boosting</span>
            </h4>
            <p className="text-zinc-400 leading-relaxed text-xs">
              You may not transfer, sell, or allow other individuals to access your account for the purpose of taking diagnostic tests, solving tournament problems, or elevating campus battle points.
            </p>
          </div>
        </div>
      </section>

      {/* ── 03: 1v1 Arena Fair Play Matrix ── */}
      <section id="fair-play" className="scroll-mt-28 space-y-5">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-baseline gap-2.5">
          <span className="font-mono text-base sm:text-lg font-bold text-[#FF6A00]">03.</span>
          <span>1v1 Arena Fair Play Matrix</span>
        </h2>

        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Codnite is built for genuine algorithmic growth. We hold a zero-tolerance stance toward cheating, automation, and unsportsmanlike conduct:
        </p>

        {/* Visual Fair Play Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Permitted Column */}
          <div className="p-4 rounded-xl bg-emerald-500/[0.03] border border-emerald-500/20 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Permitted & Encouraged</span>
            </div>
            <ul className="text-xs text-zinc-300 space-y-2 list-none">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Writing original solutions using standard language libraries (STL, Collections, Math).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Reviewing and analyzing test case breakdowns after a battle has concluded.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Inviting campus peers to unranked friendly duels for practice and mock interviews.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Sharing pedagogical explanations on community solution discussion boards.</span>
              </li>
            </ul>
          </div>

          {/* Prohibited Column */}
          <div className="p-4 rounded-xl bg-rose-500/[0.03] border border-rose-500/20 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <XCircle className="w-4 h-4" />
              <span>Strictly Prohibited & Disqualifying</span>
            </div>
            <ul className="text-xs text-zinc-300 space-y-2 list-none">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Using automated code-generation bots or LLM browser extensions during ranked duels.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Intentional rage-quitting or WebSocket manipulation to disrupt match recording.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Colluding with duel opponents to trade wins and inflate Hall of Fame rankings.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Publishing solution code before official tournament submission windows close.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── 04: Cloud Sandbox & Code Execution Bounds ── */}
      <section id="sandbox-limits" className="scroll-mt-28 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-baseline gap-2.5">
          <span className="font-mono text-base sm:text-lg font-bold text-[#FF6A00]">04.</span>
          <span>Cloud Sandbox & Code Execution Bounds</span>
        </h2>

        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Every code submission executes within a secure, ephemeral container environment. You agree to use the execution engine solely for compiling and verifying intended algorithms:
        </p>

        {/* Technical Bounds Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="font-mono text-orange-400 text-base font-bold mb-1">10.0s</div>
            <div className="font-bold text-white mb-0.5">CPU Time Limit</div>
            <p className="text-zinc-400 text-[11px] leading-snug">Infinite loops and excessive recursion trigger automatic Time Limit Exceeded (TLE) termination.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="font-mono text-orange-400 text-base font-bold mb-1">512 MB</div>
            <div className="font-bold text-white mb-0.5">Memory Bound</div>
            <p className="text-zinc-400 text-[11px] leading-snug">Exceeding heap allocation limits yields Memory Limit Exceeded (MLE) and halts execution.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="font-mono text-rose-400 text-base font-bold mb-1">0 Egress</div>
            <div className="font-bold text-white mb-0.5">Zero Network Sockets</div>
            <p className="text-zinc-400 text-[11px] leading-snug">Attempting socket creation or outbound port scans triggers instant security quarantine.</p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-zinc-400 leading-relaxed">
          <strong className="text-white">Prohibited System Calls:</strong> Submitting malicious payloads designed to perform container escapes, fork bombs (<code className="text-rose-400">{':(){ :|:& };:'}</code>), kernel exploit probing, or reading host environment variables constitutes a criminal violation under applicable computer fraud regulations.
        </div>
      </section>

      {/* ── 05: Campus Rosters & Institutional Badges ── */}
      <section id="college-verification" className="scroll-mt-28 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-baseline gap-2.5">
          <span className="font-mono text-base sm:text-lg font-bold text-[#FF6A00]">05.</span>
          <span>Campus Rosters & Institutional Badges</span>
        </h2>

        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Codnite enables students to join official college developer communities, participate in inter-college battles, and earn campus ranking points. By claiming college affiliation, you agree that:
        </p>

        <ul className="text-xs sm:text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed pl-2">
          <li>You are a currently enrolled student or verified alumnus of the designated institution.</li>
          <li>Your submitted student roll number or institutional email accurately reflects your genuine university enrollment.</li>
          <li>Forging student credentials or misrepresenting your college to manipulate college tournament points will lead to immediate disqualification and notification of campus department administrators.</li>
        </ul>
      </section>

      {/* ── 06: Code Ownership & Platform Rights ── */}
      <section id="intellectual-property" className="scroll-mt-28 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-baseline gap-2.5">
          <span className="font-mono text-base sm:text-lg font-bold text-[#FF6A00]">06.</span>
          <span>Code Ownership & Platform Rights</span>
        </h2>

        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] text-xs sm:text-sm text-zinc-300 leading-relaxed flex items-start gap-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white font-semibold">Your Intellectual Property: </strong>
            You retain 100% full ownership and copyright of the source code you author on Codnite. We do not claim any proprietary rights over your algorithmic logic.
          </div>
        </div>

        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          By submitting code to Codnite, you grant us a worldwide, non-exclusive, royalty-free license solely to compile, execute against test suites, store performance telemetry, and display your solution in public duel review arenas (when you elect to share it).
        </p>

        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          All Codnite platform assets—including the duel matchmaking engine, diagnostic problem bank, brand marks, and website software—remain the exclusive intellectual property of Codnite.
        </p>
      </section>

      {/* ── 07: Enforcement, Bans & Appeal Process ── */}
      <section id="suspension-appeal" className="scroll-mt-28 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-baseline gap-2.5">
          <span className="font-mono text-base sm:text-lg font-bold text-[#FF6A00]">07.</span>
          <span>Enforcement, Bans & Appeal Process</span>
        </h2>

        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Codnite reserves the right to moderate, flag, or terminate accounts violating platform standards. We adhere to a tiered enforcement model:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="font-bold text-amber-400 mb-1">Tier 1: Rating Penalty</div>
            <p className="text-zinc-400 leading-relaxed">
              Applied for minor disconnect abuse or win-trading. Result: XP reset to baseline tier and match timeout.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="font-bold text-orange-400 mb-1">Tier 2: Community Suspension</div>
            <p className="text-zinc-400 leading-relaxed">
              Applied for toxic chat conduct or campus roster misrepresentation. Result: 14 to 30-day arena lock.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="font-bold text-rose-400 mb-1">Tier 3: Permanent Ban</div>
            <p className="text-zinc-400 leading-relaxed">
              Applied for sandbox exploit scripts or automated solver bots. Result: Permanent ban across all IP subnets.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-zinc-400 leading-relaxed">
          <strong className="text-white">Filing an Appeal:</strong> If you believe a penalty was issued in error, you may file an appeal by emailing <code className="text-orange-400">codnite.dev@gmail.com</code> with match timestamps and source code execution logs. Our technical review team audits all flagged duels.
        </div>
      </section>

      {/* ── 08: Platform Availability & Disclaimers ── */}
      <section id="liability-disclaimers" className="scroll-mt-28 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-baseline gap-2.5">
          <span className="font-mono text-base sm:text-lg font-bold text-[#FF6A00]">08.</span>
          <span>Platform Availability & Disclaimers</span>
        </h2>

        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Codnite is provided on an "as-is" and "as-available" basis. While we strive for 99.9% battle socket uptime, we do not warrant uninterrupted connectivity, instantaneous code compilation during peak regional traffic, or zero latency fluctuation.
        </p>

        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          To the maximum extent permitted by applicable law, Codnite shall not be liable for any indirect, incidental, or consequential damages resulting from local network disconnection, test execution timeouts, or third-party OAuth outages.
        </p>
      </section>

      {/* ── 09: Jurisdiction & Legal Inquiries ── */}
      <section id="dispute-contact" className="scroll-mt-28 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-baseline gap-2.5">
          <span className="font-mono text-base sm:text-lg font-bold text-[#FF6A00]">09.</span>
          <span>Jurisdiction & Legal Inquiries</span>
        </h2>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
          <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#FF6A00]" />
            <span>Official Legal Desk</span>
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4">
            For institutional agreements, college partnership audits, DMCA notifications, or formal disputes regarding these Terms, contact our legal desk:
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-300">
            <div>
              <span className="text-zinc-500">Direct Inquiries: </span>
              <a href="mailto:codnite.dev@gmail.com" className="text-orange-400 hover:underline font-semibold">
                codnite.dev@gmail.com
              </a>
            </div>
            <span>•</span>
            <div>
              <span className="text-zinc-500">Legal Review Window: </span>
              <span className="text-emerald-400">Within 48 hours</span>
            </div>
          </div>
        </div>
      </section>
    </LegalShell>
  );
}
