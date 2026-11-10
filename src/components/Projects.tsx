import React, { useState } from 'react';
import { ArrowUpRight, Github, Sparkles, Layers, Terminal, FolderGit2 } from 'lucide-react';
import { PROJECTS, Project } from '../utils/portfolioData';
import { ProjectVisualizer } from './ProjectVisualizer';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
  onOpenSandbox: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject, onOpenSandbox }) => {
  const [filter, setFilter] = useState<'All' | 'AI & Machine Learning' | 'RAG & Systems' | 'Embedded & Robotics'>('All');

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === 'All') return true;
    return p.category === filter;
  });

  const filterFlags: { label: string; value: typeof filter }[] = [
    { label: '--all', value: 'All' },
    { label: '--ai-ml', value: 'AI & Machine Learning' },
    { label: '--rag-systems', value: 'RAG & Systems' },
    { label: '--embedded', value: 'Embedded & Robotics' },
  ];

  return (
    <section id="projects" className="py-16 border-b border-slate-800/80 bg-[#060810] font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Terminal Header Bar */}
        <div className="mb-8 p-3 rounded-lg bg-[#0b0f1a] border border-slate-800 text-xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-bold">$</span>
            <span className="text-slate-200">ls -la ~/projects/ --format=detailed</span>
            <span className="text-slate-500 hidden sm:inline">(total {PROJECTS.length} repositories)</span>
          </div>

          {/* Terminal CLI Filter Flags */}
          <div className="flex flex-wrap items-center gap-1.5 shrink-0">
            <span className="text-[11px] text-slate-500 mr-1">flags:</span>
            {filterFlags.map((flag) => (
              <button
                key={flag.label}
                type="button"
                onClick={() => setFilter(flag.value)}
                className={`px-2.5 py-1 text-xs rounded transition-all whitespace-nowrap ${
                  filter === flag.value
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {flag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col justify-between rounded-xl bg-[#090d16] border border-slate-800 hover:border-slate-700 transition-all duration-200 overflow-hidden group shadow-xl"
            >
              {/* Terminal Window Header on Each Card */}
              <div className="px-3.5 py-2 bg-[#0c101c] border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">rwxr-xr-x</span>
                  <span className="text-cyan-400 font-semibold">{project.id}.py</span>
                </div>
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="text-emerald-400 font-semibold">[ACTIVE]</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-400">{project.period}</span>
                </div>
              </div>

              {/* Clean Technical Architecture Visualizer Banner */}
              <div className="w-full h-48 bg-[#04060b] overflow-hidden border-b border-slate-800/80">
                <ProjectVisualizer project={project} />
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-[11px] text-cyan-400 mb-1 font-semibold">
                    [{project.category.toUpperCase()}]
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                    {project.tagline}
                  </p>

                  {/* 3 Metric Points */}
                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded bg-[#060910] border border-slate-800/80 mb-4">
                    {project.metrics.map((m, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-sm font-bold font-mono text-cyan-300 tabular-nums">
                          {m.value}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 5).map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/80 text-slate-300 border border-slate-800"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/40 text-slate-500">
                        +{project.technologies.length - 5}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors"
                    >
                      <Layers className="w-3.5 h-3.5 text-cyan-400" />
                      <span>$ view-spec</span>
                    </button>

                    {project.id === 'opsbrain-ai' && (
                      <button
                        type="button"
                        onClick={onOpenSandbox}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-cyan-300 bg-cyan-950/40 hover:bg-cyan-950/70 border border-cyan-800/50 rounded transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>$ run-demo</span>
                      </button>
                    )}
                  </div>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <Github className="w-4 h-4" />
                    <span className="text-[10px] hidden sm:inline">repo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
