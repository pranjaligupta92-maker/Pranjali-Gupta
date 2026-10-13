import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, KeyRound, FileCheck, Send, Lock, Phone, Mail, MessageSquare, ArrowRight } from 'lucide-react';

interface CandidateRegistrationGuideProps {
  onRequestUploadAccess: () => void;
  onOpenCandidateLogin: () => void;
}

export const CandidateRegistrationGuide: React.FC<CandidateRegistrationGuideProps> = ({
  onRequestUploadAccess,
  onOpenCandidateLogin
}) => {
  const { settings, openLegalModal } = useApp();

  return (
    <section id="candidates" className="py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-950/40 border border-amber-500/30 px-3 py-1 rounded-sm mb-3">
            <Lock className="w-3.5 h-3.5" />
            <span>Invitation-Only Talent Registry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            Candidate Registration Information
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            To ensure exceptional placement standards and protect candidate privacy, HM Consultant maintains a strictly vetted, confidential database. Candidates cannot self-publish CVs to the public web.
          </p>
        </div>

        {/* 4-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/80 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold mb-4 font-mono">
                01
              </div>
              <h3 className="text-base font-bold text-white mb-2">Ask Admin or Login</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ask the admin to upload your CV directly by submitting your target position and attaching your CV, or log in with your credentials.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-700/50 text-[11px] text-slate-400">
              No complex forms or lengthy details.
            </div>
          </div>

          <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/80 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold mb-4 font-mono">
                02
              </div>
              <h3 className="text-base font-bold text-white mb-2">Admin Credentials</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Our executive team verifies your profile and issues an individual username and secure password for your portal.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-700/50 text-[11px] text-slate-400">
              Only authorized candidates receive access.
            </div>
          </div>

          <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/80 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold mb-4 font-mono">
                03
              </div>
              <h3 className="text-base font-bold text-white mb-2">Quick CV Upload</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                In the candidate portal, simply type your target position, attach your PDF file, and click upload. That’s all.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-700/50 text-[11px] text-slate-400">
              Instant position &amp; PDF attachment.
            </div>
          </div>

          <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/80 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold mb-4 font-mono">
                04
              </div>
              <h3 className="text-base font-bold text-white mb-2">Direct Employer Inquiries</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Only approved hiring partners with verified accounts can view your profile, shortlist your credentials, and request interview sessions.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-700/50 text-[11px] text-slate-400">
              Full consent control under India's DPDP Act, 2023.
            </div>
          </div>

        </div>

        {/* Action Panel with Clear Placeholders */}
        <div className="bg-gradient-to-r from-slate-850 to-slate-800 rounded-2xl border border-slate-700 p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center lg:text-left">
            <h3 className="text-2xl font-bold font-display text-white">
              Ready to Join HM Consultant’s Private Roster?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Submit your candidate access request today. If you already have temporary login credentials from our recruitment team, sign in directly below.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 justify-center lg:justify-start text-xs text-slate-400">
              <button
                onClick={() => openLegalModal('consent')}
                className="underline hover:text-amber-300 cursor-pointer"
              >
                Candidate Data Consent &amp; Disclaimer Notice
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0 justify-center">
            <button
              onClick={onRequestUploadAccess}
              className="px-6 py-3.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <span>Request Upload Access</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenCandidateLogin}
              className="px-6 py-3.5 text-xs font-bold text-white bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <KeyRound className="w-4 h-4 text-amber-400" />
              <span>Candidate Portal Login</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
