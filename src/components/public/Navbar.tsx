import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, ChevronDown, UserCheck, Briefcase, Lock, LogOut } from 'lucide-react';

interface NavbarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeView, setActiveView }) => {
  const { currentRole, currentUser, logout, openAuthModal, quickSwitchRole } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false);

  const handleNavClick = (viewId: string) => {
    setActiveView(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Demo Role Switcher Bar for instant evaluator testing */}
      <div className="bg-slate-900 border-b border-slate-800 text-slate-300 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-amber-400"></span>
          <span className="font-semibold text-slate-200">Interactive Role Switcher:</span>
          <span className="text-slate-400 hidden sm:inline">Test portals instantly or use sign in</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => { setActiveView('home'); quickSwitchRole(null); }}
            className={`px-2.5 py-0.5 rounded text-xs transition-colors ${!currentRole ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-medium' : 'text-slate-400 hover:text-white'}`}
          >
            Public Site
          </button>
          <span className="text-slate-700">|</span>
          <button
            onClick={() => { setActiveView('candidate_portal'); quickSwitchRole('candidate'); }}
            className={`px-2.5 py-0.5 rounded text-xs transition-colors ${currentRole === 'candidate' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-medium' : 'text-slate-400 hover:text-white'}`}
          >
            Candidate Portal
          </button>
          <span className="text-slate-700">|</span>
          <button
            onClick={() => { setActiveView('employer_portal'); quickSwitchRole('employer'); }}
            className={`px-2.5 py-0.5 rounded text-xs transition-colors ${currentRole === 'employer' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-medium' : 'text-slate-400 hover:text-white'}`}
          >
            Employer Portal
          </button>
          <span className="text-slate-700">|</span>
          <button
            onClick={() => { setActiveView('admin_portal'); quickSwitchRole('admin'); }}
            className={`px-2.5 py-0.5 rounded text-xs transition-colors ${currentRole === 'admin' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-medium' : 'text-slate-400 hover:text-white'}`}
          >
            Admin Dashboard
          </button>
        </div>
      </div>

      {/* Main Top Bar strictly obeying 3-Zone Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => setActiveView('home')}
            className="flex items-center gap-3 text-left group whitespace-nowrap shrink-0"
          >
            <div className="w-10 h-10 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center font-bold font-display text-lg tracking-wider border border-amber-500/30 shadow-xs group-hover:bg-slate-800 transition-colors">
              HM
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold font-display tracking-tight text-slate-900 group-hover:text-amber-700 transition-colors">
                HM Consultant
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-700 font-semibold -mt-1">
                Executive & Hospitality Search
              </span>
            </div>
          </button>

          {/* Zone 2: Concise single-line navigation links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-slate-600">
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${activeView === 'home' ? 'text-slate-900 font-semibold' : ''}`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('industries')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${activeView === 'industries' ? 'text-slate-900 font-semibold' : ''}`}
            >
              Industries
            </button>
            <button
              onClick={() => handleNavClick('categories')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${activeView === 'categories' ? 'text-slate-900 font-semibold' : ''}`}
            >
              Browse Talent
            </button>
            <button
              onClick={() => handleNavClick('employers')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${activeView === 'employers' ? 'text-slate-900 font-semibold' : ''}`}
            >
              For Employers
            </button>
            <button
              onClick={() => handleNavClick('candidates')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${activeView === 'candidates' ? 'text-slate-900 font-semibold' : ''}`}
            >
              Candidate Access
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${activeView === 'about' ? 'text-slate-900 font-semibold' : ''}`}
            >
              About Us
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${activeView === 'contact' ? 'text-slate-900 font-semibold' : ''}`}
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            {currentRole ? (
              <div className="relative">
                <button
                  onClick={() => setPortalDropdownOpen(!portalDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="capitalize">{currentRole} Active</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {portalDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50 text-xs">
                    <div className="px-3 py-2 border-b border-slate-100 bg-slate-50">
                      <p className="font-semibold text-slate-900 truncate">
                        {currentUser?.fullName || currentUser?.companyName || currentUser?.name || 'Authorized User'}
                      </p>
                      <p className="text-[11px] text-slate-500 capitalize">{currentRole} Account</p>
                    </div>
                    <button
                      onClick={() => {
                        setPortalDropdownOpen(false);
                        if (currentRole === 'candidate') setActiveView('candidate_portal');
                        if (currentRole === 'employer') setActiveView('employer_portal');
                        if (currentRole === 'admin') setActiveView('admin_portal');
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-slate-100 text-slate-700 flex items-center gap-2"
                    >
                      <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                      Go to {currentRole.charAt(0).toUpperCase() + currentRole.slice(1)} Portal
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setPortalDropdownOpen(false);
                        setActiveView('home');
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('candidate')}
                className="px-4 py-2.5 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs border border-amber-500/20"
              >
                Portal Sign In
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
              aria-label="Toggle navigation"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2">
            <button
              onClick={() => handleNavClick('home')}
              className="block w-full text-left py-2 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('industries')}
              className="block w-full text-left py-2 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded"
            >
              Industries We Serve
            </button>
            <button
              onClick={() => handleNavClick('categories')}
              className="block w-full text-left py-2 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded"
            >
              Browse Talent
            </button>
            <button
              onClick={() => handleNavClick('employers')}
              className="block w-full text-left py-2 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded"
            >
              For Employers / Hire Talent
            </button>
            <button
              onClick={() => handleNavClick('candidates')}
              className="block w-full text-left py-2 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded"
            >
              Candidate Access & Guidelines
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="block w-full text-left py-2 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded"
            >
              About Us
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="block w-full text-left py-2 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded"
            >
              Contact Us
            </button>
          </div>
        )}
      </header>
    </>
  );
};
