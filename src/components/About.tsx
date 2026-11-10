import React from 'react';
import { Eye, Network, Cpu, GraduationCap, Users, Terminal, CheckCircle2 } from 'lucide-react';
import { EDUCATION, PERSONAL_INFO } from '../utils/portfolioData';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-16 border-b border-slate-800/80 bg-[#070a12] font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Terminal Command Header */}
        <div className="mb-10 p-3 rounded-lg bg-[#0b0f1a] border border-slate-800 text-xs flex flex-wrap items-center justify-between gap-2 text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-bold">$</span>
            <span className="text-slate-200">cat /etc/pawan/philosophy.md</span>
          </div>
          <div className="text-[11px] text-slate-500">
            SECTION_01 // BACKGROUND & ACADEMIC DOSSIER
          </div>
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Narrative Column */}
          <div className="lg:col-span-7 space-y-5 text-slate-300 text-xs sm:text-sm leading-relaxed">
            <div className="p-4 rounded-xl bg-[#0a0e18] border border-slate-800 space-y-3">
              <div className="text-xs font-semibold text-cyan-400">
                // EXECUTIVE SUMMARY & CORE ORIENTATION
              </div>
              <p>
                I am a systems and AI software engineer pursuing my B.Tech in Computer Science and Engineering ({PERSONAL_INFO.title}) at Rajarambapu Institute of Technology, Sangli. My engineering practice focuses on production-grade systems: developing architectures that bridge cutting-edge neural models with strict industrial runtime latency budgets, edge bandwidth constraints, and hardware telemetry.
              </p>
              <p>
                During my software development internship at <strong className="text-white">CODEXINTERN</strong>, I shipped 3 production features across 8,000+ lines of OWASP-compliant code, while profiling live services to architect an asynchronous Redis caching layer that reduced API response times from 420ms to 95ms (a 77% drop).
              </p>
              <p>
                As the <strong className="text-white">Technical Head of Matrix Mind Club</strong>, I steer software standards for a 15-member team building automated internal tools and real-time dashboards for 500+ active students and faculty.
              </p>
            </div>

            {/* Academic Spec Card */}
            <div className="p-4 rounded-xl bg-[#0a0e18] border border-slate-800">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <h3 className="text-sm font-bold text-white">{EDUCATION.degree}</h3>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 font-bold">
                      CGPA {EDUCATION.cgpa}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mb-0.5">{EDUCATION.institution} · {EDUCATION.location}</p>
                  <p className="text-[11px] text-slate-400 font-mono mb-2">{EDUCATION.specialization} · Class of {EDUCATION.period}</p>
                  <ul className="text-xs text-slate-400 space-y-1">
                    {EDUCATION.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Four Engineering Core Nodes */}
          <div className="lg:col-span-5 space-y-3">
            <div className="p-4 rounded-xl bg-[#0a0e18] border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-cyan-400" />
                  <span className="font-bold text-white">Computer Vision & Inference</span>
                </div>
                <span className="text-[10px] text-cyan-400">94.2% ACC</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Trained MobileNetV2 models yielding 94.2% accuracy in field trials. Optimized for edge inference with FastAPI and Firebase integration.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0a0e18] border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-2">
                  <Network className="w-4 h-4 text-indigo-400" />
                  <span className="font-bold text-white">Hybrid Vector & Graph RAG</span>
                </div>
                <span className="text-[10px] text-indigo-400">QDRANT + NEO4J</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Combining dense embeddings in Qdrant with entity-relationship graphs in Neo4j and Gemini synthesis for 100% audit-traceable industrial QA.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0a0e18] border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-white">Embedded Systems & Robotics</span>
                </div>
                <span className="text-[10px] text-emerald-400">&lt; 10µs LOOP</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Bare-metal firmware on STM32 microcontrollers, CAN/SPI telemetry acquisition, PID control loops, and robotics sensor fusion.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0a0e18] border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-sky-400" />
                  <span className="font-bold text-white">Engineering Leadership</span>
                </div>
                <span className="text-[10px] text-sky-400">15 ENGINEERS</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Directing 15 student engineers, driving code reviews, CI/CD automated gates, and hackathon project delivery across the university.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
