import React, { useState, useEffect } from 'react';
import { calculateScrollPercentage } from '../utils/scrollMath';

export const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const percentage = calculateScrollPercentage(scrollTop, scrollHeight, clientHeight);
      setScrollProgress(percentage);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initialize on mount
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none bg-slate-900/40 backdrop-blur-[1px]"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-500 transition-[width] duration-150 ease-out shadow-[0_0_12px_rgba(34,211,238,0.85)] relative"
        style={{ width: `${scrollProgress}%` }}
      >
        {/* Subtle luminous tip flare when scrolling */}
        {scrollProgress > 0 && scrollProgress < 100 && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-200 blur-[1px] shadow-[0_0_8px_#38bdf8]" />
        )}
      </div>
    </div>
  );
};
