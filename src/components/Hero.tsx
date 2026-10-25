import React, { useState } from 'react';
import { 
  Building2, 
  Zap, 
  SunMedium, 
  CheckCircle2, 
  Phone, 
  MessageSquare, 
  Instagram, 
  ExternalLink, 
  MapPin, 
  ShieldCheck, 
  ArrowRight,
  Cpu
} from 'lucide-react';
import { ThemeMode } from '../types';

interface HeroProps {
  theme?: ThemeMode;
  onSelectModel: (type: 'solar' | 'meter' | 'transformer' | 'ev') => void;
  onOpenQuoteModal: (division?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSelectModel,
  onOpenQuoteModal,
}) => {
  const [activeHeroTab, setActiveHeroTab] = useState<'office' | 'solar' | 'infra'>('office');

  return (
    <section className="relative pt-6 pb-12 md:pt-14 md:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Trust & Accreditation Strip */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-slate-300 mb-5">
          <span className="font-semibold text-cyan-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Govt. Approved Electrical Contractor</span>
          </span>
          <span aria-hidden="true" className="text-slate-700 hidden xs:inline">·</span>
          <span>Municipal & PCMC Registered Civil Works</span>
          <span aria-hidden="true" className="text-slate-700 hidden sm:inline">·</span>
          <span>MSEDCL (Mahavitaran) Partner</span>
          <span aria-hidden="true" className="text-slate-700 hidden md:inline">·</span>
          <span className="hidden md:inline">ISO 9001:2015 Certified</span>
          <span aria-hidden="true" className="text-slate-700">·</span>
          <span>Pune Corporate HQ</span>
        </div>

        {/* 2-Column Hero: Authentic Infrastructure Positioning + Real HQ Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: True Infrastructure Positioning */}
          <div className="lg:col-span-7">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Empowering Progress, Inspiring Purpose</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading text-slate-100 leading-[1.18]">
              Integrated Civil, Electrical & Smart Technology{' '}
              <span className="block mt-1 bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-400 bg-clip-text text-transparent">
                Infrastructure EPC Contractor.
              </span>
            </h1>

            <p className="mt-3.5 sm:mt-4 text-xs sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              <strong className="text-white">Parmaarth Infratech Pvt. Ltd. (PIPL)</strong> delivers integrated <strong className="text-cyan-300">civil & structural works, roads and bridges, high-voltage electrical substations, Advanced Metering Infrastructure (AMI), and renewable solar projects</strong> under one execution umbrella with an end-to-end <strong>EPC + O&M mindset</strong>.
            </p>

            {/* 3 Core Divisions Quick Overview Cards */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
              <div 
                onClick={() => onOpenQuoteModal('Civil & Structural Works')}
                className="p-3 rounded-2xl bg-slate-900/80 border border-orange-500/20 hover:border-orange-500/50 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2 text-orange-400 font-bold text-xs">
                  <Building2 className="w-4 h-4" />
                  <span>Civil & Roads</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                  Buildings, highways, bridges, RCC & industrial PEB clusters
                </div>
              </div>

              <div 
                onClick={() => onOpenQuoteModal('Electrical Infrastructure & Substations')}
                className="p-3 rounded-2xl bg-slate-900/80 border border-cyan-500/20 hover:border-cyan-500/50 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                  <Zap className="w-4 h-4" />
                  <span>Electrical EPC</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                  33kV substations, transformers, HT/LT cabling & earthing
                </div>
              </div>

              <div 
                onClick={() => onOpenQuoteModal('Smart Metering & AMI')}
                className="p-3 rounded-2xl bg-slate-900/80 border border-emerald-500/20 hover:border-emerald-500/50 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <Cpu className="w-4 h-4" />
                  <span>Tech & Solar</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                  Smart AMI rollouts, MW solar parks & utility loss-reduction
                </div>
              </div>
            </div>

            {/* Core Capabilities Checklist */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Turnkey EPC: Survey, Design, Build, Commission & Maintain</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Supporting Govt, Municipal, Industrial & Housing Infrastructure</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>150+ Certified field engineers & project supervisors</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Govt. Approved Grade-A Electrical & Municipal Civil Contractor</span>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
              <button
                onClick={() => onOpenQuoteModal()}
                className="flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors shadow-lg shadow-cyan-500/20 uppercase tracking-wider"
              >
                <span>Request Project RFP / Proposal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href="https://wa.me/919359543323?text=Hello%20Parmaarth%20Infratech,%20we%20have%20an%20infrastructure%20and%20engineering%20requirement"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp: +91 93595 43323</span>
              </a>

              <a
                href="tel:+919359543323"
                className="flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300 transition-colors"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>+91 93595 43323</span>
              </a>
            </div>
          </div>

          {/* Right Column: Authentic Headquarters & Multi-Discipline Showcase */}
          <div className="lg:col-span-5 mt-4 lg:mt-0">
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900/90 group backdrop-blur-md">
              {/* Card Header & Tab Switcher */}
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

                {/* Tab Switcher */}
                <div className="flex items-center p-0.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px] sm:text-[11px] shrink-0">
                  <button
                    onClick={() => setActiveHeroTab('office')}
                    className={`px-2 py-1 rounded-md transition-colors ${
                      activeHeroTab === 'office'
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    🏢 Pune HQ
                  </button>
                  <button
                    onClick={() => setActiveHeroTab('solar')}
                    className={`px-2 py-1 rounded-md transition-colors ${
                      activeHeroTab === 'solar'
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    ⚡ Energy EPC
                  </button>
                  <button
                    onClick={() => setActiveHeroTab('infra')}
                    className={`px-2 py-1 rounded-md transition-colors ${
                      activeHeroTab === 'infra'
                        ? 'bg-orange-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    🏗️ Civil
                  </button>
                </div>
              </div>

              {/* Photo Display */}
              <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden flex items-center justify-center">
                {activeHeroTab === 'office' ? (
                  <img
                    src="/assets/instagram/post_office.jpg"
                    alt="Parmaarth Infratech Corporate Headquarters in Punawale, Pune"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : activeHeroTab === 'solar' ? (
                  <img
                    src="/assets/instagram/post_rooftop.jpg"
                    alt="Parmaarth Infratech Renewable Energy and Solar Project"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full p-4 flex flex-col justify-center items-center text-center bg-gradient-to-br from-slate-900 via-slate-950 to-orange-950/30">
                    <Building2 className="w-12 h-12 text-orange-400 mb-2" />
                    <div className="text-sm font-bold text-slate-100 font-heading">
                      Civil & Structural Execution
                    </div>
                    <p className="text-xs text-slate-400 max-w-xs mt-1">
                      PCMC Administrative Building, Industrial PEB clusters, roads, box culverts and water treatment infrastructure.
                    </p>
                    <a
                      href="#projects"
                      className="mt-3 px-3 py-1.5 rounded-lg bg-orange-500/20 text-orange-300 border border-orange-500/30 text-xs font-semibold"
                    >
                      View Civil Portfolio →
                    </a>
                  </div>
                )}

                {/* Floating Location Tag */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] sm:text-[11px] font-semibold text-white border border-white/10 shadow-lg flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-cyan-400" />
                  <span>
                    {activeHeroTab === 'office'
                      ? 'Punawale, Pune HQ'
                      : activeHeroTab === 'solar'
                      ? 'Maharashtra Solar Installation'
                      : 'Maharashtra Civil Works'}
                  </span>
                </div>

                {/* Direct Link to Live Instagram */}
                <a
                  href="#instagram-feed"
                  className="absolute bottom-3 right-3 px-2.5 py-1.5 rounded-xl bg-slate-950/85 hover:bg-slate-900 border border-slate-700 backdrop-blur-md text-[11px] sm:text-xs font-semibold text-rose-400 flex items-center gap-1.5 shadow-lg transition-all"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Live Field Photos</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>

              {/* Bottom Card Summary */}
              <div className="p-3.5 sm:p-4 bg-slate-950/95 border-t border-slate-800 flex items-center justify-between gap-2">
                <div>
                  <div className="text-xs font-bold text-slate-100">
                    {activeHeroTab === 'office'
                      ? 'Parmaarth Infratech Pvt. Ltd.'
                      : activeHeroTab === 'solar'
                      ? '15MW+ Solar & Energy Portfolio'
                      : 'Civil & Municipal Infrastructure'}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-400">
                    {activeHeroTab === 'office'
                      ? 'CIN: U41001PN2024PTC230231 · GST Registered'
                      : activeHeroTab === 'solar'
                      ? 'Ground-Mounted MW & C&I Net-Metering'
                      : 'PCMC, MIDC & Municipal Engineering'}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] sm:text-[11px] font-mono text-cyan-400 font-bold block">
                    Turnkey EPC
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-slate-400">O&M Mindset</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Multi-Discipline 3D Quick Viewer Picker Bar */}
        <div className="mt-8 sm:mt-12 p-3.5 sm:p-4 rounded-2xl border border-slate-800/80 bg-slate-900/50">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-3 px-1 text-xs">
            <span className="font-semibold text-slate-300">
              Interactive 3D Equipment & Engineering View:
            </span>
            <span className="text-slate-400 hidden sm:inline">
              Tap any model below to rotate 360° and inspect internal assemblies
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            <button
              onClick={() => {
                onSelectModel('transformer');
                document.getElementById('3d-twin')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-cyan-500/50 hover:bg-slate-900 transition-all text-left group"
            >
              <span className="text-xl sm:text-2xl group-hover:scale-110 transition-transform">🔌</span>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-200 truncate group-hover:text-cyan-400">Transformer</div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 truncate">33kV Substation EPC</div>
              </div>
            </button>

            <button
              onClick={() => {
                onSelectModel('meter');
                document.getElementById('3d-twin')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-blue-500/50 hover:bg-slate-900 transition-all text-left group"
            >
              <span className="text-xl sm:text-2xl group-hover:scale-110 transition-transform">⚡</span>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-200 truncate group-hover:text-blue-400">Smart Meter</div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 truncate">AMI & Loss-Reduction</div>
              </div>
            </button>

            <button
              onClick={() => {
                onSelectModel('solar');
                document.getElementById('3d-twin')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-amber-500/50 hover:bg-slate-900 transition-all text-left group"
            >
              <span className="text-xl sm:text-2xl group-hover:scale-110 transition-transform">☀️</span>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-200 truncate group-hover:text-amber-400">Solar Plant</div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 truncate">MW Ground & Rooftop</div>
              </div>
            </button>

            <button
              onClick={() => {
                onSelectModel('ev');
                document.getElementById('3d-twin')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-emerald-500/50 hover:bg-slate-900 transition-all text-left group"
            >
              <span className="text-xl sm:text-2xl group-hover:scale-110 transition-transform">🔋</span>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-200 truncate group-hover:text-emerald-400">EV Fast Hub</div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 truncate">High-Power DC Charger</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
