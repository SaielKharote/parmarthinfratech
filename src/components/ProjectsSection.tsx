import React, { useState } from 'react';
import { ProjectItem, ThemeMode } from '../types';
import { Building2, Zap, Sun, Droplets, Filter, CheckCircle2, MapPin, IndianRupee } from 'lucide-react';

interface ProjectsSectionProps {
  theme: ThemeMode;
  onSelectProjectForRFP: (projectTitle: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  theme,
  onSelectProjectForRFP,
}) => {
  const isDark = theme === 'dark';
  const [activeFilter, setActiveFilter] = useState<'all' | 'civil' | 'electrical' | 'solar' | 'ami' | 'water'>('all');

  const projects: ProjectItem[] = [
    {
      id: 'p1',
      name: 'New Administrative Building for PCMC',
      client: 'Pimpri Chinchwad Municipal Corporation (PCMC)',
      category: 'civil',
      costMillionINR: 75,
      location: 'Pimpri Chinchwad, Pune',
      description: 'Comprehensive construction and structural civil engineering works for the high-rise administrative headquarters of PCMC, including RCC framing, foundation clearances, and electrical safety integration.',
      specs: ['Modern Multi-Story Administrative Hub', 'Full Structural Clearance & Compliance', 'Civic Grade Engineering'],
    },
    {
      id: 'p2',
      name: 'Advanced Metering Infrastructure (AMI) Rollout',
      client: 'Adani Energy Solutions Limited',
      category: 'ami',
      costMillionINR: 55,
      location: 'Maharashtra Utility Zones',
      description: 'Turnkey deployment of Smart Metering / AMI across high-density consumer sectors with zero disruption, continuous real-time data capture, and cloud HES integration.',
      specs: ['IS 16444 & DLMS Compliant Meters', '150+ Certified Technicians Deployed', 'Loss-Reduction Telemetry Integration'],
    },
    {
      id: 'p3',
      name: 'Industrial 500kW Solar Expansion (15MW Finolex Plant)',
      client: 'Finolex Cables Limited',
      category: 'solar',
      costMillionINR: 60,
      location: 'Pune Industrial Belt',
      description: 'Turnkey industrial solar rooftop & ground expansion synchronised with high-voltage industrial sub-distribution to reduce peak electricity tariffs.',
      specs: ['Tier-1 High-Efficiency Bifacial Panels', 'Dynamic Grid Synchronisation', 'Substantial Scope-2 Emission Reduction'],
    },
    {
      id: 'p4',
      name: 'Solar Pumping Project - PM KUSUM Part B',
      client: 'Ultech Energies / Govt of India',
      category: 'solar',
      costMillionINR: 40,
      location: 'Rural Maharashtra Sectors',
      description: 'Deployment of solar irrigation pump sets empowering agricultural consumers with clean daytime power and automated motor controllers.',
      specs: ['Standalone & Micro-Grid Solar Inverters', 'Durable IP65 Agricultural Cabinets', 'Direct Farmer Empowerment'],
    },
    {
      id: 'p5',
      name: 'Electronics Manufacturing Cluster (EMC-III) Civil Infra',
      client: 'Ranjangaon Industrial Development Authority',
      category: 'civil',
      costMillionINR: 35,
      location: 'Ranjangaon Industrial Area, Phase-III',
      description: 'Heavy industrial civil infrastructure, high-load concrete internal transit routes, stormwater arterial drainage, and high-voltage conduit channels.',
      specs: ['Heavy Machinery Foundation Slabs', 'Industrial Drainage & Safety Barriers', 'Fast-Track Industrial Completion'],
    },
    {
      id: 'p6',
      name: '1.5 MLD Water Treatment Plant (Shetphalgade)',
      client: 'Devsaru Developers & Builders / Water Authority',
      category: 'water',
      costMillionINR: 30,
      location: 'Shetphalgade Water Supply Scheme',
      description: 'Civil and electromechanical execution of 1.5 MLD municipal water treatment plant, clariflocculators, filter beds, and HT pumping substation.',
      specs: ['1.5 Million Liters / Day Capacity', 'Automated Filtration & Chlorination', '24x7 Gravity Distribution Network'],
    },
    {
      id: 'p7',
      name: 'PM Suryaghar Net Metering Distribution',
      client: 'MSEDCL / Govt of India',
      category: 'solar',
      costMillionINR: 15,
      location: 'Western Maharashtra Urban Belts',
      description: 'Large-scale residential and housing society solar net-metering under the national PM Suryaghar initiative with automated utility sanctioning.',
      specs: ['Subsidized Green Rooftop Rollout', 'Bi-directional Net-Metering Meters', 'Comprehensive 5-Year Maintenance'],
    },
    {
      id: 'p8',
      name: 'PCMC Municipal 100kW Solar Power Station',
      client: 'Pimpri Chinchwad Municipal Corporation',
      category: 'solar',
      costMillionINR: 10,
      location: 'PCMC Civic Complexes',
      description: 'Institutional captive solar plant engineered for civic office complexes to achieve zero daytime power import and carbon neutrality.',
      specs: ['High-Uptime Commercial Inverters', 'Web-Based Real-time Solar SCADA', 'Municipal Clean Energy Showcase'],
    },
  ];

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const totalValueMillion = projects.reduce((acc, p) => acc + p.costMillionINR, 0);

  return (
    <section id="projects" className="py-20 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold font-mono tracking-wider uppercase text-cyan-400">
              Proven Track Record
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-100 mt-2">
              Notable Execution Projects
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Showcasing over <strong className="text-white">₹{totalValueMillion} Million (₹{totalValueMillion/10} Crore)</strong> in landmark civil, electrical EPC, solar energy, and smart metering implementations.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-slate-800 self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'all'
                  ? 'bg-cyan-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({projects.length})
            </button>
            <button
              onClick={() => setActiveFilter('civil')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'civil'
                  ? 'bg-cyan-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Civil & Infra
            </button>
            <button
              onClick={() => setActiveFilter('solar')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'solar'
                  ? 'bg-cyan-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Solar Energy
            </button>
            <button
              onClick={() => setActiveFilter('ami')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'ami'
                  ? 'bg-cyan-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Smart AMI
            </button>
            <button
              onClick={() => setActiveFilter('water')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'water'
                  ? 'bg-cyan-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Water Treatment
            </button>
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-slate-700 transition-all flex flex-col justify-between group hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-semibold font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400">
                    {project.category.toUpperCase()}
                  </span>
                  <div className="text-right">
                    <span className="text-lg font-bold font-mono text-cyan-400 tabular-nums">
                      <span className="font-sans mr-0.5">₹</span>{project.costMillionINR}M
                    </span>
                    <span className="text-[10px] text-slate-500 block">Project Cost</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold font-heading text-slate-100 group-hover:text-cyan-400 transition-colors leading-snug">
                  {project.name}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2 mb-4">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{project.location}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="space-y-1.5 mb-6">
                  {project.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <CheckCircle2 className="w-3 h-3 text-cyan-500 shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium truncate max-w-[170px]" title={project.client}>
                  Client: <strong className="text-slate-200">{project.client}</strong>
                </span>
                <button
                  onClick={() => onSelectProjectForRFP(project.name)}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 font-medium transition-colors"
                >
                  Inquire Scope
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
