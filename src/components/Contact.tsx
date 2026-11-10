import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Copy, Check, Github, Linkedin, FileText, ArrowUpRight, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../utils/portfolioData';

interface ContactProps {
  onOpenResume: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenResume }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) errs.subject = 'Please provide a subject';
    if (!formData.message.trim()) {
      errs.message = 'Please enter a message';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message should be at least 10 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-16 bg-[#060810] font-mono border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Terminal Header */}
        <div className="mb-10 p-3 rounded-lg bg-[#0b0f1a] border border-slate-800 text-xs flex flex-wrap items-center justify-between gap-2 text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-bold">$</span>
            <span className="text-slate-200">./dispatch_mailer.sh --recipient {PERSONAL_INFO.email}</span>
          </div>
          <div className="text-[11px] text-slate-500">
            SECTION_07 // INTERACTIVE DISPATCH MAILER
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct Contacts & Socials */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-xl bg-[#090d16] border border-slate-800 space-y-4">
              <div className="text-xs font-semibold text-cyan-400">
                // DIRECT DISPATCH CHANNELS
              </div>

              {/* Email row with copy action */}
              <div className="flex items-start justify-between gap-3 p-3 rounded-lg bg-[#060810] border border-slate-800/80">
                <div className="flex items-center gap-2.5 truncate">
                  <div className="p-1.5 rounded bg-cyan-500/10 text-cyan-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] text-slate-500 block">EMAIL //</span>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-xs font-semibold text-white hover:text-cyan-300 truncate transition-colors"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors shrink-0"
                  aria-label="Copy Email Address"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Phone row */}
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-[#060810] border border-slate-800/80">
                <div className="p-1.5 rounded bg-indigo-500/10 text-indigo-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">TEL //</span>
                  <a
                    href={`tel:${PERSONAL_INFO.phoneRaw}`}
                    className="text-xs font-semibold text-white hover:text-cyan-300 transition-colors"
                  >
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Location row */}
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-[#060810] border border-slate-800/80">
                <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">LOC //</span>
                  <p className="text-xs font-semibold text-white">
                    {PERSONAL_INFO.location}
                  </p>
                </div>
              </div>

              {/* Resume Trigger */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-cyan-500 text-slate-200 hover:text-white text-xs font-semibold transition-all"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>$ cat resume.pdf</span>
                </button>
              </div>
            </div>

            {/* Social channels card */}
            <div className="p-4 rounded-xl bg-[#090d16] border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 block">PROFILES //</span>
                <span className="text-xs font-semibold text-white">GitHub & LinkedIn</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-800 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Terminal Interactive Form */}
          <div className="lg:col-span-7">
            <div className="p-5 sm:p-6 rounded-xl bg-[#090d16] border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
                <span className="font-bold text-white">INTERACTIVE DISPATCH CONSOLE</span>
                <span className="text-[10px] text-emerald-400">STATUS: READY</span>
              </div>

              {isSubmitted ? (
                <div className="p-6 rounded-lg bg-cyan-950/20 border border-cyan-800/50 text-center space-y-3">
                  <div className="w-10 h-10 mx-auto rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      [OK] Message Packet Dispatched!
                    </h4>
                    <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-white">{formData.name}</strong>. Payload transmitted to Pawan Rajput at <span className="text-cyan-300">{PERSONAL_INFO.email}</span>.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                    <a
                      href={`mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded transition-colors"
                    >
                      <span>Open Mail Client</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: '', email: '', subject: '', message: '' });
                      }}
                      className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded border border-slate-800 hover:bg-slate-900 transition-colors"
                    >
                      Send Another
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">
                        input[name]: *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className={`w-full px-3 py-2 bg-[#060810] border rounded text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none transition-colors ${
                          errors.name ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                        }`}
                      />
                      {errors.name && <p className="text-[10px] text-rose-400 mt-0.5">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">
                        input[email]: *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        className={`w-full px-3 py-2 bg-[#060810] border rounded text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none transition-colors ${
                          errors.email ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                        }`}
                      />
                      {errors.email && <p className="text-[10px] text-rose-400 mt-0.5">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      input[subject]: *
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Robotics / AI Internship / Opportunity"
                      className={`w-full px-3 py-2 bg-[#060810] border rounded text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none transition-colors ${
                        errors.subject ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                      }`}
                    />
                    {errors.subject && <p className="text-[10px] text-rose-400 mt-0.5">{errors.subject}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      textarea[message]: *
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Enter project requirements, specifications, or inquiry details..."
                      className={`w-full px-3 py-2 bg-[#060810] border rounded text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none transition-colors resize-none ${
                        errors.message ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                      }`}
                    />
                    {errors.message && <p className="text-[10px] text-rose-400 mt-0.5">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-all shadow disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Transmitting packet...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>$ ./send_packet.bin</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
