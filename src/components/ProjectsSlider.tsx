import React from 'react';
import { 
  Building2, 
  Zap, 
  Sun, 
  Droplets, 
  MapPin, 
  CheckCircle2, 
  Award,
  ArrowRight
} from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectsSliderProps {
  onSelectProjectForRFP: (projectTitle: string) => void;
}

const featuredProjects: (ProjectItem & { highlight: string; icon: string; bgGradient: string; borderAccent: string })[] = [
  {
    id: 'p1',
    name: 'New Administrative Building for PCMC',
    client: 'Pimpri Chinchwad Municipal Corporation',
    category: 'civil',
    costMillionINR: 75,
    location: 'Pimpri Chinchwad, Pune',
    description: 'Turnkey civil construction & high-rise structural engineering for the administrative headquarters of PCMC.',
    specs: ['Multi-Story Civic Hub', 'RCC Heavy Framing', 'Municipal Compliance'],
    highlight: 'Civic Landmark · ₹7.5 Cr',
    icon: '🏛️',
    bgGradient: 'from-orange-950/40 via-slate-900 to-slate-950',
    borderAccent: 'group-hover:border-orange-500/50',
  },
  {
    id: 'p2',
    name: 'AMI Smart Metering Rollout (Adani Energy)',
    client: 'Adani Energy Solutions Limited',
    category: 'ami',
    costMillionINR: 55,
    location: 'Maharashtra Utility Zones',
    description: 'Turnkey deployment of Smart Metering / AMI across consumer sectors with real-time cloud HES telemetry.',
    specs: ['IS 16444 & DLMS Compliant', '150+ Certified Technicians', 'Loss-Reduction Telemetry'],
    highlight: 'Smart Grid · ₹5.5 Cr',
    icon: '⚡',
    bgGradient: 'from-cyan-950/40 via-slate-900 to-slate-950',
    borderAccent: 'group-hover:border-cyan-500/50',
  },
  {
    id: 'p3',
    name: '500kW Solar Expansion (Finolex Cables)',
    client: 'Finolex Cables Limited',
    category: 'solar',
    costMillionINR: 60,
    location: 'Pune Industrial Belt',
    description: 'High-voltage industrial solar rooftop & ground array synchronised with factory distribution grids.',
    specs: ['Tier-1 Bifacial Solar Panels', 'Dynamic Grid Sync', 'Scope-2 Carbon Cuts'],
    highlight: 'Industrial Energy · ₹6.0 Cr',
    icon: '☀️',
    bgGradient: 'from-amber-950/40 via-slate-900 to-slate-950',
    borderAccent: 'group-hover:border-amber-500/50',
  },
  {
    id: 'p4',
    name: 'PM KUSUM Solar Irrigation Pumping',
    client: 'Ultech Energies / Govt of India',
    category: 'solar',
    costMillionINR: 40,
    location: 'Rural Maharashtra Sectors',
    description: 'Solar irrigation pumps empowering agricultural consumers with reliable daytime farm power.',
    specs: ['Standalone & Micro-Grid', 'IP65 Agricultural Cabinets', 'Farmer Empowerment'],
    highlight: 'Agri-Solar · ₹4.0 Cr',
    icon: '🌾',
    bgGradient: 'from-emerald-950/40 via-slate-900 to-slate-950',
    borderAccent: 'group-hover:border-emerald-500/50',
  },
  {
    id: 'p5',
    name: 'EMC-III Civil Infra (Ranjangaon MIDC)',
    client: 'Ranjangaon Industrial Dev. Authority',
    category: 'civil',
    costMillionINR: 35,
    location: 'Ranjangaon Phase-III',
    description: 'Heavy industrial civil infra, concrete internal transit routes, arterial drainage, and cable trenches.',
    specs: ['Heavy Machinery Foundation', 'Arterial Stormwater Drainage', 'Fast-Track Execution'],
    highlight: 'Industrial Infra · ₹3.5 Cr',
    icon: '🏗️',
    bgGradient: 'from-blue-950/40 via-slate-900 to-slate-950',
    borderAccent: 'group-hover:border-blue-500/50',
  },
  {
    id: 'p6',
    name: '1.5 MLD Water Treatment Plant',
    client: 'Devsaru Developers / Water Authority',
    category: 'water',
    costMillionINR: 30,
    location: 'Shetphalgade Scheme',
    description: 'Civil and electromechanical execution of 1.5 MLD municipal water treatment plant & pumping substation.',
    specs: ['1.5 MLD Daily Capacity', 'Automated Filtration', 'Gravity Supply Network'],
    highlight: 'Water Infra · ₹3.0 Cr',
    icon: '💧',
    bgGradient: 'from-sky-950/40 via-slate-900 to-slate-950',
    borderAccent: 'group-hover:border-sky-500/50',
  },
  {
    id: 'p7',
    name: 'PM Suryaghar Residential Solar Rollout',
    client: 'MSEDCL / Govt of India',
    category: 'solar',
    costMillionINR: 15,
    location: 'Western Maharashtra',
    description: 'Housing society and residential solar net-metering under national clean energy framework.',
    specs: ['Subsidized Green Rooftops', 'Net-Metering Integration', '5-Year Maintenance'],
    highlight: 'National Solar · ₹1.5 Cr',
    icon: '🏡',
    bgGradient: 'from-indigo-950/40 via-slate-900 to-slate-950',
    borderAccent: 'group-hover:border-indigo-500/50',
  },
  {
    id: 'p8',
    name: '100kW Municipal Solar Station',
    client: 'PCMC Municipal Authority',
    category: 'solar',
    costMillionINR: 10,
    location: 'PCMC Civic Complexes',
    description: 'Captive solar plant engineered for civic office complexes to achieve carbon-neutral daytime power.',
    specs: ['Commercial Inverters', 'Real-time Solar SCADA', 'Civic Green Showcase'],
    highlight: 'Municipal Solar · ₹1.0 Cr',
    icon: '🏢',
    bgGradient: 'from-violet-950/40 via-slate-900 to-slate-950',
    borderAccent: 'group-hover:border-violet-500/50',
  },
];

