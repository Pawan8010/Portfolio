import React, { useEffect } from 'react';
import { X, Github, ExternalLink, Cpu, CheckCircle2, Layers } from 'lucide-react';
import { Project } from '../utils/portfolioData';
import { ProjectVisualizer } from './ProjectVisualizer';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenSandbox?: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onOpenSandbox }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl my-8 bg-[#0a0d16] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        {/* Modal Header Architecture Visualizer & Close */}
        <div className="relative w-full h-44 bg-slate-950 overflow-hidden">
          <ProjectVisualizer project={project} />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors z-10"
            aria-label="Close Project Details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Header Title */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <span>{project.category}</span>
              <span aria-hidden="true">·</span>
              <span>{project.period}</span>
            </div>
            <h3 id="modal-project-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {project.title}
            </h3>
          </div>

          {/* Tagline & Summary */}
          <div>
            <p className="text-sm sm:text-base font-medium text-slate-200 mb-2">
              {project.tagline}
            </p>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="text-center">
                <div className="text-lg sm:text-xl font-bold font-mono text-cyan-400 tabular-nums">
                  {m.value}
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400 font-medium">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* System Architecture & Pipeline Breakdown */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>System Architecture & Execution Flow</span>
            </div>
            <p className="text-xs text-slate-400">
              {project.architectureDetails.overview}
            </p>

            <div className="space-y-2 pt-2">
              {project.architectureDetails.pipeline.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-900/40 border border-slate-800/60 text-xs">
                  <span className="font-mono text-cyan-400 font-bold shrink-0 mt-0.5">
                    0{idx + 1}.
                  </span>
                  <span className="text-slate-300">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Highlights */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Technical Contributions & Results
            </h4>
            <div className="space-y-2">
              {project.keyHighlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benchmark result box */}
          <div className="p-3.5 rounded-lg bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200">
            <span className="font-semibold text-cyan-300">Empirical Benchmark: </span>
            {project.architectureDetails.benchmark}
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Technologies & Infrastructure
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((t, idx) => (
                <span key={idx} className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>View on GitHub</span>
              </a>

              {project.id === 'opsbrain-ai' && onOpenSandbox && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenSandbox();
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
                >
                  <Cpu className="w-4 h-4" />
                  <span>Launch RAG Sandbox</span>
                </button>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
