import React, { useState } from 'react';
import { 
  Building2, 
  Zap, 
  SunMedium, 
  Cpu, 
  BatteryCharging, 
  Wrench, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  CheckCircle
} from 'lucide-react';
import { ThemeMode } from '../types';

interface ServicesSectionProps {
  theme: ThemeMode;
  onSelectModel: (model: 'solar' | 'meter' | 'transformer' | 'ev') => void;
  onOpenQuoteModal: (division?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  theme,
  onSelectModel,
  onOpenQuoteModal,
}) => {
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<'all' | 'renewable' | 'electrical' | 'civil' | 'ami'>('all');

  const divisions = [
    {
      id: 'renewable',
      category: 'renewable',
      title: 'Renewable Energy & Solar EPC',
      tagline: 'MW-Scale, Rooftop, Green Open Access & Virtual Net Metering',
      icon: SunMedium,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      modelId: 'solar' as const,
      description: 'Turnkey engineering, procurement, and construction of ground-mounted MW plants and rooftop net-metered systems with grid synchronisation.',
      highlights: [
        'Green Open Access for C&I consumers starting from ~100 kW connected load',
        'Virtual Net Metering (VNM) for dense metro housing societies (CHS)',
        'Dual-axis & single-axis tracking systems for up to 35% higher energy yield',
        'Turnkey Kusum Part-B solar pumping & PM Suryaghar deployment',
      ],
      metrics: 'Over 15MW+ Industrial & Utility Portfolio',
    },
    {
      id: 'electrical',
      category: 'electrical',
      title: 'Electrical Infrastructure & Substations',
      tagline: 'Substations, Transformers, HT/LT Cabling & Switchgear',
      icon: Zap,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
      modelId: 'transformer' as const,
      description: 'Comprehensive EPC solutions for high-voltage substations, distribution networks, earthing systems, and switchgear reliability upgrades.',
      highlights: [
        'Substation erection, 33kV/11kV/415V transformer commissioning',
        'HT/LT underground cabling, trenching, and jointing with testing trails',
        'Calibrated electrical testing kits, thermal imaging, and load audits',
        'Govt. Approved Electrical Contractor compliance from day one',
      ],
      metrics: 'Govt. Approved Grade-A Electrical EPC',
    },
    {
      id: 'ami',
      category: 'ami',
      title: 'Smart Metering & AMI Infrastructure',
      tagline: 'Consumer Metering Upgrades & Loss Reduction for Utilities',
      icon: Cpu,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      modelId: 'meter' as const,
      description: 'Advanced Metering Infrastructure deployment with digital data capture, RF mesh/NB-IoT telemetry, and tamper-proof metrology.',
      highlights: [
        'Over 150+ trained technicians & 25+ supervisors executing daily rollouts',
        'Partnered on major Adani Energy Solutions AMI deployment (₹55M)',
        'IS 16444 & IS 15959 DLMS/COSEM compliant installations',
        'Real-time head-end integration with minimal consumer downtime',
      ],
      metrics: '150+ Certified AMI Field Technicians',
    },
    {
      id: 'ev',
      category: 'renewable',
      title: 'EV Charging Infrastructure',
      tagline: 'High-Power AC & DC Fast Charging Hubs',
      icon: BatteryCharging,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      modelId: 'ev' as const,
      description: 'Turnkey planning, load sizing, civil foundations, and electrical integration of AC and DC fast charging systems for fleets and societies.',
      highlights: [
        'Connected load assessment, transformer sizing, and safety interlocks',
        'Dual-gun CCS2 150kW+ liquid-cooled fast dispensers',
        'Integrated smart metering, energy accounting, and OCPP cloud billing',
        'Deployment across housing societies, commercial hubs, and highways',
      ],
      metrics: '150kW to 240kW Ultra-Fast Architectures',
    },
    {
      id: 'civil',
      category: 'civil',
      title: 'Civil & Structural Works',
      tagline: 'Administrative, Commercial & Industrial Facilities',
      icon: Building2,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
      modelId: 'transformer' as const,
      description: 'Complete civil execution including deep foundations, RCC framing, pre-engineered buildings, industrial clusters, and finishing.',
      highlights: [
        'PCMC Administrative Building construction & civil infrastructure (₹75M)',
        'Ranjangaon Industrial Area Phase-III electronics cluster (₹35M)',
        '1.5 MLD Water Treatment Plant at Shetphalgade (₹30M)',
        'Quality alignment with municipal standards & structural audits',
      ],
      metrics: '₹140M+ Landmark Civil Projects Handled',
    },
    {
      id: 'om',
      category: 'electrical',
      title: 'O&M & Lifecycle Asset Management',
      tagline: 'Preventive, Breakdown & Statutory Maintenance',
      icon: Wrench,
      color: 'text-violet-400',
      bgColor: 'bg-violet-500/10',
      borderColor: 'border-violet-500/30',
      modelId: 'solar' as const,
      description: 'Post-handover lifecycle assurance with rapid emergency fault response, earthing audits, thermal inspections, and asset register maintenance.',
      highlights: [
        'Scheduled preventive inspections, thermography & oil filtration',
        'Rapid breakdown attendance for HT/LT and solar distribution networks',
        'Statutory records, billing formats, and compliance clearances',
        'Extended uptime guarantees and warranty enforcement',
      ],
      metrics: '24/7 Rapid Fault Attendance Team',
    },
  ];

  const filteredDivisions = activeTab === 'all' 
    ? divisions 
    : divisions.filter((d) => d.category === activeTab);

  return (
    <section id="solutions" className="py-20 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold font-mono tracking-wider uppercase text-cyan-400">
              EPC + O&M Mindset
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-100 mt-2">
              Engineering Divisions & Capabilities
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Survey, design, build, commissioning, and long-term asset management delivered under one unified execution umbrella.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-slate-800 self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-cyan-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Divisions
            </button>
            <button
              onClick={() => setActiveTab('renewable')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'renewable'
                  ? 'bg-cyan-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Solar & EV
            </button>
            <button
              onClick={() => setActiveTab('electrical')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'electrical'
                  ? 'bg-cyan-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Electrical EPC
            </button>
            <button
              onClick={() => setActiveTab('ami')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'ami'
                  ? 'bg-cyan-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Smart AMI
            </button>
            <button
              onClick={() => setActiveTab('civil')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'civil'
                  ? 'bg-cyan-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Civil & Infra
            </button>
          </div>
        </div>

        {/* Divisions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDivisions.map((division) => {
            const Icon = division.icon;
            return (
              <div
                key={division.id}
                className="flex flex-col justify-between p-6 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-slate-700 transition-all hover:shadow-xl group"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl ${division.bgColor} ${division.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 font-medium">
                      {division.metrics}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-heading text-slate-100 group-hover:text-cyan-400 transition-colors">
                    {division.title}
                  </h3>
                  <div className="text-xs font-medium text-cyan-400 mt-1 mb-3">
                    {division.tagline}
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {division.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {division.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      onSelectModel(division.modelId);
                      document.getElementById('3d-twin')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>View 3D Twin</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenQuoteModal(division.title)}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                  >
                    Configure RFP
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
