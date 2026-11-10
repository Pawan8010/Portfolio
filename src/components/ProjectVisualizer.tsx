import React from 'react';
import { Eye, Network, HeartPulse, Cpu, CheckCircle2, ShieldCheck, Database, GitFork, Activity } from 'lucide-react';
import { Project } from '../utils/portfolioData';

interface ProjectVisualizerProps {
  project: Project;
}

export const ProjectVisualizer: React.FC<ProjectVisualizerProps> = ({ project }) => {
  if (project.id === 'livestock-ai') {
    return (
      <div className="w-full h-full p-5 bg-gradient-to-br from-[#070b14] to-[#0d1424] flex flex-col justify-between border-b border-slate-800/80">
        <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400">
          <div className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            <span>MobileNetV2 Inference Pipeline</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-semibold border border-emerald-500/20">
            94.2% Top-1 Accuracy
          </span>
        </div>

        {/* Visual architecture nodes */}
        <div className="grid grid-cols-3 gap-2 my-4 text-center font-mono">
          <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
            <span className="text-[10px] text-slate-500 block mb-0.5">Input</span>
            <span className="text-xs text-white font-semibold block">Field Photo</span>
            <span className="text-[10px] text-slate-400">1080p Crop</span>
          </div>
          <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-800/50">
            <span className="text-[10px] text-cyan-400 block mb-0.5">Backbone</span>
            <span className="text-xs text-cyan-200 font-semibold block">MobileNetV2</span>
            <span className="text-[10px] text-slate-400">Quantized TFLite</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
            <span className="text-[10px] text-slate-500 block mb-0.5">Serving</span>
            <span className="text-xs text-white font-semibold block">FastAPI</span>
            <span className="text-[10px] text-slate-400">&lt; 180ms latency</span>
          </div>
        </div>

        {/* Simulated breed output bar */}
        <div className="space-y-1.5 font-mono text-[11px]">
          <div className="flex justify-between text-slate-300">
            <span>Primary Breed Confidence</span>
            <span className="text-cyan-400 font-semibold tabular-nums">94.2%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full" style={{ width: '94.2%' }} />
          </div>
        </div>
      </div>
    );
  }

  if (project.id === 'opsbrain-ai') {
    return (
      <div className="w-full h-full p-5 bg-gradient-to-br from-[#070b14] to-[#120f26] flex flex-col justify-between border-b border-slate-800/80">
        <div className="flex items-center justify-between text-[11px] font-mono text-indigo-400">
          <div className="flex items-center gap-1.5">
            <Network className="w-3.5 h-3.5" />
            <span>Hybrid RAG Knowledge Graph</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-semibold border border-cyan-500/20">
            100% CI Benchmark
          </span>
        </div>

        {/* Dual index architecture */}
        <div className="grid grid-cols-2 gap-2 my-4 font-mono text-[11px]">
          <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center gap-2.5">
            <Database className="w-4 h-4 text-cyan-400 shrink-0" />
            <div>
              <span className="text-white font-semibold block">Qdrant Vectors</span>
              <span className="text-[10px] text-slate-400">Dense embeddings (HNSW)</span>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center gap-2.5">
            <GitFork className="w-4 h-4 text-indigo-400 shrink-0" />
            <div>
              <span className="text-white font-semibold block">Neo4j Graph</span>
              <span className="text-[10px] text-slate-400">Entity relation paths</span>
            </div>
          </div>
        </div>

        {/* Grounding guarantee */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/70 border border-slate-800 font-mono text-[10px] text-slate-300">
          <span>Grounded Ingestion: 6 file formats</span>
          <span className="text-emerald-400 font-semibold">Verified Line Citations</span>
        </div>
      </div>
    );
  }

  if (project.id === 'goldenhour-ai') {
    return (
      <div className="w-full h-full p-5 bg-gradient-to-br from-[#070b14] to-[#1a0e14] flex flex-col justify-between border-b border-slate-800/80">
        <div className="flex items-center justify-between text-[11px] font-mono text-rose-400">
          <div className="flex items-center gap-1.5">
            <HeartPulse className="w-3.5 h-3.5" />
            <span>Emergency Clinical Triage Engine</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 font-semibold border border-rose-500/20">
            24h Sprint Prototype
          </span>
        </div>

        {/* 3 microservices */}
        <div className="grid grid-cols-3 gap-2 my-4 text-center font-mono">
          <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
            <span className="text-[10px] text-slate-500 block mb-0.5">Input</span>
            <span className="text-xs text-white font-semibold block">56 Vitals</span>
            <span className="text-[10px] text-slate-400">Telemetry array</span>
          </div>
          <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-800/40">
            <span className="text-[10px] text-rose-400 block mb-0.5">Scoring</span>
            <span className="text-xs text-rose-200 font-semibold block">ESI Triage</span>
            <span className="text-[10px] text-slate-400">ML Classification</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
            <span className="text-[10px] text-slate-500 block mb-0.5">Output</span>
            <span className="text-xs text-white font-semibold block">Trauma Alert</span>
            <span className="text-[10px] text-slate-400">&lt; 50ms webhook</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>Multimodal: Voice Dictation + REST</span>
          <span className="text-rose-400 font-semibold">Priority 1 to 5</span>
        </div>
      </div>
    );
  }

  // STM32 Robotics
  return (
    <div className="w-full h-full p-5 bg-gradient-to-br from-[#070b14] to-[#0c181f] flex flex-col justify-between border-b border-slate-800/80">
      <div className="flex items-center justify-between text-[11px] font-mono text-sky-400">
        <div className="flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5" />
          <span>STM32 Embedded Firmware</span>
        </div>
        <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 font-semibold border border-sky-500/20">
          1kHz Deterministic Loop
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 my-4 text-center font-mono">
        <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] text-slate-500 block mb-0.5">Bus</span>
          <span className="text-xs text-white font-semibold block">CAN & SPI</span>
          <span className="text-[10px] text-slate-400">IMU / Encoders</span>
        </div>
        <div className="p-2.5 rounded-lg bg-sky-950/30 border border-sky-800/40">
          <span className="text-[10px] text-sky-400 block mb-0.5">Control</span>
          <span className="text-xs text-sky-200 font-semibold block">PID Loop</span>
          <span className="text-[10px] text-slate-400">Actuator torque</span>
        </div>
        <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] text-slate-500 block mb-0.5">Timing</span>
          <span className="text-xs text-white font-semibold block">&lt; 10µs</span>
          <span className="text-[10px] text-slate-400">Interrupt jitter</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span>Hardware: STM32 ARM Cortex-M4</span>
        <span className="text-sky-300 font-semibold">Bare-metal / FreeRTOS</span>
      </div>
    </div>
  );
};
