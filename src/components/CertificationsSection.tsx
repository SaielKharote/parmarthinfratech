import React from 'react';
import { ShieldCheck, Award, FileCheck, CheckCircle, ExternalLink } from 'lucide-react';
import { ThemeMode } from '../types';

interface CertificationsSectionProps {
  theme?: ThemeMode;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  const certifications = [
    {
      title: 'ISO 9001:2015 Quality Management',
      authority: 'Accredited Certification Board',
      desc: 'Certified for engineering quality assurance, rigorous documentation trails, and audit-ready project delivery in Civil, Electrical & Solar EPC works.',
      badge: 'ISO 9001:2015',
    },
    {
      title: 'Govt. Approved Grade-A Electrical License',
      authority: 'Electrical Inspectorate, Industries, Energy & Labour Dept., Govt. of Maharashtra',
      desc: 'Licensed Grade-A Electrical Contractor legally authorized for high-voltage (up to 33kV) substations, power transformers, and HT distribution.',
      badge: 'Grade-A Electrical',
    },
    {
      title: 'DPIIT #StartupIndia Recognized',
      authority: 'Ministry of Commerce & Industry, Govt. of India',
      desc: 'Recognized Clean-Tech & Infrastructure Enterprise under Certificate #DIPP162547 for smart energy management and sustainable engineering solutions.',
      badge: '#StartupIndia',
    },
    {
      title: 'MNRE / DISCOM Compliant Standards',
      authority: 'Ministry of New & Renewable Energy & MSEDCL Guidelines',
      desc: 'Strict adherence to ALMM-listed solar module mandates, BIS-certified inverters, and DISCOM grid-interconnection safety standards.',
      badge: 'MNRE & CEA Norms',
    },
  ];

  const warrantiesAndSubsidies = [
    {
      heading: '25-Year Solar PV Performance Warranty',
      desc: 'Tier-1 Mono PERC & TOPCon solar modules backed by manufacturer linear degradation warranties guaranteeing &ge;84.8% power output at Year 25.',
    },
    {
      heading: '10-Year or 6,000-Cycle BESS Cell Warranty',
      desc: 'Tier-1 LiFePO4 (LFP) prismatic battery cells warranted for 6,000 cycles to 70% capacity retention, with 5-year bi-directional PCS warranty.',
    },
    {
      heading: 'PM Surya Ghar DBT Subsidy Compliance',
      desc: 'Residential consumers receive up to ₹78,000 direct benefit transfer (DBT) credited directly by the National Portal. C&I projects leverage 40% Accelerated Depreciation (Section 32).',
    },
    {
      heading: '1-Year Workmanship & DLP Guarantee',
      desc: 'Comprehensive Defect Liability Period (DLP) covering all structural, cabling, and electromechanical works executed by PIPL engineers.',
    },
  ];

  const clients = [
    { name: 'Adani Energy Solutions', role: 'Smart Metering Field Subcontractor' },
    { name: 'Mahindra Solarize', role: 'Renewable EPC Partner' },
    { name: 'Larsen & Toubro (L&T)', role: 'Infrastructure Project Works' },
    { name: 'Ultech Energies', role: 'PM-KUSUM Solar Pumping Execution' },
    { name: 'Mahavitaran (MSEDCL)', role: 'Utility Grid Interconnection' },
    { name: 'PCMC Municipal Corp', role: 'Civic Infrastructure Works' },
    { name: 'PWD Maharashtra', role: 'State Highway Works' },
    { name: 'Ministry of Defence', role: 'Institutional Projects' },
    { name: 'MEDA Maharashtra', role: 'Clean Energy Project Frameworks' },
    { name: 'Finolex Cables', role: 'Industrial Solar EPC Client' },
    { name: 'Podar Education Network', role: 'Institutional Solar EPC Client' },
    { name: 'The Academy School', role: 'Rooftop Clean Energy Client' },
  ];

  return (
    <section className="py-20 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compliance Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold font-mono tracking-wider uppercase text-cyan-400">
            Trust & Compliance Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-100 mt-2">
            Certifications & Government Approvals
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Full compliance with utility standards, electrical inspectorate norms, and municipal regulations from day one of site mobilization.
          </p>
        </div>

        {/* Statutory Identifiers Card */}
        <div className="p-4 sm:p-6 rounded-2xl border border-slate-800 bg-slate-900/60 mb-10 sm:mb-12 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-3 sm:mb-4 text-xs font-semibold uppercase font-mono tracking-wider text-cyan-400">
            <FileCheck className="w-4 h-4" />
            <span>Corporate & Statutory Registrations</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 text-xs font-mono">
            <div className="p-2.5 sm:p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="text-slate-500 font-sans text-[10px] sm:text-[11px]">Company CIN</div>
              <div className="text-slate-200 font-bold mt-0.5 sm:mt-1 select-all break-all text-[11px] sm:text-xs">U41001PN2024PTC230231</div>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="text-slate-500 font-sans text-[10px] sm:text-[11px]">GST / PAN</div>
              <div className="text-slate-200 font-bold mt-0.5 sm:mt-1 select-all break-all text-[11px] sm:text-xs">27AAOCP6697F1ZO</div>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="text-slate-500 font-sans text-[10px] sm:text-[11px]">PF Registration</div>
              <div className="text-slate-200 font-bold mt-0.5 sm:mt-1 select-all break-all text-[11px] sm:text-xs">PUPUN3261563000</div>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="text-slate-500 font-sans text-[10px] sm:text-[11px]">PTRC / PTEC</div>
              <div className="text-slate-200 font-bold mt-0.5 sm:mt-1 select-all break-all text-[11px] sm:text-xs">27452340747P</div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {certifications.map((c, i) => (
            <div
              key={i}
              className="p-4 sm:p-6 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-cyan-500/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="inline-block px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 font-mono text-[11px] font-semibold mb-3">
                  {c.badge}
                </div>
                <h3 className="text-base font-bold font-heading text-slate-100">
                  {c.title}
                </h3>
                <div className="text-xs text-slate-400 mt-1 mb-3">
                  {c.authority}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {c.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center gap-1.5 text-xs text-emerald-400">
                <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Active & Audited Status</span>
              </div>
            </div>
          ))}
        </div>

        {/* Documented Warranties & Legal Subsidy Framework */}
        <div className="p-5 sm:p-7 rounded-3xl border border-slate-800 bg-slate-900/50 mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2 mb-6">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400">
                Transparency & Legal Commitments
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-100 mt-1">
                Documented Warranties & Government Subsidy Norms
              </h3>
            </div>
            <span className="text-[11px] font-mono text-slate-400 px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800">
              Vetted Contracting Standards
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {warrantiesAndSubsidies.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-200 mb-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{item.heading}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-800/60 text-[10px] text-slate-500 font-mono">
                  Standard Contract Schedule
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clientele Showcase */}
        <div>
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
                Clientele & Partners
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-100 mt-1">
                Trusted by Leaders Across Industry & Governance
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {clients.map((client, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-800/80 bg-slate-900/30 hover:border-slate-700 transition-colors flex flex-col justify-center"
              >
                <div className="text-xs font-bold text-slate-200">
                  {client.name}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5 truncate">
                  {client.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