export const ProjectsSlider: React.FC<ProjectsSliderProps> = ({ onSelectProjectForRFP }) => {
  // Duplicate list twice to create an endless smooth moving train track loop
  const trainCards = [...featuredProjects, ...featuredProjects];

  return (
    <section id="projects" className="w-full my-6 sm:my-8 border-y border-slate-800/80 bg-slate-950/90 backdrop-blur-md relative overflow-hidden scroll-mt-20">
      {/* Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-5 pb-3 border-b border-slate-800/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider font-semibold text-cyan-400">
                  Track Record & Accomplishments
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-slate-100 font-heading">
                Notable Execution Portfolio (₹320+ Million Completed Works)
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Moving Train Marquee Ribbon Container */}
      <div className="relative py-4 sm:py-6 overflow-hidden group">
        {/* Left & Right Gradient Edge Fades (Station Effect) */}
        <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

        {/* Endless Moving Train Track */}
        <div className="animate-train-track gap-4 sm:gap-6 px-4">
          {trainCards.map((project, idx) => (
            <div
              key={`${project.id}-${idx}`}
              className={`w-[290px] sm:w-[350px] shrink-0 rounded-2xl border border-slate-800/90 bg-gradient-to-b ${project.bgGradient} p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/10 ${project.borderAccent} group/card relative`}
            >
              {/* Card Header: Icon, Highlight & Cost */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-xs font-bold font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    {project.highlight}
                  </span>
                  <span className="text-sm font-extrabold font-mono text-cyan-300 bg-slate-950/80 px-2.5 py-0.5 rounded-lg border border-slate-800">
                    ₹{project.costMillionINR}M
                  </span>
                </div>

                {/* Title & Icon */}
                <h3 className="text-sm sm:text-base font-bold font-heading text-slate-100 group-hover/card:text-cyan-300 transition-colors flex items-start gap-2 leading-snug min-h-[44px]">
                  <span className="text-lg shrink-0 mt-0.5">{project.icon}</span>
                  <span className="line-clamp-2">{project.name}</span>
                </h3>

                {/* Client & Location */}
                <div className="space-y-1 mt-2 mb-3">
                  <div className="text-[11px] text-slate-400 font-medium truncate">
                    Client: <strong className="text-slate-200">{project.client}</strong>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                    <span className="truncate">{project.location}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-3">
                  {project.description}
                </p>

                {/* Specs List */}
                <div className="space-y-1 mb-4">
                  {project.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span className="truncate">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card CTA Footer */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold">
                  {project.category.toUpperCase()} EPC
                </span>
                <button
                  onClick={() => onSelectProjectForRFP(project.name)}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 font-bold text-xs transition-colors flex items-center gap-1 shadow-sm"
                >
                  <span>Inquire Scope</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
