import React, { useState } from 'react';
import { CheckCircle2, Phone, MessageSquare, Instagram, ExternalLink, Zap, MapPin } from 'lucide-react';
import { ThemeMode } from '../types';

interface HeroProps {
  theme: ThemeMode;
  onSelectModel: (type: 'solar' | 'meter' | 'transformer' | 'ev') => void;
  onOpenQuoteModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSelectModel,
}) => {
  const [activeHeroTab, setActiveHeroTab] = useState<'rooftop' | 'office'>('rooftop');

  return (
    <section className="relative pt-8 pb-14 md:pt-16 md:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Simple Trust Banner */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 text-[11px] sm:text-xs text-slate-300 mb-5">
          <span className="font-semibold text-emerald-400">
            MSEDCL (Mahavitaran) & MNRE Approved Partner
          </span>
          <span aria-hidden="true" className="text-slate-600 hidden xs:inline">·</span>
          <span>ISO 9001:2015 Certified</span>
          <span aria-hidden="true" className="text-slate-600 hidden sm:inline">·</span>
          <span className="hidden sm:inline">Govt. Approved Electrical Contractor</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Pune HQ, Maharashtra</span>
        </div>

        {/* 2-Column Hero: Simple Copy + Company Real Photo Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Clear & Friendly Message */}
          <div className="lg:col-span-7">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading text-slate-100 leading-tight">
              Save Electricity. Save Money.{' '}
              <span className="block mt-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-amber-400 bg-clip-text text-transparent">
                Powering a Greener Tomorrow.
              </span>
            </h1>

            <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              <strong className="text-white">Parmaarth Infratech Pvt. Ltd. (PIPL)</strong> provides complete rooftop and ground solar installations, electrical contracting, and smart meter services for homes, housing societies, and factories across Maharashtra.
            </p>

            {/* Simple Checklist */}
            <div className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero headache: 100% Govt Subsidy paperwork done by us</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Up to 90% reduction on monthly electricity bills</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Tier-1 solar panels with 25-Year Performance Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>150+ trained technicians & fast local Pune support</span>
              </div>
            </div>

            {/* Friendly Action Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
              <a
                href="https://wa.me/917666121210?text=Hello%20PIPL,%20I%20want%20to%20know%20about%20solar%20installation%20and%20subsidy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shadow-lg shadow-emerald-500/20"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp: +91 76661 21210</span>
              </a>

              <a
                href="tel:+919359543323"
                className="flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 transition-colors"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>Call: +91 93595 43323</span>
              </a>

              <a
                href="#calculator"
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-3 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <Zap className="w-4 h-4" />
                <span>Calculate Your Savings</span>
              </a>
            </div>
          </div>

          {/* Right Column: Real Office & Solar Rooftop Showcase */}
          <div className="lg:col-span-5 mt-4 lg:mt-0">
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900/90 group backdrop-blur-md">
              {/* Instagram Real-Time Live Header Badge */}
              <div className="px-3.5 py-2.5 sm:px-4 sm:py-3 bg-slate-950/95 border-b border-slate-800 flex items-center justify-between gap-2">
                <a
                  href="#instagram-feed"
                  className="flex items-center gap-2 text-xs font-semibold text-slate-200 hover:text-rose-400 transition-colors min-w-0"
                >
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 shrink-0">
                    <img
                      src="/assets/instagram/avatar.png"
                      alt="PIPL Instagram"
                      className="w-full h-full object-contain rounded-full bg-white"
                    />
                  </div>
                  <span className="font-mono truncate text-[11px] sm:text-xs">@parmaarthinfratechpvt</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                </a>

                {/* Tab Switcher for Real Photos */}
                <div className="flex items-center p-0.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px] sm:text-[11px] shrink-0">
                  <button
                    onClick={() => setActiveHeroTab('rooftop')}
                    className={`px-2 py-1 rounded-md transition-colors ${
                      activeHeroTab === 'rooftop'
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    ☀️ Solar
                  </button>
                  <button
                    onClick={() => setActiveHeroTab('office')}
                    className={`px-2 py-1 rounded-md transition-colors ${
                      activeHeroTab === 'office'
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    🏢 HQ
                  </button>
                </div>
              </div>

              {/* Real Clean Photo Display */}
              <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden flex items-center justify-center">
                {activeHeroTab === 'rooftop' ? (
                  <img
                    src="/assets/instagram/post_rooftop.jpg"
                    alt="Parmaarth Infratech Real Solar Rooftop Installation in Pune"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <img
                    src="/assets/instagram/post_office.jpg"
                    alt="Parmaarth Infratech Pune Corporate Headquarters"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    loading="lazy"
                  />
                )}

                {/* Floating Tag */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] sm:text-[11px] font-semibold text-white border border-white/10 shadow-lg flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-cyan-400" />
                  <span>{activeHeroTab === 'rooftop' ? 'Pune Residential Rooftop' : 'Punawale, Pune HQ'}</span>
                </div>

                {/* Direct Link to Live Instagram */}
                <a
                  href="#instagram-feed"
                  className="absolute bottom-3 right-3 px-2.5 py-1.5 rounded-xl bg-slate-950/85 hover:bg-slate-900 border border-slate-700 backdrop-blur-md text-[11px] sm:text-xs font-semibold text-rose-400 flex items-center gap-1.5 shadow-lg transition-all"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>

              {/* Bottom Card Summary */}
              <div className="p-3.5 sm:p-4 bg-slate-950/95 border-t border-slate-800 flex items-center justify-between gap-2">
                <div>
                  <div className="text-xs font-bold text-slate-100">
                    {activeHeroTab === 'rooftop' ? '15MW+ Solar Portfolio' : 'Licensed Electrical Contractor'}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-400">
                    {activeHeroTab === 'rooftop' ? 'Residential & Commercial Rooftops' : '150+ Field Engineers & Technicians'}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] sm:text-[11px] font-mono text-emerald-400 font-bold block">
                    Govt. Approved
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-slate-400">Mahavitaran</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Simple 3D Quick Viewer Picker */}
        <div className="mt-10 sm:mt-12 p-3.5 sm:p-4 rounded-2xl border border-slate-800/80 bg-slate-900/50">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-3 px-1 text-xs">
            <span className="font-semibold text-slate-300">
              Interactive 3D Equipment Inspector:
            </span>
            <span className="text-slate-400 hidden sm:inline">
              Tap any equipment to inspect 360°
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            <button
              onClick={() => {
                onSelectModel('solar');
                document.getElementById('3d-twin')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-amber-500/50 hover:bg-slate-900 transition-all text-left"
            >
              <span className="text-xl sm:text-2xl">☀️</span>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-200 truncate">Solar Panels</div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 truncate">Rooftop arrays</div>
              </div>
            </button>

            <button
              onClick={() => {
                onSelectModel('meter');
                document.getElementById('3d-twin')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-cyan-500/50 hover:bg-slate-900 transition-all text-left"
            >
              <span className="text-xl sm:text-2xl">⚡</span>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-200 truncate">Smart Meter</div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 truncate">Net-metering</div>
              </div>
            </button>

            <button
              onClick={() => {
                onSelectModel('transformer');
                document.getElementById('3d-twin')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-blue-500/50 hover:bg-slate-900 transition-all text-left"
            >
              <span className="text-xl sm:text-2xl">🔌</span>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-200 truncate">Transformer</div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 truncate">Substations</div>
              </div>
            </button>

            <button
              onClick={() => {
                onSelectModel('ev');
                document.getElementById('3d-twin')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-emerald-500/50 hover:bg-slate-900 transition-all text-left"
            >
              <span className="text-xl sm:text-2xl">🔋</span>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-200 truncate">EV Charger</div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 truncate">Fast charger</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
