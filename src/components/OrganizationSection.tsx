import React from 'react';
import { 
  Building2, 
  Zap, 
  SunMedium, 
  Compass, 
  Cog, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  HardHat,
  Network
} from 'lucide-react';

interface OrganizationSectionProps {
  onOpenQuoteModal: (division?: string) => void;
}

export const OrganizationSection: React.FC<OrganizationSectionProps> = ({ onOpenQuoteModal }) => {
  return (
    <section id="divisions" className="py-14 md:py-20 border-t border-slate-800/80 bg-slate-950/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <Network className="w-3.5 h-3.5" />
            <span>Organization Structure & Execution Umbrella</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-100">
            Three Core Divisions. One Turnkey Partner.
          </h2>
          <p className="mt-3 text-slate-300 text-xs sm:text-base leading-relaxed">
            Parmaarth Infratech Pvt. Ltd. (PIPL) operates with an integrated <strong className="text-white">EPC + O&M mindset</strong>—from initial survey and engineering design to construction, commissioning, and long-term lifecycle maintenance.
          </p>
          <div className="mt-2 text-xs font-mono text-cyan-400 italic">
            "Empowering Progress, Inspiring Purpose"
          </div>
        </div>

        {/* 3 Main Pillars from Slide 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {/* Pillar 1: Civil Infrastructure Division */}
          <div className="p-6 sm:p-7 rounded-3xl border border-orange-500/30 bg-gradient-to-b from-orange-950/20 via-slate-900 to-slate-950 flex flex-col justify-between group hover:border-orange-500/60 transition-all shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-300 border border-orange-500/20 font-semibold">
                  Division 01
                </span>
              </div>

              <h3 className="text-xl font-bold font-heading text-slate-100 group-hover:text-orange-400 transition-colors">
                Civil Infrastructure Division
              </h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Full-spectrum civil engineering from pre-engineered buildings to roads, bridges, foundations, and municipal infrastructure.
              </p>

              {/* 4 Quadrants matching the slide */}
              <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  <div className="font-bold text-orange-300">🏢 Building</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Commercial & Residential RCC</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  <div className="font-bold text-orange-300">🛣️ Road</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Highways, Bridges & Drainage</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  <div className="font-bold text-orange-300">🏗️ Civil Works</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Foundations, WTP & Retaining</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  <div className="font-bold text-orange-300">🛠️ Maintenance</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Structural Upkeep & Repairs</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">PCMC & Municipal Registered</span>
              <button
                onClick={() => onOpenQuoteModal('Civil & Structural Works')}
                className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
              >
                <span>Request Proposal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Pillar 2: Electrical EPC Division */}
          <div className="p-6 sm:p-7 rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-cyan-950/20 via-slate-900 to-slate-950 flex flex-col justify-between group hover:border-cyan-500/60 transition-all shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-semibold">
                  Division 02
                </span>
              </div>

              <h3 className="text-xl font-bold font-heading text-slate-100 group-hover:text-cyan-400 transition-colors">
                Electrical EPC Division
              </h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Licensed Grade-A electrical contracting delivering substations, HT/LT power distribution networks, and digital Smart Metering (AMI).
              </p>

              {/* EPC Triad Cycle */}
              <div className="mt-5 space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-[10px]">
                    E
                  </div>
                  <div>
                    <span className="font-bold text-slate-200">Engineering:</span>
                    <span className="text-[11px] text-slate-400 ml-1">Load flow, SLD, protection grading</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-[10px]">
                    P
                  </div>
                  <div>
                    <span className="font-bold text-slate-200">Procurement:</span>
                    <span className="text-[11px] text-slate-400 ml-1">Transformers, 33kV switchgear, cables</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-[10px]">
                    C
                  </div>
                  <div>
                    <span className="font-bold text-slate-200">Construction:</span>
                    <span className="text-[11px] text-slate-400 ml-1">Erection, testing, charging & smart meters</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">Govt. Approved Contractor</span>
              <button
                onClick={() => onOpenQuoteModal('Electrical Infrastructure & Substations')}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
              >
                <span>Request Proposal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Pillar 3: Renewable Energy Division */}
          <div className="p-6 sm:p-7 rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-950/20 via-slate-900 to-slate-950 flex flex-col justify-between group hover:border-amber-500/60 transition-all shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <SunMedium className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-semibold">
                  Division 03
                </span>
              </div>

              <h3 className="text-xl font-bold font-heading text-slate-100 group-hover:text-amber-400 transition-colors">
                Renewable Energy Division
              </h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Ground-mounted MW-scale plants, industrial captive solar, Green Open Access (100kW+), and housing society Virtual Net Metering.
              </p>

              {/* Renewable Gears breakdown */}
              <div className="mt-5 space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-amber-300">Mega Scale Solar Plants</div>
                    <div className="text-[11px] text-slate-400">Turnkey MW ground-mount utility EPC</div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold">Utility Ready</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-amber-300">Green Open Access & VNM</div>
                    <div className="text-[11px] text-slate-400">C&I off-site power & CHS societies</div>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 font-semibold">MSEDCL Policy</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-amber-300">Operations & Maintenance</div>
                    <div className="text-[11px] text-slate-400">Lifecycle generation & thermography</div>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 font-semibold">25-Yr SLA</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">MNRE & MEDA Empanelled</span>
              <button
                onClick={() => onOpenQuoteModal('Renewable Energy & Solar EPC')}
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
              >
                <span>Request Proposal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* EPC + O&M Mindset Lifecycle Banner */}
        <div className="mt-10 sm:mt-12 p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-md">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-xl text-center lg:text-left">
              <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
                Accountability & Lifecycle Reliability
              </span>
              <h4 className="text-xl sm:text-2xl font-bold font-heading text-slate-100">
                The Turnkey EPC + O&M Mindset
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We take end-to-end responsibility across all 5 stages of every civil, electrical, or energy asset—ensuring maximum uptime and measurable return on capital.
              </p>
            </div>

            {/* 5-Stage Process Line */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 w-full lg:w-auto">
              {[
                { step: '01', label: 'Survey & Feasibility', icon: Compass },
                { step: '02', label: 'Design & Engineering', icon: Cog },
                { step: '03', label: 'Turnkey Construction', icon: HardHat },
                { step: '04', label: 'Commissioning & Testing', icon: CheckCircle2 },
                { step: '05', label: 'O&M Maintenance', icon: ShieldCheck },
              ].map((stage, idx) => {
                const IconComponent = stage.icon;
                return (
                  <div
                    key={stage.step}
                    className="p-3 sm:p-3.5 rounded-2xl bg-slate-950 border border-slate-800/90 text-center min-w-[130px] flex-1 sm:flex-none shadow-md"
                  >
                    <div className="flex items-center justify-center gap-1 text-[10px] font-mono text-cyan-400 font-bold mb-1">
                      <span>STEP {stage.step}</span>
                    </div>
                    <IconComponent className="w-4 h-4 text-slate-300 mx-auto mb-1.5" />
                    <div className="text-[11px] font-semibold text-slate-200">
                      {stage.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
