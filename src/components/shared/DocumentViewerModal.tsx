import React from 'react';
import { CandidateDocument } from '../../types';
import { X, FileText, Download, ShieldCheck, CheckCircle2, Award, Printer } from 'lucide-react';

interface DocumentViewerModalProps {
  document: CandidateDocument | null;
  candidateName: string;
  onClose: () => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  document,
  candidateName,
  onClose
}) => {
  if (!document) return null;

  const handleDownload = () => {
    // Generate simulated download file
    const element = window.document.createElement('a');
    const file = new Blob([document.previewContent || `DOCUMENT: ${document.name}\nCandidate: ${candidateName}\nVerified by HM Consultant`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = document.name;
    window.document.body.appendChild(element);
    element.click();
    window.document.body.removeChild(element);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Top Bar */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-800 rounded-lg text-amber-400">
              {document.type === 'certificate' ? <Award className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white font-display truncate max-w-md">
                  {document.name}
                </h3>
                <span className="text-[10px] uppercase font-semibold tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800/80 px-2 py-0.5 rounded">
                  HM Vetted
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Candidate: <span className="text-slate-200 font-medium">{candidateName}</span> · Uploaded: {document.uploadedAt}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              title="Download Document"
              className="px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Download</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document Render Window */}
        <div className="p-8 overflow-y-auto bg-slate-100 flex-1 flex justify-center">
          <div className="bg-white max-w-2xl w-full rounded-xl shadow-md border border-slate-200 p-8 sm:p-10 text-slate-800 font-sans relative">
            
            {/* Watermark header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-xs">
                  HM
                </div>
                <span className="font-bold text-xs font-display tracking-tight text-slate-900">
                  HM Consultant · Confidential Registry
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Authenticity</span>
              </div>
            </div>

            {/* Document body */}
            <div className="space-y-4 text-xs font-mono leading-relaxed whitespace-pre-wrap bg-slate-50/80 p-6 rounded-lg border border-slate-200 text-slate-700">
              {document.previewContent || `OFFICIAL RECRUITMENT DOCUMENT\n\nTitle: ${document.name}\nCandidate Name: ${candidateName}\nDocument Type: ${document.type.toUpperCase()}\nFile Size: ${(document.sizeBytes / 1024).toFixed(1)} KB\nUploaded: ${document.uploadedAt}\n\n[Certified Digital Record on File with HM Consultant India]\nThis document has been inspected and cleared by our credential audit team in accordance with Indian recruitment verification standards.`}
            </div>

            {/* Document footer */}
            <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400">
              <span>Secured under India DPDP Act (2023) Privacy Protocols</span>
              <span>HM Hire Platform ID: {document.id}</span>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="px-6 py-3 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Protected candidate file. Distribution without consent is prohibited.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Close Viewer
          </button>
        </div>

      </div>
    </div>
  );
};
