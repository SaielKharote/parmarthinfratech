import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, SunMedium } from 'lucide-react';

interface FestiveGreetingBannerProps {
  onOpenQuoteModal?: (division?: string) => void;
}

export const FestiveGreetingBanner: React.FC<FestiveGreetingBannerProps> = ({ onOpenQuoteModal }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl p-5 sm:p-7 md:p-8 border border-amber-500/35 bg-gradient-to-br from-amber-950/40 via-slate-950 to-orange-950/30 backdrop-blur-md shadow-2xl shadow-amber-500/5 mb-8 sm:mb-10 transition-all">
      {/* 1. Indian Geometric Jaali (Lattice) Background Watermark */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0 L40 20 L20 40 L0 20 Z' fill='none' stroke='%23F59E0B' stroke-width='1'/%3E%3Ccircle cx='20' cy='20' r='6' fill='none' stroke='%23F59E0B' stroke-width='0.7'/%3E%3C/svg%3E")`,
          backgroundSize: '28px 28px',
        }}
      />

      {/* 2. Top-Right Traditional Mandala Rosette Motif */}
      <div className="absolute -right-10 -top-10 w-56 h-56 sm:w-64 sm:h-64 opacity-[0.14] pointer-events-none text-amber-400">
        <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full">
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="75" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="100" cy="100" r="25" fill="none" stroke="currentColor" strokeWidth="1.5" />
          {/* Symmetrical Mandala Petals */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <g key={deg} transform={`rotate(${deg} 100 100)`}>
              <path
                d="M100 20 C108 45 125 60 100 80 C75 60 92 45 100 20 Z"
                fill="currentColor"
                opacity="0.6"
              />
              <circle cx="100" cy="15" r="3" fill="currentColor" />
            </g>
          ))}
        </svg>
      </div>

      {/* 3. Bottom-Left Subtle Mandala Motif */}
      <div className="absolute -left-12 -bottom-12 w-48 h-48 opacity-[0.09] pointer-events-none text-amber-500">
        <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full">
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <g key={deg} transform={`rotate(${deg} 100 100)`}>
              <path
                d="M100 25 C110 50 120 65 100 80 C80 65 90 50 100 25 Z"
                fill="currentColor"
                opacity="0.5"
              />
            </g>
          ))}
        </svg>
      </div>

      {/* 4. Fine Traditional Toran / Filigree Border Accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-75" />

      {/* Main Content Layout */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
        <div className="max-w-3xl space-y-3">
          {/* Auspicious Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>शुभ दीपावली · Shubh Deepavali Greetings</span>
            <span className="text-amber-400/80">·</span>
            <span className="text-amber-200">Festival of Lights</span>
          </div>

          {/* Heading with Elegant Diya Motif */}
          <div className="flex items-start sm:items-center gap-3">
            {/* Traditional Brass Diya Vector Motif */}
            <div className="shrink-0 p-2 sm:p-2.5 rounded-2xl bg-amber-950/60 border border-amber-500/40 shadow-inner shadow-amber-500/20">
              <svg width="34" height="34" viewBox="0 0 48 48" fill="none" className="text-amber-400">
                {/* Flame with Soft Glow */}
                <path
                  d="M24 4 C24 4 31 14 31 23 C31 29 27.5 32 24 32 C20.5 32 17 29 17 23 C17 14 24 4 24 4 Z"
                  fill="url(#diyaFlameCorp)"
                />
                <circle cx="24" cy="24" r="5" fill="#FFFBEB" opacity="0.8" />
                {/* Brass Diya Vessel */}
                <path
                  d="M8 26 C12 37 20 42 24 42 C28 42 36 37 40 26 C40 26 34 29 24 29 C14 29 8 26 8 26 Z"
                  fill="url(#diyaBodyCorp)"
                  stroke="#F59E0B"
                  strokeWidth="1.2"
                />
                <ellipse cx="24" cy="42" rx="7" ry="2" fill="#B45309" />
                <defs>
                  <linearGradient id="diyaFlameCorp" x1="24" y1="4" x2="24" y2="32" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FEF08A" />
                    <stop offset="0.5" stopColor="#F59E0B" />
                    <stop offset="1" stopColor="#DC2626" />
                  </linearGradient>
                  <linearGradient id="diyaBodyCorp" x1="8" y1="26" x2="40" y2="42" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FDE68A" />
                    <stop offset="0.4" stopColor="#D97706" />
                    <stop offset="1" stopColor="#78350F" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-heading text-slate-100 tracking-tight">
                Illuminating Progress with Sustainable Clean Energy
              </h2>
              <div className="text-xs sm:text-sm font-medium text-amber-300/90 font-heading mt-0.5">
                Parmaarth Infratech Pvt. Ltd. wishes our clients & partners a prosperous Deepavali
              </div>
            </div>
          </div>

          {/* Professional Narrative */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            As India celebrates the triumph of light, we reaffirm our dedication to building resilient power infrastructure—delivering high-voltage 33kV substations, smart AMI loss-reduction grids, industrial solar parks, and advanced Battery Energy Storage Systems (BESS) across Maharashtra and nationwide.
          </p>

          {/* Executive Pillars / Commitments */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs text-slate-300">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-amber-500/20">
              <SunMedium className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong className="text-amber-200">Festive Feasibility Study:</strong> Fast-track technical sizing for BESS & Solar EPC.
              </span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-amber-500/20">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong className="text-emerald-200">Zero-Harm Safety Rigor:</strong> 100% HSE protocol compliance on all active project sites.
              </span>
            </div>
          </div>
        </div>

        {/* Right Action / CTA Cluster */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-center gap-3 shrink-0 pt-2 lg:pt-0">
          <button
            onClick={() => {
              if (onOpenQuoteModal) {
                onOpenQuoteModal('Renewable Energy (Solar EPC & BESS)');
              } else {
                document.getElementById('bess')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 group whitespace-nowrap cursor-pointer"
          >
            <span>Request Festive RFP / Feasibility Study</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href="#calculator"
            className="text-xs text-amber-300 hover:text-white transition-colors underline-offset-4 hover:underline text-center sm:text-right font-medium"
          >
            Calculate Solar & BESS ROI &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};
