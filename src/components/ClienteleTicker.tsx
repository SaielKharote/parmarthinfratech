import React from 'react';
import { ShieldCheck } from 'lucide-react';

export interface PartnerItem {
  id: string;
  name: string;
  icon: string;
  badge: string;
}

const partners: PartnerItem[] = [
  {
    id: 'c1',
    name: 'Pimpri Chinchwad Municipal Corporation (PCMC)',
    icon: '🏛️',
    badge: 'Municipal Authority',
  },
  {
    id: 'c2',
    name: 'Adani Energy Solutions Limited',
    icon: '⚡',
    badge: 'Key Utility Partner',
  },
  {
    id: 'c3',
    name: 'MSEDCL (Mahavitaran)',
    icon: '🔌',
    badge: 'Govt Power Utility',
  },
  {
    id: 'c4',
    name: 'Finolex Cables Limited',
    icon: '☀️',
    badge: 'Industrial Client',
  },
  {
    id: 'c5',
    name: 'Larsen & Toubro (L&T Construction)',
    icon: '🏗️',
    badge: 'EPC Partner',
  },
  {
    id: 'c6',
    name: 'Mahindra & Mahindra Ltd.',
    icon: '🚜',
    badge: 'Corporate Client',
  },
  {
    id: 'c7',
    name: 'Ranjangaon Industrial Dev. Authority',
    icon: '🏭',
    badge: 'MIDC Authority',
  },
  {
    id: 'c8',
    name: 'PM KUSUM & PM Suryaghar (Govt of India)',
    icon: '🌾',
    badge: 'National Scheme',
  },
  {
    id: 'c9',
    name: 'ISO 9001:2015 Certified Entity',
    icon: '🎖️',
    badge: 'Audited Quality',
  },
  {
    id: 'c10',
    name: 'Govt. Approved Grade-A Electrical Contractor',
    icon: '🛡️',
    badge: 'Govt Licensed',
  },
];

export const ClienteleTicker: React.FC = () => {
  // Duplicate array for endless seamless moving marquee
  const tickerCards = [...partners, ...partners];

  return (
    <div className="w-full bg-slate-950 border-b border-slate-800/80 py-1 relative overflow-hidden z-30">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center gap-2 overflow-hidden">
        {/* Left Fixed Label Tag */}
        <div className="shrink-0 flex items-center gap-1.5 z-20 bg-slate-950 pr-2.5 py-0.5 border-r border-slate-800/80">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1 whitespace-nowrap">
            <ShieldCheck className="w-3 h-3 text-cyan-400" />
            <span>Clientele & Partners</span>
          </span>
        </div>

        {/* Continuous Marquee Ribbon */}
        <div className="relative overflow-hidden flex-1 py-0.5">
          {/* Left & Right Edge Fades */}
          <div className="absolute top-0 bottom-0 left-0 w-6 sm:w-12 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

          <div className="animate-train-track gap-2.5 sm:gap-3 px-2">
            {tickerCards.map((partner, idx) => (
              <div
                key={`${partner.id}-${idx}`}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg border border-slate-800/80 bg-slate-900/90 shrink-0 text-[11px]"
              >
                <span className="text-xs">{partner.icon}</span>
                <span className="font-semibold text-slate-200 font-heading whitespace-nowrap text-[11px]">
                  {partner.name}
                </span>
                <span className="text-[9px] font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.2 rounded border border-cyan-500/20 whitespace-nowrap">
                  {partner.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
