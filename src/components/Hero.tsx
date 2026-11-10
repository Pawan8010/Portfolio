import React from 'react';
import { ArrowDown, Github, Linkedin, Mail, Download, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../utils/portfolioData';
import { HeroConsole } from './HeroConsole';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  return (
    <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden border-b border-slate-800/60">
      {/* Background radial glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-cyan-500/10 via-indigo-600/10 to-transparent blur-3xl opacity-60"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Screen 2-Column Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Clean Natural Label without decorative pulsing dots or all-caps shouting */}
            <div className="text-xs font-mono text-cyan-400 mb-2 tracking-wide">
              Pawan Rajput — Portfolio
            </div>
            <div className="text-xs text-slate-400 font-medium mb-4">
              AI/ML Engineer & Robotics Specialist · Rajarambapu Institute of Technology, Sangli
            </div>

            {/* Display Headline - Crisp, High-Contrast & Legible */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-5">
              Building Production AI, Hybrid RAG & Edge Robotics.
            </h1>

            {/* Lead Copy */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-6">
              I develop high-accuracy computer vision microservices, industrial hybrid RAG systems with verifiable source citations, and deterministic STM32 firmware for real-world robotics.
            </p>

            {/* Clean Unboxed Metadata */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 mb-8 font-medium">
              <span>Sangli, India</span>
              <span aria-hidden="true" className="text-slate-600">/</span>
              <span>B.Tech CSE (AI/ML) · CGPA 7.56</span>
              <span aria-hidden="true" className="text-slate-600">/</span>
              <span>Technical Head @ Matrix Mind Club</span>
              <span aria-hidden="true" className="text-slate-600">/</span>
              <span>TCS CodeVita Top 1%</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto mb-8">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-md hover:shadow-cyan-500/25 transition-all whitespace-nowrap"
              >
                <span>Explore Selected Works</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="#rag-demo"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-200 bg-slate-900 border border-slate-700/80 hover:border-slate-500 hover:text-white rounded-lg transition-all whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Try RAG Sandbox</span>
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-white border border-transparent hover:border-slate-800 rounded-lg transition-all whitespace-nowrap"
              >
                <Download className="w-4 h-4 text-slate-400" />
                <span>Resume PDF</span>
              </button>
            </div>

            {/* Social Proof & Quick Connect Links */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-800/80 w-full text-slate-400 text-sm">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">Connect:</span>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
                <span className="font-mono text-xs">github/{PERSONAL_INFO.githubHandle}</span>
              </a>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4 text-cyan-400" />
                <span className="font-mono text-xs">linkedin/in/{PERSONAL_INFO.linkedinHandle}</span>
              </a>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-1.5 hover:text-white transition-colors"
                aria-label="Email Address"
              >
                <Mail className="w-4 h-4 text-indigo-400" />
                <span className="font-mono text-xs hidden sm:inline">{PERSONAL_INFO.email}</span>
                <span className="font-mono text-xs sm:hidden">Email</span>
              </a>
            </div>
          </div>

          {/* Right Column: Clean Interactive Hero Console (Replaces stock image) */}
          <div className="lg:col-span-5">
            <HeroConsole />
          </div>
        </div>

        {/* 4-Column Real Quantified KPI Strip in a Full-Width Row Below Hero Split */}
        <div className="mt-14 pt-10 border-t border-slate-800/80 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums mb-1 tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-slate-200 mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-slate-400">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
