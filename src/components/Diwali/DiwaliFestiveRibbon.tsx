import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export const DiwaliFestiveRibbon: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-amber-950 via-slate-950 to-amber-950 border-b border-amber-500/35 text-amber-200 text-xs py-2.5 px-3 sm:px-6 shadow-md z-50">
      {/* Decorative Traditional Jaali Lattice Micro-Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 0 L24 12 L12 24 L0 12 Z' fill='none' stroke='%23F59E0B' stroke-width='0.75'/%3E%3C/svg%3E")`,
          backgroundSize: '18px 18px',
        }}
      />

      {/* Subtle Toran Garland Golden Line at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent" />

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-center sm:text-left relative z-10">
        <div className="flex items-center justify-center sm:justify-start gap-2.5 w-full sm:w-auto">
          {/* Traditional Brass Diya Emblem */}
          <span className="text-base animate-pulse shrink-0" title="Shubh Deepavali">🪔</span>
          <span className="font-heading font-extrabold text-amber-300 tracking-wide">
            शुभ दीपावली · Happy Diwali!
          </span>
          <span className="hidden lg:inline text-amber-200/80">
            Parmaarth Infratech wishes our clients, municipal authorities & partners illuminating prosperity and energy resilience.
          </span>
          <span className="text-base animate-pulse shrink-0">✨</span>
        </div>

        <div className="hidden sm:flex items-center gap-3 shrink-0 text-[11px] font-mono">
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-300 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Festive EPC & BESS Sizing Window</span>
          </span>
          <a
            href="#bess"
            className="text-amber-300 hover:text-white transition-colors underline-offset-4 hover:underline flex items-center gap-1 font-semibold"
          >
            <span>BESS Feasibility Study</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

