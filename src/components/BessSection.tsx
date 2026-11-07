import React from 'react';
import { 
  BatteryCharging, 
  Zap, 
  Sun, 
  TrendingDown, 
  ShieldCheck, 
  Gauge, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  Clock, 
  FileSpreadsheet,
  Cpu,
  Layers,
  Fuel
} from 'lucide-react';

interface BessSectionProps {
  onOpenBessInquiry?: (bessParams?: {
    powerKW?: number;
    capacityKWh?: number;
    backupHours?: number;
    application?: string;
  }) => void;
  onOpenFeasibilityStudy?: (bessParams?: {
    powerKW?: number;
    capacityKWh?: number;
    backupHours?: number;
    application?: string;
  }) => void;
}

export const BessSection: React.FC<BessSectionProps> = ({ 
  onOpenBessInquiry,
  onOpenFeasibilityStudy,
}) => {
  const triggerInquiry = onOpenFeasibilityStudy || onOpenBessInquiry || (() => {});

  const bessApplications = [
    {
      id: 'solar-plus-storage',
      icon: Sun,
      title: 'Solar-plus-Storage Integration',
      tag: 'Arbitrage & Self-Consumption',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      description: 'Capture surplus daytime solar generation that would otherwise face curtailment or low net-metering feed-in tariffs, storing it for use during peak evening production hours.',
      deliveryPoints: [
        'DC-coupled or AC-coupled architecture configured for existing or greenfield solar',
        'Shifts ₹2.50/kWh solar generation into ₹10.20/kWh peak grid displacement',
        'Bi-directional inverters (PCS) synchronized with facility main LT/HT bus',
      ],
    },
    {
      id: 'peak-shaving',
      icon: TrendingDown,
      title: 'TOD Peak Shaving & MD Management',
      tag: 'Demand Charge Optimization',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
      description: 'Mitigate expensive MSEDCL Time-of-Day (TOD) peak power surcharges and shave sudden kVA maximum demand spikes from large motors, induction furnaces, or chillers.',
      deliveryPoints: [
        'Automated EMS algorithms dynamically inject power within 20 milliseconds',
        'Direct reduction of billed monthly Maximum Demand (MD) by up to 25–40%',
        'Avoids utility penalty tariffs for contract demand overshoot',
      ],
    },
    {
      id: 'diesel-displacement',
      icon: Fuel,
      title: 'Backup Power & Diesel Displacement',
      tag: 'UPS-Grade Clean Reliability',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      description: 'Replace or supplement high-cost diesel generation sets (running at ₹28–₹32/kWh) with clean, silent battery power running at an LCOS of ~₹8.20/kWh.',
      deliveryPoints: [
        'Sub-cycle UPS-grade transfer time (< 20ms) ensures zero automation restart',
        'Eliminates diesel fuel transport, storage liabilities, and tailpipe emissions',
        'Saves thousands of liters of diesel fuel for manufacturing operations',
      ],
    },
    {
      id: 'ev-buffer',
      icon: Zap,
      title: 'EV Fast Charging Station Buffer',
      tag: 'Grid Capacity Augmentation',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      description: 'Provide high-current discharge bursts needed for 60kW–240kW DC fast chargers without triggering expensive 11kV/33kV utility line or transformer upgrades.',
      deliveryPoints: [
        'Enables multi-gun DC fast charging on standard, constrained grid connections',
        'Peak buffer charges overnight during off-peak tariff periods',
        'Ideal for highway transit hubs, fleet depots, and commercial malls',
      ],
    },
    {
      id: 'microgrids',
      icon: Layers,
      title: 'Industrial Microgrids & Islanding',
      tag: 'Autonomous Energy Resilience',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      description: 'Autonomous microgrid controls orchestrating solar PV, battery storage, critical facility loads, and optional backup generation for continuous processing.',
      deliveryPoints: [
        'Seamless black-start and islanding capabilities during grid outages',
        'Frequency and voltage regulation compliant with CEA grid standards',
        'Engineered for chemical, pharmaceutical, and cold-chain complexes',
      ],
    },
  ];

  return (
    <section id="bess" className="py-14 md:py-24 border-t border-slate-800/80 bg-slate-950/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
              <BatteryCharging className="w-4 h-4 text-cyan-400" />
              <span>Next-Gen Energy Storage Systems</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-100">
              Battery Energy Storage Systems (BESS)
            </h2>
            <p className="mt-3 text-slate-300 text-xs sm:text-base leading-relaxed">
              Industrial and commercial grade BESS engineered strictly to PIPL’s actual delivery capability: <strong className="text-white">containerized LiFePO4 (LFP) systems, bi-directional PCS inverters, and intelligent EMS controls</strong> for peak shaving, solar-plus-storage, and diesel displacement across Maharashtra’s industrial corridors.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => triggerInquiry({ powerKW: 250, capacityKWh: 500, backupHours: 2, application: 'Time-of-Day (TOD) Peak Shaving & Demand Shaving' })}
              className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
            >
              <FileSpreadsheet className="w-4 h-4 text-slate-950" />
              <span>Request a BESS Feasibility Study</span>
            </button>
            <a
              href="#calculator"
              className="px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300 font-semibold text-xs transition-colors flex items-center gap-2"
            >
              <Gauge className="w-4 h-4 text-cyan-400" />
              <span>BESS Sizing Calculator</span>
            </a>
          </div>
        </div>

        {/* 5 Targeted Applications PIPL Delivers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 sm:mb-16">
          {bessApplications.map((app) => {
            const IconComp = app.icon;
            return (
              <div
                key={app.id}
                className="p-6 rounded-3xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 backdrop-blur-sm flex flex-col justify-between group transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${app.bgColor} border ${app.borderColor} flex items-center justify-center ${app.color}`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-400">
                      {app.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-heading text-slate-100 group-hover:text-cyan-400 transition-colors">
                    {app.title}
                  </h3>
                  <p className="mt-2.5 text-xs text-slate-300 leading-relaxed">
                    {app.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2">
                    {app.deliveryPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  <button
                    onClick={() => triggerInquiry({ application: app.title })}
                    className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-xs font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Request Study for {app.title.split(' ')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Technical Specifications & Chemistry Card */}
          <div className="p-6 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/20 via-slate-900 to-slate-950 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Cpu className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-bold">
                  Tier-1 Hardware Spec
                </span>
              </div>

              <h3 className="text-lg font-bold font-heading text-slate-100">
                PIPL Turnkey Delivery Standard
              </h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                We design and install factory-assembled, IP55/IP66 outdoor containerized storage blocks compliant with national electrical codes:
              </p>

              <div className="mt-4 space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="font-bold text-cyan-300">Chemistry: LiFePO4 (LFP)</div>
                  <div className="text-[11px] text-slate-400">Prismatic cells, 6,000+ cycle life (80% DoD), 10-yr warranty</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="font-bold text-cyan-300">Safety Standards: NFPA 855 / UL 9540A</div>
                  <div className="text-[11px] text-slate-400">Integrated aerosol/FM200 fire suppression & multi-gas leak sensors</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="font-bold text-cyan-300">Thermal: Liquid & Precision HVAC</div>
                  <div className="text-[11px] text-slate-400">Maintains &lt; 2°C temperature variance across cell packs</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <button
                onClick={() => triggerInquiry({ powerKW: 250, capacityKWh: 500, backupHours: 2, application: 'Time-of-Day (TOD) Peak Shaving & Demand Shaving' })}
                className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Request BESS Sizing Review</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Verified Concise Case Study: BESS in Manufacturing */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900/90 via-slate-950 to-slate-900 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Case Study · Industrial Peak Shaving & Solar Integration</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-100">
                250 kW / 500 kWh Industrial BESS & Solar Synergy
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300">
                Chakan Industrial Area, Pune
              </span>
              <span className="px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 font-mono text-xs text-emerald-400 font-bold">
                ROI: 4.1 Years
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6 text-xs">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Scope of Work</span>
              <p className="text-slate-200 leading-relaxed font-medium">
                Turnkey design, supply, civil plinth, 11kV evacuation transformer, bi-directional PCS, and cloud EMS integration for auto-ancillary CNC manufacturing facility.
              </p>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Location & Grid Sync</span>
              <p className="text-slate-200 leading-relaxed font-medium">
                Chakan MIDC Phase-II, Pune (Maharashtra). Interconnected with 11kV factory substation bus and existing 350 kWp rooftop solar plant.
              </p>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">PIPL's Delivery Role</span>
              <p className="text-slate-200 leading-relaxed font-medium">
                Full EPC execution: Foundation, HT switchgear integration, MSEDCL compliance clearance, SCADA commission, and 10-year comprehensive O&M.
              </p>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Verified Outcomes</span>
              <ul className="space-y-1 text-slate-300">
                <li className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>22% cut in billed peak Maximum Demand (MD)</span>
                </li>
                <li className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Displaced ~4,100 L/month diesel run</span>
                </li>
                <li className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Sub-20ms seamless backup for robotic cells</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
