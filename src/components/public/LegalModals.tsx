import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Shield, FileText, CheckCircle, Search, Globe, Lock } from 'lucide-react';

export const LegalModals: React.FC = () => {
  const { activeLegalModal, closeLegalModal, settings } = useApp();

  if (!activeLegalModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            {activeLegalModal === 'privacy' && <Shield className="w-5 h-5 text-amber-600" />}
            {activeLegalModal === 'terms' && <FileText className="w-5 h-5 text-slate-700" />}
            {activeLegalModal === 'consent' && <Lock className="w-5 h-5 text-emerald-600" />}
            {activeLegalModal === 'seo_guide' && <Search className="w-5 h-5 text-blue-600" />}
            <h3 className="text-base font-bold font-display text-slate-900">
              {activeLegalModal === 'privacy' && 'Privacy Policy & India DPDP Act (2023) Notice'}
              {activeLegalModal === 'terms' && 'Terms and Conditions of Service (India)'}
              {activeLegalModal === 'consent' && 'Candidate Data Consent & Disclaimer (India)'}
              {activeLegalModal === 'seo_guide' && 'Google Search Console & SEO Setup Guide'}
            </h3>
          </div>
          <button
            onClick={closeLegalModal}
            className="p-1 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-600 leading-relaxed">
          
          {/* Privacy Policy */}
          {activeLegalModal === 'privacy' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 font-medium">
                Effective Date: October 2026 · Governing Law: Republic of India · Digital Personal Data Protection Act, 2023 (DPDP Act, 2023) &amp; Information Technology Act, 2000 (read with SPDI Rules 2011).
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">1. Scope and Identity of Data Fiduciary</h4>
                <p>
                  HM Consultant operates as an executive recruitment consultancy in India. Under Section 2(i) of the Digital Personal Data Protection Act, 2023 (DPDP Act), HM Consultant functions as the <strong>Data Fiduciary</strong>, and registered job seekers function as <strong>Data Principals</strong>. This Privacy Policy governs the lawful processing of digital personal records, resumes, certificates, and employment credentials.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">2. Personal Data Collected &amp; Processed</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Candidate Identity:</strong> Full legal name, date of birth, gender, contact number, email address, current city and state of residence.</li>
                  <li><strong>Professional Profile:</strong> Work history, previous employers, job titles, FSSAI FoSTaC certifications, engineering licenses (CEA/BEE), educational degrees (NCHMCT/AICTE recognized), and portfolio documents.</li>
                  <li><strong>Portal Credentials:</strong> Username, password hash, authenticated session logs, and document upload history.</li>
                  <li><strong>Employer Verification Data:</strong> Company legal name, Corporate Identification Number (CIN) or GSTIN, authorized HR contact person details, official business email.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">3. Lawful Purpose &amp; Section 6 Consent</h4>
                <p>
                  In accordance with Section 6 of the DPDP Act 2023, personal data is processed solely on the basis of free, specific, informed, unconditional, and unambiguous consent given by the Data Principal for evaluating candidacy for employment vacancies and presenting verified credentials to authorized employers. Personal data is never sold, leased, traded, or indexed on public web crawlers.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">4. Data Retention and Erasure Protocol</h4>
                <p>
                  Personal data and supporting documents are retained for an active period of {settings.dataRetentionMonths} months from the latest candidate profile interaction or until consent is withdrawn by the Data Principal, in compliance with Section 8(7) of the DPDP Act 2023, following which records are permanently deleted or irreversibly anonymized.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">5. Rights of the Data Principal &amp; Grievance Redressal</h4>
                <p>
                  Under Sections 11–14 of the DPDP Act 2023, you retain:
                </p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li><strong>Right to Access Information:</strong> Summary of personal data processed and identities of authorized employers with whom it has been shared.</li>
                  <li><strong>Right to Correction &amp; Erasure:</strong> Rectification of inaccurate or outdated credentials, and permanent deletion of records.</li>
                  <li><strong>Right of Grievance Redressal:</strong> Dedicated redressal through our Grievance Officer at: <strong className="text-slate-900">{settings.grievanceOfficerEmail || settings.email}</strong>.</li>
                  <li><strong>Right to Appeal:</strong> If unsatisfied with the internal grievance resolution within 30 days, Data Principals may file an appeal before the <strong>Data Protection Board of India (DPBI)</strong>.</li>
                </ul>
              </div>
            </div>
          )}

          {/* Terms and Conditions */}
          {activeLegalModal === 'terms' && (
            <div className="space-y-4">
              <div className="p-3 bg-slate-100 border border-slate-200 rounded-lg text-slate-800 font-medium">
                Standard Terms of Engagement · HM Consultant Recruitment Services (India).
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">1. Legal Agreement and Jurisdiction</h4>
                <p>
                  This agreement is governed by the laws of India, including the Indian Contract Act, 1872. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the competent civil courts in India.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">2. Candidate Representation and Credential Integrity</h4>
                <p>
                  Candidates warrant that all diplomas, FSSAI certificates, CEA technical licenses, and previous experience letters are genuine and issued by recognized institutions. Any intentional falsification or misrepresentation constitutes grounds for immediate termination of portal access and revocation of candidate representation.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">3. Employer Obligations and Confidentiality</h4>
                <p>
                  Authorized hiring entities granted portal access undertake to use candidate CVs, portfolios, and contact details exclusively for bona fide recruitment evaluations within their registered corporate group. Employers shall not re-distribute, leak, or sell candidate profiles to external recruitment agencies or third parties.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">4. Disclaimer of Direct Employment Contract</h4>
                <p>
                  HM Consultant operates as a talent search facilitator. While comprehensive due diligence is exercised, HM Consultant does not execute final employment contracts; all terms of remuneration, appointment letters, and employee benefits are executed directly between the hiring organization and the prospective employee in accordance with applicable Indian Labour Codes and statutory regulations.
                </p>
              </div>
            </div>
          )}

          {/* Candidate Consent & Disclaimer */}
          {activeLegalModal === 'consent' && (
            <div className="space-y-4">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 font-medium flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>Candidate Consent Declaration: DPDP Act 2023 &amp; Ethical Recruitment Guarantee.</span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">1. Explicit Affirmative Consent</h4>
                <p>
                  In accordance with Section 6(1) of the Digital Personal Data Protection Act, 2023, you grant HM Consultant explicit and affirmative consent to store your CV, photograph, professional certifications (such as FSSAI, NCHMCT, AICTE, CEA), and employment history, and to make these records accessible to vetted and authorized employer organizations for potential hiring opportunities.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">2. Privacy Discretion &amp; Masked Display</h4>
                <p>
                  Candidates who enable the "Discreet Mode" toggle will have their legal surname masked during general employer talent browsing (e.g. displayed as <em>Chef Vikram S. – Executive Chef</em>). Full contact numbers and downloadable documents are only shared after a formal mutual interview coordination request is initiated.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">3. Strict Zero Recruitment Fee Policy for Job Seekers</h4>
                <p>
                  In strict compliance with Indian employment standards, Ministry of Labour &amp; Employment guidelines, and ethical recruitment frameworks: <strong>HM Consultant DOES NOT charge any recruitment fee, registration fee, document processing fee, or interview deposit to job seekers.</strong> Any claim of fee collection on behalf of HM Consultant is fraudulent and should be reported to our Grievance Officer immediately.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">4. Right to Withdraw Consent</h4>
                <p>
                  Under Section 6(4) of the DPDP Act 2023, you may withdraw your consent at any time via your candidate portal profile settings or by written notice to <strong className="text-slate-900">{settings.email}</strong>. Upon withdrawal, your documents and personal records will be removed from active employer matching.
                </p>
              </div>
            </div>
          )}

          {/* SEO & Search Console Guide */}
          {activeLegalModal === 'seo_guide' && (
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 font-medium">
                Google Search Console, Domain &amp; SEO Technical Implementation Guide (India).
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">1. Public Indexing Strategy</h4>
                <p>
                  To maximize organic search discoverability from luxury hotel HR directors, hospitality owners, and engineering enterprises across India:
                </p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li><strong>Indexable Pages:</strong> Home, About Us, Industries We Serve, Browse Talent Categories, For Employers, Candidate Registration Guide, Contact Us.</li>
                  <li><strong>Non-Indexed Pages (Noindex):</strong> Candidate Portals, Employer Portals, Admin Dashboards, and private CV files to comply strictly with candidate privacy rules.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">2. Google Search Console Setup Steps</h4>
                <ol className="list-decimal pl-5 mt-1 space-y-1">
                  <li>Open <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-semibold">Google Search Console</a> and click <em>Add Property</em>.</li>
                  <li>Choose <strong>URL Prefix</strong> (e.g. <code>https://{settings.websiteDomain || 'hmhire.in'}</code>) or <strong>Domain</strong>.</li>
                  <li>Verify ownership using DNS TXT record with your Indian domain registrar (e.g. GoDaddy India, Hostinger India) or HTML meta tag verification.</li>
                  <li>Submit your sitemap at <code>/sitemap.xml</code>. Google will crawl the public sector hierarchy.</li>
                </ol>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">3. Structured Data (Schema.org) Embedded</h4>
                <p>
                  The website includes valid JSON-LD schema for <code>EmploymentAgency</code> with sector keywords (Hospitality Recruitment India, Hotel Executive Search, F&B Staffing FSSAI Compliant, Engineering Staffing) targeting the Indian market in the HTML <code>&lt;head&gt;</code>.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">4. HTTPS &amp; Custom Domain Deployment</h4>
                <p>
                  Ensure SSL certification is active (HTTPS). Set canonical URL tags pointing to <code>https://hmhire.in</code> to establish domain authority across search engines.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            onClick={closeLegalModal}
            className="px-4 py-2 text-xs font-semibold text-slate-900 bg-slate-200 hover:bg-slate-300 rounded-lg transition-colors cursor-pointer"
          >
            Close Notice
          </button>
        </div>

      </div>
    </div>
  );
};
