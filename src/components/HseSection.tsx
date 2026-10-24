import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Flame, 
  Award, 
  Truck, 
  CheckCircle, 
  ZoomIn, 
  X, 
  AlertTriangle,
  HardHat,
  Users,
  MapPin
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
  const [activeFilter, setActiveFilter] = useState<'all' | 'tbt' | 'drills' | 'height' | 'induction'>('all');

  const hsePhotos: HsePhotoItem[] = [
    {
      id: 'work-at-height',
      title: 'Training for Work at Height',
      category: 'height',
      tag: 'Work at Height',
      image: '/assets/hse/work_at_height.jpg',
      description: 'Certified HSE safety supervisor demonstrating full-body safety harness deployment, double shock-absorbing lanyards, and anchor points to site engineers and technicians prior to structural elevation works.',
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
      description: 'Mandatory on-site fire drill demonstrating active discharge of dry chemical powder (DCP) and CO2 extinguishers on a controlled test fire pan with full workforce participation.',
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
      description: 'Daily morning safety huddle conducted by HSE officers and site in-charges before work commencement to review daily tasks, identify blind spots, and review mandatory PPE.',
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
      description: 'Specialized toolbox briefing conducted along deep excavation trenches and tower crane lifting zones, reviewing soil stability, barricades, and swing-radius safety.',
      location: 'Heavy Civil Infrastructure Site',
      protocols: [
        'Safe distance protocols around heavy excavators, piling rigs & cranes',
        'Trench shoring, benching & edge protection barrier enforcement',
        'Designated banksmen and signalmen for blind equipment maneuvers',
      ],
    },
    {
      id: 'induction-training',
      title: 'Site Induction Safety Training',
      category: 'induction',
      tag: 'Induction Training',
      image: '/assets/hse/induction_training.jpg',
      description: 'Comprehensive indoor safety orientation conducted inside modular site office cabins for all newly joined technicians, contractors, and machine operators before gate entry.',
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
      description: 'Specialized aerial safety protocols for electrical linemen and engineers performing high-voltage tower erections, insulator stringing, and substation grid connections.',
      location: 'Power Distribution & Transmission Network',
      protocols: [
        'Non-conductive fiberglass tools & electrostatic discharge gear',
        'Earthing discharge rods verification before any conductor contact',
        'Certified high-altitude tower climbing harnesses and positioning ropes',
      ],
    },
  ];

  const filteredPhotos = activeFilter === 'all'
    ? hsePhotos
    : hsePhotos.filter(p => p.category === activeFilter);

  return (
    <section id="hse" className="py-16 md:py-24 border-t border-slate-800/80 bg-slate-950/70 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Zero Harm Policy · ISO 45001 Compliance</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-100">
            HSE Implementation at Project Sites
          </h2>
          <p className="mt-3 text-slate-300 text-xs sm:text-base leading-relaxed">
            Real photographic documentation from active Parmaarth Infratech project sites across Maharashtra. Safety is not a theoretical checklist—it is enforced daily across every shift, trench, elevation, and substation.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-10 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'All HSE Field Photos' },
            { id: 'tbt', label: 'Daily TBT Briefings' },
            { id: 'height', label: 'Work at Height' },
            { id: 'drills', label: 'Fire Mock Drills' },
            { id: 'induction', label: 'Induction Training' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as typeof activeFilter)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                activeFilter === tab.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* HSE Real Project Photo Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredPhotos.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/80 hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between shadow-xl cursor-pointer hover:-translate-y-1"
            >
              <div>
                {/* Photo Container */}
                <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

                  {/* HSE Tag Badge (matching user slide style in sleek modern design) */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-amber-400/90 text-slate-950 font-bold font-mono text-[11px] shadow-lg flex items-center gap-1.5 backdrop-blur-sm">
                    <HardHat className="w-3.5 h-3.5" />
                    <span>{item.tag}</span>
                  </div>

                  {/* Zoom Action Cue */}
                  <div className="absolute bottom-3 right-3 p-2 rounded-xl bg-slate-950/80 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-4 h-4 text-emerald-400" />
                  </div>

                  {/* Location Pin */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[10px] text-slate-300 font-mono bg-slate-950/70 px-2 py-0.5 rounded-md backdrop-blur-sm">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    <span>{item.location}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 space-y-2.5">
                  <h3 className="text-base sm:text-lg font-bold font-heading text-slate-100 group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Bottom Quick Protocol Checklist */}
              <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-3 border-t border-slate-800/80">
                <div className="space-y-1.5 text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{item.protocols[0]}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 4 Core Standards Bar */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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
