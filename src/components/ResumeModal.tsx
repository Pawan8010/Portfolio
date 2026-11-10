import React, { useEffect } from 'react';
import { X, Download, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../utils/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl h-[90vh] bg-[#0b0e18] border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Resume Document Preview"
      >
        {/* Header Bar */}
        <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-sm font-bold text-white">
                {PERSONAL_INFO.name} — Curriculum Vitae
              </h3>
              <p className="text-[11px] font-mono text-slate-400">
                Pawan_Rajput_b621e1ce.pdf · B.Tech CSE (AI/ML)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={PERSONAL_INFO.resumeUrl}
              download="Pawan_Rajput_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Viewer Body */}
        <div className="flex-1 bg-slate-950 relative overflow-hidden">
          <object
            data={PERSONAL_INFO.resumeUrl}
            type="application/pdf"
            className="w-full h-full"
          >
            <div className="flex flex-col items-center justify-center h-full p-8 text-center text-slate-300">
              <FileText className="w-12 h-12 text-cyan-400 mb-4" />
              <p className="text-base font-semibold text-white mb-2">
                PDF Preview Fallback
              </p>
              <p className="text-xs text-slate-400 max-w-md mb-6 leading-relaxed">
                Your browser may not support inline PDF embedding in this window frame. You can open or download the complete PDF resume directly.
              </p>
              <a
                href={PERSONAL_INFO.resumeUrl}
                download="Pawan_Rajput_Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download Pawan Rajput's Resume (PDF)</span>
              </a>
            </div>
          </object>
        </div>

        {/* Footer info bar */}
        <div className="px-6 py-3 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 font-mono">
          <span>Phone: {PERSONAL_INFO.phone}</span>
          <span>Email: {PERSONAL_INFO.email}</span>
          <span>Location: {PERSONAL_INFO.location}</span>
        </div>
      </div>
    </div>
  );
};
