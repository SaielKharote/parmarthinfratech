import React from 'react';
import { Phone, Mail, MapPin, Globe, ArrowUp, Instagram } from 'lucide-react';
import { ThemeMode } from '../types';
import { Logo } from './Logo';

interface FooterProps {
  theme: ThemeMode;
  onOpenQuoteModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuoteModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-xs">
      {/* Top CTA Banner */}
      <div className="border-b border-slate-900 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400">
              Future-Ready Infrastructure
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-100 mt-1">
              Ready to execute your next Civil, Electrical or Solar project?
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              Partner with an ISO 9001:2015 certified engineering team with proven municipal and utility credentials.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto shrink-0">
            <button
              onClick={onOpenQuoteModal}
              className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-colors shadow-lg shadow-cyan-500/20 text-center"
            >
              Request Project Proposal
            </button>
            <a
              href="tel:+919359543323"
              className="px-5 py-3 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-200 transition-colors text-center"
            >
              Call: +91 93595 43323
            </a>
          </div>
        </div>
      </div>

      {/* Main 4-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="sm:col-span-2 space-y-4">
            <Logo showText={true} />

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Delivering integrated civil, electrical, Advanced Metering Infrastructure (AMI), and renewable energy projects under one execution umbrella with an EPC + O&M mindset.
            </p>

            <div className="text-[11px] text-slate-500 italic">
              "Empowering Progress, Inspiring Purpose"
            </div>

            <div className="pt-2 text-[11px] font-mono text-slate-500 space-y-1">
              <div>CIN: U41001PN2024PTC230231</div>
              <div>GST: 27AAOCP6697F1ZO</div>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] font-mono mb-4">
              Platform & Engineering
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#3d-twin" className="hover:text-cyan-400 transition-colors">
                  3D Equipment Visualizer
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-cyan-400 transition-colors">
                  Engineering Divisions
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-cyan-400 transition-colors">
                  Notable Project Portfolio
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-cyan-400 transition-colors">
                  Solar & Energy ROI Calculator
                </a>
              </li>
              <li>
                <a href="#hse" className="hover:text-cyan-400 transition-colors">
                  HSE Protocols & Safety Rigor
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Key Divisions */}
          <div>
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] font-mono mb-4">
              Core Divisions
            </h4>
            <ul className="space-y-2.5 text-slate-400">
              <li>Renewable Solar EPC (MW & Rooftop)</li>
              <li>Green Open Access (from 100 kW)</li>
              <li>Virtual Net Metering (CHS)</li>
              <li>Substations & HT/LT Cabling</li>
              <li>Smart Metering / AMI Infrastructure</li>
              <li>EV Fast Charging Monoliths</li>
            </ul>
          </div>

          {/* Col 5: Contact & Head Office */}
          <div>
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] font-mono mb-4">
              Pune Headquarters
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  103, S.No-14/1, Stanza Building, Laxmi Chowk, Punawale, Pimpri Chinchwad, Pune – 411033, Maharashtra
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <div className="font-mono">
                  <a href="tel:+919359543323" className="hover:text-cyan-400">+91 9359543323</a>
                  <span className="mx-1 text-slate-600">/</span>
                  <a href="tel:+917666121210" className="hover:text-cyan-400">+91 7666121210</a>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <div>
                  <a href="mailto:info@pinfratech.com" className="hover:text-cyan-400">info@pinfratech.com</a>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="font-mono text-slate-300">www.pinfratech.com</span>
              </div>

              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-rose-400 shrink-0" />
                <a
                  href="https://www.instagram.com/parmaarthinfratechpvt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-rose-400 hover:text-rose-300 transition-colors"
                >
                  @parmaarthinfratechpvt
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Parmaarth Infratech Pvt. Ltd. (PIPL). All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <span>Govt. Approved Electrical Contractor</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span>MNRE Approved</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
