import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CandidateDocument, CandidateProfile, EmployerAccount, IndustryCategory } from '../../types';
import { DocumentViewerModal } from '../shared/DocumentViewerModal';
import {
  Shield,
  Users,
  Building,
  FolderTree,
  FileCheck,
  Settings,
  History,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Search,
  Download,
  KeyRound,
  Eye,
  LogOut,
  Folder,
  Send,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const {
    currentRole,
    currentUser,
    industries,
    candidates,
    employers,
    accessRequests,
    interviewRequests,
    auditLogs,
    settings,
    logout,
    addIndustry,
    updateIndustry,
    deleteIndustry,
    addFolder,
    deleteFolder,
    addJobTitle,
    deleteJobTitle,
    issueCandidateCredentials,
    updateCandidateStatus,
    moveCandidateCategory,
    deleteCandidate,
    exportCandidatesCSV,
    updateEmployerPermissions,
    updateEmployerStatus,
    deleteEmployer,
    reviewAccessRequest,
    updateInterviewStatus,
    updateSettings,
    resetAllToDefaults
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'hierarchy' | 'candidates' | 'employers' | 'requests' | 'settings' | 'audit_log'>('overview');

  // Hierarchy management state
  const [newIndustryName, setNewIndustryName] = useState('');
  const [newIndustryDesc, setNewIndustryDesc] = useState('');
  const [selectedIndustryForFolder, setSelectedIndustryForFolder] = useState(industries[0]?.id || '');
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedFolderForTitle, setSelectedFolderForTitle] = useState('');
  const [newJobTitleText, setNewJobTitleText] = useState('');

  // Candidate creation state
  const [isCreatingCandidate, setIsCreatingCandidate] = useState(false);
  const [newCandData, setNewCandData] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    industryId: industries[0]?.id || '',
    folderId: industries[0]?.folders[0]?.id || '',
    jobTitle: industries[0]?.folders[0]?.jobTitles[0] || '',
    temporaryPassword: 'Temp@' + Math.floor(1000 + Math.random() * 9000),
    yearsOfExperience: 5,
    currentLocation: 'Mumbai, Maharashtra'
  });

  // Candidate filters and move state
  const [candidateSearch, setCandidateSearch] = useState('');
  const [movingCandidateId, setMovingCandidateId] = useState<string | null>(null);
  const [targetMoveIndustry, setTargetMoveIndustry] = useState('');
  const [targetMoveFolder, setTargetMoveFolder] = useState('');
  const [targetMoveTitle, setTargetMoveTitle] = useState('');

  // Document modal viewer
  const [viewingDoc, setViewingDoc] = useState<{ doc: CandidateDocument; candidateName: string } | null>(null);

  // Editable settings local state
  const [editSettings, setEditSettings] = useState({ ...settings });
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  if (currentRole !== 'admin') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <Shield className="w-12 h-12 text-slate-400 mb-3" />
        <h2 className="text-xl font-bold text-slate-800">Administrator Access Required</h2>
        <p className="text-xs text-slate-500 max-w-sm mt-1 mb-4">
          Please log in as an administrator or use the Demo Admin button at the top to access the management portal.
        </p>
      </div>
    );
  }

  // Statistics
  const totalCandidates = candidates.length;
  const activeCandidates = candidates.filter(c => c.status === 'approved').length;
  const pendingCandidates = candidates.filter(c => c.status === 'pending_review').length;
  const totalEmployers = employers.length;
  const pendingRequests = accessRequests.filter(r => r.status === 'pending').length;
  const totalInterviews = interviewRequests.length;

  const handleCreateCandidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCandData.fullName || !newCandData.username || !newCandData.email) return;

    issueCandidateCredentials({
      ...newCandData,
      yearsOfExperience: Number(newCandData.yearsOfExperience)
    });

    setIsCreatingCandidate(false);
    setNewCandData({
      fullName: '',
      username: '',
      email: '',
      phone: '',
      industryId: industries[0]?.id || '',
      folderId: industries[0]?.folders[0]?.id || '',
      jobTitle: industries[0]?.folders[0]?.jobTitles[0] || '',
      temporaryPassword: 'Temp@' + Math.floor(1000 + Math.random() * 9000),
      yearsOfExperience: 5,
      currentLocation: 'Mumbai, Maharashtra'
    });
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(editSettings);
    setSettingsSuccess(true);
    setTimeout(() => setSettingsSuccess(false), 3000);
  };

  const filteredCandidates = candidates.filter(c => {
    if (!candidateSearch.trim()) return true;
    const q = candidateSearch.toLowerCase();
    return c.fullName.toLowerCase().includes(q) || c.jobTitle.toLowerCase().includes(q) || c.username.toLowerCase().includes(q);
  });

  return (
    <div className="bg-slate-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center font-bold text-xl border border-slate-700">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold font-display text-white">HM Hire Administration Portal</h1>
                <span className="text-[11px] font-mono bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-bold">
                  SUPER ADMIN
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Central management: Category taxonomy, candidate credentials, employer authorizations, and audit compliance.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={exportCandidatesCSV}
              className="px-3.5 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={logout}
              className="px-3.5 py-2 text-xs font-semibold bg-red-950/60 hover:bg-red-900 text-red-200 border border-red-800/60 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Strip */}
        <div className="flex flex-wrap items-center gap-2 mb-8 bg-white p-1.5 rounded-xl border border-slate-200 shadow-2xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'overview' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Overview &amp; Stats
          </button>
          <button
            onClick={() => setActiveTab('hierarchy')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'hierarchy' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Folder &amp; Industry Hierarchy
          </button>
          <button
            onClick={() => setActiveTab('candidates')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'candidates' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Candidate Accounts ({candidates.length})
          </button>
          <button
            onClick={() => setActiveTab('employers')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'employers' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Employers &amp; Access Matrix ({employers.length})
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'requests' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Access &amp; Interview Requests ({accessRequests.length + interviewRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'settings' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Settings &amp; Contact Info
          </button>
          <button
            onClick={() => setActiveTab('audit_log')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'audit_log' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Audit Log ({auditLogs.length})
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Candidates</span>
                <p className="text-2xl font-bold font-mono tabular-nums text-slate-900 mt-1">{totalCandidates}</p>
                <span className="text-[10px] text-emerald-600 font-medium">In private registry</span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Active Vetted</span>
                <p className="text-2xl font-bold font-mono tabular-nums text-emerald-700 mt-1">{activeCandidates}</p>
                <span className="text-[10px] text-slate-400">Approved for viewing</span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Employers</span>
                <p className="text-2xl font-bold font-mono tabular-nums text-blue-700 mt-1">{totalEmployers}</p>
                <span className="text-[10px] text-slate-400">Corporate accounts</span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Pending Requests</span>
                <p className="text-2xl font-bold font-mono tabular-nums text-amber-600 mt-1">{pendingRequests}</p>
                <span className="text-[10px] text-amber-700">Needs review</span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Interview Bookings</span>
                <p className="text-2xl font-bold font-mono tabular-nums text-slate-900 mt-1">{totalInterviews}</p>
                <span className="text-[10px] text-slate-400">Coordination queue</span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Audit Log Size</span>
                <p className="text-2xl font-bold font-mono tabular-nums text-slate-900 mt-1">{auditLogs.length}</p>
                <span className="text-[10px] text-slate-400">Traceable events</span>
              </div>
            </div>

            {/* Quick Actions & Recent Activity Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <h3 className="text-base font-bold font-display text-slate-900">Administrator Direct Controls</h3>
                <p className="text-xs text-slate-500">Fast workflows to issue credentials or manage sector permissions.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => { setActiveTab('candidates'); setIsCreatingCandidate(true); }}
                    className="p-3 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-xl text-left transition-colors cursor-pointer"
                  >
                    <KeyRound className="w-5 h-5 text-amber-700 mb-1" />
                    <p className="text-xs font-bold text-amber-950">Issue Candidate Account</p>
                    <p className="text-[11px] text-amber-800">Generate temporary credentials</p>
                  </button>

                  <button
                    onClick={() => setActiveTab('hierarchy')}
                    className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-xl text-left transition-colors cursor-pointer"
                  >
                    <FolderTree className="w-5 h-5 text-slate-700 mb-1" />
                    <p className="text-xs font-bold text-slate-900">Edit Folder Hierarchy</p>
                    <p className="text-[11px] text-slate-500">Add custom departments or roles</p>
                  </button>

                  <button
                    onClick={() => setActiveTab('employers')}
                    className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-xl text-left transition-colors cursor-pointer"
                  >
                    <Building className="w-5 h-5 text-slate-700 mb-1" />
                    <p className="text-xs font-bold text-slate-900">Employer Access Matrix</p>
                    <p className="text-[11px] text-slate-500">Restrict categories per company</p>
                  </button>

                  <button
                    onClick={exportCandidatesCSV}
                    className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-xl text-left transition-colors cursor-pointer"
                  >
                    <Download className="w-5 h-5 text-slate-700 mb-1" />
                    <p className="text-xs font-bold text-slate-900">Export Registry CSV</p>
                    <p className="text-[11px] text-slate-500">Download formatted candidates</p>
                  </button>
                </div>
              </div>

              {/* Recent Audit Activity */}
              <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold font-display text-slate-900">Recent Security &amp; Access Log</h3>
                  <button onClick={() => setActiveTab('audit_log')} className="text-xs text-amber-700 hover:underline font-semibold">
                    View All &rarr;
                  </button>
                </div>

                <div className="space-y-2.5">
                  {auditLogs.slice(0, 5).map(log => (
                    <div key={log.id} className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-xs flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                          <span className="capitalize text-[11px] text-slate-500">[{log.actorRole}]</span>
                          <span>{log.action}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5">{log.details}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono shrink-0">{log.timestamp.slice(11, 16)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Hierarchy Management */}
        {activeTab === 'hierarchy' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h2 className="text-lg font-bold font-display text-slate-900 mb-1">
                Dynamic Industry &amp; Folder Hierarchy Engine
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Create unlimited industries, department folders, and job titles. Do not hard-code folder structures.
              </p>

              {/* Add New Industry */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 mb-8 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Add New Industry Category</h4>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <input
                    type="text"
                    placeholder="Industry Name (e.g. Healthcare & Medical)"
                    value={newIndustryName}
                    onChange={(e) => setNewIndustryName(e.target.value)}
                    className="sm:col-span-5 px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                  <input
                    type="text"
                    placeholder="Description / Scope"
                    value={newIndustryDesc}
                    onChange={(e) => setNewIndustryDesc(e.target.value)}
                    className="sm:col-span-5 px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                  <button
                    onClick={() => {
                      if (newIndustryName.trim()) {
                        addIndustry(newIndustryName, newIndustryDesc || 'Specialized sector');
                        setNewIndustryName('');
                        setNewIndustryDesc('');
                      }
                    }}
                    className="sm:col-span-2 px-3 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Industry</span>
                  </button>
                </div>
              </div>

              {/* Industries List with Folders & Titles */}
              <div className="space-y-6">
                {industries.map(ind => (
                  <div key={ind.id} className="border border-slate-200 rounded-xl p-5 bg-white space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <h3 className="text-base font-bold text-slate-900 font-display">{ind.name}</h3>
                        <p className="text-xs text-slate-500">{ind.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => deleteIndustry(ind.id)}
                          title="Delete Industry"
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Department Folders */}
                    <div className="space-y-4 pl-4 border-l-2 border-slate-200">
                      {ind.folders.map(fld => (
                        <div key={fld.id} className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2.5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Folder className="w-4 h-4 text-amber-600" />
                              <span className="text-xs font-bold text-slate-800">{fld.name}</span>
                              <span className="text-[10px] text-slate-400 font-mono">({fld.jobTitles.length} titles)</span>
                            </div>
                            <button
                              onClick={() => deleteFolder(ind.id, fld.id)}
                              className="text-slate-400 hover:text-red-600 p-1 rounded"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Job titles tag list with add/delete */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {fld.jobTitles.map((title, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-white text-slate-800 border border-slate-200 rounded group"
                              >
                                <span>{title}</span>
                                <button
                                  onClick={() => deleteJobTitle(ind.id, fld.id, title)}
                                  className="text-slate-300 group-hover:text-red-500 cursor-pointer ml-1"
                                >
                                  &times;
                                </button>
                              </span>
                            ))}
                          </div>

                          {/* Add Job Title inline */}
                          <div className="pt-2 flex items-center gap-2">
                            <input
                              type="text"
                              placeholder={`Add job title to ${fld.name}...`}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  const target = e.currentTarget;
                                  if (target.value.trim()) {
                                    addJobTitle(ind.id, fld.id, target.value.trim());
                                    target.value = '';
                                  }
                                }
                              }}
                              className="px-2.5 py-1 text-xs bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-slate-900 w-64"
                            />
                            <span className="text-[11px] text-slate-400">Press Enter to add</span>
                          </div>
                        </div>
                      ))}

                      {/* Add folder to this industry */}
                      <div className="pt-2 flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="New department / subfolder name..."
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const target = e.currentTarget;
                              if (target.value.trim()) {
                                addFolder(ind.id, target.value.trim());
                                target.value = '';
                              }
                            }
                          }}
                          className="px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 w-72"
                        />
                        <span className="text-[11px] text-slate-400">Press Enter to create folder in {ind.name}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Candidates Management */}
        {activeTab === 'candidates' && (
          <div className="space-y-6">
            
            {/* Header with Search and Issue Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search candidate name, title, username..."
                  value={candidateSearch}
                  onChange={(e) => setCandidateSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsCreatingCandidate(!isCreatingCandidate)}
                  className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Issue Candidate Credentials</span>
                </button>
              </div>
            </div>

            {/* Candidate Credential Creation Form */}
            {isCreatingCandidate && (
              <form onSubmit={handleCreateCandidate} className="bg-white rounded-2xl border border-amber-300 p-6 shadow-md space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-display">
                      Issue Candidate Login &amp; Temporary Credentials
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      The admin is the only role authorized to issue candidate logins.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsCreatingCandidate(false)}
                    className="p-1 text-slate-400 hover:text-slate-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pierre Dubois"
                      value={newCandData.fullName}
                      onChange={(e) => {
                        const name = e.target.value;
                        const autoUser = name.toLowerCase().replace(/[^a-z0-9]/g, '.');
                        setNewCandData({ ...newCandData, fullName: name, username: autoUser });
                      }}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Username (Portal Login) *</label>
                    <input
                      type="text"
                      required
                      value={newCandData.username}
                      onChange={(e) => setNewCandData({ ...newCandData, username: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Temporary Password *</label>
                    <input
                      type="text"
                      required
                      value={newCandData.temporaryPassword}
                      onChange={(e) => setNewCandData({ ...newCandData, temporaryPassword: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="p.dubois@example.com"
                      value={newCandData.email}
                      onChange={(e) => setNewCandData({ ...newCandData, email: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Phone / WhatsApp *</label>
                    <input
                      type="text"
                      required
                      placeholder="+91 98201 23456"
                      value={newCandData.phone}
                      onChange={(e) => setNewCandData({ ...newCandData, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Initial Industry</label>
                    <select
                      value={newCandData.industryId}
                      onChange={(e) => {
                        const targetInd = industries.find(i => i.id === e.target.value);
                        setNewCandData({
                          ...newCandData,
                          industryId: e.target.value,
                          folderId: targetInd?.folders[0]?.id || '',
                          jobTitle: targetInd?.folders[0]?.jobTitles[0] || 'Professional'
                        });
                      }}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                    >
                      {industries.map(ind => (
                        <option key={ind.id} value={ind.id}>{ind.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Assigned Job Title</label>
                    <input
                      type="text"
                      required
                      value={newCandData.jobTitle}
                      onChange={(e) => setNewCandData({ ...newCandData, jobTitle: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Years of Experience</label>
                    <input
                      type="number"
                      value={newCandData.yearsOfExperience}
                      onChange={(e) => setNewCandData({ ...newCandData, yearsOfExperience: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCreatingCandidate(false)}
                    className="px-4 py-2 text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-xs cursor-pointer"
                  >
                    Issue Account Credentials
                  </button>
                </div>
              </form>
            )}

            {/* Candidates Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">Candidate</th>
                      <th className="py-3.5 px-4 font-semibold">Role &amp; Industry</th>
                      <th className="py-3.5 px-4 font-semibold">Credentials</th>
                      <th className="py-3.5 px-4 font-semibold">Documents</th>
                      <th className="py-3.5 px-4 font-semibold">Status</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredCandidates.map(cand => {
                      const ind = industries.find(i => i.id === cand.industryId)?.name || 'Industry';
                      const cvDoc = cand.documents?.find(d => d.type === 'cv');

                      return (
                        <tr key={cand.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={cand.photoUrl || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80'}
                                alt=""
                                className="w-9 h-9 rounded-lg object-cover border border-slate-200"
                              />
                              <div>
                                <p className="font-bold text-slate-900">{cand.fullName}</p>
                                <p className="text-[11px] text-slate-400">{cand.email}</p>
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <p className="font-semibold text-slate-800">{cand.jobTitle}</p>
                            <p className="text-[11px] text-slate-500">{ind} · {cand.yearsOfExperience} yrs</p>
                          </td>

                          <td className="py-3.5 px-4 font-mono text-[11px]">
                            <p className="text-slate-700">user: {cand.username}</p>
                            <p className="text-slate-400">pass: {cand.temporaryPassword || '••••••••'}</p>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2">
                              {cvDoc ? (
                                <button
                                  onClick={() => setViewingDoc({ doc: cvDoc, candidateName: cand.fullName })}
                                  className="text-amber-700 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>View CV</span>
                                </button>
                              ) : (
                                <span className="text-slate-400 italic text-[11px]">No CV</span>
                              )}
                              <span className="text-slate-300">·</span>
                              <span className="text-[11px] text-slate-500 font-mono">
                                {cand.documents?.length || 0} docs
                              </span>
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <select
                              value={cand.status}
                              onChange={(e) => updateCandidateStatus(cand.id, e.target.value as any)}
                              className={`px-2 py-1 rounded text-[11px] font-semibold border cursor-pointer ${
                                cand.status === 'approved' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                                cand.status === 'suspended' ? 'bg-red-50 text-red-800 border-red-300' :
                                'bg-amber-50 text-amber-800 border-amber-300'
                              }`}
                            >
                              <option value="approved">Approved</option>
                              <option value="pending_review">Pending Review</option>
                              <option value="suspended">Suspended</option>
                            </select>
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Move category action */}
                              <button
                                onClick={() => {
                                  const ind = industries[0];
                                  moveCandidateCategory(cand.id, ind.id, ind.folders[0]?.id || '', ind.folders[0]?.jobTitles[0] || 'Executive');
                                }}
                                title="Move Category"
                                className="p-1.5 text-slate-400 hover:text-slate-800 rounded"
                              >
                                <Folder className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => deleteCandidate(cand.id)}
                                title="Delete Candidate"
                                className="p-1.5 text-slate-400 hover:text-red-600 rounded"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Tab 4: Employers & Access Clearance Matrix */}
        {activeTab === 'employers' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h2 className="text-lg font-bold font-display text-slate-900 mb-1">
                Employer Accounts &amp; Category Permission Matrix
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Control which company can access which candidate industries. Enforce least-privilege data confidentiality.
              </p>

              <div className="space-y-6">
                {employers.map(emp => (
                  <div key={emp.id} className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-slate-900">{emp.companyName}</h3>
                          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                            emp.status === 'approved' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                            emp.status === 'revoked' ? 'bg-red-100 text-red-800 border-red-300' : 'bg-amber-100 text-amber-800 border-amber-300'
                          }`}>
                            {emp.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Contact: {emp.contactPerson} · Email: {emp.email} · Phone: {emp.phone}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {emp.status === 'approved' ? (
                          <button
                            onClick={() => updateEmployerStatus(emp.id, 'revoked')}
                            className="px-3 py-1.5 text-xs font-semibold bg-red-100 hover:bg-red-200 text-red-800 rounded-lg transition-colors cursor-pointer"
                          >
                            Revoke Access
                          </button>
                        ) : (
                          <button
                            onClick={() => updateEmployerStatus(emp.id, 'approved')}
                            className="px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors cursor-pointer"
                          >
                            Approve Access
                          </button>
                        )}
                        <button
                          onClick={() => deleteEmployer(emp.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Sector Clearance Checkboxes */}
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Granted Candidate Industries
                      </p>
                      <div className="flex flex-wrap gap-4 text-xs">
                        {industries.map(ind => {
                          const isAllowed = emp.allowedIndustryIds?.includes(ind.id);
                          return (
                            <label key={ind.id} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={isAllowed}
                                onChange={(e) => {
                                  const updated = e.target.checked
                                    ? [...(emp.allowedIndustryIds || []), ind.id]
                                    : (emp.allowedIndustryIds || []).filter(id => id !== ind.id);
                                  updateEmployerPermissions(emp.id, updated);
                                }}
                                className="rounded text-amber-500 focus:ring-amber-400"
                              />
                              <span className="font-semibold text-slate-800">{ind.name}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Requests Management */}
        {activeTab === 'requests' && (
          <div className="space-y-8">
            {/* Access Requests */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-base font-bold font-display text-slate-900">
                Inbound Candidate &amp; Employer Access Requests ({accessRequests.length})
              </h3>

              {accessRequests.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">No access requests pending.</div>
              ) : (
                <div className="space-y-3">
                  {accessRequests.map(req => (
                    <div key={req.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${req.type === 'candidate' ? 'bg-amber-100 text-amber-900' : 'bg-blue-100 text-blue-900'}`}>
                            {req.type}
                          </span>
                          <span className="font-bold text-slate-900">{req.name}</span>
                          {req.companyName && <span className="text-slate-500 font-medium">({req.companyName})</span>}
                          <span className="text-slate-300">·</span>
                          <span className="text-slate-500">{req.desiredRoleOrIndustry}</span>
                        </div>
                        <p className="text-slate-600">Email: {req.email} · Phone: {req.phone} · Date: {req.createdAt}</p>
                        {req.notes && <p className="text-[11px] text-slate-500 italic mt-1">"{req.notes}"</p>}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {req.status === 'pending' ? (
                          <>
                            <button
                              onClick={() => reviewAccessRequest(req.id, 'approved')}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => reviewAccessRequest(req.id, 'rejected')}
                              className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg"
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          <span className="capitalize font-semibold text-slate-500 text-[11px]">
                            Status: {req.status}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Interview Requests */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-base font-bold font-display text-slate-900">
                Employer Interview Requests &amp; Enquiries ({interviewRequests.length})
              </h3>

              <div className="space-y-3">
                {interviewRequests.map(req => (
                  <div key={req.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-slate-900">{req.employerName}</span>
                        <span className="text-slate-400">&rarr;</span>
                        <span className="font-bold text-amber-800">{req.candidateName}</span>
                        <span className="text-slate-400">({req.jobRole})</span>
                      </div>
                      <p className="text-slate-600">Requested Time: {req.proposedDate}</p>
                      {req.message && <p className="text-[11px] text-slate-500 italic mt-1">"{req.message}"</p>}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <select
                        value={req.status}
                        onChange={(e) => updateInterviewStatus(req.id, e.target.value as any)}
                        className="px-2.5 py-1 text-xs border border-slate-300 rounded bg-white font-semibold"
                      >
                        <option value="pending">Pending</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="completed">Completed</option>
                        <option value="declined">Declined</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Settings & Placeholders */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-bold font-display text-slate-900">
                  Platform Contact Details &amp; Governance
                </h2>
                <p className="text-xs text-slate-500">
                  Update business phone, WhatsApp, email, office address, and file limits. Changes sync across public and legal pages.
                </p>
              </div>
              {settingsSuccess && (
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded border border-emerald-200">
                  Settings saved successfully!
                </span>
              )}
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Business Name</label>
                  <input
                    type="text"
                    value={editSettings.businessName}
                    onChange={(e) => setEditSettings({ ...editSettings, businessName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Corporate Website Domain</label>
                  <input
                    type="text"
                    value={editSettings.websiteDomain}
                    onChange={(e) => setEditSettings({ ...editSettings, websiteDomain: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number (Click-to-call)</label>
                  <input
                    type="text"
                    value={editSettings.phone}
                    onChange={(e) => setEditSettings({ ...editSettings, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">WhatsApp Number (Click-to-chat)</label>
                  <input
                    type="text"
                    value={editSettings.whatsapp}
                    onChange={(e) => setEditSettings({ ...editSettings, whatsapp: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Business Email (Click-to-mail)</label>
                  <input
                    type="text"
                    value={editSettings.email}
                    onChange={(e) => setEditSettings({ ...editSettings, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Corporate Physical Office Address</label>
                <input
                  type="text"
                  value={editSettings.officeAddress}
                  onChange={(e) => setEditSettings({ ...editSettings, officeAddress: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">LinkedIn Profile / Company Page</label>
                  <input
                    type="text"
                    value={editSettings.linkedinUrl}
                    onChange={(e) => setEditSettings({ ...editSettings, linkedinUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Instagram Profile</label>
                  <input
                    type="text"
                    value={editSettings.instagramUrl}
                    onChange={(e) => setEditSettings({ ...editSettings, instagramUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Max Upload File Size (MB)</label>
                  <input
                    type="number"
                    value={editSettings.maxFileSizeMb}
                    onChange={(e) => setEditSettings({ ...editSettings, maxFileSizeMb: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">India DPDP Act (2023) Retention (Months)</label>
                  <input
                    type="number"
                    value={editSettings.dataRetentionMonths}
                    onChange={(e) => setEditSettings({ ...editSettings, dataRetentionMonths: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Data Protection Officer Email</label>
                  <input
                    type="text"
                    value={editSettings.dataProtectionOfficer}
                    onChange={(e) => setEditSettings({ ...editSettings, dataProtectionOfficer: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Grievance Redressal Officer Email (Section 8 DPDP Act)</label>
                  <input
                    type="text"
                    value={editSettings.grievanceOfficerEmail}
                    onChange={(e) => setEditSettings({ ...editSettings, grievanceOfficerEmail: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={resetAllToDefaults}
                  className="px-4 py-2 text-xs font-semibold text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Demo State to Initial Defaults</span>
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-xs cursor-pointer"
                >
                  Save Platform Settings
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 7: Audit Log */}
        {activeTab === 'audit_log' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold font-display text-slate-900">
                  Compliance Audit Trail
                </h3>
                <p className="text-xs text-slate-500">
                  Immutable log of logins, credential creations, document accesses, and permission modifications.
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400 font-semibold">{auditLogs.length} Records</span>
            </div>

            <div className="space-y-2">
              {auditLogs.map(log => (
                <div
                  key={log.id}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-800">
                        {log.actorRole}
                      </span>
                      <span className="font-bold text-slate-900">{log.action}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-600 font-medium">{log.actorName}</span>
                    </div>
                    <p className="text-slate-600 text-[11px] mt-1">{log.details}</p>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400 shrink-0">{log.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Document Viewer Modal */}
      <DocumentViewerModal
        document={viewingDoc?.doc || null}
        candidateName={viewingDoc?.candidateName || 'Candidate'}
        onClose={() => setViewingDoc(null)}
      />
    </div>
  );
};
