import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle, 
  ZoomIn, 
  X, 
  HardHat, 
  MapPin, 
  Truck,
  Award
} from 'lucide-react';
import { ThemeMode } from '../types';

interface HseSectionProps {
  theme?: ThemeMode;
}

interface HsePhotoItem {
  id: string;
  title: string;
  category: string;
  tag: string;
  image: string;
  description: string;
  location: string;
  protocols: string[];
}

export const HseSection: React.FC<HseSectionProps> = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<HsePhotoItem | null>(null);

  const hsePhotosRow1: HsePhotoItem[] = [
    {
      id: 'work-at-height',
      title: 'Training for Work at Height',
      category: 'height',
      tag: 'Work at Height',
      image: '/assets/hse/work_at_height.jpg',
      description: 'Certified HSE safety supervisor demonstrating full-body safety harness deployment, double shock-absorbing lanyards, and anchor points to site engineers.',
      location: 'PCMC / Pune Infrastructure Site',
      protocols: [
        '100% Tie-Off Policy with dual lanyards & shock absorbers',
        'Daily inspection of webbing, buckles & snap hooks',
        'Static lifeline anchorage and fall arrest systems on substations & PEB structures',
      ],
    },
    {
      id: 'fire-mock-drill',
      title: 'Fire Mock Drill & Live Simulation',
      category: 'drills',
      tag: 'Fire Mock Drill',
      image: '/assets/hse/fire_mock_drill.jpg',
      description: 'Mandatory on-site fire drill demonstrating active discharge of dry chemical powder (DCP) and CO2 extinguishers on a controlled test fire pan.',
      location: 'Civil & Industrial Site, Maharashtra',
      protocols: [
        'Hands-on PASS technique (Pull, Aim, Squeeze, Sweep) for all field workers',
        'Demarcated emergency assembly points & siren evacuation trails',
        'Certified fire extinguisher inspection tags & monthly pressure audits',
      ],
    },
    {
      id: 'daily-tbt-morning',
      title: 'Daily Toolbox Talk (TBT) - Morning Shift',
      category: 'tbt',
      tag: 'Daily TBT',
      image: '/assets/hse/daily_tbt_morning.jpg',
      description: 'Daily morning safety huddle conducted by HSE officers and site in-charges before work commencement to review daily tasks and PPE.',
      location: 'Deep Foundation Project, Pune',
      protocols: [
        'Task-specific Job Safety Analysis (JSA) review with workers',
        'Verification of ISI-marked helmets, safety shoes, vests & goggles',
        'Physical fitness & hydration check before shift deployment',
      ],
    },
    {
      id: 'daily-tbt-excavation',
      title: 'Excavation & Crane Safety TBT',
      category: 'tbt',
      tag: 'Daily TBT',
      image: '/assets/hse/daily_tbt_excavation.jpg',
      description: 'Specialized toolbox briefing conducted along deep excavation trenches and tower crane lifting zones, reviewing soil stability & swing radius.',
      location: 'Heavy Civil Infrastructure Site',
      protocols: [
        'Safe distance protocols around heavy excavators, piling rigs & cranes',
        'Trench shoring, benching & edge protection barrier enforcement',
        'Designated banksmen and signalmen for blind equipment maneuvers',
      ],
    },
  ];

  const hsePhotosRow2: HsePhotoItem[] = [
    {
      id: 'induction-training',
      title: 'Site Induction Safety Training',
      category: 'induction',
      tag: 'Induction Training',
      image: '/assets/hse/induction_training.jpg',
      description: 'Comprehensive indoor safety orientation conducted inside modular site office cabins for all newly joined technicians, contractors, and machine operators.',
      location: 'Project Site Office, Pune HQ Operations',
      protocols: [
        'Company Zero Harm policy & statutory legal safety guidelines',
        'Electrical flash-over hazards, Lockout-Tagout (LOTO) & permit-to-work',
        'Issuance of certified safety ID badges and emergency contact numbers',
      ],
    },
    {
      id: 'transmission-safety',
      title: 'High-Voltage Transmission Safety',
      category: 'height',
      tag: 'Electrical Safety',
      image: '/assets/hse/transmission_safety.jpg',
      description: 'Specialized aerial safety protocols for electrical linemen and engineers performing high-voltage tower erections and substation grid connections.',
      location: 'Power Distribution & Transmission Network',
      protocols: [
        'Non-conductive fiberglass tools & electrostatic discharge gear',
        'Earthing discharge rods verification before any conductor contact',
        'Certified high-altitude tower climbing harnesses and positioning ropes',
      ],
    },
    {
      id: 'substation-earthing',
      title: 'Substation Earthing & Discharge Rods',
      category: 'electrical',
      tag: 'Substation Safety',
      image: '/assets/hse/daily_tbt_morning.jpg',
      description: 'Pre-commissioning electrical discharge and earthing grid testing protocols conducted at 33kV outdoor switchyard facilities.',
      location: '33kV Electrical Substation, Pune Zone',
      protocols: [
        'Multi-point earth pit resistance measurement & neutral grounding audit',
        'High-voltage insulated gloves and rubber matting verification',
        'Double-person authorization for breaker charging & LOTO tag placement',
      ],
    },
    {
      id: 'trench-barricading',
      title: 'Trench Barricading & Night Lighting',
      category: 'civil',
      tag: 'Site Barricading',
      image: '/assets/hse/daily_tbt_excavation.jpg',
      description: 'High-visibility fluorescent perimeter fencing, solar warning flashers, and hard timber shoring along municipal road trenching.',
      location: 'Municipal Transit Cable Corridor',
      protocols: [
        'Continuous retro-reflective warning tape & solar strobe lights',
        'Safe pedestrian bridges with handrails across deep excavation slots',
        '24x7 site watchmen monitoring deep trench perimeters',
      ],
    },
  ];

  // Duplicate each row for continuous seamless looping
  const trainRow1 = [...hsePhotosRow1, ...hsePhotosRow1];
  const trainRow2 = [...hsePhotosRow2, ...hsePhotosRow2];

  return (
    <section id="hse" className="py-16 md:py-24 border-t border-slate-800/80 bg-slate-950/70 scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Zero Harm Policy · ISO 45001 Compliance</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-100">
            HSE Implementation at Project Sites
          </h2>
          <p className="mt-3 text-slate-300 text-xs sm:text-base leading-relaxed">
            Real photographic documentation from active Parmaarth Infratech project sites across Maharashtra. Safety is enforced daily across every shift, trench, elevation, and substation.
          </p>
        </div>
      </div>

      {/* Dual Moving Train Marquee Container */}
      <div className="space-y-6 relative">
        {/* Left & Right Edge Fades */}
        <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

        {/* Row 1: Upper Row Moving RIGHT -> animate-train-track-reverse */}
        <div className="overflow-hidden py-1">
          <div className="animate-train-track-reverse gap-4 sm:gap-6 px-4">
            {trainRow1.map((item, idx) => (
              <div
                key={`row1-${item.id}-${idx}`}
                onClick={() => setSelectedPhoto(item)}
                className="w-[280px] sm:w-[340px] shrink-0 rounded-2xl border border-slate-800 bg-slate-900/80 hover:border-emerald-500/60 transition-all duration-300 overflow-hidden cursor-pointer hover:scale-[1.02] shadow-xl group flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-lg bg-amber-400 text-slate-950 font-bold font-mono text-[11px] shadow flex items-center gap-1">
                      <HardHat className="w-3 h-3" />
                      <span>{item.tag}</span>
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-slate-950/80 text-emerald-400 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-3.5 h-3.5" />
                    </div>
                    <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 text-[10px] text-slate-300 font-mono bg-slate-950/80 px-2 py-0.5 rounded backdrop-blur-sm">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      <span className="truncate max-w-[170px]">{item.location}</span>
                    </div>
                  </div>

                  <div className="p-4 space-y-1.5">
                    <h3 className="text-sm font-bold font-heading text-slate-100 group-hover:text-emerald-400 transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="px-4 pb-3.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-emerald-400">
                  <span className="flex items-center gap-1 font-medium truncate">
                    <CheckCircle className="w-3 h-3 shrink-0" />
                    <span className="truncate">{item.protocols[0]}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Lower Row Moving LEFT -> animate-train-track */}
        <div className="overflow-hidden py-1">
          <div className="animate-train-track gap-4 sm:gap-6 px-4">
            {trainRow2.map((item, idx) => (
              <div
                key={`row2-${item.id}-${idx}`}
                onClick={() => setSelectedPhoto(item)}
                className="w-[280px] sm:w-[340px] shrink-0 rounded-2xl border border-slate-800 bg-slate-900/80 hover:border-cyan-500/60 transition-all duration-300 overflow-hidden cursor-pointer hover:scale-[1.02] shadow-xl group flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-lg bg-cyan-400 text-slate-950 font-bold font-mono text-[11px] shadow flex items-center gap-1">
                      <HardHat className="w-3 h-3" />
                      <span>{item.tag}</span>
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-slate-950/80 text-cyan-400 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-3.5 h-3.5" />
                    </div>
                    <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 text-[10px] text-slate-300 font-mono bg-slate-950/80 px-2 py-0.5 rounded backdrop-blur-sm">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      <span className="truncate max-w-[170px]">{item.location}</span>
                    </div>
                  </div>

                  <div className="p-4 space-y-1.5">
                    <h3 className="text-sm font-bold font-heading text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="px-4 pb-3.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-cyan-400">
                  <span className="flex items-center gap-1 font-medium truncate">
                    <CheckCircle className="w-3 h-3 shrink-0" />
                    <span className="truncate">{item.protocols[0]}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        {/* 4 Core Standards Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">100%</div>
            <div className="text-xs font-semibold text-slate-200 mt-0.5">PPE Gate Compliance</div>
            <div className="text-[10px] text-slate-500 mt-1">Zero entry without certified gear</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
            <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-400">Daily</div>
            <div className="text-xs font-semibold text-slate-200 mt-0.5">Toolbox Talks (TBT)</div>
            <div className="text-[10px] text-slate-500 mt-1">Conducted every morning shift</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
            <div className="text-xl sm:text-2xl font-bold font-mono text-amber-400">Monthly</div>
            <div className="text-xs font-semibold text-slate-200 mt-0.5">Fire & Evacuation Drills</div>
            <div className="text-[10px] text-slate-500 mt-1">Hands-on equipment simulation</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
            <div className="text-xl sm:text-2xl font-bold font-mono text-purple-400">ISO 45001</div>
            <div className="text-xs font-semibold text-slate-200 mt-0.5">Occupational Health & Safety</div>
            <div className="text-[10px] text-slate-500 mt-1">Audited management system</div>
          </div>
        </div>

        {/* Logistics, Calibrated Tools & Survey Machinery */}
        <div className="mt-8 sm:mt-10 p-6 sm:p-8 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider">
                Precision Equipment & Logistics
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-100 mt-1">
                Calibrated Testing Kits & Survey Machinery
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800 shrink-0">
              <Truck className="w-4 h-4 text-cyan-400" />
              <span>Multi-Site Rapid Fleet Mobilization</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            <div>
              <div className="font-bold text-slate-200 mb-1 text-sm font-heading">
                Calibrated Electrical Kits
              </div>
              <div className="text-slate-400 leading-relaxed">
                NABL-calibrated meggers, micro-ohm meters, earth resistance testers, and primary current injection sets for safe substation charging.
              </div>
            </div>
            <div>
              <div className="font-bold text-slate-200 mb-1 text-sm font-heading">
                Laser Total Station Survey
              </div>
              <div className="text-slate-400 leading-relaxed">
                High-precision digital laser total stations for boundary contour mapping, pile alignment, and civil foundation verticality.
              </div>
            </div>
            <div>
              <div className="font-bold text-slate-200 mb-1 text-sm font-heading">
                Mobile Container Storage
              </div>
              <div className="text-slate-400 leading-relaxed">
                Weatherproof secured container storage units on-site with locked tool cribs, fire extinguishers, and first-aid response kiosks.
              </div>
            </div>
            <div>
              <div className="font-bold text-slate-200 mb-1 text-sm font-heading">
                Digital Auditable Trails
              </div>
              <div className="text-slate-400 leading-relaxed">
                Time-stamped Daily Progress Reports (DPR), safety incident registers, and permits-to-work archived for client and municipal audit.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* High-Resolution Photo Modal / Lightbox */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="w-full max-w-4xl rounded-3xl border border-slate-800 bg-slate-900 text-slate-100 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded bg-amber-400 text-slate-950 font-mono font-bold text-xs">
                  {selectedPhoto.tag}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-slate-100 font-heading">
                  {selectedPhoto.title}
                </h4>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-4 sm:p-6 space-y-4">
              {/* Image View */}
              <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="w-full max-h-[58vh] object-contain mx-auto"
                />
              </div>

              {/* Description & Location */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-mono">
                    <MapPin className="w-4 h-4" />
                    <span>Location: {selectedPhoto.location}</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400">
                    Parmaarth Infratech Pvt. Ltd. · Project HSE Record
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedPhoto.description}
                </p>

                {/* Protocols list */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-xs font-semibold text-slate-200">
                    Enforced Site Safety Protocols:
                  </div>
                  <div className="space-y-1.5">
                    {selectedPhoto.protocols.map((protocol, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{protocol}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-slate-800 bg-slate-950 text-right">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
