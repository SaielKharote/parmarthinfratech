import React, { useState } from 'react';
import { 
  Building2, 
  Sun, 
  Cpu, 
  BatteryCharging, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Briefcase, 
  TrendingUp, 
  ShieldCheck,
  FileCheck
} from 'lucide-react';
import { ThemeMode } from '../types';

interface CaseStudy {
  id: string;
  serviceCategory: 'bess' | 'solar' | 'ami' | 'civil';
  serviceLabel: string;
  title: string;
  client: string;
  clientRole: string;
  location: string;
  scope: string;
  piplRole: string;
  verifiedOutcomes: string[];
  keyMetric: {
    value: string;
    label: string;
  };
  inquiryDivision: string;
}

interface CaseStudiesSectionProps {
  theme?: ThemeMode;
  onOpenQuoteModal: (division?: string, initialNotes?: string) => void;
  onOpenBessStudy?: (bessData: {
    powerKW: number;
    capacityKWh: number;
    backupHours: number;
    application: string;
    facilityPeakKW: number;
  }) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  onOpenQuoteModal,
  onOpenBessStudy,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'bess' | 'solar' | 'ami' | 'civil'>('all');

  const caseStudies: CaseStudy[] = [
    {
      id: 'cs-bess',
      serviceCategory: 'bess',
      serviceLabel: 'Battery Energy Storage Systems',
      title: '250 kW / 500 kWh Peak Shaving & Clean DG Offset BESS',
      client: 'Tier-1 Automotive Ancillary Manufacturer',
      clientRole: 'Direct Industrial Client',
      location: 'Chakan Industrial Corridor, Phase-II, Pune',
      scope: 'Turnkey 250 kW / 500 kWh containerized LiFePO4 (LFP) BESS with bi-directional PCS, liquid thermal management, and sub-20ms high-speed static transfer switch.',
      piplRole: 'Turnkey EPC Partner — Engineering, Procurement, Civil Plinth, 11kV Grid Interconnection, SCADA Integration & 5-Year Comprehensive O&M.',
      verifiedOutcomes: [
        'Shaved ~180 kVA of contracted peak maximum demand during 18:00–22:00 TOD window',
        'Direct monthly power bill reduction of ~₹3.2 Lakhs via peak tariff arbitrage',
        'Displaced 45,000+ liters of diesel fuel annually previously burned during voltage dips',
        'Protected automated robotics and stamping press lines from utility momentary micro-trips',
      ],
      keyMetric: {
        value: '₹38.4L/Yr',
        label: 'Verified Energy Savings',
      },
      inquiryDivision: 'Battery Energy Storage Systems (BESS)',
    },
    {
      id: 'cs-solar',
      serviceCategory: 'solar',
      serviceLabel: 'Solar EPC (MW & C&I)',
      title: '500 kW Industrial Rooftop & Ground Captive Solar Plant',
      client: 'Finolex Cables Limited',
      clientRole: 'Direct Industrial Client',
      location: 'Urse Industrial Belt, Pune',
      scope: 'Design, supply, installation, and commissioning of 500 kWp grid-interactive solar power plant using Tier-1 TOPCon bifacial modules and string inverters.',
      piplRole: 'Turnkey Solar EPC Contractor — Site topography analysis, structural roof reinforcement, HT cable evacuation, DISCOM net-metering approvals, and continuous SCADA monitoring.',
      verifiedOutcomes: [
        'Generated ~7.4 Lakh units (kWh) of clean electricity in the first operating year',
        'Cut scope-2 emissions by over 600 metric tonnes of CO2 annually',
        'Levelized cost of solar electricity achieved at ~₹2.45/kWh vs ₹9.80/kWh grid tariff',
        'Project achieved full payback in 3.4 years with 100% DISCOM net-metering synchronization',
      ],
      keyMetric: {
        value: '7.4L Units',
        label: 'Annual Clean Generation',
      },
      inquiryDivision: 'Renewable Energy & Solar EPC',
    },
    {
      id: 'cs-ami',
      serviceCategory: 'ami',
      serviceLabel: 'Smart Metering & AMI',
      title: 'Advanced Metering Infrastructure (AMI) Field Deployment',
      client: 'Adani Energy Solutions Limited',
      clientRole: 'Execution Field Subcontractor',
      location: 'Western Maharashtra Urban & Semi-Urban Utility Belts',
      scope: 'High-density turnkey field rollout of single-phase and three-phase cellular/RF smart meters compliant with IS 16444 and DLMS/COSEM protocols.',
      piplRole: 'Execution Subcontractor & Field Operations — Mobilized 150+ certified technicians, managed consumer appointment logistics, zero-downtime meter swaps, GPS geotagging, and Head-End System (HES) digital handshake verification.',
      verifiedOutcomes: [
        'Completed 100,000+ meter installations with zero customer safety incidents',
        'Maintained >99.7% first-time communication handshake success rate on the live utility mesh',
        'Directly supported utility AT&C commercial loss reduction and billing cycle acceleration',
        'Delivered tamper-evident sealing and digital photographic asset audit trails',
      ],
      keyMetric: {
        value: '99.7%',
        label: 'Telemetry Handshake Rate',
      },
      inquiryDivision: 'Smart Metering & AMI',
    },
    {
      id: 'cs-civil',
      serviceCategory: 'civil',
      serviceLabel: 'Civil & Structural Infrastructure',
      title: 'Administrative Headquarters & Civic Infrastructure',
      client: 'Pimpri Chinchwad Municipal Corporation (PCMC)',
      clientRole: 'Municipal Governance Client',
      location: 'Pimpri Chinchwad, Pune',
      scope: 'Multi-story civic administrative hub featuring heavy RCC framing, deep pile foundations, high-grade architectural finishes, and integrated electromechanical conduits.',
      piplRole: 'General Civil & Structural Contractor — Foundation excavation, RCC structural framework execution, quality compliance, seismic structural adherence, and statutory municipal clearances.',
      verifiedOutcomes: [
        'Completed civil structural milestones within stipulated project timeline',
        '100% third-party cube compressive strength and non-destructive testing (NDT) pass rate',
        'Integrated energy-efficient electrical ducts and high-load structural conduits',
        'Zero lost-time injuries (LTI) across 180,000+ contractor safe man-hours',
      ],
      keyMetric: {
        value: '180,000+',
        label: 'Safe Man-Hours Logged',
      },
      inquiryDivision: 'Civil Infrastructure & Structural Works',
    },
  ];

