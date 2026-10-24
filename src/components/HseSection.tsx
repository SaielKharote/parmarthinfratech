import React from 'react';
import { Shield, HardHat, Flame, Award, Truck, ClipboardList, CheckCircle } from 'lucide-react';
import { ThemeMode } from '../types';

interface HseSectionProps {
  theme: ThemeMode;
}

export const HseSection: React.FC<HseSectionProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  const hseProtocols = [
    {
      title: 'Daily Toolbox Talks (TBT)',
      desc: 'Mandatory morning safety briefing conducted by site supervisors before every work shift to review hazard identification and site conditions.',
      icon: HardHat,
    },
    {
      title: 'Work-at-Height Certification',
      desc: 'Full-body harnesses, double lanyards, shock absorbers, and static safety lifelines deployed on all substation structures and rooftop solar mounts.',
      icon: Shield,
    },
    {
      title: 'Fire Mock Drills & Evacuation',
      desc: 'Periodic site fire drills, certified CO2 / dry-powder extinguisher placements, and emergency response escalation pathways.',
      icon: Flame,
    },
    {
      title: 'Comprehensive Site Induction',
      desc: '100% of technicians and laborers undergo certified safety induction, electrical hazard awareness, and PPE training prior to site gate entry.',
      icon: Award,
    },
  ];

  const logistics = [
    {
      title: 'Calibrated Electrical Testing Kits',
      desc: 'Meggers, earth resistance testers, micro-ohm meters, and primary current injection sets calibrated to NABL standards.',
    },
    {
      title: 'Total Station & Topo Survey Instruments',
      desc: 'High-precision digital laser total stations for topography, contour mapping, and pile alignment.',
    },
    {
      title: 'Dedicated Fleet Mobility & Site Storage',
      desc: 'Heavy-duty transport vehicles, secured site container storage, and crane lifting hoists allowing rapid deployment.',
    },
    {
      title: 'Auditable Digital Documentation Trails',
      desc: 'Inspection checklists, daily progress reports (DPR), and asset registers for billing and statutory compliance.',
    },
  ];

  return (
    <section id="hse" className="py-20 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold font-mono tracking-wider uppercase text-cyan-400">
            Zero Harm Policy
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-100 mt-2">
            HSE Protocols & Execution Discipline
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Safety is not a checklist item at PIPL—it is embedded into every survey, trench, transformer pad, and rooftop solar installation.
          </p>
        </div>

        {/* 4 HSE Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {hseProtocols.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-4 sm:p-6 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-slate-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold font-heading text-slate-100">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center gap-1.5 text-xs text-emerald-400">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Enforced Daily at All Sites</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tools, Machinery & Logistics Banner */}
        <div className="p-4 sm:p-8 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/70 to-slate-950/70">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider">
                In-House Plant & Equipment
              </span>
              <h3 className="text-2xl font-bold font-heading text-slate-100 mt-1">
                Modern Tools, Calibrated Machinery & Logistics
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900 px-3.5 py-1.5 rounded-lg border border-slate-800">
              <Truck className="w-4 h-4 text-cyan-400" />
              <span>Rapid Multi-Site Mobilization</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {logistics.map((item, i) => (
              <div key={i} className="text-xs">
                <div className="font-bold text-slate-200 mb-1 text-sm font-heading">
                  {item.title}
                </div>
                <div className="text-slate-400 leading-relaxed">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
