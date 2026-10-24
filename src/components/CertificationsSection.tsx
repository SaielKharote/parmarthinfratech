import React from 'react';
import { ShieldCheck, Award, FileCheck, CheckCircle, ExternalLink } from 'lucide-react';
import { ThemeMode } from '../types';

interface CertificationsSectionProps {
  theme: ThemeMode;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  const certifications = [
    {
      title: 'ISO 9001:2015 Quality Management',
      authority: 'International Organization for Standardization',
      desc: 'Certified for engineering quality assurance, rigorous documentation trails, and audit-ready project delivery.',
      badge: 'ISO 9001:2015',
    },
    {
      title: 'Govt. Approved Electrical Contractor',
      authority: 'Electrical Inspectorate, Industries, Energy & Labour Dept.',
      desc: 'Licensed Grade-A Electrical Contractor authorized for high-voltage substations, distribution networks, and grid sync.',
      badge: 'Grade-A Electrical',
    },
    {
      title: 'DPIIT #StartupIndia Recognized',
      authority: 'Ministry of Commerce & Industry, Govt. of India',
      desc: 'Officially recognized under the flagship Startup India initiative for clean-tech infrastructure and smart energy innovations.',
      badge: '#StartupIndia',
    },
    {
      title: 'MNRE Approved EPC Partner',
      authority: 'Ministry of New & Renewable Energy, Govt. of India',
      desc: 'Vetted under MNRE standards for ALMM-listed solar installations, Kusum pumping, and PM Suryaghar deployment.',
      badge: 'MNRE Vetted',
    },
  ];

  const clients = [
    { name: 'Adani Energy Solutions', role: 'Smart Metering & AMI' },
    { name: 'Mahindra Solarize', role: 'Renewable Power Systems' },
    { name: 'Larsen & Toubro (L&T)', role: 'Infrastructure Projects' },
    { name: 'Ultech Energies', role: 'Solar Pumping PM KUSUM' },
    { name: 'Mahavitaran (MSEDCL)', role: 'Utility Grid Interconnection' },
    { name: 'PCMC Municipal Corp', role: 'Administrative Headquarters' },
    { name: 'PWD Maharashtra', role: 'State Infrastructure Works' },
    { name: 'Ministry of Defence', role: 'Government Establishments' },
    { name: 'MEDA Maharashtra', role: 'Renewable Energy Authority' },
    { name: 'Finolex Cables', role: 'Industrial High-Load Solar' },
    { name: 'Podar Education Network', role: 'Institutional Solar EPC' },
    { name: 'The Academy School', role: 'Rooftop Clean Energy' },
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
