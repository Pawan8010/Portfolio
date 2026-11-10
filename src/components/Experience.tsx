import React from 'react';
import { Briefcase, Calendar, TrendingDown, CheckCircle, GitCommit, GitBranch, Users } from 'lucide-react';
import { EXPERIENCES } from '../utils/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-16 border-b border-slate-800/80 bg-[#070a12] font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Terminal Header */}
        <div className="mb-10 p-3 rounded-lg bg-[#0b0f1a] border border-slate-800 text-xs flex flex-wrap items-center justify-between gap-2 text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-bold">$</span>
            <span className="text-slate-200">git log --graph --decorate --oneline ~/experience</span>
          </div>
          <div className="text-[11px] text-slate-500">
            SECTION_04 // PROFESSIONAL LOG & LEADERSHIP
          </div>
        </div>

        {/* Git Log Stream */}
        <div className="space-y-6">
          {EXPERIENCES.map((exp, expIdx) => {
            const commitHash = exp.id === 'codexintern' ? '7f8a92b' : '9c3e41a';
            const gitTag = exp.id === 'codexintern' ? 'tag: release/codexintern-prod' : 'tag: head/matrix-mind-club';

            return (
              <div
                key={exp.id}
                className="p-5 sm:p-6 rounded-xl bg-[#090d16] border border-slate-800 hover:border-slate-700 transition-colors space-y-4"
              >
                {/* Git Commit Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3 text-xs">
                  <div className="flex items-center gap-2">
                    <GitCommit className="w-4 h-4 text-cyan-400" />
                    <span className="text-amber-400 font-bold">commit {commitHash}</span>
                    <span className="text-emerald-400 text-[10px] bg-emerald-950/40 border border-emerald-900/60 px-1.5 py-0.5 rounded">
                      ({gitTag})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Role & Company */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                    {exp.role} <span className="text-cyan-400 font-normal">@ {exp.company}</span>
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {exp.summary}
                  </p>
                </div>

                {/* Bullet Points */}
                <div className="space-y-2 text-xs text-slate-300">
                  {exp.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold shrink-0 mt-0.5">»</span>
                      <span className="leading-relaxed">{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Special Highlight for CODEXINTERN Latency drop */}
                {exp.id === 'codexintern' && (
                  <div className="p-3 rounded-lg bg-[#05080e] border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-emerald-400" />
                      <div>
                        <span className="font-semibold text-white">Redis Latency Optimization: </span>
                        <span className="text-slate-400">Slashing critical path API latency under high concurrency</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs tabular-nums">
                      <span className="text-rose-400 line-through">420 ms</span>
                      <span className="text-slate-600">➔</span>
                      <span className="text-emerald-400 font-bold">95 ms (-77%)</span>
                    </div>
                  </div>
                )}

                {/* Skills used */}
                <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5 text-[11px]">
                  <span className="text-slate-500 mr-1">stack:</span>
                  {exp.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
