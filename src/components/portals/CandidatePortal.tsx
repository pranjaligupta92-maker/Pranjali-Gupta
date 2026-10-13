import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { CandidateDocument, CandidateProfile } from '../../types';
import { DocumentViewerModal } from '../shared/DocumentViewerModal';
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Eye,
  Trash2,
  Lock,
  LogOut,
  Send,
  HelpCircle,
  X,
  FileCheck2,
  ArrowRight
} from 'lucide-react';

export const CandidatePortal: React.FC = () => {
  const {
    currentUser,
    currentRole,
    settings,
    updateCandidate,
    uploadCandidateDocument,
    deleteCandidateDocument,
    submitAccessRequest,
    logout
  } = useApp();

  const candidate = currentUser as CandidateProfile;
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Streamlined state: Only Position & Attached PDF File!
  const [position, setPosition] = useState(candidate?.jobTitle || '');
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    sizeBytes: number;
    previewContent: string;
  } | null>(null);

  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [viewingDoc, setViewingDoc] = useState<CandidateDocument | null>(null);

  // "Ask Admin to Upload CV" modal state
  const [isAskAdminModalOpen, setIsAskAdminModalOpen] = useState(false);
  const [adminRequestNote, setAdminRequestNote] = useState('');
  const [adminRequestSent, setAdminRequestSent] = useState(false);

  if (!candidate || currentRole !== 'candidate') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4 border border-slate-200">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold font-display text-slate-900">Candidate Login Required</h2>
        <p className="text-xs text-slate-500 max-w-sm mt-1 mb-6">
          Please log in with your candidate credentials, or request upload access from the administrator.
        </p>
      </div>
    );
  }

  // Find candidate's currently uploaded CV (if any)
  const currentCV = candidate.documents?.find(d => d.type === 'cv') || candidate.documents?.[0] || null;

  // Handle local file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate extension
    const isPdfOrDoc = file.name.match(/\.(pdf|doc|docx)$/i);
    if (!isPdfOrDoc) {
      setErrorMessage('Please attach a PDF document (.pdf) or Word file (.doc, .docx).');
      return;
    }

    setErrorMessage('');
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedFile({
        name: file.name,
        sizeBytes: file.size,
        previewContent: `CURRICULUM VITAE (CV / RESUME)\nCandidate: ${candidate.fullName}\nTarget Position: ${position || candidate.jobTitle || 'Executive'}\nAttached File: ${file.name}\nSize: ${(file.size / 1024).toFixed(1)} KB\nUploaded: ${new Date().toLocaleDateString('en-IN')}\n\n[Official Attached CV Record on File with HM Consultant]\nThis candidate profile has been registered and verified for authorized employer reviews.`
      });
    };
    reader.readAsText(file.slice(0, 1000)); // preview slice
  };

  // Handle direct CV Upload & Position save
  const handleUploadCV = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!position.trim()) {
      setErrorMessage('Please enter the position / job title you are applying for.');
      return;
    }

    if (!selectedFile && !currentCV) {
      setErrorMessage('Please attach your CV PDF file.');
      return;
    }

    setUploadProgress(25);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev === null) return 40;
        if (prev >= 90) {
          clearInterval(interval);

          const finalFileName = selectedFile
            ? (selectedFile.name.endsWith('.pdf') ? selectedFile.name : `${selectedFile.name}.pdf`)
            : (currentCV ? currentCV.name : `${candidate.fullName.replace(/\s+/g, '_')}_CV.pdf`);

          // Update candidate job title directly
          updateCandidate(candidate.id, {
            jobTitle: position.trim()
          });

          // Upload or replace attached CV document
          if (selectedFile) {
            uploadCandidateDocument(candidate.id, {
              name: finalFileName,
              type: 'cv',
              url: '#',
              previewContent: selectedFile.previewContent,
              sizeBytes: selectedFile.sizeBytes,
              mimeType: 'application/pdf'
            });
          }

          setUploadProgress(null);
          setSelectedFile(null);
          if (fileInputRef.current) fileInputRef.current.value = '';
          setSuccessMessage(`Your CV has been attached successfully for the position: "${position.trim()}".`);
          setTimeout(() => setSuccessMessage(''), 5000);
          return null;
        }
        return prev + 35;
      });
    }, 150);
  };

  // Handle Ask Admin to Upload CV
  const handleSendAdminRequest = (e: React.FormEvent) => {
    e.preventDefault();
    submitAccessRequest({
      type: 'candidate',
      name: candidate.fullName,
      email: candidate.email,
      phone: candidate.phone || '',
      desiredRoleOrIndustry: position || candidate.jobTitle,
      notes: `[Candidate Portal Request to Admin] Position: ${position || candidate.jobTitle}. Note: ${adminRequestNote || 'Please upload/update my CV on my behalf.'}`
    });
    setAdminRequestSent(true);
    setTimeout(() => {
      setAdminRequestSent(false);
      setIsAskAdminModalOpen(false);
      setAdminRequestNote('');
    }, 2500);
  };

  return (
    <div className="bg-slate-100 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-xl border border-slate-700 shadow-xs">
              {candidate.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                  {candidate.fullName}
                </h1>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {candidate.status.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Position: <span className="font-semibold text-slate-800">{candidate.jobTitle || 'Not specified'}</span> · Username: <span className="font-mono text-slate-700">{candidate.username}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsAskAdminModalOpen(true)}
              className="px-3.5 py-2 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>Ask Admin to Upload CV</span>
            </button>

            <button
              onClick={logout}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Notifications */}
        {successMessage && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2.5 shadow-xs">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-medium">{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2.5 shadow-xs">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
            <span className="font-medium">{errorMessage}</span>
          </div>
        )}

        {/* The Streamlined CV Upload Box */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded mb-2">
              <Upload className="w-3.5 h-3.5 text-amber-600" />
              <span>Direct Candidate Upload</span>
            </div>
            <h2 className="text-xl font-bold font-display text-slate-900">
              Upload Your CV
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Simply specify your target position, attach your PDF file, and submit. No lengthy profile forms needed.
            </p>
          </div>

          <form onSubmit={handleUploadCV} className="space-y-6">
            
            {/* 1. Target Position */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Target Position / Role *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Executive Chef, Restaurant Manager, F&B Captain, HVAC Technician, Receptionist"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white text-slate-900 font-medium placeholder:text-slate-400"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Enter the job title or designation you are targeting for hotel, restaurant, engineering, or corporate roles.
              </p>
            </div>

            {/* 2. Attach PDF File */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Attach CV (PDF File) *
              </label>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
                id="candidate-cv-input"
              />

              {/* Interactive File Dropzone */}
              <label
                htmlFor="candidate-cv-input"
                className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                  selectedFile
                    ? 'border-emerald-400 bg-emerald-50/40'
                    : 'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-400'
                }`}
              >
                {selectedFile ? (
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                      <FileCheck2 className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{selectedFile.name}</p>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">
                        {(selectedFile.sizeBytes / 1024).toFixed(1)} KB · PDF File Ready to Upload
                      </p>
                    </div>
                    <span className="inline-block text-xs text-amber-700 hover:underline font-semibold pt-1">
                      Click to choose a different PDF
                    </span>
                  </div>
                ) : (
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-xl bg-slate-200 text-slate-600 flex items-center justify-center mx-auto">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        Click here to browse and attach your PDF file
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Accepts PDF (.pdf) or Word document (.doc, .docx) up to {settings.maxFileSizeMb}MB
                      </p>
                    </div>
                  </div>
                )}
              </label>
            </div>

            {/* Upload Progress Bar if active */}
            {uploadProgress !== null && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-600 font-medium">
                  <span>Uploading and registering attached CV...</span>
                  <span className="font-mono tabular-nums">{uploadProgress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 transition-all duration-200"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={uploadProgress !== null}
                className="w-full sm:w-auto px-8 py-3.5 font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md text-sm"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Attached CV</span>
              </button>
            </div>

          </form>
        </div>

        {/* Current Uploaded CV Status */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <h3 className="text-base font-bold font-display text-slate-900">
              Current Attached CV
            </h3>
            {currentCV && (
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>CV on File</span>
              </span>
            )}
          </div>

          {currentCV ? (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-amber-700 shrink-0 shadow-2xs">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{currentCV.name}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Position: <span className="font-semibold text-slate-800">{candidate.jobTitle}</span>
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                    {(currentCV.sizeBytes / 1024).toFixed(0)} KB · Uploaded: {currentCV.uploadedAt}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => setViewingDoc(currentCV)}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>Preview CV</span>
                </button>

                <button
                  onClick={() => deleteCandidateDocument(candidate.id, currentCV.id)}
                  title="Remove Current CV"
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-400 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
              No CV uploaded yet. Enter your target position and attach your PDF file above.
            </div>
          )}

          {/* Quick Note about Admin upload assistance */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
            <span>Need HM Consultant admin to upload or update your CV on your behalf?</span>
            <button
              onClick={() => setIsAskAdminModalOpen(true)}
              className="text-amber-700 hover:text-amber-800 font-bold inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Ask from Admin</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* "Ask Admin to Upload CV" Modal */}
      {isAskAdminModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
            
            {/* Header */}
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <h3 className="text-base font-bold font-display text-white">
                  Ask Admin to Upload CV
                </h3>
              </div>
              <button
                onClick={() => setIsAskAdminModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {adminRequestSent ? (
                <div className="py-6 text-center space-y-2">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Request Sent to Admin</h4>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    The administration desk has received your request. An executive will review your target position and update your CV.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendAdminRequest} className="space-y-4 text-xs">
                  <p className="text-slate-600">
                    If you prefer our recruitment team to upload or format your CV, send a direct request below.
                  </p>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Target Position</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Executive Chef / F&B Manager"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Message to Admin (Optional)</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Please update my CV with my latest hotel role in Mumbai..."
                      value={adminRequestNote}
                      onChange={(e) => setAdminRequestNote(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white text-slate-900"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Request to Admin</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      )}

      {/* In-app Document Viewer Modal */}
      <DocumentViewerModal
        document={viewingDoc}
        candidateName={candidate.fullName}
        onClose={() => setViewingDoc(null)}
      />
    </div>
  );
};
