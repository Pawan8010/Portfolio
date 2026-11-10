import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, ChevronDown, ChevronUp, Trash2, Copy, Check, Sparkles } from 'lucide-react';
import { executeTerminalCommand, CommandOutput, TerminalTheme } from '../utils/terminalCommands';

interface TerminalPromptBarProps {
  currentTheme: TerminalTheme;
  onThemeChange: (theme: TerminalTheme) => void;
  onOpenResume: () => void;
  onSelectProject: (projectId: string) => void;
}

export const TerminalPromptBar: React.FC<TerminalPromptBarProps> = ({
  currentTheme,
  onThemeChange,
  onOpenResume,
  onSelectProject,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'init',
      type: 'success',
      content: 'Pawan Rajput Terminal Workstation v2.4 (CSE AIML) initialized. Type "help" or click any shortcut.',
    },
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandList, setCommandList] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && outputEndRef.current) {
      outputEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  const handleRun = (cmdStr: string) => {
    if (!cmdStr.trim()) return;

    setCommandList((prev) => [...prev, cmdStr]);
    setHistoryIndex(-1);

    const result = executeTerminalCommand(cmdStr, currentTheme);

    if (result.action === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    if (result.action === 'change_theme' && result.actionTarget) {
      onThemeChange(result.actionTarget as TerminalTheme);
    } else if (result.action === 'open_resume') {
      onOpenResume();
    } else if (result.action === 'open_modal' && result.actionTarget) {
      onSelectProject(result.actionTarget);
    } else if (result.action === 'scroll_to' && result.actionTarget) {
      const el = document.getElementById(result.actionTarget);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }

    setHistory((prev) => [...prev, result]);
    setIsOpen(true);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleRun(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandList.length === 0) return;
      const nextIdx = historyIndex === -1 ? commandList.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(commandList[nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= commandList.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(commandList[nextIdx]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const trimmed = inputVal.toLowerCase().trim();
      const candidates = ['help', 'whoami', 'projects', 'rag', 'skills', 'experience', 'awards', 'resume', 'contact', 'clear'];
      const match = candidates.find((c) => c.startsWith(trimmed));
      if (match) {
        setInputVal(match);
      }
    }
  };

  const quickShortcuts = [
    { label: 'whoami', cmd: 'whoami' },
    { label: 'ls projects', cmd: 'ls projects' },
    { label: 'rag test', cmd: 'rag emergency valve response' },
    { label: 'skills', cmd: 'skills' },
    { label: 'awards', cmd: 'awards' },
    { label: 'resume', cmd: 'resume' },
    { label: 'contact', cmd: 'contact' },
    { label: 'clear', cmd: 'clear' },
  ];

  const handleCopyHistory = () => {
    const text = history.map((h) => `$ ${h.command}\n${h.content}`).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-[#080b12] border-b border-slate-800/80 sticky top-[57px] z-30 font-mono text-xs shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        {/* Main Prompt Input Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          {/* CLI input */}
          <div className="flex items-center gap-2 flex-1 min-w-0 bg-[#0c101c] px-3 py-1.5 rounded-lg border border-slate-800 focus-within:border-cyan-500/60 transition-colors">
            <span className="text-cyan-400 font-bold whitespace-nowrap text-[11px] select-none">
              pawan@workstation:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type 'help', 'whoami', 'projects', 'rag <query>' or [Tab]..."
              className="flex-1 bg-transparent text-slate-100 placeholder:text-slate-600 focus:outline-none text-xs min-w-0"
              aria-label="Terminal command prompt input"
            />
            {inputVal && (
              <button
                type="button"
                onClick={() => handleRun(inputVal)}
                className="text-cyan-400 hover:text-cyan-300 p-1"
                aria-label="Submit command"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Shortcuts */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar shrink-0 text-[10px]">
            <span className="text-slate-500 hidden md:inline text-[11px]">quick:</span>
            {quickShortcuts.map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={() => handleRun(s.cmd)}
                className="px-2 py-1 rounded bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 whitespace-nowrap transition-colors"
              >
                {s.label}
              </button>
            ))}

            {/* Toggle Drawer */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors ml-1"
              aria-label={isOpen ? 'Collapse Terminal Output' : 'Expand Terminal Output'}
            >
              <Terminal className="w-3 h-3 text-cyan-400" />
              <span>stdout</span>
              {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* Collapsible stdout terminal buffer drawer */}
        {isOpen && (
          <div className="mt-2 p-3 rounded-lg bg-[#05080e] border border-slate-800 max-h-64 overflow-y-auto space-y-2.5 shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-1 text-[10px] text-slate-500">
              <span>TERMINAL OUTPUT BUFFER ({history.length} records)</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyHistory}
                  className="hover:text-slate-200 flex items-center gap-1"
                  title="Copy terminal buffer"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => setHistory([])}
                  className="hover:text-rose-400 flex items-center gap-1"
                  title="Clear buffer"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear</span>
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-slate-300"
                >
                  Close
                </button>
              </div>
            </div>

            {history.length === 0 ? (
              <div className="text-slate-500 text-[11px] py-3 text-center">
                Buffer is empty. Run a command above.
              </div>
            ) : (
              history.map((h, idx) => (
                <div key={idx} className="space-y-1">
                  {h.command && (
                    <div className="flex items-center gap-1.5 text-cyan-400 text-[11px] font-semibold">
                      <span className="text-slate-500">$</span>
                      <span>{h.command}</span>
                    </div>
                  )}
                  <pre
                    className={`whitespace-pre-wrap text-[11px] font-mono p-2 rounded border leading-relaxed ${
                      h.type === 'error'
                        ? 'bg-rose-950/20 border-rose-900/40 text-rose-300'
                        : h.type === 'rag'
                        ? 'bg-cyan-950/20 border-cyan-900/40 text-cyan-200'
                        : h.type === 'success'
                        ? 'bg-emerald-950/20 border-emerald-900/40 text-emerald-300'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300'
                    }`}
                  >
                    {h.content}
                  </pre>
                </div>
              ))
            )}
            <div ref={outputEndRef} />
          </div>
        )}
      </div>
    </div>
  );
};
