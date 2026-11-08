import React from 'react';
import { Sparkles } from 'lucide-react';

export const DiwaliFestiveRibbon: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-amber-950 via-orange-950 to-amber-950 border-b border-amber-500/40 text-amber-200 text-xs py-2 px-3 sm:px-6 shadow-md z-50">
      {/* Decorative Golden Garland Accents */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #F59E0B 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 w-full sm:w-auto">
          <span className="text-base animate-pulse">🪔</span>
          <span className="font-heading font-bold text-amber-300">
            शुभ दीपावली · Happy Diwali!
          </span>
          <span className="hidden md:inline text-amber-200/80">
            Parmaarth Infratech wishes you and your enterprises luminous growth, health & sustainable clean energy.
          </span>
          <span className="text-base animate-pulse">✨</span>
        </div>

        <div className="hidden sm:flex items-center gap-3 shrink-0 text-[11px] font-mono">
          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Festive Green Energy Window</span>
          </span>
          <a
            href="#bess"
            className="text-amber-300 hover:text-white transition-colors underline-offset-4 hover:underline"
          >
            Solar & BESS Feasibility &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};
