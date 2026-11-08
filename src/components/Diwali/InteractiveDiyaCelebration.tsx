import React, { useState } from 'react';
import { Sparkles, Flame, Heart, Sun, Award, ShieldCheck } from 'lucide-react';
import { SparklerEffect } from './SparklerEffect';

interface DiyaState {
  id: number;
  label: string;
  blessing: string;
  isLit: boolean;
}

export const InteractiveDiyaCelebration: React.FC = () => {
  const [diyas, setDiyas] = useState<DiyaState[]>([
    { id: 1, label: 'Shubh (Prosperity)', blessing: 'Continuous Business Growth & Industrial Prosperity', isLit: true },
    { id: 2, label: 'Urja (Clean Energy)', blessing: 'Sustainable Solar & Zero-Carbon Energy Resilience', isLit: true },
    { id: 3, label: 'Arogya (Safety)', blessing: 'Zero-Incident Safety & 100% HSE Project Rigor', isLit: false },
    { id: 4, label: 'Pragati (Progress)', blessing: 'High-Voltage 33kV & Smart AMI Infrastructure', isLit: false },
    { id: 5, label: 'Labh (Success)', blessing: 'Timely Project Execution & Landmark Milestones', isLit: false },
  ]);

  const [sparkCoords, setSparkCoords] = useState<{ x: number; y: number } | null>(null);

  const litCount = diyas.filter((d) => d.isLit).length;
  const allLit = litCount === diyas.length;

  const handleDiyaClick = (id: number, e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const parentRect = e.currentTarget.closest('.diya-container')?.getBoundingClientRect();
    
    if (parentRect) {
      setSparkCoords({
        x: rect.left - parentRect.left + rect.width / 2,
        y: rect.top - parentRect.top + 10,
      });
    }

    setDiyas((prev) =>
      prev.map((d) => (d.id === id ? { ...d, isLit: !d.isLit } : d))
    );
  };

  const handleLightAll = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const parentRect = e.currentTarget.closest('.diya-container')?.getBoundingClientRect();
    if (parentRect) {
      setSparkCoords({
        x: rect.left - parentRect.left + rect.width / 2,
        y: rect.top - parentRect.top,
      });
    }
    setDiyas((prev) => prev.map((d) => ({ ...d, isLit: true })));
  };

  return (
    <div className="diya-container relative overflow-hidden rounded-3xl p-5 sm:p-7 border border-amber-500/40 bg-gradient-to-br from-amber-950/40 via-slate-950 to-orange-950/30 backdrop-blur-md shadow-2xl shadow-amber-500/10 mb-8 sm:mb-10">
      {/* Canvas Sparkler Particles */}
      <SparklerEffect triggerCoords={sparkCoords} ambientMode={allLit} />

      {/* Decorative Traditional Rangoli Watermark */}
      <div 
        className="absolute -right-12 -top-12 w-64 h-64 opacity-[0.06] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, #F59E0B 0%, #D97706 50%, transparent 70%)',
        }}
      />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-amber-500/20">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold uppercase tracking-wider mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>शुभ दीपावली · Festive Celebration</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-slate-100 flex items-center gap-2">
            <span>Light a Diya for India’s Clean Infrastructure</span>
            <span className="text-amber-400">🪔</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Tap the traditional brass diyas below to ignite auspicious flames of <strong className="text-amber-300">Prosperity, Safety, Clean Energy & Progress</strong>.
          </p>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0">
          <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 font-mono text-xs text-amber-300 font-bold">
            {litCount} of 5 Diyas Lit
          </div>
          {!allLit ? (
            <button
              onClick={handleLightAll}
              className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] transition-colors flex items-center gap-1 shadow-sm"
            >
              <Flame className="w-3 h-3 fill-slate-950" />
              <span>Light All Diyas</span>
            </button>
          ) : (
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              ✨ All Lamps Illuminated!
            </span>
          )}
        </div>
      </div>

      {/* 5 Interactive Diyas Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 my-5 sm:my-6">
        {diyas.map((diya) => (
          <button
            key={diya.id}
            onClick={(e) => handleDiyaClick(diya.id, e)}
            className={`p-3 sm:p-4 rounded-2xl border text-center transition-all duration-300 flex flex-col items-center justify-between group relative overflow-hidden ${
              diya.isLit
                ? 'bg-amber-950/40 border-amber-500/60 shadow-lg shadow-amber-500/20 scale-[1.02]'
                : 'bg-slate-900/60 border-slate-800 hover:border-amber-500/40 opacity-75 hover:opacity-100'
            }`}
          >
            {/* Ambient Flame Glow */}
            {diya.isLit && (
              <div 
                className="absolute top-2 w-16 h-16 rounded-full blur-xl pointer-events-none opacity-60 animate-pulse"
                style={{ background: 'radial-gradient(circle, #F59E0B 0%, #EA580C 70%, transparent 100%)' }}
              />
            )}

            {/* Diya Artwork (SVG Brass Diya with Animated Flame) */}
            <div className="relative w-16 h-16 sm:w-18 sm:h-18 flex items-center justify-center my-1">
              {/* Flame */}
              {diya.isLit ? (
                <div className="absolute -top-1 flex flex-col items-center animate-bounce" style={{ animationDuration: '1.8s' }}>
                  <svg width="24" height="32" viewBox="0 0 24 32" fill="none" className="drop-shadow-[0_0_10px_#F59E0B]">
                    {/* Outer Flame (Orange) */}
                    <path
                      d="M12 0C12 0 18 8 18 17C18 24 15 27 12 27C9 27 6 24 6 17C6 8 12 0 12 0Z"
                      fill="url(#flameOuter)"
                    />
                    {/* Inner Core (Yellow/White) */}
                    <path
                      d="M12 7C12 7 15 12 15 18C15 22 13.5 24 12 24C10.5 24 9 22 9 18C9 12 12 7 12 7Z"
                      fill="url(#flameInner)"
                    />
                    <defs>
                      <linearGradient id="flameOuter" x1="12" y1="0" x2="12" y2="27" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FEF08A" />
                        <stop offset="0.4" stopColor="#F59E0B" />
                        <stop offset="1" stopColor="#DC2626" />
                      </linearGradient>
                      <linearGradient id="flameInner" x1="12" y1="7" x2="12" y2="24" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFFFFF" />
                        <stop offset="0.6" stopColor="#FEF08A" />
                        <stop offset="1" stopColor="#F59E0B" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              ) : (
                <div className="absolute top-2 w-1.5 h-3.5 bg-slate-600 rounded-full" />
              )}

              {/* Brass Diya Vessel */}
              <svg width="56" height="28" viewBox="0 0 56 28" fill="none" className="mt-5">
                {/* Diya Base */}
                <path
                  d="M4 8C7 18 18 24 28 24C38 24 49 18 52 8C52 8 47 13 28 13C9 13 4 8 4 8Z"
                  fill="url(#diyaBrass)"
                  stroke="#D97706"
                  strokeWidth="1.2"
                />
                {/* Diya Stand */}
                <ellipse cx="28" cy="24.5" rx="10" ry="2.5" fill="#92400E" stroke="#78350F" strokeWidth="0.8" />
                {/* Oil Rim */}
                <ellipse cx="28" cy="9.5" rx="22" ry="4.5" fill={diya.isLit ? '#EA580C' : '#451A03'} stroke="#B45309" strokeWidth="1" />
                {/* Oil Shimmer */}
                {diya.isLit && <ellipse cx="28" cy="9.5" rx="16" ry="2.5" fill="#FEF3C7" opacity="0.6" />}
                <defs>
                  <linearGradient id="diyaBrass" x1="4" y1="8" x2="52" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FDE68A" />
                    <stop offset="0.3" stopColor="#F59E0B" />
                    <stop offset="0.7" stopColor="#D97706" />
                    <stop offset="1" stopColor="#78350F" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Diya Label */}
            <div className="mt-2 text-center">
              <span className={`text-xs font-bold font-heading block ${diya.isLit ? 'text-amber-300' : 'text-slate-400'}`}>
                {diya.label}
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                {diya.isLit ? '✨ Active' : 'Click to Light'}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Celebratory Message Strip when All Diyas Are Lit */}
      {allLit ? (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 border border-amber-500/40 text-center animate-fade-in space-y-1">
          <div className="text-xs sm:text-sm font-bold text-amber-200 font-heading flex items-center justify-center gap-1.5">
            <span>✨ शुभ लाभ · May Divine Light Bless Your Facilities & Projects! ✨</span>
          </div>
          <p className="text-[11px] sm:text-xs text-amber-300/90 max-w-xl mx-auto leading-relaxed">
            Parmaarth Infratech Pvt. Ltd. wishes your family, engineering teams, and enterprises uninterrupted energy, safety, and luminous prosperity this Diwali.
          </p>
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="text-amber-400">🪔</span>
            <span>
              <strong>Festive Solar & BESS Initiative:</strong> Fast-track technical feasibility surveys available throughout the Diwali festive week.
            </span>
          </div>
          <a
            href="#calculator"
            className="text-amber-400 hover:text-amber-300 font-semibold underline-offset-4 hover:underline shrink-0 text-[11px]"
          >
            Explore Savings & Sizing &rarr;
          </a>
        </div>
      )}
    </div>
  );
};
