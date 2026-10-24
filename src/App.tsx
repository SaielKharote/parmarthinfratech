import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ClienteleTicker } from './components/ClienteleTicker';
import { LiveBackground } from './components/LiveBackground';
import { Hero } from './components/Hero';
import { ProjectsSlider } from './components/ProjectsSlider';
import { OrganizationSection } from './components/OrganizationSection';
import { ServicesSection } from './components/ServicesSection';
import { LazyModelViewer } from './components/ModelViewer3D/LazyModelViewer';
import { HseSection } from './components/HseSection';
import { InstagramSection } from './components/InstagramSection';
import { CertificationsSection } from './components/CertificationsSection';
import { EnergyCalculator } from './components/EnergyCalculator';
import { SubsidySection } from './components/SubsidySection';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { AdminModal } from './components/AdminModal';
import { Box } from 'lucide-react';

export default function App() {
  const [selected3DModel, setSelected3DModel] = useState<'solar' | 'meter' | 'transformer' | 'ev'>('transformer');

  // Quote modal state
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteDivision, setQuoteDivision] = useState('Civil Infrastructure & Structural Works');
  const [quoteNotes, setQuoteNotes] = useState('');

  // Admin portal state
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    // Listen for #admin in the URL hash to immediately open the admin portal
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const handleOpenQuoteModal = (division?: string) => {
    if (division) setQuoteDivision(division);
    setIsQuoteOpen(true);
  };

  const handleOpenQuoteWithDetails = (notes: string) => {
    setQuoteNotes(notes);
    setIsQuoteOpen(true);
  };

  return (
    <div className="min-h-screen font-sans bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Sleek, simple, slow-motion dynamic wallpaper background */}
      <LiveBackground />

      {/* Topmost Slim Clientele & Strategic Partners Strip (Above Header) */}
      <ClienteleTicker />

      {/* Top Bar Navigation */}
      <Navbar onOpenQuoteModal={() => handleOpenQuoteModal()} />

      {/* Main Content Sections */}
      <main>
        {/* 1. Integrated Infrastructure Hero Section */}
        <Hero
          onSelectModel={setSelected3DModel}
          onOpenQuoteModal={handleOpenQuoteModal}
        />

        {/* 1.5 Auto-Moving Accomplishments Slider for Notable Execution Projects */}
        <ProjectsSlider
          onSelectProjectForRFP={(project) => {
            setQuoteNotes(`Inquiry regarding project scope & execution similar to: ${project}`);
            setIsQuoteOpen(true);
          }}
        />

        {/* 2. Organization Structure & 3 Core Divisions (Civil, Electrical, Renewable) */}
        <div className="optimize-rendering">
          <OrganizationSection onOpenQuoteModal={handleOpenQuoteModal} />
        </div>

        {/* 3. The 6 Key Services (Civil & Structural, Roads & Bridges, Electrical, Smart Metering, Solar, O&M) */}
        <div className="optimize-rendering">
          <ServicesSection
            onSelectModel={(m) => {
              setSelected3DModel(m);
              document.getElementById('3d-twin')?.scrollIntoView({ behavior: 'smooth' });
            }}
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        </div>

        {/* 4. Interactive 3D Equipment & Substation Viewport */}
        <section id="3d-twin" className="py-14 md:py-24 border-t border-slate-800/80 scroll-mt-20 optimize-rendering">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 mb-6 sm:mb-8">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
                  <Box className="w-4 h-4" />
                  <span>Interactive 3D Engineering Inspection</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-slate-100 mt-2">
                  Inspect Electrical, Smart Grid & Energy Systems
                </h2>
                <p className="mt-2 text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
                  Rotate 360° to inspect 33kV substation transformers, AMI smart meters, industrial solar plants, and fast EV charging monoliths. Use the exploded view slider to examine internal components.
                </p>
              </div>

              {/* Model Selector Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 self-start md:self-auto overflow-x-auto max-w-full">
                <button
                  onClick={() => setSelected3DModel('transformer')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    selected3DModel === 'transformer'
                      ? 'bg-blue-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🔌 Substation Transformer
                </button>
                <button
                  onClick={() => setSelected3DModel('meter')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    selected3DModel === 'meter'
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ⚡ Smart Meter (AMI)
                </button>
                <button
                  onClick={() => setSelected3DModel('solar')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    selected3DModel === 'solar'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ☀️ Solar Array
                </button>
                <button
                  onClick={() => setSelected3DModel('ev')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    selected3DModel === 'ev'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🔋 EV Fast Hub
                </button>
              </div>
            </div>

            {/* 3D Model Viewer Canvas */}
            <LazyModelViewer
              key={selected3DModel}
              initialModel={selected3DModel}
              theme="dark"
              onExploreService={() => {
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </div>
        </section>

        {/* 6. HSE Implementation at Project (Field Safety Photos) */}
        <div className="optimize-rendering">
          <HseSection />
        </div>

        {/* 7. Live Field Photos & Social Updates (@parmaarthinfratechpvt) */}
        <div className="optimize-rendering">
          <InstagramSection />
        </div>

        {/* 8. Certifications & Major Client Partnerships (Adani, Mahindra, L&T, PCMC, ISO 9001:2015) */}
        <div className="optimize-rendering">
          <CertificationsSection />
        </div>

        {/* 9. Dedicated Energy Solutions & Subsidy Sizing Module */}
        <div className="relative optimize-rendering">
          {/* Energy Calculator */}
          <EnergyCalculator onOpenQuoteWithDetails={handleOpenQuoteWithDetails} />

          {/* Maharashtra & National Solar Subsidy Framework */}
          <SubsidySection onOpenQuoteModal={handleOpenQuoteModal} />
        </div>
      </main>

      {/* Footer */}
      <Footer
        onOpenQuoteModal={() => handleOpenQuoteModal()}
        onOpenAdminModal={() => setIsAdminOpen(true)}
      />

      {/* Project RFP / EPC Quote Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialDivision={quoteDivision}
        initialNotes={quoteNotes}
      />

      {/* Executive Admin & Leads Dashboard Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => {
          setIsAdminOpen(false);
          if (window.location.hash === '#admin') {
            history.pushState(null, '', window.location.pathname);
          }
        }}
      />
    </div>
  );
}
