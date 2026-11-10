import React, { useState } from 'react';
import { Terminal, Cpu, Layers, Copy, Check, Play, RefreshCw } from 'lucide-react';
import { PERSONAL_INFO } from '../utils/portfolioData';

export const HeroConsole: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'terminal' | 'pipeline' | 'specs'>('terminal');
  const [inputCmd, setInputCmd] = useState('');
  const [copied, setCopied] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; output: string }>>([
    {
      cmd: 'pawan --status',
      output: `Name:        ${PERSONAL_INFO.name}\nRole:        ${PERSONAL_INFO.title}\nEducation:   RIT Sangli (B.Tech CSE AI/ML, CGPA 7.56)\nLeadership:  Technical Head @ Matrix Mind Club (15 engineers)\nFocus:       Production CV, Hybrid RAG, STM32 Embedded\nOpen for:    Robotics Annotator & AI Internships`,
    },
  ]);

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let response = '';

    if (trimmed === 'help') {
      response = `Available commands:\n  pawan --status     Display developer profile & credentials\n  pawan --projects   List active production projects\n  pawan --metrics    Show key benchmark results\n  pawan --contact    Show verified contact channels\n  clear              Clear terminal history`;
    } else if (trimmed === 'pawan --status' || trimmed === 'status') {
      response = `Name:        ${PERSONAL_INFO.name}\nRole:        ${PERSONAL_INFO.title}\nCollege:     RIT Sangli (B.Tech CSE AI/ML)\nOpen for:    Robotics Annotator & AI Engineering Roles`;
    } else if (trimmed === 'pawan --projects' || trimmed === 'projects') {
      response = `Active Projects:\n  1. LivestockAI   — MobileNetV2 cattle classifier (94.2% accuracy)\n  2. OpsBrain AI   — Hybrid RAG (Qdrant + Neo4j + Gemini, 100% pass)\n  3. GoldenHour    — Emergency triage telemetry tool (56 points, 24h sprint)\n  4. STM32 System  — Low-latency CAN-bus motor control (<10µs loop)`;
    } else if (trimmed === 'pawan --metrics' || trimmed === 'metrics') {
      response = `Key Empirical Metrics:\n  • 94.2% classification accuracy in live agricultural trials\n  • 77% Redis API latency reduction (420ms -> 95ms)\n  • Top 1% Global Rank in TCS CodeVita (2,754 / 300,000+)\n  • 100% pass rate on 25-question industrial compliance benchmark`;
    } else if (trimmed === 'pawan --contact' || trimmed === 'contact') {
      response = `Email:    ${PERSONAL_INFO.email}\nPhone:    ${PERSONAL_INFO.phone}\nGitHub:   ${PERSONAL_INFO.github}\nLinkedIn: ${PERSONAL_INFO.linkedin}`;
    } else if (trimmed === 'clear') {
      setTerminalHistory([]);
      return;
    } else {
      response = `Command not recognized: "${cmd}". Type "help" for a list of available commands.`;
    }

    setTerminalHistory((prev) => [...prev, { cmd, output: response }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCmd.trim()) return;
    runCommand(inputCmd);
    setInputCmd('');
  };

  const handleCopyProfile = () => {
    const text = `Pawan Rajput - ${PERSONAL_INFO.title}\nEmail: ${PERSONAL_INFO.email}\nPhone: ${PERSONAL_INFO.phone}\nGitHub: ${PERSONAL_INFO.github}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl bg-[#090d16] border border-slate-800 shadow-2xl overflow-hidden flex flex-col font-mono text-xs">
      {/* Console Top Window Chrome */}
      <div className="px-4 py-3 bg-[#0d121f] border-b border-slate-800/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/80" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="text-slate-400 text-[11px] ml-2">pawan@rit-lab: ~</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
              activeTab === 'terminal'
                ? 'bg-slate-800 text-cyan-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            CLI
          </button>
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
              activeTab === 'pipeline'
                ? 'bg-slate-800 text-cyan-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Pipeline
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
              activeTab === 'specs'
                ? 'bg-slate-800 text-cyan-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Specs
          </button>
          <button
            onClick={handleCopyProfile}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 ml-1 transition-colors"
            title="Copy Developer Summary"
            aria-label="Copy Developer Summary"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Tab 1: Interactive Terminal */}
      {activeTab === 'terminal' && (
        <div className="p-4 h-[320px] flex flex-col justify-between overflow-hidden bg-[#070a12]">
          <div className="overflow-y-auto space-y-3 pr-1 text-[11px] leading-relaxed">
            {terminalHistory.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-cyan-400">
                  <span className="text-slate-500">$</span>
                  <span className="font-semibold">{item.cmd}</span>
                </div>
                <pre className="text-slate-300 whitespace-pre-wrap font-mono text-[11px] bg-slate-950/60 p-2 rounded-lg border border-slate-900">
                  {item.output}
                </pre>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800/80">
            {/* Quick Action Badges */}
            <div className="flex flex-wrap items-center gap-1.5 mb-2 text-[10px]">
              <span className="text-slate-500">Quick queries:</span>
              <button
                type="button"
                onClick={() => runCommand('pawan --projects')}
                className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 transition-colors"
              >
                projects
              </button>
              <button
                type="button"
                onClick={() => runCommand('pawan --metrics')}
                className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 transition-colors"
              >
                metrics
              </button>
              <button
                type="button"
                onClick={() => runCommand('pawan --contact')}
                className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 transition-colors"
              >
                contact
              </button>
              <button
                type="button"
                onClick={() => runCommand('clear')}
                className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800 transition-colors"
              >
                clear
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <span className="text-cyan-400 font-bold">$</span>
              <input
                type="text"
                value={inputCmd}
                onChange={(e) => setInputCmd(e.target.value)}
                placeholder="type 'help' or any command..."
                className="flex-1 bg-transparent text-slate-100 placeholder:text-slate-600 focus:outline-none text-[11px]"
              />
              <button
                type="submit"
                className="p-1 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition-colors"
                aria-label="Execute command"
              >
                <Play className="w-3 h-3" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tab 2: Architecture Pipeline */}
      {activeTab === 'pipeline' && (
        <div className="p-4 h-[320px] overflow-y-auto bg-[#070a12] space-y-3">
          <div className="text-[11px] text-slate-400 mb-2">
            End-to-End System Architecture (Perception & Hybrid RAG):
          </div>

          <div className="space-y-2">
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
              <div className="flex items-center justify-between text-cyan-300 font-bold mb-1 text-[11px]">
                <span>01. Mobile Ingestion & Edge Preprocessing</span>
                <span className="text-[10px] text-slate-400 font-mono">MobileNetV2</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Normalized RGB tensors, cropping, and on-device quantization for instant rural camera inferencing.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
              <div className="flex items-center justify-between text-cyan-300 font-bold mb-1 text-[11px]">
                <span>02. Dense Vectors + Knowledge Graph Fusion</span>
                <span className="text-[10px] text-slate-400 font-mono">Qdrant + Neo4j</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Cosine vector proximity combined with entity schema relationship traversal via Reciprocal Rank Fusion.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
              <div className="flex items-center justify-between text-cyan-300 font-bold mb-1 text-[11px]">
                <span>03. Async API Gateway & Caching</span>
                <span className="text-[10px] text-slate-400 font-mono">FastAPI + Redis</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Slashing query path from 420ms down to 95ms with OWASP-compliant validation and structured schema contracts.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: System Specs */}
      {activeTab === 'specs' && (
        <div className="p-4 h-[320px] overflow-y-auto bg-[#070a12] space-y-2.5 text-[11px]">
          <div className="text-slate-400 mb-1">Production Environment Specifications:</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Machine Learning</span>
              <span className="text-cyan-300 font-semibold">TensorFlow 2.16 · MobileNetV2</span>
            </div>
            <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Vector Database</span>
              <span className="text-cyan-300 font-semibold">Qdrant Engine (HNSW)</span>
            </div>
            <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Graph Database</span>
              <span className="text-cyan-300 font-semibold">Neo4j Cypher Traversal</span>
            </div>
            <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Backend Framework</span>
              <span className="text-cyan-300 font-semibold">FastAPI · Python 3.12 · Uvicorn</span>
            </div>
            <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Caching & Cache Invalidation</span>
              <span className="text-cyan-300 font-semibold">Redis 7 (Async Sentinel)</span>
            </div>
            <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Microcontroller Platform</span>
              <span className="text-cyan-300 font-semibold">STM32 ARM Cortex-M4 · CAN</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
