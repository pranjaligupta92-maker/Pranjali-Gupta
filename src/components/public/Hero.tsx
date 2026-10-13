import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, ShieldCheck, CheckCircle2, Building2, Users } from 'lucide-react';

interface HeroProps {
  onExploreCategories: () => void;
  onHireTalent: () => void;
  onRequestAccess: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCategories,
  onHireTalent,
  onRequestAccess,
}) => {
  const { candidates } = useApp();

  return (
    <section className="relative bg-slate-950 text-white overflow-hidden border-b border-slate-800">
      {/* Background Gradient & Pattern */}
      <div className="absolute inset-0 bg-radial-at-t from-slate-900/60 via-slate-950 to-slate-950 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Proposition and Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-950/40 border border-amber-500/30 px-3 py-1 rounded-sm">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>India &amp; International Recruitment Consultancy</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-tight" style={{ textWrap: 'balance' }}>
              Connecting Great Talent with Great Opportunities.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              HM Consultant connects verified job seekers with authorized five-star luxury hotel chains, fine-dining restaurants, engineering infrastructure conglomerates, and corporate leadership teams across India and international markets.
            </p>

            {/* Strict CTA discipline: Clean outcome-focused actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onHireTalent}
                className="px-6 py-3.5 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-md flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Hire Talent</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreCategories}
                className="px-5 py-3.5 text-sm font-semibold text-white bg-slate-800/90 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Explore Categories
              </button>

              <button
                onClick={onRequestAccess}
                className="px-5 py-3.5 text-sm font-semibold text-amber-300 hover:text-amber-200 hover:bg-amber-400/10 border border-amber-400/30 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Request Candidate Access
              </button>
            </div>

            {/* Vetted points */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-y-2 gap-x-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Admin-vetted credentials &amp; verified CVs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>DPDP Act 2023 &amp; Indian Privacy Compliance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>FSSAI &amp; CEA Certified Technical Specialists</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero High-Fidelity Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 group">
              <img
                src="/src/assets/images/hero_recruitment_1791891177218.jpg"
                alt="HM Consultant executive recruitment consultation boardroom in India"
                className="w-full h-[400px] lg:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none"></div>
              
              {/* Floating Vetted Badge on Image */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-4 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-white">Confidential Executive Search India</p>
                  <p className="text-slate-400 text-[11px]">Mumbai · Delhi NCR · Bengaluru · Goa · Pan-India</p>
                </div>
                <div className="text-right">
                  <span className="font-mono tabular-nums text-amber-400 font-bold text-base">
                    {candidates.length > 0 ? `${candidates.length}+` : '100%'}
                  </span>
                  <p className="text-[10px] text-slate-400">Active Profiles</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Full-width 4-Column Proof & KPI Strip below Hero */}
        <div className="mt-16 pt-10 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800/60">
            <div className="text-3xl font-extrabold font-mono tabular-nums text-amber-400">4,850+</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Pre-Screened Candidates</div>
          </div>
          <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800/60">
            <div className="text-3xl font-extrabold font-mono tabular-nums text-white">98.4%</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Placement Retention Rate</div>
          </div>
          <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800/60">
            <div className="text-3xl font-extrabold font-mono tabular-nums text-amber-400">240+</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Partner Hotels &amp; Enterprises</div>
          </div>
          <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800/60">
            <div className="text-3xl font-extrabold font-mono tabular-nums text-white">&lt; 48 hrs</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Average Shortlist Turnaround</div>
          </div>
        </div>

      </div>
    </section>
  );
};
