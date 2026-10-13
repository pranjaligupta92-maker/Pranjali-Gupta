import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send, Lock, CheckCircle2, FileText, Upload, FileCheck2 } from 'lucide-react';

export const RequestUploadModal: React.FC = () => {
  const { isRequestUploadModalOpen, closeRequestUploadModal, submitAccessRequest } = useApp();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    consent: false
  });

  const [attachedFileName, setAttachedFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isRequestUploadModalOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFileName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.position || !formData.consent) return;

    submitAccessRequest({
      type: 'candidate',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      desiredRoleOrIndustry: formData.position,
      notes: attachedFileName ? `[CV Attached: ${attachedFileName}] Target Position: ${formData.position}` : `Target Position: ${formData.position}`
    });

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-400" />
            <h3 className="text-base font-bold font-display text-white">
              Ask Admin to Upload CV / Request Access
            </h3>
          </div>
          <button
            onClick={() => { closeRequestUploadModal(); setSubmitted(false); }}
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
                Request Delivered to Admin
              </h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you, {formData.name}. Our administration team has received your target position "{formData.position}"{attachedFileName ? ` and attached CV (${attachedFileName})` : ''}. We will review and issue your credentials or upload your CV directly.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => { closeRequestUploadModal(); setSubmitted(false); }}
                  className="px-5 py-2 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <p className="text-slate-600">
                You can ask the admin to upload your CV directly. Simply write your name, target position, and attach your CV (PDF file).
              </p>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. vikram@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone / WhatsApp *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. +91 98200 12345"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Position / Role *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Executive Chef, Restaurant Manager, F&B Captain, HVAC Technician"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white text-slate-900 font-medium"
                />
              </div>

              {/* Attach PDF File */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Attach CV (PDF File) *
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  id="modal-cv-upload"
                />
                <label
                  htmlFor="modal-cv-upload"
                  className={`flex items-center justify-between p-3 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                    attachedFileName
                      ? 'border-emerald-400 bg-emerald-50/50'
                      : 'border-slate-300 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {attachedFileName ? (
                      <FileCheck2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <Upload className="w-5 h-5 text-slate-500 shrink-0" />
                    )}
                    <span className="truncate text-slate-700 font-medium">
                      {attachedFileName || 'Click to attach your CV (PDF / DOC)'}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-amber-700 underline shrink-0 ml-2">
                    {attachedFileName ? 'Change' : 'Browse'}
                  </span>
                </label>
              </div>

              {/* Simple Consent Checkbox */}
              <div className="pt-2 border-t border-slate-100">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-0.5 rounded text-amber-500 focus:ring-amber-400"
                  />
                  <span className="text-[11px] text-slate-600 leading-normal">
                    I consent to HM Consultant processing my CV for recruitment opportunities in compliance with the DPDP Act, 2023.
                  </span>
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Ask Admin to Upload CV</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