  const filteredStudies = activeTab === 'all'
    ? caseStudies
    : caseStudies.filter(cs => cs.serviceCategory === activeTab);

  return (
    <section id="case-studies" className="py-14 md:py-24 border-t border-slate-800/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 mb-2">
              <Briefcase className="w-4 h-4" />
              <span>Documented Field Performance</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-slate-100">
              Verified Project Case Studies
            </h2>
            <p className="mt-2 text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Transparent project summaries covering exact technical scope, location, PIPL&apos;s contracted role, and measured engineering outcomes.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto max-w-full">
            {[
              { id: 'all', label: 'All Case Studies' },
              { id: 'bess', label: '🔋 BESS Storage' },
              { id: 'solar', label: '☀️ Solar EPC' },
              { id: 'ami', label: '⚡ Smart AMI' },
              { id: 'civil', label: '🏗️ Civil & Roads' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {filteredStudies.map((cs) => {
            const isBess = cs.serviceCategory === 'bess';

            return (
              <div
                key={cs.id}
                className={`p-6 sm:p-8 rounded-3xl border bg-slate-900/70 backdrop-blur-md flex flex-col justify-between group transition-all shadow-xl ${
                  isBess 
                    ? 'border-cyan-500/40 ring-1 ring-cyan-500/20 hover:border-cyan-400' 
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Top Bar with Service Tag & Key Metric */}
                  <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800 mb-5">
                    <div>
                      <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold border ${
                        isBess 
                          ? 'bg-cyan-950 border-cyan-500/40 text-cyan-300' 
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}>
                        {cs.serviceLabel}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-100 mt-2.5 leading-snug">
                        {cs.title}
                      </h3>
                    </div>

                    <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-950/90 border border-slate-800 text-right shrink-0">
                      <div className="text-base sm:text-lg font-bold font-mono text-cyan-400">
                        {cs.keyMetric.value}
                      </div>
                      <span className="text-[10px] text-slate-400 block font-mono">
                        {cs.keyMetric.label}
                      </span>
                    </div>
                  </div>

                  {/* Scope & Location Matrix */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs">
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <div className="flex items-center gap-1.5 text-slate-400 font-semibold mb-1">
                        <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span>Location</span>
                      </div>
                      <div className="text-slate-200 font-medium leading-snug">
                        {cs.location}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <div className="flex items-center gap-1.5 text-slate-400 font-semibold mb-1">
                        <FileCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>Client & Engagement</span>
                      </div>
                      <div className="text-slate-200 font-medium leading-snug">
                        {cs.client}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        ({cs.clientRole})
                      </div>
                    </div>
                  </div>

                  {/* Scope Description */}
                  <div className="mb-4">
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1 font-semibold">
                      Engineering Scope:
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {cs.scope}
                    </p>
                  </div>

                  {/* PIPL's Role */}
                  <div className="mb-5 p-3 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 text-xs">
                    <span className="font-bold text-cyan-300 block mb-1">
                      PIPL Contracted Role:
                    </span>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {cs.piplRole}
                    </p>
                  </div>

                  {/* Verified Outcomes */}
                  <div>
                    <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider mb-2 font-semibold flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>Verified Outcomes & Metrics:</span>
                    </div>
                    <div className="space-y-1.5">
                      {cs.verifiedOutcomes.map((outcome, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Audited Site Deliverables</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isBess ? (
                      <button
                        onClick={() => {
                          if (onOpenBessStudy) {
                            onOpenBessStudy({
                              powerKW: 250,
                              capacityKWh: 500,
                              backupHours: 2,
                              application: 'Time-of-Day (TOD) Peak Shaving & Demand Shaving',
                              facilityPeakKW: 350,
                            });
                          } else {
                            onOpenQuoteModal('Battery Energy Storage Systems (BESS)', 'Inquiry regarding 250kW / 500kWh BESS project similar to Chakan Auto plant');
                          }
                        }}
                        className="w-full sm:w-auto px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-cyan-500/20"
                      >
                        <span>Request BESS Feasibility</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => onOpenQuoteModal(cs.inquiryDivision, `Inquiry regarding project scope similar to: ${cs.title} (${cs.client})`)}
                        className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 hover:border-cyan-500 hover:bg-slate-900 text-slate-200 hover:text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
                      >
                        <span>Request Similar Proposal</span>
                        <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
