import React from 'react';
import { ArrowDown, Github, Linkedin, Mail, Download, Sparkles, Terminal, Cpu, Database, Server } from 'lucide-react';
import { PERSONAL_INFO } from '../utils/portfolioData';
import { HeroConsole } from './HeroConsole';

interface TerminalHeroProps {
  onOpenResume: () => void;
}

export const TerminalHero: React.FC<TerminalHeroProps> = ({ onOpenResume }) => {
  return (
    <section id="hero" className="relative pt-8 pb-16 overflow-hidden border-b border-slate-800/80 font-mono">
      {/* Background radial matrix glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-gradient-to-b from-cyan-500/10 via-indigo-600/5 to-transparent blur-3xl opacity-50"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Terminal Session Header Bar */}
        <div className="mb-6 p-3 rounded-lg bg-[#0c101c] border border-slate-800/80 text-xs flex flex-wrap items-center justify-between gap-3 text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-bold">$</span>
            <span className="text-slate-200">./init_portfolio.sh --verbose --role="CSE AIML"</span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span>SYSTEM: ONLINE</span>
            <span className="text-slate-600">/</span>
            <span className="text-emerald-400">TTY: /dev/pts/1</span>
            <span className="text-slate-600">/</span>
            <span>UPTIME: 99.98%</span>
          </div>
        </div>

        {/* 2-Column Terminal Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Command Output & Developer Dossier */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-4">
            {/* ASCII / Monospace Identity Card */}
            <div className="w-full p-4 rounded-xl bg-[#090d18] border border-slate-800 space-y-3">
              <div className="text-[11px] text-slate-500 flex items-center justify-between border-b border-slate-800 pb-2">
                <span>IDENTITY DOSSIER // PAWAN_RAJPUT</span>
                <span className="text-cyan-400 font-semibold">{PERSONAL_INFO.title}</span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-2">
                  Pawan Rajput
                </h1>
                <div className="text-sm font-semibold text-cyan-400">
                  {PERSONAL_INFO.title} · Rajarambapu Institute of Technology, Sangli
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  B.Tech CSE (AI/ML) · Class of 2026-27 · CGPA 7.56 / 10 · Technical Head @ Matrix Mind Club
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
                {PERSONAL_INFO.bio}
              </p>

              {/* Subsystem checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-bold">[OK]</span>
                  <span>CV: MobileNetV2 (94.2% Acc)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-bold">[OK]</span>
                  <span>RAG: Qdrant + Neo4j Graph</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-bold">[OK]</span>
                  <span>Edge: STM32 CAN Telemetry</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-bold">[OK]</span>
                  <span>Cache: Redis (77% Latency Drop)</span>
                </div>
              </div>
            </div>

            {/* Terminal Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 w-full pt-1">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow transition-all whitespace-nowrap"
              >
                <span>$ ./view_projects.sh</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>

              <a
                href="#rag-demo"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-200 bg-[#0d121f] border border-slate-700/80 hover:border-cyan-500 hover:text-white rounded-lg transition-all whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>$ python3 opsbrain_rag.py</span>
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg transition-all whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5 text-slate-400" />
                <span>$ cat resume.pdf</span>
              </button>
            </div>

            {/* Quick Terminal Connect Line */}
            <div className="flex flex-wrap items-center gap-3 pt-3 text-xs text-slate-400 w-full border-t border-slate-800/80">
              <span className="text-slate-500 text-[11px]">$ connect:</span>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-cyan-300 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-3.5 h-3.5" />
                <span>gh/{PERSONAL_INFO.githubHandle}</span>
              </a>
              <span className="text-slate-700">·</span>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-cyan-300 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                <span>in/{PERSONAL_INFO.linkedinHandle}</span>
              </a>
              <span className="text-slate-700">·</span>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-1 hover:text-cyan-300 transition-colors"
                aria-label="Email Address"
              >
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden sm:inline">{PERSONAL_INFO.email}</span>
                <span className="sm:hidden">email</span>
              </a>
            </div>
          </div>

          {/* Right Column: HeroConsole (Interactive CLI, Architecture Pipeline & System Specs) */}
          <div className="lg:col-span-5">
            <HeroConsole />
          </div>
        </div>

        {/* 4-Column Terminal Register KPI Strip */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-lg bg-[#0a0e18] border border-slate-800/80 text-xs hover:border-slate-700 transition-colors"
            >
              <div className="text-[10px] text-slate-500 mb-1 flex items-center justify-between">
                <span>REG_0{idx}</span>
                <span className="text-emerald-400 font-bold">VERIFIED</span>
              </div>
              <div className="text-2xl font-bold text-white tracking-tight tabular-nums font-mono text-cyan-300 mb-0.5">
                {stat.value}
              </div>
              <div className="font-semibold text-slate-200 text-xs mb-0.5">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-400">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
