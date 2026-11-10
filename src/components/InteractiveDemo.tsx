import React, { useState } from 'react';
import { Sparkles, Terminal, Database, GitFork, CheckCircle, FileText, ArrowRight, RefreshCw, Cpu } from 'lucide-react';
import { simulateHybridRagQuery, PRESET_QUERIES, RagSimulationResult } from '../utils/ragSimulator';

export const InteractiveDemo: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<number>(0);
  const [customQuery, setCustomQuery] = useState<string>(PRESET_QUERIES[0]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'answer' | 'chunks' | 'graph'>('answer');
  const [result, setResult] = useState<RagSimulationResult>(() =>
    simulateHybridRagQuery(PRESET_QUERIES[0])
  );

  const handleRunQuery = (queryToRun: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      const res = simulateHybridRagQuery(queryToRun);
      setResult(res);
      setIsProcessing(false);
    }, 280);
  };

  const handleSelectPreset = (idx: number) => {
    setSelectedPreset(idx);
    const q = PRESET_QUERIES[idx];
    setCustomQuery(q);
    handleRunQuery(q);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim()) return;
    handleRunQuery(customQuery);
  };

  return (
    <section id="rag-demo" className="py-20 border-b border-slate-800/60 bg-[#090c14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
            03. Interactive Sandbox
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            OpsBrain AI: Hybrid RAG Query Sandbox
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Experience the hybrid retrieval engine behind OpsBrain AI. Test sample industrial compliance queries to observe dense vector retrieval in <span className="text-cyan-300 font-mono">Qdrant</span>, knowledge graph relationships in <span className="text-indigo-300 font-mono">Neo4j</span>, and audit-traceable citations synthesized via <span className="text-emerald-300 font-mono">Gemini</span>.
          </p>
        </div>

        {/* Interactive Query Console */}
        <div className="rounded-2xl bg-[#0b0f1b] border border-slate-800 shadow-2xl overflow-hidden">
          {/* Console Header Bar */}
          <div className="px-5 py-3.5 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="font-mono text-slate-300 ml-2">OpsBrain Hybrid RAG Engine · Qdrant & Neo4j</span>
            </div>
            <div className="flex items-center gap-4 font-mono text-[11px] text-slate-400">
              <span>CI Gate: 30/30 Passed</span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <span className="text-cyan-400 tabular-nums">Latency: {result.latencyMs}ms</span>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Preset Query Buttons */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Select Industrial Preset Query:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PRESET_QUERIES.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPreset(idx)}
                    className={`text-left p-3 rounded-lg text-xs font-medium transition-all border ${
                      selectedPreset === idx
                        ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-200'
                        : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    <span className="text-[10px] font-mono text-cyan-400 block mb-1">
                      Query 0{idx + 1}
                    </span>
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Query Input Bar */}
            <form onSubmit={handleCustomSubmit} className="flex gap-2">
              <input
                type="text"
                value={customQuery}
                onChange={(e) => {
                  setCustomQuery(e.target.value);
                  setSelectedPreset(-1);
                }}
                placeholder="Ask any technical query regarding turbines, hydraulics, STM32 telemetry..."
                className="flex-1 bg-slate-950 border border-slate-800 focus:border-cyan-500/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={isProcessing}
                className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-slate-950 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap"
              >
                {isProcessing ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                <span>Run Query</span>
              </button>
            </form>

            {/* Output Sub-Tabs */}
            <div className="border-t border-slate-800/80 pt-5">
              <div className="flex items-center gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('answer')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    activeTab === 'answer'
                      ? 'bg-slate-800 text-white border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Synthesized Answer & Citations
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('chunks')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    activeTab === 'chunks'
                      ? 'bg-slate-800 text-white border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Retrieved Chunks ({result.retrievedChunks.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('graph')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    activeTab === 'graph'
                      ? 'bg-slate-800 text-white border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Neo4j Graph Entities ({result.graphEntitiesMatched.length})
                </button>
              </div>

              {/* Tab 1: Grounded Answer & Citations */}
              {activeTab === 'answer' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-line">
                    {result.topAnswer}
                  </div>

                  {/* Verified Citations List */}
                  <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                      Verified Traceable Source Citations:
                    </h4>
                    <div className="space-y-2">
                      {result.citations.map((c, i) => (
                        <div key={i} className="flex items-center justify-between gap-3 text-xs p-2 rounded bg-slate-950/60 border border-slate-800/80">
                          <div className="flex items-center gap-2 text-slate-300 truncate">
                            <FileText className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <span className="font-semibold text-white truncate">{c.doc}</span>
                            <span className="text-slate-500">·</span>
                            <span className="text-slate-400 truncate">{c.section}</span>
                          </div>
                          <span className="font-mono text-[11px] text-emerald-400 tabular-nums shrink-0">
                            {c.confidence}% Match
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Chunks breakdown */}
              {activeTab === 'chunks' && (
                <div className="space-y-3">
                  {result.retrievedChunks.map((chunk, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span className="text-cyan-300 font-semibold">{chunk.sourceDoc} [{chunk.sourceType}]</span>
                        <span className="text-emerald-400">Rerank Score: {chunk.finalRerankScore}</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        {chunk.content}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 pt-1">
                        <span>Section: {chunk.section}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 3: Knowledge Graph Entities */}
              {activeTab === 'graph' && (
                <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-3">
                  <p className="text-slate-400 leading-relaxed">
                    Neo4j Entity Resolution Graph Traversal matches domain nodes based on semantic co-occurrence and structural schema edges:
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {result.graphEntitiesMatched.map((ent, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/40 border border-indigo-700/50 text-indigo-300 font-mono text-xs"
                      >
                        <GitFork className="w-3.5 h-3.5 text-indigo-400" />
                        <span>(Node: {ent})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
