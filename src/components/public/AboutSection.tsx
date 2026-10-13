import React from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Award, Globe, Users, CheckCircle } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { openLegalModal } = useApp();

  return (
    <section id="about" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
          
          <div className="lg:col-span-6 space-y-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              Corporate Heritage &amp; Ethos
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 tracking-tight leading-tight">
              A Specialized Recruitment Consultancy Built on Trust &amp; Discretion
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Founded to meet the exacting standards of luxury hotel chains, heritage palaces, fine-dining restaurants, and mission-critical engineering firms across India and overseas, HM Consultant operates as a confidential talent bridge.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Unlike generic public job portals that commoditize resumes, we preserve candidate dignity and organizational privacy through an invitation-only architecture. Every candidate on our roster is personally evaluated, verified under Indian regulatory standards (FSSAI, CEA, AICTE, and Indian Labour Codes), and represented with utmost care.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs">
              <button
                onClick={() => openLegalModal('privacy')}
                className="text-amber-700 hover:text-amber-800 font-semibold underline cursor-pointer"
              >
                Digital Personal Data Protection Act (DPDP Act, 2023) Notice &rarr;
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <Globe className="w-6 h-6 text-amber-600 mb-3" />
                <h4 className="text-base font-bold text-slate-900 mb-1">Pan-India &amp; Global Corridors</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Headquartered in India with active recruitment pipelines spanning Mumbai, Delhi NCR, Bengaluru, Hyderabad, Goa, and international hospitality hubs.
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <Award className="w-6 h-6 text-amber-600 mb-3" />
                <h4 className="text-base font-bold text-slate-900 mb-1">Sector Specialists</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Led by former luxury five-star hotel general managers and senior infrastructure directors who understand operational requirements firsthand.
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <Shield className="w-6 h-6 text-amber-600 mb-3" />
                <h4 className="text-base font-bold text-slate-900 mb-1">Rigorous Vetting</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every CV undergoes four validation checkpoints including FSSAI food safety audit and technical credential scrutiny before employer presentation.
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <Users className="w-6 h-6 text-amber-600 mb-3" />
                <h4 className="text-base font-bold text-slate-900 mb-1">Bespoke Shortlists</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Zero automated resume blasting. We deliver targeted, high-relevance matches aligned to corporate culture and statutory requirements.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Stage Vetting Methodology */}
        <div className="border-t border-slate-200 pt-12">
          <div className="max-w-2xl mb-8">
            <h3 className="text-xl font-bold font-display text-slate-900">
              Our 4-Stage Screening Protocol
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Ensuring candidate authenticity, technical certifications, and statutory readiness prior to employer introduction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-4 border-l-2 border-amber-500 pl-4">
              <span className="text-xs font-mono font-bold text-amber-600">STAGE 01</span>
              <h4 className="text-sm font-bold text-slate-900 mt-1 mb-1">Identity &amp; Background Verification</h4>
              <p className="text-xs text-slate-600">Verification of national identification (Aadhaar / Passport / PAN) and employment history.</p>
            </div>

            <div className="p-4 border-l-2 border-amber-500 pl-4">
              <span className="text-xs font-mono font-bold text-amber-600">STAGE 02</span>
              <h4 className="text-sm font-bold text-slate-900 mt-1 mb-1">Technical &amp; Statutory Credentials</h4>
              <p className="text-xs text-slate-600">Audit of culinary degrees (NCHMCT / IHM), FSSAI FoSTaC awards, CEA electrical licenses, and engineering diplomas.</p>
            </div>

            <div className="p-4 border-l-2 border-amber-500 pl-4">
              <span className="text-xs font-mono font-bold text-amber-600">STAGE 03</span>
              <h4 className="text-sm font-bold text-slate-900 mt-1 mb-1">Reference Verification</h4>
              <p className="text-xs text-slate-600">Confidential check-ins with previous hotel general managers, corporate executive chefs, or technical directors.</p>
            </div>

            <div className="p-4 border-l-2 border-amber-500 pl-4">
              <span className="text-xs font-mono font-bold text-amber-600">STAGE 04</span>
              <h4 className="text-sm font-bold text-slate-900 mt-1 mb-1">DPDP Act Consent &amp; Authorization</h4>
              <p className="text-xs text-slate-600">Explicit digital consent obtained before candidate documents are shared with verified employer organizations.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
