import React from 'react';
import { ShieldCheck, Award, Building2, Zap, Cpu, Sun, CheckCircle2 } from 'lucide-react';

export interface PartnerItem {
  id: string;
  name: string;
  type: string;
  icon: string;
  badge: string;
}

const partners: PartnerItem[] = [
  {
    id: 'c1',
    name: 'Pimpri Chinchwad Municipal Corporation (PCMC)',
    type: 'Registered Civil Contractor',
    icon: '🏛️',
    badge: 'Municipal Authority',
  },
  {
    id: 'c2',
    name: 'Adani Energy Solutions Limited',
    type: 'AMI Smart Grid Rollout',
    icon: '⚡',
    badge: 'Key Utility Partner',
  },
  {
    id: 'c3',
    name: 'MSEDCL (Mahavitaran)',
    type: 'State Electricity Distribution',
    icon: '🔌',
    badge: 'Govt Power Utility',
  },
  {
    id: 'c4',
    name: 'Finolex Cables Limited',
    type: '15MW Solar & Industrial EPC',
    icon: '☀️',
    badge: 'Industrial Client',
  },
  {
    id: 'c5',
    name: 'Larsen & Toubro (L&T Construction)',
    type: 'Substation & Grid EPC',
    icon: '🏗️',
    badge: 'EPC Partner',
  },
  {
    id: 'c6',
    name: 'Mahindra & Mahindra Ltd.',
    type: 'Industrial Plant Infrastructure',
    icon: '🚜',
    badge: 'Corporate Client',
  },
  {
    id: 'c7',
    name: 'Ranjangaon Industrial Dev. Authority',
    type: 'EMC-III Civil Infrastructure',
    icon: '🏭',
    badge: 'MIDC Authority',
  },
  {
    id: 'c8',
    name: 'PM KUSUM & PM Suryaghar (Govt of India)',
    type: 'Agri-Solar & Net-Metering',
    icon: '🌾',
    badge: 'National Scheme',
  },
  {
    id: 'c9',
    name: 'ISO 9001:2015 Certified Entity',
    type: 'Quality Management Standards',
    icon: '🎖️',
    badge: 'Audited Certification',
  },
  {
    id: 'c10',
    name: 'Govt. Approved Grade-A Electrical Contractor',
    type: 'High-Voltage Class-1 License',
    icon: '🛡️',
    badge: 'Govt Licensed',
  },
];

export const ClienteleTicker: React.FC = () => {
  // Duplicate array for endless seamless moving marquee
  const tickerCards = [...partners, ...partners];

  return (
    <div className="w-full bg-slate-950 border-b border-slate-800/80 py-2.5 relative overflow-hidden z-20">
      {/* Left Label Tag */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Clientele & Strategic Partners</span>
          </span>
          <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
            · Trusted by Govt Authorities, Utilities & Industrial Conglomerates
          </span>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
          Grade-A Approved
        </span>
      </div>

      {/* Continuous Marquee Ribbon */}
      <div className="relative overflow-hidden py-1">
        {/* Left & Right Edge Fades */}
        <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

        <div className="animate-train-track gap-3 sm:gap-4 px-4">
          {tickerCards.map((partner, idx) => (
            <div
              key={`${partner.id}-${idx}`}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border border-slate-800/90 bg-slate-900/80 hover:border-cyan-500/40 transition-colors shrink-0 shadow-sm"
            >
              <span className="text-base sm:text-lg">{partner.icon}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-200 font-heading whitespace-nowrap">
                  {partner.name}
                </span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-md whitespace-nowrap">
                  {partner.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
