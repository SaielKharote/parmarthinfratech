import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LiveBackground } from './components/LiveBackground';
import { Hero } from './components/Hero';
import { SubsidySection } from './components/SubsidySection';
import { InstagramSection } from './components/InstagramSection';
import { EnergyCalculator } from './components/EnergyCalculator';
import { ModelViewer } from './components/ModelViewer3D/ModelViewer';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CertificationsSection } from './components/CertificationsSection';
import { HseSection } from './components/HseSection';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { BackgroundStyle, ThemeMode } from './types';
import { Box, Sparkles, ShieldCheck } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [backgroundStyle, setBackgroundStyle] = useState<BackgroundStyle>('grid');
  const [selected3DModel, setSelected3DModel] = useState<'solar' | 'meter' | 'transformer' | 'ev'>('solar');

  // Quote modal state
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteDivision, setQuoteDivision] = useState('Renewable Energy & Solar EPC');
  const [quoteNotes, setQuoteNotes] = useState('');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleOpenQuoteModal = (division?: string) => {
    if (division) setQuoteDivision(division);
    setIsQuoteOpen(true);
  };

  const handleOpenQuoteWithDetails = (notes: string) => {
    setQuoteNotes(notes);
    setIsQuoteOpen(true);
  };

  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Three.js Live Ambient Background */}
      <LiveBackground style={backgroundStyle} theme={theme} interactive={true} />

      {/* Top Bar Navigation */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        backgroundStyle={backgroundStyle}
        onChangeBackgroundStyle={setBackgroundStyle}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Friendly Hero Section with Pune Office & Installations */}
        <Hero
          theme={theme}
          onSelectModel={setSelected3DModel}
          onOpenQuoteModal={() => handleOpenQuoteModal()}
        />

        {/* 2. Maharashtra & PM Surya Ghar Solar Subsidy Section */}
        <SubsidySection
          theme={theme}
          onOpenQuoteModal={handleOpenQuoteModal}
        />

        {/* 3. Real-Time Instagram Feed & Verified Social Integration */}
        <InstagramSection theme={theme} />

        {/* 4. Simple Bill Savings & ROI Calculator */}
        <EnergyCalculator
          theme={theme}
          onOpenQuoteWithDetails={handleOpenQuoteWithDetails}
        />

        {/* 4. Interactive 3D Equipment Viewport Section */}
        <section id="3d-twin" className="py-14 md:py-24 border-t border-slate-800/80 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 mb-6 sm:mb-8">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
                  <Box className="w-4 h-4" />
                  <span>3D Interactive Inspection</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-slate-100 mt-2">
                  See Our Solar & Power Equipment in 3D
                </h2>
                <p className="mt-2 text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
                  Rotate 360° to inspect how our solar panels, smart meters, substation transformers, and fast car chargers work. Click the "Exploded" slider below to see inside the parts!
                </p>
              </div>

              {/* Simple Model Selector Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 self-start md:self-auto overflow-x-auto max-w-full">
                <button
                  onClick={() => setSelected3DModel('solar')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    selected3DModel === 'solar'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ☀️ Solar Panels
                </button>
                <button
                  onClick={() => setSelected3DModel('meter')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    selected3DModel === 'meter'
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ⚡ Smart Meter
                </button>
                <button
                  onClick={() => setSelected3DModel('transformer')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    selected3DModel === 'transformer'
                      ? 'bg-blue-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🔌 Transformer
                </button>
                <button
                  onClick={() => setSelected3DModel('ev')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    selected3DModel === 'ev'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🔋 EV Charger
                </button>
              </div>
            </div>

            {/* 3D Model Viewer Canvas */}
            <ModelViewer
              key={selected3DModel}
              initialModel={selected3DModel}
              theme={theme}
              onExploreService={(svc) => {
                document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </div>
        </section>

        {/* 5. Engineering Divisions Section */}
        <ServicesSection
          theme={theme}
          onSelectModel={(m) => {
            setSelected3DModel(m);
            document.getElementById('3d-twin')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenQuoteModal={handleOpenQuoteModal}
        />

        {/* 6. Notable Projects (PCMC, Adani, Finolex, etc.) */}
        <ProjectsSection
          theme={theme}
          onSelectProjectForRFP={(project) => {
            setQuoteNotes(`Inquiry regarding project scope & execution similar to: ${project}`);
            setIsQuoteOpen(true);
          }}
        />

        {/* 7. Certifications & Major Clients (Adani, Mahindra, L&T, etc.) */}
        <CertificationsSection theme={theme} />

        {/* 8. Safety & Equipment Rigor */}
        <HseSection theme={theme} />
      </main>

      {/* Footer */}
      <Footer theme={theme} onOpenQuoteModal={() => handleOpenQuoteModal()} />

      {/* Project RFP / EPC Quote Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialDivision={quoteDivision}
        initialNotes={quoteNotes}
        theme={theme}
      />
    </div>
  );
}
