import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { CandidateProfile, CandidateDocument, EmployerAccount } from '../../types';
import { DocumentViewerModal } from '../shared/DocumentViewerModal';
import { InterviewModal } from '../shared/InterviewModal';
import {
  Search,
  Filter,
  Bookmark,
  Calendar,
  Eye,
  Download,
  Building,
  Briefcase,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  FileText,
  Lock,
  ChevronDown,
  Sparkles,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

export const EmployerPortal: React.FC = () => {
  const {
    currentUser,
    currentRole,
    candidates,
    industries,
    toggleShortlist,
    logout
  } = useApp();

  const employer = currentUser as EmployerAccount;

  // View mode: 'all' (default, just see all CVs) or 'shortlisted'
  const [viewFilter, setViewFilter] = useState<'all' | 'shortlist'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [positionFilter, setPositionFilter] = useState<string>('all');
  const [experienceFilter, setExperienceFilter] = useState<string>('all');

  // Modals
  const [viewingDoc, setViewingDoc] = useState<{ doc: CandidateDocument; candidateName: string } | null>(null);
  const [interviewCandidate, setInterviewCandidate] = useState<CandidateProfile | null>(null);

  if (!employer || currentRole !== 'employer') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4 border border-slate-200">
          <Lock className="w-8 h-8 text-slate-500" />
        </div>
        <h2 className="text-xl font-bold font-display text-slate-900">Employer Access Required</h2>
        <p className="text-xs text-slate-500 max-w-sm mt-1 mb-6 leading-relaxed">
          Please log in with your verified employer credentials or select Demo Employer from the top navigation bar.
        </p>
      </div>
    );
  }

  // Candidates list: Show all approved candidates with their CVs
  const allApprovedCandidates = useMemo(() => {
    return candidates.filter(c => c.status === 'approved' || !c.status);
  }, [candidates]);

  // Unique positions for easy filter dropdown
  const uniquePositions = useMemo(() => {
    const set = new Set<string>();
    allApprovedCandidates.forEach(c => {
      if (c.jobTitle) set.add(c.jobTitle);
    });
    return Array.from(set).sort();
  }, [allApprovedCandidates]);

  // Filtered candidate CVs
  const displayedCandidates = useMemo(() => {
    return allApprovedCandidates.filter(c => {
      if (viewFilter === 'shortlist' && !employer.shortlists?.includes(c.id)) {
        return false;
      }

      if (positionFilter !== 'all' && c.jobTitle !== positionFilter) {
        return false;
      }

      if (experienceFilter !== 'all') {
        const minExp = Number(experienceFilter);
        if (c.yearsOfExperience < minExp) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const empId = (c.employeeId || c.id).toLowerCase();
        const name = (c.displayName || c.fullName).toLowerCase();
        const title = c.jobTitle.toLowerCase();
        const location = c.currentLocation.toLowerCase();
        const skills = (c.keySkills || []).some(s => s.toLowerCase().includes(q));
        const cvDoc = c.documents?.find(d => d.type === 'cv');
        const docName = (cvDoc?.name || '').toLowerCase();

        if (
          !empId.includes(q) &&
          !name.includes(q) &&
          !title.includes(q) &&
          !location.includes(q) &&
          !skills &&
          !docName.includes(q)
        ) {
          return false;
        }
      }

      return true;
    });
  }, [allApprovedCandidates, viewFilter, employer.shortlists, positionFilter, experienceFilter, searchQuery]);

  const handleDownloadCV = (cand: CandidateProfile, doc: CandidateDocument) => {
    // Generate text/pdf data download
    const content = doc.previewContent || `CANDIDATE CV\nEmployee ID: ${cand.employeeId || cand.id}\nName: ${cand.fullName}\nPosition: ${cand.jobTitle}\nExperience: ${cand.yearsOfExperience} years\nLocation: ${cand.currentLocation}\nSkills: ${(cand.keySkills || []).join(', ')}`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = doc.name || `${cand.jobTitle.replace(/\s+/g, '_')}_CV.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Employer ID & Company Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-xl border border-slate-700 shadow-xs shrink-0">
              <Building className="w-7 h-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl font-bold font-display text-slate-900">{employer.companyName}</h1>
                <span className="font-mono text-xs font-bold bg-slate-900 text-amber-400 px-3 py-1 rounded-md border border-slate-700 flex items-center gap-1.5 shadow-2xs">
                  <span>Employer ID:</span>
                  <span className="text-white">{employer.id}</span>
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Approved &amp; Active</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Representative: <strong className="text-slate-700">{employer.contactPerson}</strong> · Registered Email: <strong className="text-slate-700">{employer.email}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={logout}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Clean Controls & Search Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* View Filter Toggles: Just See All CVs / Shortlisted */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewFilter('all')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                viewFilter === 'all'
                  ? 'bg-slate-900 text-amber-400 shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>All Candidate CVs ({allApprovedCandidates.length})</span>
            </button>

            <button
              onClick={() => setViewFilter('shortlist')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                viewFilter === 'shortlist'
                  ? 'bg-slate-900 text-amber-400 shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Shortlisted ({employer.shortlists?.length || 0})</span>
            </button>
          </div>

          {/* Search by Employee ID or Position */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 lg:max-w-2xl">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by Employee ID (e.g. EMP-2026-001), position, name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white text-slate-900"
              />
            </div>

            <div className="sm:w-48">
              <select
                value={positionFilter}
                onChange={(e) => setPositionFilter(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900"
              >
                <option value="all">All Target Positions</option>
                {uniquePositions.map(pos => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
            </div>

            <div className="sm:w-36">
              <select
                value={experienceFilter}
                onChange={(e) => setExperienceFilter(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900"
              >
                <option value="all">Min Experience</option>
                <option value="5">5+ Years</option>
                <option value="8">8+ Years</option>
                <option value="12">12+ Years</option>
              </select>
            </div>
          </div>

        </div>

        {/* Candidate CVs Grid: Clean, direct layout displaying every candidate CV with Employee ID */}
        <div>
          {displayedCandidates.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800 font-display">No CVs Match Your Query</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Try clearing your search query or switching back to "All Candidate CVs".
              </p>
              <button
                onClick={() => { setSearchQuery(''); setPositionFilter('all'); setExperienceFilter('all'); setViewFilter('all'); }}
                className="mt-4 px-4 py-2 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
              >
                Reset Filters &amp; View All CVs
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedCandidates.map(cand => {
                const isShortlisted = employer.shortlists?.includes(cand.id);
                const cvDoc = cand.documents?.find(d => d.type === 'cv') || cand.documents?.[0];
                const displayName = cand.displayName || cand.fullName;
                const employeeIdFormatted = cand.employeeId || `EMP-ID: #${cand.id.replace('cand-', '')}`;

                return (
                  <div
                    key={cand.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between overflow-hidden"
                  >
                    {/* Top candidate profile banner */}
                    <div className="p-5 pb-4">
                      
                      {/* Employee ID Tag & Shortlist Bookmark */}
                      <div className="flex items-center justify-between gap-2 mb-3.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs font-bold bg-slate-900 text-amber-400 px-2.5 py-1 rounded-md border border-slate-700 shadow-2xs">
                            {employeeIdFormatted}
                          </span>
                          <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                            Verified Candidate
                          </span>
                        </div>

                        <button
                          onClick={() => toggleShortlist(cand.id)}
                          title={isShortlisted ? 'Remove from shortlist' : 'Add to shortlist'}
                          className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                            isShortlisted
                              ? 'bg-amber-50 border-amber-300 text-amber-700'
                              : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <Bookmark className={`w-4 h-4 ${isShortlisted ? 'fill-amber-500 text-amber-600' : ''}`} />
                        </button>
                      </div>

                      {/* Header with Photo, Name & Target Position */}
                      <div className="flex items-start gap-3 mb-3">
                        <img
                          src={cand.photoUrl || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80'}
                          alt={displayName}
                          className="w-13 h-13 rounded-xl object-cover border border-slate-200 shadow-2xs shrink-0"
                        />
                        <div className="min-w-0">
                          <h3 className="text-base font-bold text-slate-900 font-display leading-tight truncate">
                            {displayName}
                          </h3>
                          <p className="text-xs font-bold text-amber-700 mt-0.5">
                            {cand.jobTitle}
                          </p>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                            <span className="font-medium text-slate-700">{cand.yearsOfExperience} yrs exp</span>
                            <span>·</span>
                            <span>{cand.currentLocation}</span>
                          </div>
                        </div>
                      </div>

                      {/* Attached CV PDF Box */}
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 mb-3 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-700 flex items-center gap-1.5">
                            <FileText className="w-4 h-4 text-amber-600" />
                            <span>Attached CV Document</span>
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {cvDoc ? `${Math.round((cvDoc.sizeBytes || 150000) / 1024)} KB · PDF` : 'PDF'}
                          </span>
                        </div>
                        <p className="text-xs font-mono text-slate-800 bg-white p-2 rounded border border-slate-200 truncate font-medium">
                          {cvDoc?.name || `${cand.fullName.replace(/\s+/g, '_')}_CV.pdf`}
                        </p>
                      </div>

                      {/* Bio or Career Highlights */}
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {cand.bio || `Verified professional targeting ${cand.jobTitle} roles with comprehensive track record in India.`}
                      </p>

                      {/* Specializations / Key Skills */}
                      {cand.keySkills && cand.keySkills.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-slate-100">
                          <div className="flex flex-wrap gap-1 text-[11px]">
                            {cand.keySkills.slice(0, 3).map((skill, idx) => (
                              <span key={idx} className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
                                {skill}
                              </span>
                            ))}
                            {cand.keySkills.length > 3 && (
                              <span className="text-[10px] text-slate-400 self-center">
                                +{cand.keySkills.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                    </div>

                    {/* Card Footer Actions: Direct CV Review & Download */}
                    <div className="p-4 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {cvDoc && (
                          <button
                            onClick={() => setViewingDoc({ doc: cvDoc, candidateName: displayName })}
                            className="px-3.5 py-1.5 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                          >
                            <Eye className="w-3.5 h-3.5 text-amber-600" />
                            <span>Review CV</span>
                          </button>
                        )}

                        {cvDoc && (
                          <button
                            onClick={() => handleDownloadCV(cand, cvDoc)}
                            title="Download CV"
                            className="p-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors cursor-pointer shadow-2xs"
                          >
                            <Download className="w-3.5 h-3.5 text-slate-600" />
                          </button>
                        )}
                      </div>

                      <button
                        onClick={() => setInterviewCandidate(cand)}
                        className="px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Schedule</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* In-app Document Viewer Modal */}
      <DocumentViewerModal
        document={viewingDoc?.doc || null}
        candidateName={viewingDoc?.candidateName || 'Candidate'}
        onClose={() => setViewingDoc(null)}
      />

      {/* Schedule Interview Modal */}
      <InterviewModal
        candidate={interviewCandidate}
        onClose={() => setInterviewCandidate(null)}
      />
    </div>
  );
};
