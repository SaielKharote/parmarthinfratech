import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Send, ShieldCheck, PhoneCall, Sparkles } from 'lucide-react';
import { ThemeMode } from '../types';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDivision?: string;
  initialNotes?: string;
  theme: ThemeMode;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialDivision = 'Renewable Energy & Solar EPC',
  initialNotes = '',
  theme,
}) => {
  const isDark = theme === 'dark';

  const [division, setDivision] = useState(initialDivision);
  const [sector, setSector] = useState('Industrial / C&I');
  const [projectScale, setProjectScale] = useState('100 kW to 500 kW');
  const [location, setLocation] = useState('Pune & PCMC, Maharashtra');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState(initialNotes);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (initialDivision) setDivision(initialDivision);
    if (initialNotes) setNotes(initialNotes);
  }, [initialDivision, initialNotes, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !email.trim()) {
      setErrorMessage('Please fill in your name, contact phone, and email address.');
      return;
    }

    // Generate reference ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const refCode = `PIPL-RFP-2026-${randomNum}`;
    setReferenceId(refCode);
    setIsSubmitted(true);
    setErrorMessage('');
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName('');
    setCompany('');
    setPhone('');
    setEmail('');
    setNotes('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-2xl rounded-3xl border p-6 sm:p-8 shadow-2xl transition-all max-h-[90vh] overflow-y-auto ${
          isDark
            ? 'bg-slate-900 border-slate-700 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-modal-title"
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
              EPC & Infrastructure Request
            </span>
            <h3 id="quote-modal-title" className="text-xl sm:text-2xl font-bold font-heading text-slate-100 mt-1">
              Request Project Proposal (RFP)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close quote modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h4 className="text-xl font-bold text-slate-100 font-heading">
              Proposal Request Logged Successfully
            </h4>

            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-white">{fullName}</strong>. Your requirement has been assigned to our Senior Projects Engineering Division at our Pune HQ.
            </p>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 max-w-sm mx-auto">
              <div className="text-xs text-slate-500">Official Tracking Reference</div>
              <div className="text-xl font-mono font-bold text-cyan-400 mt-1 select-all">
                {referenceId}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                A technical advisor will contact you within 4 business hours.
              </div>
            </div>

            <div className="pt-4 flex justify-center">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-semibold text-xs hover:bg-cyan-400 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs">
                {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Engineering Division
                </label>
                <select
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="Renewable Energy & Solar EPC">Renewable Energy & Solar EPC</option>
                  <option value="Green Open Access (100kW+)">Green Open Access (100kW+)</option>
                  <option value="Virtual Net Metering (CHS)">Virtual Net Metering (CHS)</option>
                  <option value="Electrical Infrastructure & Substations">Electrical Infrastructure & Substations</option>
                  <option value="Smart Metering & AMI">Smart Metering & AMI</option>
                  <option value="Civil & Structural Works">Civil & Structural Works</option>
                  <option value="EV Charging Infrastructure">EV Charging Infrastructure</option>
                  <option value="O&M Lifecycle Maintenance">O&M Lifecycle Maintenance</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Client / Sector Category
                </label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="Industrial / C&I">Industrial / Commercial (C&I)</option>
                  <option value="Government / Municipal">Government Department / Municipal</option>
                  <option value="Housing Society (CHS)">Cooperative Housing Society (CHS)</option>
                  <option value="Infrastructure Developer">Infrastructure Developer / Contractor</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Project Capacity / Scale
                </label>
                <select
                  value={projectScale}
                  onChange={(e) => setProjectScale(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="Under 50 kW">Under 50 kW / Small Commercial</option>
                  <option value="50 kW to 100 kW">50 kW to 100 kW</option>
                  <option value="100 kW to 500 kW">100 kW to 500 kW (Green Open Access ready)</option>
                  <option value="500 kW to 2 MW">500 kW to 2 MW (Industrial Scale)</option>
                  <option value="2 MW+ Utility Mega Project">2 MW+ Utility / Turnkey EPC</option>
                  <option value="Civil Infrastructure Package">Civil Infrastructure Package</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Project Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="Pune & PCMC, Maharashtra">Pune & PCMC, Maharashtra</option>
                  <option value="Mumbai & MMR Region">Mumbai & MMR Region</option>
                  <option value="Chakan / Ranjangaon / Talegaon Industrial">Chakan / Ranjangaon / Talegaon Industrial</option>
                  <option value="Rest of Maharashtra">Rest of Maharashtra</option>
                  <option value="Other State in India">Other State in India</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Patil"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Organization / Society Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Finolex / PCMC / Society Name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Official Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Technical Scope / Site Notes
              </label>
              <textarea
                rows={3}
                placeholder="Mention connected load details, rooftop area, or specific requirements..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 leading-relaxed"
              />
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>NDA & Statutory Privacy Guaranteed</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-slate-800 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg shadow-cyan-500/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit RFP Request</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
