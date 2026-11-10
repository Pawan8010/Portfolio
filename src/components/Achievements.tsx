import React from 'react';
import { Trophy, Award as AwardIcon, CheckCircle2, ShieldCheck } from 'lucide-react';
import { AWARDS, CERTIFICATIONS } from '../utils/portfolioData';

export const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="py-16 border-b border-slate-800/80 bg-[#070a12] font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Terminal Header */}
        <div className="mb-10 p-3 rounded-lg bg-[#0b0f1a] border border-slate-800 text-xs flex flex-wrap items-center justify-between gap-2 text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-bold">$</span>
            <span className="text-slate-200">pawan-audit --honors --verified-credentials</span>
          </div>
          <div className="text-[11px] text-slate-500">
            SECTION_06 // COMPETITIVE ACHIEVEMENTS
          </div>
        </div>

        {/* 2-Column: Awards on Left (8 cols), Certifications on Right (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Awards Cards (8 columns) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="text-xs text-amber-400 font-bold flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>[NATIONAL HONORS & GLOBAL CODEVITA]</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {AWARDS.map((award, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#090d16] border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between space-y-2"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5 text-xs">
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 font-bold text-[11px]">
                        {award.highlightText}
                      </span>
                      <span className="text-slate-500 text-[10px]">
                        {award.year}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white mb-1">
                      {award.title}
                    </h4>
                    <p className="text-xs font-semibold text-cyan-400 mb-1.5">
                      {award.organization}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {award.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications (4 columns) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-xs text-cyan-400 font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>[VERIFIED CREDENTIALS]</span>
            </div>

            <div className="space-y-3">
              {CERTIFICATIONS.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#090d16] border border-slate-800 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white mb-0.5">
                        {cert.name}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {cert.issuer} · <span className="text-slate-500">{cert.year}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="p-3 rounded-lg bg-[#05080e] border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div className="text-emerald-400 font-semibold">[ALL CREDENTIALS VERIFIED]</div>
                <p>Audited against Oracle University, Cisco Networking Academy, and Google SWE records.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
