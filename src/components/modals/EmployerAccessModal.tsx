import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Building, CheckCircle2, Send, ShieldCheck, Mail, KeyRound } from 'lucide-react';

export const EmployerAccessModal: React.FC = () => {
  const { isEmployerAccessModalOpen, closeEmployerAccessModal, registerEmployer, submitAccessRequest, industries } = useApp();

  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    password: '',
    phone: '',
    industryInterest: industries[0]?.name || 'Hospitality & Hotels',
    immediateOpenings: 'Executive Roles (1-3 positions)',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [issuedEmployerId, setIssuedEmployerId] = useState('');

  if (!isEmployerAccessModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.email) return;

    // Register employer account with password & notification to admin@hmhire.in
    const regRes = registerEmployer({
      companyName: formData.companyName,
      contactPerson: formData.contactPerson,
      email: formData.email,
      password: formData.password || 'Employer@2026',
      phone: formData.phone
    });

    submitAccessRequest({
      type: 'employer',
      name: formData.contactPerson,
      companyName: formData.companyName,
      email: formData.email,
      phone: formData.phone,
      desiredRoleOrIndustry: formData.industryInterest,
      notes: `Password set. Openings: ${formData.immediateOpenings}. Notes: ${formData.notes}`
    });

    setIssuedEmployerId(regRes.employerId);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-amber-400" />
            <h3 className="text-base font-bold font-display text-white">
              Request Employer Portal Access
            </h3>
          </div>
          <button
            onClick={() => { closeEmployerAccessModal(); setSubmitted(false); }}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="py-6 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 font-display">
                Employer Registration Submitted
              </h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you! A notification has been sent to our registered admin email (<span className="font-mono font-semibold text-slate-900">admin@hmhire.in</span>).
              </p>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg max-w-sm mx-auto text-left text-xs">
                <p className="text-[11px] text-slate-500">Your Generated Employer ID:</p>
                <p className="font-mono font-bold text-slate-900 text-sm">{issuedEmployerId || 'EMP-2026-PENDING'}</p>
                <p className="text-[11px] text-slate-600 mt-1">
                  Once our administration approves your account, log in with your email (<span className="font-medium text-slate-800">{formData.email}</span>) and password to immediately review all CVs.
                </p>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => { closeEmployerAccessModal(); setSubmitted(false); }}
                  className="px-5 py-2 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-lg text-slate-700 flex items-start gap-2">
                <Mail className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Enter your organization details and desired password. A verification notification will be sent to our registered admin email (<span className="font-mono font-semibold text-slate-900">admin@hmhire.in</span>). Upon approval, you can log in to review all CVs.
                </span>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Company / Organization Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Taj Group / Oberoi Hotels / ITC Hotels"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Contact Representative Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Sen (VP Talent)"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Official Business Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="a.sen@tajhotels.in"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Portal Login Password *</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone / WhatsApp *</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 22 0000 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Hiring Roles / Notes</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Looking for Executive Chef, Restaurant Managers, and Duty Managers in India."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white text-slate-900"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Candidate data accessed through the employer portal remains strictly confidential and non-transferable under India's Digital Personal Data Protection Act, 2023.
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Employer Registration &amp; Notify Admin</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
