import React, { useState } from 'react';
import { Search, Terminal, Sliders, Check } from 'lucide-react';
import { SKILL_CATEGORIES } from '../utils/portfolioData';

export const Skills: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = SKILL_CATEGORIES.map((category) => {
    if (!searchQuery.trim()) return category;
    const filteredSkills = category.skills.filter((s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return {
      ...category,
      skills: filteredSkills,
    };
  }).filter((category) => category.skills.length > 0);

  return (
    <section id="skills" className="py-16 border-b border-slate-800/80 bg-[#060810] font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Terminal Header */}
        <div className="mb-8 p-3 rounded-lg bg-[#0b0f1a] border border-slate-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-bold">$</span>
            <span className="text-slate-200">cat /etc/tech_stack.json | jq '.categories[]'</span>
          </div>

          {/* Terminal Grep Search Input */}
          <div className="flex items-center gap-2 bg-[#080b12] px-3 py-1.5 rounded border border-slate-800 focus-within:border-cyan-500 transition-colors w-full sm:w-64">
            <span className="text-cyan-400 text-xs font-bold">grep:</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. Redis, PyTorch..."
              className="bg-transparent text-white placeholder:text-slate-600 focus:outline-none text-xs w-full"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-slate-500 hover:text-white text-[10px]"
              >
                clear
              </button>
            )}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCategories.map((category, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#090d16] border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="text-[11px] text-cyan-400 mb-1 font-semibold flex items-center justify-between">
                  <span>[{category.title.toUpperCase()}]</span>
                  <span className="text-slate-600 text-[10px]">{category.skills.length} skills</span>
                </div>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  {category.description}
                </p>

                {/* Skill bars */}
                <div className="space-y-2.5">
                  {category.skills.map((skill, sIdx) => {
                    const filledBlocks = Math.round(skill.level / 10);
                    const emptyBlocks = 10 - filledBlocks;
                    const blockBar = '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks);

                    return (
                      <div key={sIdx} className="text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-mono ${skill.highlight ? 'text-white font-semibold' : 'text-slate-300'}`}>
                            {skill.name}
                          </span>
                          <span className="text-cyan-300 font-mono text-[11px] tabular-nums">
                            {skill.level}%
                          </span>
                        </div>
                        {/* Monospace ASCII Progress Bar */}
                        <div className="flex items-center gap-1 font-mono text-[10px] text-cyan-400/80 tracking-tighter select-none">
                          <span className="text-slate-600">[</span>
                          <span className="text-cyan-400">{ '█'.repeat(filledBlocks) }</span>
                          <span className="text-slate-800">{ '░'.repeat(emptyBlocks) }</span>
                          <span className="text-slate-600">]</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
