import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../utils/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#05070c] py-10 text-slate-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Terminal Exit Status Bar */}
        <div className="p-3 rounded-lg bg-[#080b12] border border-slate-800 text-[11px] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">[EXIT 0]</span>
            <span className="text-slate-300">Session pawan@workstation active</span>
            <span className="text-slate-600">/</span>
            <span className="text-cyan-400">B.Tech {PERSONAL_INFO.title}</span>
          </div>
          <div className="text-slate-500 text-[10px]">
            ARCH-LINUX x86_64 // CORTEX-M4 HAL READY
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          {/* Identity summary */}
          <div className="flex items-center gap-2 text-slate-300 text-xs">
            <span className="font-bold text-white">{PERSONAL_INFO.name}</span>
            <span className="text-slate-600">·</span>
            <span className="text-cyan-300">{PERSONAL_INFO.title}</span>
            <span className="text-slate-600">·</span>
            <span>RIT Sangli</span>
          </div>

          {/* Socials & Top Action */}
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-400 hover:text-white transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-400 hover:text-cyan-400 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-1.5 text-slate-400 hover:text-white transition-colors"
              aria-label="Email Address"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors text-xs ml-2"
              aria-label="Scroll back to top"
            >
              <span>^ top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
