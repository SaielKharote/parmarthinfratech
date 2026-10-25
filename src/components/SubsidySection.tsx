import React from 'react';
import { CheckCircle2, Phone } from 'lucide-react';
import { ThemeMode } from '../types';

interface SubsidySectionProps {
  theme?: ThemeMode;
  onOpenQuoteModal: (division?: string) => void;
}

export const SubsidySection: React.FC<SubsidySectionProps> = ({
  onOpenQuoteModal,
}) => {
  return (
    <section id="subsidy" className="py-14 md:py-24 border-t border-slate-800/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] sm:text-xs font-semibold mb-3">
            <span>Govt of Maharashtra & Mahavitaran (MSEDCL) Approved</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">PM Surya Ghar Yojana</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-100">
            Government Solar Subsidy Schemes
          </h2>
          <p className="mt-2.5 sm:mt-3 text-slate-300 text-xs sm:text-base leading-relaxed">
            Get 1 kW to 10 kW rooftop solar for your home, bungalow, or housing society at heavily subsidized government rates. Parmaarth Infratech handles all paperwork, MNRE portal registration, and net-metering approvals from Mahavitaran (MSEDCL).
          </p>
        </div>

        {/* 2-Column Banner: Pricing Tiers & Visual Poster */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12 sm:mb-16">
          {/* Left Column: Easy Pricing Tiers */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-4 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-5 sm:mb-6 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[11px] sm:text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    SMART Solar Yojana (1 kW Rooftop Solar System)
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-100 mt-1">
                    Special Subsidized Rates
                  </h3>
                </div>
                <div className="sm:text-right">
                  <span className="text-xs text-slate-400 block">Remaining Cost Covered</span>
                  <span className="text-xs font-bold text-emerald-400">100% by Govt Subsidy</span>
                </div>
              </div>

              {/* Tiers List */}
              <div className="space-y-3">
                {/* Tier 1 */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl border border-blue-500/30 bg-blue-950/30">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm shrink-0">
                      1
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-100">
                        BPL Category Consumers (Below Poverty Line)
                      </div>
                      <div className="text-[11px] sm:text-xs text-slate-400">
                        Complete 1 kW Rooftop Solar System
                      </div>
                    </div>
                  </div>
                  <div className="sm:text-right pl-12 sm:pl-0 flex sm:flex-col items-baseline sm:items-end justify-between sm:justify-start">
                    <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
                      <span className="font-sans mr-0.5">₹</span>2,800
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-slate-400">Customer share only</div>
                  </div>
                </div>

                {/* Tier 2 */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/30">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm shrink-0">
                      2
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-100">
                        SC / ST Category Consumers
                      </div>
                      <div className="text-[11px] sm:text-xs text-slate-400">
                        Complete 1 kW Rooftop Solar System
                      </div>
                    </div>
                  </div>
                  <div className="sm:text-right pl-12 sm:pl-0 flex sm:flex-col items-baseline sm:items-end justify-between sm:justify-start">
                    <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
                      <span className="font-sans mr-0.5">₹</span>4,000
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-slate-400">Customer share only</div>
                  </div>
                </div>

                {/* Tier 3 */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl border border-amber-500/30 bg-amber-950/30">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm shrink-0">
                      3
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-100">
                        General / All Other Consumers
                      </div>
                      <div className="text-[11px] sm:text-xs text-slate-400">
                        Complete 1 kW Rooftop Solar System
                      </div>
                    </div>
                  </div>
                  <div className="sm:text-right pl-12 sm:pl-0 flex sm:flex-col items-baseline sm:items-end justify-between sm:justify-start">
                    <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
                      <span className="font-sans mr-0.5">₹</span>10,000
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-slate-400">Customer share only</div>
                  </div>
                </div>
              </div>

              {/* 4 Simple Benefits */}
              <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Huge Electricity Bill Savings</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>25-Year Panel Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>100% Subsidy Assistance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Prompt After-Sales Service</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <a
                  href="https://wa.me/919359543323?text=Hello%20PIPL,%20I%20want%20to%20apply%20for%20Solar%20Subsidy%20under%20PM%20Surya%20Ghar%20Yojana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>WhatsApp Apply: +91 93595 43323</span>
                </a>

                <button
                  onClick={() => onOpenQuoteModal('PM Surya Ghar Subsidy Scheme')}
                  className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-colors"
                >
                  Check Subsidy Eligibility
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: User's Actual Campaign Poster */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-sm rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 group">
              <img
                src="/assets/aistudio/Screenshot_2026-10-22_at_8.20.47_PM_15525c44.png"
                alt="PIPL Smart Solar Yojana Mahavitaran Scheme Poster"
                className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-300"
                loading="lazy"
              />
              <div className="p-3.5 sm:p-4 bg-slate-950/90 border-t border-slate-800 text-center">
                <div className="text-xs font-bold text-slate-200">
                  अधिकृत महाराष्ट्र सोलर योजना
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  परमार्थ इन्फ्राटेक - अधिकृत महावितरण मान्यताप्राप्त व्हेंडर
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Industrial Ground-Mounted & Commercial Banner */}
        <div className="p-5 sm:p-8 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
            <div className="md:col-span-8">
              <div className="inline-block px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-xs font-semibold mb-2">
                Large Scale Projects
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-100">
                Ground Mounted MW Scale & Factory Solar Projects
              </h3>
              <p className="mt-2 text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
                For manufacturing plants, commercial buildings, and farm lands. Complete turnkey execution: EPC, Civil foundations, AC/DC cabling, Grid Synchronisation with MSEDCL, and 25-year O&M maintenance.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-slate-400">
                <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200">Civil & Foundation</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200">Plant Synchronisation</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200">Green Open Access</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200">25-Year O&M Solar</span>
              </div>
            </div>

            <div className="md:col-span-4 flex justify-center md:justify-end">
              <div className="w-full max-w-[260px] rounded-2xl overflow-hidden border border-slate-800 shadow-lg">
                <img
                  src="/assets/aistudio/Screenshot_2026-10-22_at_8.20.56_PM_1ca6d75e.png"
                  alt="Ground Mounted MW Scale Project Parmaarth Infratech"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
