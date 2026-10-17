import React, { useEffect } from 'react';
import LegalShell, { TocSection } from '@/components/LegalShell';
import {
  Shield,
  Lock,
  Eye,
  FileCode,
  Server,
  UserCheck,
  Trash2,
  Cpu,
  Database,
  KeyRound,
  CheckCircle2,
  AlertTriangle,
  Mail,
  Zap,
  Globe,
  GraduationCap
} from 'lucide-react';

const SECTIONS: TocSection[] = [
  { id: 'overview', number: '01', title: 'Scope & Data Governance' },
  { id: 'data-collected', number: '02', title: 'Information We Collect' },
  { id: 'code-privacy', number: '03', title: 'Code Privacy & Sandbox Isolation' },
  { id: 'purpose-usage', number: '04', title: 'How We Use Your Data' },
  { id: 'anti-cheat', number: '05', title: 'Anti-Cheat & Assessment Telemetry' },
  { id: 'sub-processors', number: '06', title: 'Third-Party Sub-Processors' },
  { id: 'retention-deletion', number: '07', title: 'Data Rights & Account Deletion' },
  { id: 'security-standards', number: '08', title: 'Security Architecture' },
  { id: 'dpo-contact', number: '09', title: 'Grievance Officer & Contact' },
];

const HIGHLIGHTS = [
  {
    title: 'Zero Code Exploitation',
    desc: 'Your algorithmic submissions remain your property. We never sell your code or train public LLMs on private work.',
    icon: <FileCode className="w-4 h-4" />,
  },
  {
    title: 'Ephemeral Sandboxing',
    desc: 'Submissions execute in isolated micro-containers with zero persistent disk retention and strict egress firewalls.',
    icon: <Cpu className="w-4 h-4" />,
  },
  {
    title: 'Encrypted College Rosters',
    desc: 'Student ID and department verifications are encrypted and restricted to your authorized campus network.',
    icon: <GraduationCap className="w-4 h-4" />,
  },
];

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LegalShell
      title="Privacy Policy"
      subtitle="How Codnite collects, safeguards, and isolates developer code submissions, battle telemetry, and college community verifications."
      badge="Data Protection & Privacy"
      badgeIcon={<Shield className="w-3.5 h-3.5" />}
      lastUpdated="October 2026"
      version="Policy Version 2.4"
      readingTime="5 min read"
      sections={SECTIONS}
      highlights={HIGHLIGHTS}
    >
      {/* ── 01: Scope & Data Governance ── */}
      <section id="overview" className="scroll-mt-28 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-baseline gap-2.5">
          <span className="font-mono text-base sm:text-lg font-bold text-[#FF6A00]">01.</span>
          <span>Scope & Data Governance</span>
        </h2>

        {/* TL;DR Callout */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] text-xs sm:text-sm text-zinc-300 leading-relaxed flex items-start gap-3">
          <Zap className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white font-semibold">Plain-English Summary: </strong>
            Codnite ("we", "us", "our") operates an algorithmic competitive platform and college developer network. This policy applies to our web services, diagnostic placement assessments, real-time 1v1 battle matchmaking, cloud code sandboxes, and campus leaderboards. We only gather telemetry essential for platform integrity, security, and fair rank duels.
          </div>
        </div>

        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          By registering for an account or using any Codnite service at <a href="https://codnite.com" className="text-orange-400 hover:underline">codnite.com</a>, you acknowledge the collection and processing of your personal information as set forth in this Privacy Policy. If you do not agree with our principles, you may choose to discontinue using the platform or request full data deletion at any time.
        </p>
      </section>

      {/* ── 02: Information We Collect ── */}
      <section id="data-collected" className="scroll-mt-28 space-y-5">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-baseline gap-2.5">
          <span className="font-mono text-base sm:text-lg font-bold text-[#FF6A00]">02.</span>
          <span>Information We Collect</span>
        </h2>

        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          We collect personal data directly through your interactions with our platform, authentication providers, and competitive activities. We categorize collected information into four transparent pillars:
        </p>

        {/* Structured Data Matrix Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] transition-all">
            <div className="flex items-center gap-2.5 text-white font-semibold text-sm mb-2">
              <KeyRound className="w-4 h-4 text-orange-400" />
              <span>Identity & Authentication</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed mb-2.5">
              Collected during sign-up or OAuth single sign-on via Google or GitHub:
            </p>
            <ul className="text-xs text-zinc-300 space-y-1.5 list-disc list-inside">
              <li>Full Name, Username, and Verified Email Address</li>
              <li>Encrypted Password Hash (Bcrypt/Argon2id) for local logins</li>
              <li>Public GitHub/Google avatar URL and OAuth Account UID</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] transition-all">
            <div className="flex items-center gap-2.5 text-white font-semibold text-sm mb-2">
              <GraduationCap className="w-4 h-4 text-orange-400" />
              <span>College & Academic Records</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed mb-2.5">
              Collected when you join verified campus developer communities:
            </p>
            <ul className="text-xs text-zinc-300 space-y-1.5 list-disc list-inside">
              <li>Institution / College Name and Campus Location</li>
              <li>Student Roll Number / Enrollment ID for roster verification</li>
              <li>Academic Department, Graduation Year, and Student Status</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] transition-all">
            <div className="flex items-center gap-2.5 text-white font-semibold text-sm mb-2">
              <FileCode className="w-4 h-4 text-orange-400" />
              <span>Submissions & Performance Data</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed mb-2.5">
              Generated continuously through your coding practice and duels:
            </p>
            <ul className="text-xs text-zinc-300 space-y-1.5 list-disc list-inside">
              <li>Algorithm Source Code submissions (C++, Java, Python, JS/TS)</li>
              <li>Execution metrics: runtime latency (ms), memory footprint (KB)</li>
              <li>XP rating, win-loss duel records, streak history, Hall of Fame rank</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] transition-all">
            <div className="flex items-center gap-2.5 text-white font-semibold text-sm mb-2">
              <Server className="w-4 h-4 text-orange-400" />
              <span>Device & Network Diagnostics</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed mb-2.5">
              Automated telemetry captured for security and battle stability:
            </p>
            <ul className="text-xs text-zinc-300 space-y-1.5 list-disc list-inside">
              <li>IP address, browser user-agent, and operating system</li>
              <li>WebSocket ping/pong latency for real-time duel synchronization</li>
              <li>Session security tokens and device hardware fingerprint hashes</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── 03: Code Privacy & Sandbox Isolation ── */}
      <section id="code-privacy" className="scroll-mt-28 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-baseline gap-2.5">
          <span className="font-mono text-base sm:text-lg font-bold text-[#FF6A00]">03.</span>
          <span>Code Privacy & Sandbox Isolation</span>
        </h2>

        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] text-xs sm:text-sm text-zinc-300 leading-relaxed flex items-start gap-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white font-semibold">Strict Confidentiality Guarantee: </strong>
            Codnite will never sell your code submissions, license them to third parties, or use them to train commercial large language models (LLMs). Your code exists exclusively for grading, test execution, and competitive verification.
          </div>
        </div>

        <div className="space-y-3 text-sm text-zinc-400 leading-relaxed">
          <p>
            When you run or submit code on Codnite, your script is dispatched to an ephemeral, isolated container execution environment (sandboxed via gVisor and Docker namespaces). This architecture enforces:
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-300 pl-2">
            <li><strong className="text-white">Strict Outbound Firewalls:</strong> Code containers have zero outbound Internet access, blocking data exfiltration attempts.</li>
            <li><strong className="text-white">Volatile Ephemeral Storage:</strong> Temporary execution files are wiped immediately upon test completion.</li>
            <li><strong className="text-white">Hard Resource Bounds:</strong> Strict CPU timeouts (typically 10 seconds) and memory caps (256MB–512MB) protect platform availability.</li>
          </ul>
        </div>
      </section>

      {/* ── 04: How We Use Your Data ── */}
      <section id="purpose-usage" className="scroll-mt-28 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-baseline gap-2.5">
          <span className="font-mono text-base sm:text-lg font-bold text-[#FF6A00]">04.</span>
          <span>How We Use Your Data</span>
        </h2>

        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          We process personal data strictly under legitimate interest and contractual necessity to provide our competitive developer platform:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h4 className="font-bold text-white mb-1">Live Duel Matchmaking</h4>
            <p className="text-zinc-400 leading-relaxed">
              Evaluating your algorithmic rating (Elo/XP) to pair you against peers of comparable skill in 1v1 arenas.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h4 className="font-bold text-white mb-1">Campus Leaderboards</h4>
            <p className="text-zinc-400 leading-relaxed">
              Aggregating verified college points to power institutional Hall of Fame rankings and departmental badges.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h4 className="font-bold text-white mb-1">Diagnostic Assessments</h4>
            <p className="text-zinc-400 leading-relaxed">
              Analyzing test outcomes across core CS subjects (Data Structures, Algorithms, DBMS, OS) for placement readiness.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h4 className="font-bold text-white mb-1">Transactional Notifications</h4>
            <p className="text-zinc-400 leading-relaxed">
              Dispatching match invites, password reset tokens, tournament certificates, and security alert emails.
            </p>
          </div>
        </div>
      </section>

      {/* ── 05: Anti-Cheat & Assessment Telemetry ── */}
      <section id="anti-cheat" className="scroll-mt-28 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-baseline gap-2.5">
          <span className="font-mono text-base sm:text-lg font-bold text-[#FF6A00]">05.</span>
          <span>Anti-Cheat & Assessment Telemetry</span>
        </h2>

        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] text-xs sm:text-sm text-zinc-300 leading-relaxed flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white font-semibold">Integrity Protocol: </strong>
            To protect fair hiring metrics and tournament integrity, Codnite employs anti-cheat telemetry during diagnostic assessments and ranked battles.
          </div>
        </div>

        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Anti-cheat telemetry includes browser tab focus/blur timestamps, paste event frequencies into the code editor, and anomaly detection in submission solving velocity. We do not access your webcam, screen recordings, or local files. Telemetry is retained strictly during the assessment validation window and purged after verification.
        </p>
      </section>

      {/* ── 06: Third-Party Sub-Processors ── */}
      <section id="sub-processors" className="scroll-mt-28 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-baseline gap-2.5">
          <span className="font-mono text-base sm:text-lg font-bold text-[#FF6A00]">06.</span>
          <span>Third-Party Sub-Processors</span>
        </h2>

        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Codnite partners with vetted enterprise cloud providers for essential infrastructure. Each provider complies with strict data protection addendums (DPA):
        </p>

        <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-white/[0.01]">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-white/[0.04] text-zinc-300 font-mono text-[11px] uppercase tracking-wider border-b border-white/[0.08]">
              <tr>
                <th className="px-4 py-3">Partner / Provider</th>
                <th className="px-4 py-3">Purpose</th>
                <th className="px-4 py-3">Data Handled</th>
                <th className="px-4 py-3">Jurisdiction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] text-zinc-400">
              <tr>
                <td className="px-4 py-3 font-semibold text-white">Google & GitHub OAuth</td>
                <td className="px-4 py-3">Identity Single Sign-On</td>
                <td className="px-4 py-3">Email, Name, Avatar URL</td>
                <td className="px-4 py-3">USA / Global</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-white">Cloudinary</td>
                <td className="px-4 py-3">CDN Media Delivery</td>
                <td className="px-4 py-3">User Avatars, College Logos</td>
                <td className="px-4 py-3">Global Edge CDN</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-white">Nodemailer / SMTP</td>
                <td className="px-4 py-3">Transactional Email</td>
                <td className="px-4 py-3">Verification links, notifications</td>
                <td className="px-4 py-3">Global Cloud</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-white">PostgreSQL & Redis</td>
                <td className="px-4 py-3">Encrypted Cloud Datastore</td>
                <td className="px-4 py-3">Primary DB & Match Queues</td>
                <td className="px-4 py-3">Secured VPC Clusters</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 07: Data Rights & Account Deletion ── */}
      <section id="retention-deletion" className="scroll-mt-28 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-baseline gap-2.5">
          <span className="font-mono text-base sm:text-lg font-bold text-[#FF6A00]">07.</span>
          <span>Data Rights & Account Deletion</span>
        </h2>

        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Regardless of your physical geography, Codnite grants all developers comprehensive data sovereignty rights aligned with GDPR, CCPA, and India's Digital Personal Data Protection (DPDP) Act:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="font-bold text-white mb-1">Right to Access & Portability</div>
            <p className="text-zinc-400 leading-relaxed">
              Export your full problem submission history, diagnostic scores, and duel statistics in JSON format.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="font-bold text-white mb-1">Right to Rectification</div>
            <p className="text-zinc-400 leading-relaxed">
              Update inaccurate profile details, college enrollment numbers, or handle changes directly in user settings.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="font-bold text-white mb-1">Right to Complete Erasure</div>
            <p className="text-zinc-400 leading-relaxed">
              Request permanent purging of your account, authentication tokens, and personal credentials.
            </p>
          </div>
        </div>

        {/* Step-by-Step Deletion Box */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
          <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
            <Trash2 className="w-4 h-4 text-rose-400" />
            <span>How to Delete Your Codnite Account</span>
          </h4>
          <ol className="text-xs text-zinc-300 space-y-1.5 list-decimal list-inside leading-relaxed">
            <li>Submit an account deletion request via platform settings or email <code className="text-orange-400">codnite.dev@gmail.com</code> with subject "Account Deletion Request".</li>
            <li>A confirmation token will be dispatched to your registered email address to prevent unauthorized erasure.</li>
            <li>Upon confirmation, your profile enters a 30-day grace period, after which all personal records, passwords, and private submissions are permanently destroyed from our production database.</li>
          </ol>
        </div>
      </section>

      {/* ── 08: Security Architecture ── */}
      <section id="security-standards" className="scroll-mt-28 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-baseline gap-2.5">
          <span className="font-mono text-base sm:text-lg font-bold text-[#FF6A00]">08.</span>
          <span>Security Architecture</span>
        </h2>

        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          We maintain defense-in-depth security practices across our cloud architecture:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
            <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white mb-0.5">TLS 1.3 In-Transit Encryption</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                All HTTP web requests and WebSocket duel sockets enforce HTTPS with modern AES-256-GCM cipher suites.
              </p>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
            <KeyRound className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white mb-0.5">Bcrypt Password Hashing</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Passwords are salted and cryptographically hashed. Plaintext passwords are never stored or logged.
              </p>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
            <Database className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white mb-0.5">VPC Network Isolation</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Primary databases and battle queues reside inside non-public Virtual Private Clouds with strict IP whitelisting.
              </p>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
            <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white mb-0.5">Automated Rate Limiting</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Redis token-bucket algorithms mitigate brute-force authentication, bot abuse, and denial-of-service attempts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 09: Grievance Officer & Contact ── */}
      <section id="dpo-contact" className="scroll-mt-28 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-baseline gap-2.5">
          <span className="font-mono text-base sm:text-lg font-bold text-[#FF6A00]">09.</span>
          <span>Grievance Officer & Contact</span>
        </h2>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
          <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#FF6A00]" />
            <span>Data Protection & Grievance Cell</span>
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4">
            If you have questions regarding data processing, regulatory compliance inquiries, or need to report an incident, reach out to our designated compliance contact:
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-300">
            <div>
              <span className="text-zinc-500">Official Channel: </span>
              <a href="mailto:codnite.dev@gmail.com" className="text-orange-400 hover:underline font-semibold">
                codnite.dev@gmail.com
              </a>
            </div>
            <span>•</span>
            <div>
              <span className="text-zinc-500">Response SLA: </span>
              <span className="text-emerald-400">Within 24 to 48 business hours</span>
            </div>
          </div>
        </div>
      </section>
    </LegalShell>
  );
}
