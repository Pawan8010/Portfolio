import { PERSONAL_INFO, PROJECTS, EXPERIENCES, EDUCATION, AWARDS, SKILL_CATEGORIES } from './portfolioData';
import { simulateHybridRagQuery } from './ragSimulator';

export type TerminalTheme = 'cyber' | 'matrix' | 'amber';

export interface CommandOutput {
  command: string;
  type: 'text' | 'error' | 'success' | 'table' | 'json' | 'help' | 'rag';
  content: string;
  structured?: any;
  action?: 'scroll_to' | 'open_resume' | 'change_theme' | 'clear' | 'open_modal';
  actionTarget?: string;
}

export function executeTerminalCommand(
  rawInput: string,
  currentTheme: TerminalTheme = 'cyber'
): CommandOutput {
  const input = rawInput.trim();
  if (!input) {
    return { command: '', type: 'text', content: '' };
  }

  const parts = input.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);
  const joinedArgs = args.join(' ');

  switch (cmd) {
    case 'help':
    case 'man': {
      const helpText = [
        'PAWAN RAJPUT WORKSTATION CLI (v2.4.0-prod)',
        'Usage: <command> [arguments...]',
        '',
        'CORE COMMANDS:',
        '  whoami                 Print developer identity, degree & core credentials',
        '  cat bio.txt            Display detailed engineering philosophy & background',
        '  ls [-la] [projects]    List production projects & architecture details',
        '  project <id>           Open full architecture spec for a project (e.g. "project livestock-ai")',
        '  rag <query>            Execute real hybrid RAG search against industrial docs',
        '  git log / experience   Display engineering experience & impact timeline',
        '  skills / sysinfo       Inspect categorized tech stack & proficiency bars',
        '  awards                 View hackathons, rankings (TCS CodeVita Top 1%) & awards',
        '  resume / cv            Launch interactive PDF resume viewer',
        '  contact                Show contact info or jump to interactive mailer form',
        '  theme <cyber|matrix|amber>  Switch terminal colorway',
        '  uname -a               Print operating system & firmware hardware specs',
        '  date                   Print current workstation timestamp',
        '  clear                  Purge terminal command history buffer',
        '',
        'QUICK SHORTCUTS: Click any suggested command chip or press [Tab] to auto-complete.',
      ].join('\n');
      return { command: input, type: 'help', content: helpText };
    }

    case 'whoami': {
      const text = [
        `USER:        ${PERSONAL_INFO.name}`,
        `ROLE:        ${PERSONAL_INFO.title}`,
        `LOCATION:    ${PERSONAL_INFO.location}`,
        `INSTITUTE:   RIT Sangli (${EDUCATION.institution}) · ${EDUCATION.specialization}`,
        `ACADEMICS:   CGPA ${EDUCATION.cgpa} · Class of 2026-27`,
        `LEADERSHIP:  Technical Head @ Matrix Mind Club (15-member team)`,
        `SPECIALTY:   Computer Vision, Hybrid RAG (Qdrant+Neo4j), STM32 Firmware`,
        `STATUS:      Available for Robotics Annotator & AI Internships`,
      ].join('\n');
      return { command: input, type: 'success', content: text };
    }

    case 'cat': {
      const target = (args[0] || '').toLowerCase();
      if (!target) {
        return {
          command: input,
          type: 'error',
          content: 'cat: missing file operand. Try "cat bio.txt", "cat resume.txt", or "cat education.json"',
        };
      }

      if (target === 'bio.txt' || target === 'about.txt' || target === 'about.md') {
        const text = [
          '# ABOUT PAWAN RAJPUT',
          PERSONAL_INFO.bio,
          '',
          'PHILOSOPHY:',
          '  "Bridging high-accuracy machine learning with real-world edge deployment."',
          '  Focusing on low-latency microservices, zero-hallucination hybrid RAG,',
          '  and deterministic embedded motor control on ARM Cortex-M hardware.',
        ].join('\n');
        return { command: input, type: 'text', content: text, action: 'scroll_to', actionTarget: 'about' };
      }

      if (target === 'resume.txt' || target === 'resume.pdf' || target === 'cv') {
        return {
          command: input,
          type: 'success',
          content: `Opening official resume PDF (${PERSONAL_INFO.resumeUrl})...`,
          action: 'open_resume',
        };
      }

      if (target === 'education.json') {
        return {
          command: input,
          type: 'json',
          content: JSON.stringify(EDUCATION, null, 2),
        };
      }

      if (target === 'contact.txt') {
        const text = [
          `Email:    ${PERSONAL_INFO.email}`,
          `Phone:    ${PERSONAL_INFO.phone}`,
          `GitHub:   ${PERSONAL_INFO.github}`,
          `LinkedIn: ${PERSONAL_INFO.linkedin}`,
        ].join('\n');
        return { command: input, type: 'text', content: text, action: 'scroll_to', actionTarget: 'contact' };
      }

      return {
        command: input,
        type: 'error',
        content: `cat: ${target}: No such file. Try "ls" to see available files.`,
      };
    }

    case 'ls': {
      const target = (args[0] || '').toLowerCase();
      if (target === 'projects' || target === './projects' || args.includes('-l') || args.includes('-la')) {
        const header = 'total 4 projects (drwxr-xr-x 4 pawan staff)\n';
        const projectRows = PROJECTS.map((p) => {
          const acc = p.metrics[0] ? `${p.metrics[0].label}: ${p.metrics[0].value}` : '';
          return `-rwxr-xr-x  1 pawan  ai   ${p.id.padEnd(16)}  [${p.category}]  ${p.title.split('—')[0].trim()} (${acc})`;
        }).join('\n');
        return {
          command: input,
          type: 'text',
          content: header + projectRows + '\n\nTip: Run "project <id>" to view full architecture diagram.',
          action: 'scroll_to',
          actionTarget: 'projects',
        };
      }

      const files = [
        'drwxr-xr-x  projects/         (4 production AI & embedded systems)',
        '-rw-r--r--  bio.txt           (Engineering background & philosophy)',
        '-rw-r--r--  education.json    (RIT Sangli B.Tech CSE AI/ML, CGPA 7.56)',
        '-rw-r--r--  tech_stack.json   (Categorized skill inventory)',
        '-rwxr-xr-x  opsbrain_rag.py   (Interactive hybrid RAG retrieval runner)',
        '-rw-r--r--  resume.pdf        (Official verified resume document)',
        '-rw-r--r--  contact.txt       (Direct email, phone & social profiles)',
      ].join('\n');
      return { command: input, type: 'text', content: files };
    }

    case 'project': {
      const query = (args[0] || '').toLowerCase();
      if (!query) {
        return {
          command: input,
          type: 'error',
          content: 'Usage: project <livestock-ai | opsbrain-ai | goldenhour-ai | stm32-robotics>',
        };
      }

      const match = PROJECTS.find(
        (p) => p.id.toLowerCase() === query || p.id.toLowerCase().includes(query) || p.title.toLowerCase().includes(query)
      );

      if (match) {
        const text = [
          `PROJECT:    ${match.title}`,
          `CATEGORY:   ${match.category}`,
          `ROLE:       ${match.role} (${match.period})`,
          `STACK:      ${match.technologies.join(', ')}`,
          `TAGLINE:    ${match.tagline}`,
          '',
          `METRICS:`,
          ...match.metrics.map((m) => `  • ${m.label}: ${m.value}`),
          '',
          `BENCHMARK:  ${match.architectureDetails.benchmark}`,
          `GITHUB:     ${match.githubUrl}`,
        ].join('\n');

        return {
          command: input,
          type: 'success',
          content: text,
          action: 'open_modal',
          actionTarget: match.id,
        };
      }

      return {
        command: input,
        type: 'error',
        content: `Project "${query}" not found. Available: ${PROJECTS.map((p) => p.id).join(', ')}`,
      };
    }

    case 'projects': {
      return {
        command: input,
        type: 'text',
        content: `Displaying ${PROJECTS.length} selected production projects in view...`,
        action: 'scroll_to',
        actionTarget: 'projects',
      };
    }

    case 'rag': {
      const query = joinedArgs || 'What is the emergency shutdown response time for hydraulic solenoid valve EV-402?';
      const result = simulateHybridRagQuery(query);

      const text = [
        `[OPSBRAIN HYBRID RAG ENGINE] query: "${query}"`,
        `STATUS:      ${result.latencyMs}ms | Grounding: 100% (Pass)`,
        `VECTOR:      Qdrant Cosine Similarity ${(result.retrievedChunks[0]?.vectorScore ? result.retrievedChunks[0].vectorScore * 100 : 92).toFixed(1)}%`,
        `GRAPH:       Neo4j Entity Traversal: ${result.graphEntitiesMatched.join(' ➔ ')}`,
        '',
        `SYNTHESIS:`,
        `"${result.topAnswer}"`,
        '',
        `VERIFIED AUDIT CITATIONS:`,
        ...result.citations.map((c, i) => `  [${i + 1}] ${c.doc} (${c.section}) — Match: ${c.confidence}%`),
      ].join('\n');

      return {
        command: input,
        type: 'rag',
        content: text,
        structured: result,
        action: 'scroll_to',
        actionTarget: 'rag-demo',
      };
    }

    case 'git': {
      if (args[0] === 'log') {
        const commits = EXPERIENCES.flatMap((exp) =>
          exp.bullets.map((b, i) => {
            const hash = Math.random().toString(16).substring(2, 9);
            return `commit ${hash} (HEAD -> main, tag: ${exp.company.toLowerCase().replace(/\s+/g, '-')})\nAuthor: Pawan Rajput <${PERSONAL_INFO.email}>\nDate:   ${exp.period}\n\n    [${exp.role} @ ${exp.company}]\n    * ${b}\n`;
          })
        ).join('\n');
        return {
          command: input,
          type: 'text',
          content: commits,
          action: 'scroll_to',
          actionTarget: 'experience',
        };
      }
      return {
        command: input,
        type: 'text',
        content: 'Usage: git log --experience',
        action: 'scroll_to',
        actionTarget: 'experience',
      };
    }

    case 'experience':
    case 'exp': {
      return {
        command: input,
        type: 'text',
        content: 'Displaying professional experience: CODEXINTERN & Matrix Mind Club Technical Head...',
        action: 'scroll_to',
        actionTarget: 'experience',
      };
    }

    case 'skills':
    case 'sysinfo': {
      const skillText = SKILL_CATEGORIES.map((cat) => {
        const bars = cat.skills.map((s) => {
          const filled = Math.round(s.level / 10);
          const empty = 10 - filled;
          const bar = '█'.repeat(filled) + '░'.repeat(empty);
          return `  ${s.name.padEnd(26)} [${bar}] ${s.level}%`;
        }).join('\n');
        return `[${cat.title.toUpperCase()}]\n${bars}`;
      }).join('\n\n');

      return {
        command: input,
        type: 'text',
        content: skillText,
        action: 'scroll_to',
        actionTarget: 'skills',
      };
    }

    case 'awards':
    case 'achievements': {
      const awardText = AWARDS.map(
        (a, i) => `[${i + 1}] ${a.title.toUpperCase()} — ${a.organization} (${a.year})\n    ${a.highlightText}: ${a.description}`
      ).join('\n\n');
      return {
        command: input,
        type: 'success',
        content: awardText,
        action: 'scroll_to',
        actionTarget: 'achievements',
      };
    }

    case 'resume':
    case 'cv': {
      return {
        command: input,
        type: 'success',
        content: 'Opening official resume PDF preview modal...',
        action: 'open_resume',
      };
    }

    case 'contact': {
      const contactText = [
        'CONTACT DISPATCH CHANNELS:',
        `  Email:     ${PERSONAL_INFO.email}`,
        `  Phone:     ${PERSONAL_INFO.phone}`,
        `  LinkedIn:  ${PERSONAL_INFO.linkedin}`,
        `  GitHub:    ${PERSONAL_INFO.github}`,
        `  Location:  ${PERSONAL_INFO.location}`,
        '',
        'Scrolling to interactive contact dispatch form below...',
      ].join('\n');
      return {
        command: input,
        type: 'text',
        content: contactText,
        action: 'scroll_to',
        actionTarget: 'contact',
      };
    }

    case 'theme': {
      const requested = (args[0] || '').toLowerCase() as TerminalTheme;
      if (requested === 'cyber' || requested === 'matrix' || requested === 'amber') {
        return {
          command: input,
          type: 'success',
          content: `Terminal colorway changed to [${requested.toUpperCase()}]. Applied across workspace.`,
          action: 'change_theme',
          actionTarget: requested,
        };
      }
      return {
        command: input,
        type: 'error',
        content: `Invalid theme "${args[0]}". Available themes: "cyber", "matrix", "amber" (e.g. "theme matrix")`,
      };
    }

    case 'clear': {
      return {
        command: input,
        type: 'text',
        content: '',
        action: 'clear',
      };
    }

    case 'uname': {
      return {
        command: input,
        type: 'text',
        content: 'Linux pawan-workstation 6.9.12-arch1-1 #1 SMP PREEMPT_DYNAMIC x86_64/arm-cortex-m GNU/Linux',
      };
    }

    case 'date': {
      return {
        command: input,
        type: 'text',
        content: new Date().toUTCString(),
      };
    }

    case 'echo': {
      return {
        command: input,
        type: 'text',
        content: joinedArgs,
      };
    }

    default: {
      return {
        command: input,
        type: 'error',
        content: `Command not found: "${cmd}". Type "help" or click any command shortcut below.`,
      };
    }
  }
}
