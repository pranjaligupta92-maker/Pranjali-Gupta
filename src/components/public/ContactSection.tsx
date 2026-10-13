import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, Mail, MessageSquare, MapPin, Globe, Linkedin, Instagram, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { settings, submitAccessRequest } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'candidate_access',
    roleOrCompany: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    submitAccessRequest({
      type: formData.category === 'employer_hiring' ? 'employer' : 'candidate',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      companyName: formData.category === 'employer_hiring' ? formData.roleOrCompany : undefined,
      desiredRoleOrIndustry: formData.roleOrCompany || 'General Inquiry',
      notes: formData.message
    });

    setIsSubmitted(true);
  };

  // Helper to determine if a placeholder is set or an actual phone/email is entered
  const isPlaceholder = (val: string) => !val || val.startsWith('[') || val.includes('OWNER');

  const getPhoneHref = (phone: string) => {
    if (isPlaceholder(phone)) return null;
    return `tel:${phone.replace(/[^\d+]/g, '')}`;
  };

  const getWhatsAppHref = (wa: string) => {
    if (isPlaceholder(wa)) return null;
    const cleanNum = wa.replace(/[^\d]/g, '');
    return `https://wa.me/${cleanNum}?text=Hello%20HM%20Consultant,%20I%20am%20inquiring%20about%20recruitment%20services.`;
  };

  const getEmailHref = (email: string) => {
    if (isPlaceholder(email)) return null;
    return `mailto:${email}?subject=Recruitment%20Inquiry%20-%20HM%20Consultant`;
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
            Executive Inquiries &amp; Consultations
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 tracking-tight">
            Contact HM Consultant
          </h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Reach our advisory team directly regarding candidate access credentials, employer recruitment partnerships, or confidential talent searches.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Details Cards with explicit placeholders and click-to-action */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Notice about placeholders */}
            <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-4 text-xs text-amber-900">
              <p className="font-semibold mb-1 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                Configurable Direct Contact Channels
              </p>
              <p className="text-amber-800 text-[11px] leading-relaxed">
                Contact information below uses official business configuration. The system administrator can update phone numbers, WhatsApp, and office addresses anytime inside the Admin Settings.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5 shadow-xs">
              
              {/* Phone */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-slate-100 text-slate-800 shrink-0">
                  <Phone className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Direct Telephone</p>
                  {getPhoneHref(settings.phone) ? (
                    <a
                      href={getPhoneHref(settings.phone)!}
                      className="text-sm font-bold text-slate-900 hover:text-amber-700 transition-colors block mt-0.5"
                    >
                      {settings.phone} <span className="text-xs text-amber-600 font-normal ml-1">(Click to call)</span>
                    </a>
                  ) : (
                    <span className="text-sm font-mono text-slate-600 font-semibold block mt-0.5">
                      {settings.phone}
                    </span>
                  )}
                  <p className="text-[11px] text-slate-400">Monday - Saturday, 9:30 AM - 6:30 PM IST</p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-slate-100 text-slate-800 shrink-0">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Official WhatsApp</p>
                  {getWhatsAppHref(settings.whatsapp) ? (
                    <a
                      href={getWhatsAppHref(settings.whatsapp)!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors block mt-0.5"
                    >
                      {settings.whatsapp} <span className="text-xs font-normal ml-1">(Click to chat)</span>
                    </a>
                  ) : (
                    <span className="text-sm font-mono text-slate-600 font-semibold block mt-0.5">
                      {settings.whatsapp}
                    </span>
                  )}
                  <p className="text-[11px] text-slate-400">Instant candidate advisory &amp; quick inquiries</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-slate-100 text-slate-800 shrink-0">
                  <Mail className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Business Inquiries</p>
                  {getEmailHref(settings.email) ? (
                    <a
                      href={getEmailHref(settings.email)!}
                      className="text-sm font-bold text-slate-900 hover:text-amber-700 transition-colors block mt-0.5"
                    >
                      {settings.email}
                    </a>
                  ) : (
                    <span className="text-sm font-mono text-slate-600 font-semibold block mt-0.5">
                      {settings.email}
                    </span>
                  )}
                  <p className="text-[11px] text-slate-400">Executive talent and employer account requests</p>
                </div>
              </div>

              {/* Office Address */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-slate-100 text-slate-800 shrink-0">
                  <MapPin className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Corporate Office</p>
                  <span className="text-sm font-semibold text-slate-900 block mt-0.5">
                    {settings.officeAddress}
                  </span>
                  <p className="text-[11px] text-slate-400">Republic of India</p>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5 text-slate-600 font-semibold">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span>{settings.websiteDomain}</span>
                </div>
                <span className="text-slate-300">·</span>
                <span className="text-slate-500 font-mono text-[11px]">{settings.linkedinUrl}</span>
              </div>

            </div>
          </div>

          {/* Right: Message & Inquiry Submission Form */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-8 shadow-xs">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-display text-slate-900">
                  Inquiry Received
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to HM Consultant. Your request has been logged in our secure admin coordination queue. An executive consultant will respond within 24 business hours.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', category: 'candidate_access', roleOrCompany: '', message: '' });
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold font-display text-slate-900">
                    Send an Official Inquiry
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Select your objective to ensure routing to the appropriate sector practice lead.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Johnathan Miller"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. +91 98200 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
                    >
                      <option value="candidate_access">Candidate: Request Upload Credentials</option>
                      <option value="employer_hiring">Employer: Request Hiring Account</option>
                      <option value="executive_search">Retained Executive Search</option>
                      <option value="general">General Advisory &amp; Partnership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Role Discipline or Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Executive Pastry Chef or Jumeirah Group"
                    value={formData.roleOrCompany}
                    onChange={(e) => setFormData({ ...formData, roleOrCompany: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Message / Career Summary
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Provide details regarding your experience, certifications, or specific hiring requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Inquiry to HM Consultant</span>
                  </button>
                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    Information handled strictly pursuant to India's Digital Personal Data Protection Act, 2023 (DPDP Act).
                  </p>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
