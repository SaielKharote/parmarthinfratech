import React, { useState } from 'react';
import { 
  Building2, 
  Milestone, 
  Zap, 
  Cpu, 
  SunMedium, 
  Wrench, 
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Box
} from 'lucide-react';
import { ThemeMode } from '../types';

interface ServicesSectionProps {
  theme?: ThemeMode;
  onSelectModel: (model: 'solar' | 'meter' | 'transformer' | 'ev') => void;
  onOpenQuoteModal: (division?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectModel,
  onOpenQuoteModal,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'civil' | 'electrical' | 'smart-tech' | 'renewable'>('all');

  const services = [
    {
      id: 'civil-structural',
      category: 'civil',
      title: 'Civil & Structural Works',
      icon: Building2,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
      tagline: 'Residential, Commercial, Institutional & Industrial Buildings',
      description: 'Comprehensive civil execution including deep foundations, RCC framing, finishing, structural compliance clearances, and pre-engineered structures.',
      deliverables: [
        'Foundations, heavy RCC structural framing & superstructures',
        'Commercial & institutional building execution with finishing',
        'Industrial shed & pre-engineered building (PEB) packages',
        'Statutory approvals, municipal compliance clearances & structural audits',
      ],
      modelId: 'transformer' as const,
      modelPrompt: 'Substation & Civil Base',
    },
    {
      id: 'roads-bridges',
      category: 'civil',
      title: 'Roads & Bridges',
      icon: Milestone,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      tagline: 'Infrastructure Development, Strengthening & Resurfacing',
      description: 'Turnkey development, strengthening, resurfacing, and lifecycle maintenance of roads, bridges, and municipal transport corridors with engineering precision.',
      deliverables: [
        'Highway strengthening, bituminous concrete (BC) & DBM resurfacing',
        'Box culverts, minor bridge construction & structural expansion joints',
        'Stormwater drainage networks, culvert design & erosion prevention',
        'Road safety barriers, signage, thermal thermoplastic markings & durability tests',
      ],
      modelId: 'transformer' as const,
      modelPrompt: 'Civil Infrastructure',
    },
    {
      id: 'electrical-infra',
      category: 'electrical',
      title: 'Electrical Infrastructure',
      icon: Zap,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
      tagline: 'Substations, Transformers, Switchgear & HT/LT Cabling',
      description: 'Govt. Approved Grade-A electrical contracting delivering high-voltage substations, distribution networks, transformer commissioning, and earthing.',
      deliverables: [
        '33kV / 11kV / 415V substation erection, charging & grid synchronization',
        'Oil-filled & dry-type power transformers, HT vacuum circuit breakers (VCB)',
        'HT/LT underground cabling, jointing, trenching & cable termination trials',
        'Chemical earthing grid setup & distribution network reliability upgrades',
      ],
      modelId: 'transformer' as const,
      modelPrompt: 'Inspect 33kV Substation 3D',
    },
    {
      id: 'smart-metering',
      category: 'smart-tech',
      title: 'Smart Metering / AMI',
      icon: Cpu,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      tagline: 'Consumer Metering Upgrades & Loss Reduction for Utilities',
      description: 'Advanced Metering Infrastructure (AMI) rollouts with digital data capture, RF mesh/NB-IoT telemetry, tamper prevention, and utility loss-reduction support.',
      deliverables: [
        'High-density single-phase & three-phase smart meter field deployments',
        'Partnered on major Adani Energy Solutions AMI deployment in Maharashtra',
        'IS 16444 & IS 15959 DLMS/COSEM compliant digital data integrations',
        'AT&C commercial loss reduction & real-time Head-End System (HES) verification',
      ],
      modelId: 'meter' as const,
      modelPrompt: 'Inspect Smart Meter 3D',
    },
    {
      id: 'solar-epc',
      category: 'renewable',
      title: 'Solar EPC',
      icon: SunMedium,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      tagline: 'Ground-Mounted MW-Scale Plants & Net-Metered Systems',
      description: 'Turnkey renewable energy delivery from resource assessment and engineering design to procurement, grid synchronisation, and statutory net-metering approvals.',
      deliverables: [
        'Ground-mounted MW-scale solar parks for utilities and industrial parks',
        'Commercial & Industrial (C&I) rooftop net-metered installations',
        'Green Open Access (100 kW+) captive energy contracts across Maharashtra',
        'Virtual Net Metering (VNM) for dense housing societies under MSEDCL policy',
      ],
      modelId: 'solar' as const,
      modelPrompt: 'Inspect Solar Plant 3D',
    },
    {
      id: 'om-services',
      category: 'electrical',
      title: 'O&M Services',
      icon: Wrench,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      tagline: 'Preventive, Breakdown & Statutory Lifecycle Maintenance',
      description: 'Post-handover asset management ensuring continuous uptime for power distribution substations, solar plants, and civil infrastructure.',
      deliverables: [
        'Preventive scheduled inspections, thermal thermography & oil filtration audits',
        '24/7 emergency breakdown crew dispatch for distribution fault rectification',
        'Rooftop solar module cleaning, inverter health monitoring & SCADA telemetry',
        'Statutory safety audits, CEA compliance, and asset register maintenance',
      ],
      modelId: 'transformer' as const,
      modelPrompt: 'Inspect Equipment 3D',
    },
  ];

  const filteredServices = activeFilter === 'all' 
    ? services 
    : services.filter(s => s.category === activeFilter);

  return (
    <section id="services" className="py-14 md:py-24 border-t border-slate-800/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Full-Scope EPC Contracting</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-slate-100">
              Key Engineering & Infrastructure Services
            </h2>
            <p className="mt-2 text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              From heavy civil foundations and bridges to high-voltage substations, smart telemetry, and megawatt solar parks—executed with unified project accountability.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto max-w-full">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'civil', label: 'Civil & Roads' },
              { id: 'electrical', label: 'Electrical & O&M' },
              { id: 'smart-tech', label: 'Smart Metering' },
              { id: 'renewable', label: 'Solar & Renewable' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as typeof activeFilter)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                  activeFilter === tab.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Key Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {filteredServices.map((service) => {
            const IconComp = service.icon;
            return (
              <div
                key={service.id}
                className="p-6 sm:p-7 rounded-3xl border border-slate-800 bg-slate-900/70 hover:border-slate-700 backdrop-blur-md flex flex-col justify-between group transition-all shadow-xl hover:shadow-cyan-500/5"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${service.bgColor} border ${service.borderColor} flex items-center justify-center ${service.color} shrink-0`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-slate-400">
                      Turnkey EPC
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-heading text-slate-100 group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>
                  <div className="text-xs font-semibold text-slate-400 mt-1 line-clamp-1">
                    {service.tagline}
                  </div>
                  <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Bullet Deliverables matching slide */}
                  <div className="mt-5 space-y-2 border-t border-slate-800/80 pt-4">
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      onSelectModel(service.modelId);
                      document.getElementById('3d-twin')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-[11px] font-mono text-slate-400 hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
                  >
                    <Box className="w-3.5 h-3.5" />
                    <span>View 3D Tech</span>
                  </button>

                  <button
                    onClick={() => onOpenQuoteModal(service.title)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-700 hover:border-cyan-500 hover:bg-slate-900 text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1.5 transition-all"
                  >
                    <span>Request RFP</span>
                    <ArrowRight className="w-3 h-3 text-cyan-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
