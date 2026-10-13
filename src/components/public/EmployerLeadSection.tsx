import React from 'react';
import { useApp } from '../../context/AppContext';
import { Building, ShieldCheck, FileText, CalendarCheck, ArrowRight, UserPlus, Sparkles } from 'lucide-react';

interface EmployerLeadSectionProps {
  onRequestEmployerAccess: () => void;
  onOpenEmployerLogin: () => void;
}

export const EmployerLeadSection: React.FC<EmployerLeadSectionProps> = ({
  onRequestEmployerAccess,
  onOpenEmployerLogin
}) => {
  return (
    <section id="employers" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-100/60 border border-amber-300 px-3 py-1 rounded-sm mb-3">
            <Building className="w-3.5 h-3.5" />
            <span>Enterprise &amp; Hospitality Hiring Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 tracking-tight">
            Employers: Hire Verified Elite Talent
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Partner with HM Consultant to access pre-screened talent across five-star hospitality, specialized engineering, and corporate management. Streamline your recruitment with confidential, authorized access.
          </p>
        </div>

        {/* Feature Triad / Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="p-3 w-12 h-12 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Category-Governed Access</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our admin provisions permissions according to your specific sector need—whether you require only luxury culinary staff, facilities engineering, or executive directors.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-500">
              Zero unauthorized exposure of other departments.
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="p-3 w-12 h-12 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Verified Documents &amp; CVs</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Inspect authentic degrees, FSSAI FoSTaC food safety certificates, CEA/BEE engineering licenses, and verified previous experience letters in our secure in-portal viewer.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-500">
              Audit-logged document inspections.
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="p-3 w-12 h-12 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Shortlist &amp; Interview Requests</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Build curated company candidate shortlists and submit interview requests directly through the portal with preferred interview dates and hiring requirements.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-500">
              Dedicated HM Consultant account manager support.
            </div>
          </div>

        </div>

        {/* Lead Capture Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Verified Corporate Access
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Request Your Company Hiring Account
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every employer account is manually reviewed by our compliance team to ensure legitimate vacancies and maintain candidate confidentiality.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0 justify-center">
            <button
              onClick={onRequestEmployerAccess}
              className="px-6 py-3.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <UserPlus className="w-4 h-4" />
              <span>Request Employer Access</span>
            </button>
            <button
              onClick={onOpenEmployerLogin}
              className="px-6 py-3.5 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <span>Employer Portal Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
