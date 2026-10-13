import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Shield, Building, User, KeyRound, AlertCircle, CheckCircle2, UserPlus, LogIn, Mail } from 'lucide-react';

interface AuthModalProps {
  onSuccess: (role: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onSuccess }) => {
  const { isAuthModalOpen, closeAuthModal, authModalTab, login, registerEmployer } = useApp();
  
  const [activeTab, setActiveTab] = useState<'candidate' | 'employer' | 'admin'>(authModalTab || 'candidate');
  
  // Employer sub-mode: login or register
  const [employerMode, setEmployerMode] = useState<'login' | 'register'>('login');
  
  // Login form state
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  
  // Employer registration form state
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [employerRegEmail, setEmployerRegEmail] = useState('');
  const [employerRegPassword, setEmployerRegPassword] = useState('');
  const [employerRegPhone, setEmployerRegPhone] = useState('');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Sync tab if opened with specific tab
  React.useEffect(() => {
    if (authModalTab) {
      setActiveTab(authModalTab);
      setErrorMsg('');
      setSuccessMsg('');
    }
  }, [authModalTab]);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    setTimeout(() => {
      const res = login(activeTab, identifier, password);
      setIsLoading(false);
      if (res.success) {
        closeAuthModal();
        onSuccess(activeTab);
      } else {
        setErrorMsg(res.error || 'Authentication failed. Please verify credentials.');
      }
    }, 250);
  };

  const handleEmployerRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!companyName.trim() || !employerRegEmail.trim() || !employerRegPassword.trim()) {
      setErrorMsg('Please complete company name, email, and password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = registerEmployer({
        companyName: companyName.trim(),
        contactPerson: contactPerson.trim() || 'Hiring Manager',
        email: employerRegEmail.trim(),
        password: employerRegPassword.trim(),
        phone: employerRegPhone.trim() || '+91 22 0000 0000'
      });
      setIsLoading(false);

      if (res.success) {
        setSuccessMsg(res.message);
        // Pre-fill login identifier
        setIdentifier(employerRegEmail.trim());
        setPassword(employerRegPassword.trim());
        setEmployerMode('login');
      } else {
        setErrorMsg(res.message);
      }
    }, 300);
  };

  const fillDemoCredentials = (role: 'candidate' | 'employer' | 'admin') => {
    setActiveTab(role);
    setEmployerMode('login');
    setErrorMsg('');
    setSuccessMsg('');
    if (role === 'candidate') {
      setIdentifier('candidate@hmhire.in');
      setPassword('Candidate@2026');
    } else if (role === 'employer') {
      setIdentifier('employer@hmhire.in');
      setPassword('Employer@2026');
    } else if (role === 'admin') {
      setIdentifier('admin@hmhire.in');
      setPassword('Admin@2026');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Top Banner */}
        <div className="px-6 pt-5 pb-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-800 text-amber-400 flex items-center justify-center font-bold font-display text-sm border border-amber-400/30">
              HM
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">HM Consultant Portals</h3>
              <p className="text-[11px] text-slate-400">Secure Authorized Authentication (India)</p>
            </div>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold">
          <button
            onClick={() => { setActiveTab('candidate'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`flex-1 py-3 px-2 text-center transition-colors border-b-2 cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'candidate'
                ? 'border-amber-500 text-slate-900 bg-white font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Candidate</span>
          </button>
          <button
            onClick={() => { setActiveTab('employer'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`flex-1 py-3 px-2 text-center transition-colors border-b-2 cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'employer'
                ? 'border-amber-500 text-slate-900 bg-white font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Employer</span>
          </button>
          <button
            onClick={() => { setActiveTab('admin'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`flex-1 py-3 px-2 text-center transition-colors border-b-2 cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'admin'
                ? 'border-amber-500 text-slate-900 bg-white font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          
          {/* Quick Demo Pre-fill Pill Bar */}
          <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200/60 text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-semibold text-amber-900">1-Click Test Credentials:</span>
              <span className="text-[10px] text-amber-700 font-mono">Demo accounts ready</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => fillDemoCredentials('candidate')}
                className="px-2 py-1 text-[11px] font-medium bg-white hover:bg-amber-100 text-slate-800 border border-amber-300 rounded transition-colors cursor-pointer"
              >
                Demo Candidate
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials('employer')}
                className="px-2 py-1 text-[11px] font-medium bg-white hover:bg-amber-100 text-slate-800 border border-amber-300 rounded transition-colors cursor-pointer"
              >
                Demo Employer
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials('admin')}
                className="px-2 py-1 text-[11px] font-medium bg-white hover:bg-amber-100 text-slate-800 border border-amber-300 rounded transition-colors cursor-pointer"
              >
                Demo Admin
              </button>
            </div>
          </div>

          {/* Messages */}
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold">{successMsg}</p>
                <p className="text-[11px] text-emerald-700">
                  Notification sent to registered admin email (<span className="font-mono">admin@hmhire.in</span>). Log in with your email and password once approved.
                </p>
              </div>
            </div>
          )}

          {/* Employer Sub Mode Switcher (Login vs Register) */}
          {activeTab === 'employer' && (
            <div className="flex bg-slate-100 p-1 rounded-lg text-xs font-semibold">
              <button
                type="button"
                onClick={() => { setEmployerMode('login'); setErrorMsg(''); setSuccessMsg(''); }}
                className={`flex-1 py-1.5 rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  employerMode === 'login'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Employer Sign In</span>
              </button>
              <button
                type="button"
                onClick={() => { setEmployerMode('register'); setErrorMsg(''); setSuccessMsg(''); }}
                className={`flex-1 py-1.5 rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  employerMode === 'register'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Register (Send Approval)</span>
              </button>
            </div>
          )}

          {/* Mode 1: Employer Registration Flow */}
          {activeTab === 'employer' && employerMode === 'register' ? (
            <form onSubmit={handleEmployerRegisterSubmit} className="space-y-3">
              <div className="p-2.5 bg-blue-50/70 border border-blue-200/60 rounded-lg text-[11px] text-blue-900 flex items-start gap-2">
                <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  Submit your company details and credentials. An automated notification will be sent to our registered admin email (<span className="font-mono font-semibold">admin@hmhire.in</span>) for verification. Once approved, you can log in to review all CVs.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Company / Organization Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ITC Hotels / The Taj Group / Oberoi"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contact Person / Representative *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sen (VP Hiring)"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Official Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. hiring@company.in"
                  value={employerRegEmail}
                  onChange={(e) => setEmployerRegEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Create Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={employerRegPassword}
                  onChange={(e) => setEmployerRegPassword(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone / WhatsApp (Optional)
                </label>
                <input
                  type="text"
                  placeholder="+91 98200 12345"
                  value={employerRegPhone}
                  onChange={(e) => setEmployerRegPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white text-slate-900"
                />
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{isLoading ? 'Submitting & Notifying...' : 'Submit Registration & Send Notification'}</span>
                </button>
              </div>
            </form>
          ) : (
            /* Mode 2: Standard Login Form */
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {activeTab === 'candidate' ? 'Email or Username' : 'Registered Business Email'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    activeTab === 'candidate'
                      ? 'candidate@hmhire.in'
                      : activeTab === 'employer'
                      ? 'employer@hmhire.in'
                      : 'admin@hmhire.in'
                  }
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white text-slate-900"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Password
                  </label>
                  {activeTab === 'candidate' && (
                    <span className="text-[11px] text-slate-400">Issued by Admin</span>
                  )}
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white text-slate-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>{isLoading ? 'Authenticating...' : `Sign In to ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Portal`}</span>
                </button>
              </div>

              {activeTab === 'employer' && (
                <div className="pt-1 text-center">
                  <button
                    type="button"
                    onClick={() => { setEmployerMode('register'); setErrorMsg(''); setSuccessMsg(''); }}
                    className="text-xs text-amber-700 hover:text-amber-800 font-semibold hover:underline cursor-pointer"
                  >
                    Don't have an approved account? Register here &rarr;
                  </button>
                </div>
              )}
            </form>
          )}

          {/* Context notice */}
          <div className="pt-2 text-[11px] text-slate-400 text-center leading-normal border-t border-slate-100">
            {activeTab === 'candidate' && (
              <p>Candidates can upload their CV and specify target position directly after signing in.</p>
            )}
            {activeTab === 'employer' && (
              <p>Employer accounts are verified by HM Consultant administration before granting access to candidate CVs.</p>
            )}
            {activeTab === 'admin' && (
              <p>Restricted to HM Consultant authorized recruitment administrators.</p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
