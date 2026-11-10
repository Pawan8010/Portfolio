import React, { useState } from 'react';
import { Terminal, FileText, Palette, Menu, X, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../utils/portfolioData';
import { TerminalTheme } from '../utils/terminalCommands';

interface TerminalNavbarProps {
  currentTheme: TerminalTheme;
  onThemeChange: (theme: TerminalTheme) => void;
  onOpenResume: () => void;
}

export const TerminalNavbar: React.FC<TerminalNavbarProps> = ({
  currentTheme,
  onThemeChange,
  onOpenResume,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { label: '01_terminal.sh', href: '#hero', desc: 'Main Workstation' },
    { label: '02_about.md', href: '#about', desc: 'Background & Degree' },
    { label: '03_projects.ts', href: '#projects', desc: 'Production Systems' },
    { label: '04_rag_engine.py', href: '#rag-demo', desc: 'Hybrid RAG Sandbox' },
    { label: '05_experience.log', href: '#experience', desc: 'Git Commit History' },
    { label: '06_skills.json', href: '#skills', desc: 'Skill Proficiency' },
    { label: '07_contact.sh', href: '#contact', desc: 'Dispatch Mailer' },
  ];

  const cycleTheme = () => {
    const sequence: TerminalTheme[] = ['cyber', 'matrix', 'amber'];
    const nextIdx = (sequence.indexOf(currentTheme) + 1) % sequence.length;
    onThemeChange(sequence[nextIdx]);
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-40 bg-[#060910] border-b border-slate-800 font-mono text-xs select-none shadow-xl">
      {/* Top Window Chrome Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4 border-b border-slate-800/80">
        {/* Left: Window Controls & Shell Identity */}
        <div className="flex items-center gap-3">
          {/* macOS / Linux Terminal Window Dots */}
          <div className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full bg-rose-500/80 cursor-pointer hover:opacity-100 transition-opacity"
              title="Close Session Buffer"
            />
            <span
              className="w-2.5 h-2.5 rounded-full bg-amber-500/80 cursor-pointer hover:opacity-100 transition-opacity"
              title="Minimize Session"
            />
            <span
              className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 cursor-pointer hover:opacity-100 transition-opacity"
              title="Full Terminal View"
            />
          </div>

          <div className="h-3 w-[1px] bg-slate-800 mx-0.5" />

          {/* Terminal Shell Path */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="text-cyan-400 font-semibold group-hover:text-cyan-300 transition-colors">
              pawan@arch-linux:~/portfolio
            </span>
            <span className="text-slate-500 hidden sm:inline">(zsh)</span>
            <span className="text-emerald-400 text-[10px] hidden md:inline">git:(main) ✔</span>
          </a>

          {/* Role Pill - Updated to CSE AIML */}
          <span className="hidden lg:inline text-[11px] text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
            {PERSONAL_INFO.title} · RIT Sangli
          </span>
        </div>

        {/* Right: Theme Switcher & Actions */}
        <div className="flex items-center gap-2.5">
          {/* Theme Switcher Button */}
          <button
            type="button"
            onClick={cycleTheme}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
            title="Cycle Terminal Theme (Cyber / Matrix / Amber)"
          >
            <Palette className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Theme:</span>
            <span className="capitalize font-semibold text-cyan-300">{currentTheme}</span>
          </button>

          {/* Resume PDF Action */}
          <button
            type="button"
            onClick={onOpenResume}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-cyan-300 border border-slate-800 transition-colors"
            aria-label="View Resume PDF Document"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">resume.pdf</span>
          </button>

          {/* Contact Dispatch Button */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 font-semibold transition-colors"
          >
            <span>./contact.sh</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 rounded text-slate-400 hover:text-white border border-slate-800 md:hidden"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Terminal Editor Tab Bar (Desktop) */}
      <div className="hidden md:flex items-center gap-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <a
            key={tab.label}
            href={tab.href}
            className="px-3 py-1 rounded text-[11px] text-slate-400 hover:text-cyan-300 hover:bg-slate-900/60 transition-colors whitespace-nowrap flex items-center gap-1.5"
          >
            <span className="text-slate-600">»</span>
            <span>{tab.label}</span>
          </a>
        ))}
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#090d16] border-b border-slate-800 px-4 py-3 space-y-2">
          <div className="text-[10px] text-slate-500 uppercase">Available Workspace Tabs:</div>
          {tabs.map((tab) => (
            <a
              key={tab.label}
              href={tab.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-2 py-1.5 rounded hover:bg-slate-800/80 text-slate-300 hover:text-cyan-300 transition-colors"
            >
              {tab.label} <span className="text-slate-500 text-[10px]">({tab.desc})</span>
            </a>
          ))}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="text-cyan-400 text-xs flex items-center gap-1 py-1"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Preview resume.pdf</span>
            </button>
            <button
              onClick={cycleTheme}
              className="text-slate-300 text-xs flex items-center gap-1 py-1"
            >
              <Palette className="w-3.5 h-3.5 text-cyan-400" />
              <span>Switch Theme ({currentTheme})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
