import React, { useState } from 'react';
import { CandidateProfile } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, Calendar, Send, CheckCircle2, Clock } from 'lucide-react';

interface InterviewModalProps {
  candidate: CandidateProfile | null;
  onClose: () => void;
}

export const InterviewModal: React.FC<InterviewModalProps> = ({ candidate, onClose }) => {
  const { createInterviewRequest, currentUser } = useApp();
  const [jobRole, setJobRole] = useState(candidate?.jobTitle || '');
  const [proposedDate, setProposedDate] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!candidate) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobRole || !proposedDate) return;

    createInterviewRequest({
      candidateId: candidate.id,
      jobRole,
      proposedDate,
      message
    });

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            <h3 className="text-base font-bold font-display text-white">
              Request Candidate Interview
            </h3>
          </div>
          <button
            onClick={() => { onClose(); setSubmitted(false); }}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 font-display">
                Interview Request Dispatched
              </h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                Your interview request for <strong>{candidate.displayName || candidate.fullName}</strong> has been forwarded to the HM Consultant coordination desk. Our team will coordinate availability with the candidate.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => { onClose(); setSubmitted(false); }}
                  className="px-5 py-2 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
                >
                  Return to Candidate List
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Candidate</p>
                <p className="text-sm font-bold text-slate-900">{candidate.displayName || candidate.fullName}</p>
                <p className="text-xs text-slate-600">{candidate.jobTitle} · {candidate.yearsOfExperience} yrs exp · {candidate.currentLocation}</p>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Vacancy / Target Position *
                </label>
                <input
                  type="text"
                  required
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  placeholder="e.g. Cluster Executive Chef"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Proposed Interview Window &amp; Time *
                </label>
                <input
                  type="text"
                  required
                  value={proposedDate}
                  onChange={(e) => setProposedDate(e.target.value)}
                  placeholder="e.g. Next Tuesday at 10:00 AM GST (Video / On-site)"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Special Instructions or Scope Notes
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please state if a tasting test, portfolio deck, or technical presentation is required during the session..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white text-slate-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Interview Request</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
