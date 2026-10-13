import React from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Lock, FileText, CheckCircle, ExternalLink, Globe } from 'lucide-react';

interface FooterProps {
  setActiveView: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveView }) => {
  const { settings, openLegalModal, openAuthModal } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center font-bold font-display text-sm border border-amber-500/30">
                HM
              </div>
              <span className="text-lg font-bold font-display text-white tracking-tight">
                HM Consultant
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Executive search &amp; recruitment consultancy for luxury hospitality, hotels, F&amp;B, engineering, and corporate operations across India and international markets.
            </p>
            <div className="text-[11px] text-slate-400 space-y-1">
              <p>Registered Entity · Corporate Affairs &amp; MSME / Startup India Registered</p>
              <p className="text-slate-400 font-mono">Domain: {settings.websiteDomain}</p>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Platform
            </p>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveView('home')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('industries')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Industries We Serve
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('categories')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Browse Talent Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('employers')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Hire Talent / Employers
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('candidates')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Candidate Registration Info
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('about')}
                  className="hover:text-amber-400 transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('contact')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Portals & Security */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Protected Portals
            </p>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => { setActiveView('candidate_portal'); openAuthModal('candidate'); }}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <Lock className="w-3 h-3 text-amber-500" />
                  <span>Candidate Portal</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveView('employer_portal'); openAuthModal('employer'); }}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <Lock className="w-3 h-3 text-amber-500" />
                  <span>Employer / HR Portal</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveView('admin_portal'); openAuthModal('admin'); }}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <Shield className="w-3 h-3 text-amber-500" />
                  <span>Admin Dashboard</span>
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => openLegalModal('seo_guide')}
                  className="text-[11px] text-amber-300 hover:underline flex items-center gap-1"
                >
                  <Globe className="w-3 h-3" />
                  <span>SEO &amp; Search Console Setup</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Legal &amp; Privacy
            </p>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => openLegalModal('privacy')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Privacy Policy (DPDP Act, 2023)
                </button>
              </li>
              <li>
                <button
                  onClick={() => openLegalModal('terms')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Terms and Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => openLegalModal('consent')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Candidate Data Consent &amp; Disclaimer
                </button>
              </li>
              <li className="pt-2 text-[11px] text-slate-400 leading-normal">
                Data protection compliant with the Digital Personal Data Protection Act, 2023 (DPDP Act, India).
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© 2026 HM Consultant India. All rights reserved. Professional recruitment consultancy.</p>
          <div className="flex items-center gap-4">
            <span>Mumbai · Delhi NCR · Bengaluru · Pan-India · International</span>
            <span>·</span>
            <span>Confidential Executive Recruitment</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
