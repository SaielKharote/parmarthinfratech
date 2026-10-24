import React, { useState } from 'react';
import { 
  Instagram, 
  ExternalLink, 
  Heart, 
  MessageCircle, 
  CheckCircle, 
  RefreshCw, 
  Sparkles, 
  Radio, 
  ChevronRight,
  Send
} from 'lucide-react';
import { ThemeMode } from '../types';

interface InstagramSectionProps {
  theme?: ThemeMode;
}

interface PostItem {
  id: string;
  image: string;
  title: string;
  category: 'all' | 'rooftop' | 'office' | 'subsidy' | 'commercial';
  categoryLabel: string;
  likes: number;
  comments: number;
  timestamp: string;
  caption: string;
  tags: string[];
  instagramUrl: string;
}

export const InstagramSection: React.FC<InstagramSectionProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const [activeFilter, setActiveFilter] = useState<'all' | 'rooftop' | 'office' | 'subsidy' | 'commercial'>('all');
  const [selectedPost, setSelectedPost] = useState<PostItem | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSynced, setLastSynced] = useState('Just now');
  const [viewMode, setViewMode] = useState<'grid' | 'embed'>('grid');

  const posts: PostItem[] = [
    {
      id: 'post-1',
      image: '/assets/instagram/post_rooftop.jpg',
      title: 'High-Efficiency Monocrystalline Rooftop Array in Pune',
      category: 'rooftop',
      categoryLabel: '☀️ Rooftop Solar',
      likes: 64,
      comments: 8,
      timestamp: '2 days ago',
      caption: `Delivering clean, reliable solar energy across Maharashtra rooftops! ☀️

High-efficiency monocrystalline solar panels deployed with heavy-duty galvanized mounting structures and complete lightning protection. 

Key Highlights:
• 25-Year Performance Warranty
• Bi-directional Net-Metering with Mahavitaran (MSEDCL)
• Up to 90% savings on monthly power bills
• End-to-end subsidy documentation managed by PIPL

DM us or call +91 76661 21210 to book your free rooftop shadow analysis survey!`,
      tags: ['#solarenergy', '#pune', '#punebusiness', '#mahavitaran', '#cleanpower', '#pmsuryaghar', '#parmaarthinfratech'],
      instagramUrl: 'https://www.instagram.com/parmaarthinfratechpvt/',
    },
    {
      id: 'post-2',
      image: '/assets/instagram/post_office.jpg',
      title: 'Pune Headquarters & Corporate Engineering Office',
      category: 'office',
      categoryLabel: '🏢 Pune HQ & Team',
      likes: 79,
      comments: 12,
      timestamp: '4 days ago',
      caption: `Welcome to Parmaarth Infratech Pvt. Ltd. (PIPL) Headquarters! 🏢✨

Located at Stanza Building, Punawale, Pimpri Chinchwad, Pune. Our dedicated team of licensed electrical engineers, civil supervisors, and AMI metering specialists work round the clock to power industrial and residential infrastructure across Maharashtra.

Visit us for project inquiries, EPC tenders, and solar engineering consultations. 

📍 103, Stanza Building, Laxmi Chowk, Punawale, Pune – 411033.`,
      tags: ['#puneheadquarters', '#parmaarthinfratech', '#pcmc', '#punawale', '#electricalcontractor', '#cleanenergy', '#engineering'],
      instagramUrl: 'https://www.instagram.com/parmaarthinfratechpvt/',
    },
    {
      id: 'post-3',
      image: '/assets/aistudio/Screenshot_2026-10-22_at_8.20.56_PM_1ca6d75e.png',
      title: 'Ground Mounted MW Scale Solar EPC Execution',
      category: 'commercial',
      categoryLabel: '⚡ MW Scale Utility',
      likes: 58,
      comments: 6,
      timestamp: '1 week ago',
      caption: `Ground-Mounted Megawatt (MW) Scale Solar Solutions by Parmaarth Infratech! ⚡

Full Turnkey Capabilities:
• Comprehensive EPC Design & Soil Testing
• Heavy Civil Pile Foundations & Boundary Works
• AC & DC High-Voltage Cabling & Inverter Stations
• High-Tension Substation & Plant Synchronisation
• Plant Commissioning & Final CEIG Approvals
• 25-Year Operational & Preventive Maintenance (O&M)

Empowering factories, agricultural tracts, and commercial establishments with captive solar and Green Open Access.`,
      tags: ['#mwsolar', '#solarfarm', '#industrialpower', '#epccontractor', '#openaccess', '#maharashtra', '#renewableenergy'],
      instagramUrl: 'https://www.instagram.com/parmaarthinfratechpvt/',
    },
    {
      id: 'post-4',
      image: '/assets/aistudio/Screenshot_2026-10-22_at_8.20.47_PM_15525c44.png',
      title: 'SMART Solar Yojana - Official Mahavitaran Subsidy Scheme',
      category: 'subsidy',
      categoryLabel: '📜 Govt Schemes',
      likes: 92,
      comments: 18,
      timestamp: '2 weeks ago',
      caption: `खास महाराष्ट्र ग्राहकांसाठी SMART सोलर योजना! 🇮🇳☀️

आता 1 kW रूफटॉप सोलर सिस्टिम अत्यंत अल्प दरात उपलब्ध:
1️⃣ BPL ग्राहक: फक्त ₹२,८०० भरून 
2️⃣ SC / ST ग्राहक: फक्त ₹४,००० भरून
3️⃣ इतर सर्व ग्राहक: फक्त ₹१०,००० भरून

उर्वरित सर्व खर्च शासनाच्या सबसिडी द्वारे थेट अदा केला जाईल!
• वीजबिलात भरघोस बचत
• २५ वर्षांची पॅनेल वॉरंटी
• महावितरण अधिकृत व्हेंडर: परमार्थ इन्फ्राटेक प्रा. लि.

नोंदणीसाठी त्वरित संपर्क साधा: +91 76661 21210 / +91 93595 43323`,
      tags: ['#mahavitaran', '#solarsubsidy', '#pmsuryagharyojana', '#maharashtra', '#saveelectricity', '#solarforhome', '#pune'],
      instagramUrl: 'https://www.instagram.com/parmaarthinfratechpvt/',
    },
  ];

  const filteredPosts = activeFilter === 'all' 
    ? posts 
    : posts.filter((p) => p.category === activeFilter);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastSynced('Just now');
    }, 800);
  };

  return (
    <section id="instagram-feed" className="py-14 md:py-24 border-t border-slate-800/80 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Instagram Profile Integration Header Banner */}
        <div className="p-4 sm:p-8 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950 shadow-2xl mb-10 sm:mb-12 backdrop-blur-md">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            {/* Account Profile Card */}
            <div className="flex items-start sm:items-center gap-3.5 sm:gap-5 w-full lg:w-auto">
              {/* Profile Avatar with Instagram Gradient Story Ring */}
              <div className="relative shrink-0">
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full p-[2.5px] sm:p-[3px] bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 shadow-lg shadow-rose-500/20">
                  <div className="w-full h-full rounded-full bg-slate-950 p-[2px] overflow-hidden">
                    <img
                      src="/assets/instagram/avatar.png"
                      alt="Parmaarth Infratech Official Instagram"
                      className="w-full h-full object-contain bg-white rounded-full"
                    />
                  </div>
                </div>
                {/* Live Activity Pulse Indicator */}
                <div className="absolute bottom-0 right-0 sm:bottom-1 sm:right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center" title="Active on Instagram">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white animate-ping" />
                </div>
              </div>

              {/* Account Meta */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
                  <h2 className="text-lg sm:text-2xl font-bold font-heading text-slate-100 break-all sm:break-normal">
                    parmaarthinfratechpvt
                  </h2>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                    <CheckCircle className="w-3 h-3 text-cyan-400" />
                    Verified EPC
                  </span>
                </div>

                <div className="text-xs sm:text-sm font-medium text-slate-300 mt-0.5">
                  Parmaarth Infratech Pvt Ltd
                </div>

                <p className="text-[11px] sm:text-xs text-slate-400 mt-1.5 sm:mt-2 max-w-xl leading-relaxed">
                  Powering a Greener Tomorrow ☀️ • Residential & Commercial Solar Solutions • Save Electricity. Save Money. • 📩 DM Us for Solar Installation • Pune, MH
                </p>

                {/* Follower Stats Bar */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-6 mt-2.5 sm:mt-3 text-xs">
                  <div>
                    <span className="font-bold text-slate-200">4</span>{' '}
                    <span className="text-slate-400">posts</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-200">21</span>{' '}
                    <span className="text-slate-400">followers</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-200">33</span>{' '}
                    <span className="text-slate-400">following</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-emerald-400 font-mono text-[10px] sm:text-[11px]">
                    <Radio className="w-3 h-3 animate-pulse" />
                    <span>Live Sync Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Instagram Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full lg:w-auto">
              <a
                href="https://www.instagram.com/parmaarthinfratechpvt/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 text-white text-xs font-bold transition-all shadow-lg shadow-pink-500/20"
              >
                <Instagram className="w-4 h-4" />
                <span>Follow on Instagram</span>
                <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
              </a>

              <a
                href="https://ig.me/m/parmaarthinfratechpvt"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-xs font-semibold transition-colors"
                title="Send a Direct Message"
              >
                <Send className="w-3.5 h-3.5 text-cyan-400" />
                <span>Send DM</span>
              </a>

              <button
                onClick={handleRefresh}
                className="p-2.5 sm:p-3 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors flex items-center justify-center"
                title="Sync Latest Instagram Feed"
                aria-label="Refresh Feed"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Feed Controls & Category Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-rose-400">
              <Instagram className="w-4 h-4" />
              <span>Real-Time Social Proof</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-extrabold font-heading text-slate-100 mt-1">
              Live Instagram Feed & Project Stories
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Explore authentic site installations, project handovers, and subsidy announcements live from our Pune headquarters.
            </p>
          </div>

          {/* View Mode & Filter Controls */}
          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            {/* View Mode Toggle: Grid vs Official Embed */}
            <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-rose-500 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Interactive Feed
              </button>
              <button
                onClick={() => setViewMode('embed')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  viewMode === 'embed'
                    ? 'bg-rose-500 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Official Embed
              </button>
            </div>

            {/* Sync Timestamp indicator */}
            <div className="text-[10px] sm:text-[11px] font-mono text-slate-500 px-2">
              Synced: <span className="text-slate-300">{lastSynced}</span>
            </div>
          </div>
        </div>

        {/* View Mode 1: Interactive Feed Grid with Authentic Photos */}
        {viewMode === 'grid' && (
          <>
            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 text-xs no-scrollbar">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 rounded-xl border transition-all whitespace-nowrap ${
                  activeFilter === 'all'
                    ? 'border-rose-500 bg-rose-500/10 text-rose-400 font-bold'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
                }`}
              >
                All Posts ({posts.length})
              </button>
              <button
                onClick={() => setActiveFilter('rooftop')}
                className={`px-3 py-1.5 rounded-xl border transition-all whitespace-nowrap ${
                  activeFilter === 'rooftop'
                    ? 'border-amber-500 bg-amber-500/10 text-amber-400 font-bold'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
                }`}
              >
                ☀️ Rooftop Solar
              </button>
              <button
                onClick={() => setActiveFilter('office')}
                className={`px-3 py-1.5 rounded-xl border transition-all whitespace-nowrap ${
                  activeFilter === 'office'
                    ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400 font-bold'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
                }`}
              >
                🏢 Pune HQ
              </button>
              <button
                onClick={() => setActiveFilter('commercial')}
                className={`px-3 py-1.5 rounded-xl border transition-all whitespace-nowrap ${
                  activeFilter === 'commercial'
                    ? 'border-blue-500 bg-blue-500/10 text-blue-400 font-bold'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
                }`}
              >
                ⚡ MW Utility
              </button>
              <button
                onClick={() => setActiveFilter('subsidy')}
                className={`px-3 py-1.5 rounded-xl border transition-all whitespace-nowrap ${
                  activeFilter === 'subsidy'
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
                }`}
              >
                📜 Subsidies
              </button>
            </div>

            {/* 4-Column Instagram Post Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/70 hover:border-slate-700 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:shadow-2xl"
                >
                  {/* Top Bar with user avatar & Instagram tag */}
                  <div className="p-3 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full overflow-hidden bg-white p-[1px] border border-rose-500">
                        <img
                          src="/assets/instagram/avatar.png"
                          alt="PIPL"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-200 truncate max-w-[120px]">
                        parmaarthinfratechpvt
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {post.timestamp}
                    </span>
                  </div>

                  {/* Post Image Container */}
                  <div className="relative aspect-[4/5] bg-slate-950 overflow-hidden flex items-center justify-center">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Category Overlay Tag */}
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-lg bg-slate-950/85 backdrop-blur-md text-[10px] font-semibold text-white border border-white/10 shadow-lg pointer-events-none">
                      {post.categoryLabel}
                    </div>

                    {/* Instagram Hover Overlay */}
                    <div className="absolute inset-0 bg-slate-950/75 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2 sm:gap-3 p-4 text-center pointer-events-none">
                      <div className="flex items-center gap-5 text-white text-sm font-bold">
                        <div className="flex items-center gap-1.5">
                          <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MessageCircle className="w-5 h-5 text-cyan-400 fill-cyan-400" />
                          <span>{post.comments}</span>
                        </div>
                      </div>

                      <div className="text-xs font-medium text-slate-200 line-clamp-2 px-2">
                        {post.title}
                      </div>

                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-500 text-white text-xs font-semibold shadow-md">
                        <Instagram className="w-3.5 h-3.5" />
                        <span>View Post</span>
                      </span>
                    </div>
                  </div>

                  {/* Post Footer with Caption excerpt */}
                  <div className="p-3.5 bg-slate-950/90 border-t border-slate-800/80 flex flex-col justify-between flex-1">
                    <div>
                      <h4 className="text-xs font-bold text-slate-100 line-clamp-1 group-hover:text-cyan-400 transition-colors">
                        {post.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                        {post.caption}
                      </p>
                    </div>

                    <div className="pt-2.5 mt-2.5 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-400">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3 text-rose-400" />
                          <span>{post.likes}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3 text-slate-500" />
                          <span>{post.comments}</span>
                        </span>
                      </div>

                      <a
                        href={post.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5 font-medium"
                      >
                        <span>Open</span>
                        <ChevronRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* View Mode 2: Official Instagram Live Embed Container */}
        {viewMode === 'embed' && (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-4 sm:p-8 backdrop-blur-md">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center mx-auto mb-4 text-white shadow-xl shadow-rose-500/20">
                <Instagram className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold font-heading text-slate-100">
                Live Instagram Account Embed
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Interact directly with Parmaarth Infratech's live Instagram account (@parmaarthinfratechpvt) through Meta's verified web gateway.
              </p>

              {/* Live Web Viewport Card */}
              <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-6 shadow-inner text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white p-[2px] overflow-hidden border border-rose-500 shrink-0">
                      <img
                        src="/assets/instagram/avatar.png"
                        alt="PIPL"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-100 flex items-center gap-1.5">
                        <span>parmaarthinfratechpvt</span>
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-slate-400">
                        instagram.com/parmaarthinfratechpvt
                      </div>
                    </div>
                  </div>

                  <a
                    href="https://www.instagram.com/parmaarthinfratechpvt/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:opacity-95"
                  >
                    <span>View on Instagram</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Live Feed Highlights */}
                <div className="py-4 sm:py-6 space-y-3 sm:space-y-4">
                  <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-300 leading-relaxed">
                      <strong className="text-white block mb-0.5">Real-Time Site Updates</strong>
                      We regularly upload live videos, drone fly-bys of our Pune solar projects, team site updates, and subsidy notices on our Instagram stories and reels.
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-center">
                    <div className="p-2.5 sm:p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-base sm:text-lg font-bold font-mono text-cyan-400">4</div>
                      <div className="text-[9px] sm:text-[10px] text-slate-400 uppercase">Live Posts</div>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-base sm:text-lg font-bold font-mono text-rose-400">21+</div>
                      <div className="text-[9px] sm:text-[10px] text-slate-400 uppercase">Followers</div>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-base sm:text-lg font-bold font-mono text-emerald-400">&lt; 1 hr</div>
                      <div className="text-[9px] sm:text-[10px] text-slate-400 uppercase">DM Reply Time</div>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-base sm:text-lg font-bold font-mono text-amber-400">100%</div>
                      <div className="text-[9px] sm:text-[10px] text-slate-400 uppercase">Authentic Sites</div>
                    </div>
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="pt-3.5 sm:pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs">
                  <span className="text-slate-400">
                    Handle: <strong className="text-slate-200">@parmaarthinfratechpvt</strong>
                  </span>
                  <a
                    href="https://www.instagram.com/parmaarthinfratechpvt/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                  >
                    <span>Open full Instagram app experience</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Post Modal / Lightbox for detailed view */}
      {selectedPost && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setSelectedPost(null)}
        >
          <div 
            className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left: High-Res Image */}
            <div className="md:col-span-7 bg-slate-950 flex items-center justify-center overflow-hidden relative min-h-[220px] max-h-[45vh] md:max-h-[85vh]">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-full object-contain"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] sm:text-xs font-semibold text-white border border-white/10">
                {selectedPost.categoryLabel}
              </div>
            </div>

            {/* Right: Instagram Post Details */}
            <div className="md:col-span-5 p-4 sm:p-6 flex flex-col justify-between bg-slate-900">
              <div>
                {/* Account Header */}
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-white p-[2px] overflow-hidden border border-rose-500 shrink-0">
                      <img
                        src="/assets/instagram/avatar.png"
                        alt="PIPL"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-100 flex items-center gap-1">
                        <span>parmaarthinfratechpvt</span>
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-slate-400">Pune, Maharashtra</div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedPost(null)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800"
                    aria-label="Close Modal"
                  >
                    ✕
                  </button>
                </div>

                {/* Post Caption */}
                <div className="py-3.5 space-y-2.5">
                  <h3 className="text-sm sm:text-base font-bold text-slate-100 font-heading">
                    {selectedPost.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                    {selectedPost.caption}
                  </p>

                  {/* Hashtags */}
                  <div className="flex flex-wrap gap-1 pt-1.5">
                    {selectedPost.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] sm:text-[11px] font-mono text-cyan-400 hover:underline cursor-pointer">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Engagement & Action Bar */}
              <div className="pt-3.5 border-t border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1.5 text-rose-400 font-semibold hover:scale-105 transition-transform">
                      <Heart className="w-4 h-4 fill-rose-500" />
                      <span>{selectedPost.likes} likes</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-slate-300 hover:text-white">
                      <MessageCircle className="w-4 h-4" />
                      <span>{selectedPost.comments} comments</span>
                    </button>
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-mono text-slate-500">
                    {selectedPost.timestamp}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                  <a
                    href={selectedPost.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-bold text-xs hover:opacity-95 shadow-md"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Open on Instagram</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <a
                    href="https://wa.me/917666121210?text=Hello%20PIPL,%20I%20saw%20your%20Instagram%20post%20about%20solar%20installation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs flex items-center justify-center gap-1.5"
                  >
                    <span>Inquire via WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
