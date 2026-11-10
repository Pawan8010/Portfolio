/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TerminalNavbar } from './components/TerminalNavbar';
import { TerminalPromptBar } from './components/TerminalPromptBar';
import { TerminalHero } from './components/TerminalHero';
import { ScrollProgress } from './components/ScrollProgress';
import { AnimatedSection } from './components/AnimatedSection';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { ProjectModal } from './components/ProjectModal';
import { InteractiveDemo } from './components/InteractiveDemo';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { ResumeModal } from './components/ResumeModal';
import { Footer } from './components/Footer';
import { Project, PROJECTS } from './utils/portfolioData';
import { TerminalTheme } from './utils/terminalCommands';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<TerminalTheme>('cyber');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  const handleOpenSandbox = () => {
    const sandboxElem = document.getElementById('rag-demo');
    if (sandboxElem) {
      sandboxElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProjectById = (projectId: string) => {
    const found = PROJECTS.find((p) => p.id === projectId);
    if (found) {
      setSelectedProject(found);
    }
  };

  return (
    <div
      className={`min-h-screen text-slate-100 font-mono transition-colors duration-300 selection:bg-cyan-500/20 selection:text-cyan-200 ${
        currentTheme === 'matrix'
          ? 'bg-[#040805] text-emerald-100 selection:bg-emerald-500/30 selection:text-emerald-300'
          : currentTheme === 'amber'
          ? 'bg-[#080603] text-amber-100 selection:bg-amber-500/30 selection:text-amber-300'
          : 'bg-[#07090e] text-slate-100'
      }`}
    >
      {/* Top of Viewport Scroll Progress Bar */}
      <ScrollProgress />

      {/* Terminal Workstation Title Bar & Tabs */}
      <TerminalNavbar
        currentTheme={currentTheme}
        onThemeChange={(theme) => setCurrentTheme(theme)}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* Persistent Terminal CLI Prompt Strip */}
      <TerminalPromptBar
        currentTheme={currentTheme}
        onThemeChange={(theme) => setCurrentTheme(theme)}
        onOpenResume={() => setResumeOpen(true)}
        onSelectProject={handleSelectProjectById}
      />

      {/* Main Terminal Output Content */}
      <main>
        {/* Terminal Hero Workstation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <TerminalHero onOpenResume={() => setResumeOpen(true)} />
        </motion.div>

        {/* Section 01: About & Engineering Background */}
        <AnimatedSection>
          <About />
        </AnimatedSection>

        {/* Section 02: Selected Production Projects */}
        <AnimatedSection>
          <Projects
            onSelectProject={(project) => setSelectedProject(project)}
            onOpenSandbox={handleOpenSandbox}
          />
        </AnimatedSection>

        {/* Section 03: Interactive OpsBrain Hybrid RAG Sandbox */}
        <AnimatedSection>
          <InteractiveDemo />
        </AnimatedSection>

        {/* Section 04: Git Log Work Experience */}
        <AnimatedSection>
          <Experience />
        </AnimatedSection>

        {/* Section 05: Tech Stack & Skill Proficiency */}
        <AnimatedSection>
          <Skills />
        </AnimatedSection>

        {/* Section 06: Verified Honors & Certifications */}
        <AnimatedSection>
          <Achievements />
        </AnimatedSection>

        {/* Section 07: Dispatch Mailer Contact Form */}
        <AnimatedSection>
          <Contact onOpenResume={() => setResumeOpen(true)} />
        </AnimatedSection>
      </main>

      {/* Terminal Process Exit Footer */}
      <Footer />

      {/* Project Architecture Deep-Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenSandbox={handleOpenSandbox}
      />

      {/* Full Resume Document Preview Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </div>
  );
}
