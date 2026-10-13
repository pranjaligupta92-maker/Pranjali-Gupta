import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  IndustryCategory,
  CandidateProfile,
  EmployerAccount,
  SiteSettings,
  AccessRequest,
  AuditLogEntry,
  InterviewRequest,
  CandidateDocument,
  UserRole,
  AdminEmailNotification
} from '../types';
import {
  INITIAL_INDUSTRIES,
  INITIAL_SETTINGS,
  INITIAL_CANDIDATES,
  INITIAL_EMPLOYERS,
  INITIAL_ACCESS_REQUESTS,
  INITIAL_INTERVIEW_REQUESTS,
  INITIAL_AUDIT_LOGS,
  INITIAL_NOTIFICATIONS
} from '../data/initialData';

interface AppContextType {
  // Data
  industries: IndustryCategory[];
  candidates: CandidateProfile[];
  employers: EmployerAccount[];
  accessRequests: AccessRequest[];
  interviewRequests: InterviewRequest[];
  auditLogs: AuditLogEntry[];
  settings: SiteSettings;
  emailNotifications: AdminEmailNotification[];

  // Active user / Auth
  currentRole: UserRole;
  currentUser: any;
  login: (role: 'admin' | 'employer' | 'candidate', emailOrUsername: string, pass: string) => { success: boolean; error?: string };
  logout: () => void;
  quickSwitchRole: (role: UserRole, specificId?: string) => void;
  registerEmployer: (data: {
    companyName: string;
    contactPerson: string;
    email: string;
    password?: string;
    phone?: string;
  }) => { success: boolean; message: string; employerId: string };
  approveEmployer: (employerId: string) => void;
  registerCandidate: (data: {
    fullName: string;
    email: string;
    password?: string;
    phone?: string;
    targetPosition?: string;
  }) => { success: boolean; message: string; candidateId: string };
  approveCandidate: (candidateId: string) => void;

  // Modals
  activeLegalModal: 'privacy' | 'terms' | 'consent' | 'seo_guide' | null;
  openLegalModal: (type: 'privacy' | 'terms' | 'consent' | 'seo_guide') => void;
  closeLegalModal: () => void;
  isAuthModalOpen: boolean;
  authModalTab: 'candidate' | 'employer' | 'admin';
  openAuthModal: (tab?: 'candidate' | 'employer' | 'admin') => void;
  closeAuthModal: () => void;
  isRequestUploadModalOpen: boolean;
  openRequestUploadModal: () => void;
  closeRequestUploadModal: () => void;
  isEmployerAccessModalOpen: boolean;
  openEmployerAccessModal: () => void;
  closeEmployerAccessModal: () => void;

  // Hierarchy CRUD
  addIndustry: (name: string, description: string) => void;
  updateIndustry: (id: string, name: string, description: string) => void;
  deleteIndustry: (id: string) => void;
  addFolder: (industryId: string, name: string) => void;
  updateFolder: (industryId: string, folderId: string, name: string) => void;
  deleteFolder: (industryId: string, folderId: string) => void;
  addJobTitle: (industryId: string, folderId: string, title: string) => void;
  deleteJobTitle: (industryId: string, folderId: string, title: string) => void;

  // Candidate Operations
  issueCandidateCredentials: (candidateData: {
    fullName: string;
    username: string;
    email: string;
    phone: string;
    industryId: string;
    folderId: string;
    jobTitle: string;
    temporaryPassword: string;
    yearsOfExperience: number;
    currentLocation: string;
  }) => CandidateProfile;
  updateCandidate: (id: string, updates: Partial<CandidateProfile>) => void;
  updateCandidateStatus: (id: string, status: 'approved' | 'pending_review' | 'suspended') => void;
  moveCandidateCategory: (id: string, industryId: string, folderId: string, jobTitle: string) => void;
  deleteCandidate: (id: string) => void;
  uploadCandidateDocument: (candidateId: string, doc: Omit<CandidateDocument, 'id' | 'uploadedAt'>) => void;
  deleteCandidateDocument: (candidateId: string, documentId: string) => void;
  exportCandidatesCSV: () => void;

  // Employer Operations
  updateEmployerPermissions: (employerId: string, allowedIndustryIds: string[]) => void;
  updateEmployerStatus: (employerId: string, status: 'approved' | 'pending_approval' | 'revoked') => void;
  deleteEmployer: (id: string) => void;
  toggleShortlist: (candidateId: string) => void;
  createInterviewRequest: (req: { candidateId: string; jobRole: string; proposedDate: string; message: string }) => void;
  updateInterviewStatus: (id: string, status: 'pending' | 'scheduled' | 'declined' | 'completed') => void;

  // Request & Settings
  submitAccessRequest: (req: Omit<AccessRequest, 'id' | 'status' | 'createdAt'>) => void;
  reviewAccessRequest: (id: string, status: 'approved' | 'rejected') => void;
  updateSettings: (updates: Partial<SiteSettings>) => void;
  resetAllToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from localStorage or initialize with seed data
  const [industries, setIndustries] = useState<IndustryCategory[]>(() => {
    const saved = localStorage.getItem('hm_industries');
    return saved ? JSON.parse(saved) : INITIAL_INDUSTRIES;
  });

  const [candidates, setCandidates] = useState<CandidateProfile[]>(() => {
    const saved = localStorage.getItem('hm_candidates');
    return saved ? JSON.parse(saved) : INITIAL_CANDIDATES;
  });

  const [employers, setEmployers] = useState<EmployerAccount[]>(() => {
    const saved = localStorage.getItem('hm_employers');
    return saved ? JSON.parse(saved) : INITIAL_EMPLOYERS;
  });

  const [accessRequests, setAccessRequests] = useState<AccessRequest[]>(() => {
    const saved = localStorage.getItem('hm_access_requests');
    return saved ? JSON.parse(saved) : INITIAL_ACCESS_REQUESTS;
  });

  const [interviewRequests, setInterviewRequests] = useState<InterviewRequest[]>(() => {
    const saved = localStorage.getItem('hm_interview_requests');
    return saved ? JSON.parse(saved) : INITIAL_INTERVIEW_REQUESTS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    const saved = localStorage.getItem('hm_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('hm_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [emailNotifications, setEmailNotifications] = useState<AdminEmailNotification[]>(() => {
    const saved = localStorage.getItem('hm_email_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Current session
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('hm_current_role');
    return saved ? (JSON.parse(saved) as UserRole) : null;
  });

  const [currentUserId, setCurrentUserId] = useState<string | null>(() => {
    return localStorage.getItem('hm_current_user_id') || null;
  });

  // Modals state
  const [activeLegalModal, setActiveLegalModal] = useState<'privacy' | 'terms' | 'consent' | 'seo_guide' | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'candidate' | 'employer' | 'admin'>('candidate');
  const [isRequestUploadModalOpen, setIsRequestUploadModalOpen] = useState(false);
  const [isEmployerAccessModalOpen, setIsEmployerAccessModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => { localStorage.setItem('hm_industries', JSON.stringify(industries)); }, [industries]);
  useEffect(() => { localStorage.setItem('hm_candidates', JSON.stringify(candidates)); }, [candidates]);
  useEffect(() => { localStorage.setItem('hm_employers', JSON.stringify(employers)); }, [employers]);
  useEffect(() => { localStorage.setItem('hm_access_requests', JSON.stringify(accessRequests)); }, [accessRequests]);
  useEffect(() => { localStorage.setItem('hm_interview_requests', JSON.stringify(interviewRequests)); }, [interviewRequests]);
  useEffect(() => { localStorage.setItem('hm_audit_logs', JSON.stringify(auditLogs)); }, [auditLogs]);
  useEffect(() => { localStorage.setItem('hm_settings', JSON.stringify(settings)); }, [settings]);
  useEffect(() => { localStorage.setItem('hm_email_notifications', JSON.stringify(emailNotifications)); }, [emailNotifications]);
  useEffect(() => {
    localStorage.setItem('hm_current_role', JSON.stringify(currentRole));
    if (currentUserId) {
      localStorage.setItem('hm_current_user_id', currentUserId);
    } else {
      localStorage.removeItem('hm_current_user_id');
    }
  }, [currentRole, currentUserId]);

  const addAuditLog = (actorRole: 'admin' | 'candidate' | 'employer' | 'system', actorName: string, action: string, details: string) => {
    const newLog: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      actorRole,
      actorName,
      action,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Derive active user object
  const currentUser = React.useMemo(() => {
    if (currentRole === 'admin') {
      return { email: 'admin@hmconsultant.in', name: 'Executive Administrator' };
    }
    if (currentRole === 'candidate') {
      return candidates.find(c => c.id === currentUserId) || candidates[0] || null;
    }
    if (currentRole === 'employer') {
      return employers.find(e => e.id === currentUserId) || employers[0] || null;
    }
    return null;
  }, [currentRole, currentUserId, candidates, employers]);

  // Auth Functions
  const login = (role: 'admin' | 'employer' | 'candidate', emailOrUsername: string, pass: string) => {
    const cleanInput = emailOrUsername.trim().toLowerCase();

    if (role === 'admin') {
      // Admin check
      if ((cleanInput === 'admin@hmhire.in' || cleanInput === 'admin@hmhire.com' || cleanInput === 'admin@hmconsultant.in' || cleanInput === 'admin') && (pass === 'Admin@2026' || pass === 'admin')) {
        setCurrentRole('admin');
        setCurrentUserId('admin');
        addAuditLog('admin', 'Executive Administrator', 'ADMIN_LOGIN', 'Administrator authenticated successfully.');
        return { success: true };
      }
      return { success: false, error: 'Invalid admin credentials. Use admin@hmhire.in / Admin@2026' };
    }

    if (role === 'candidate') {
      const match = candidates.find(c => 
        c.email.toLowerCase() === cleanInput || 
        c.username.toLowerCase() === cleanInput ||
        (c.employeeId && c.employeeId.toLowerCase() === cleanInput)
      );
      if (match) {
        const isPasswordCorrect = (match.temporaryPassword && match.temporaryPassword === pass) || pass === 'Candidate@2026' || pass === 'password';
        if (!isPasswordCorrect) {
          return { success: false, error: 'Incorrect password for this candidate account. Please verify your credentials.' };
        }
        if (match.status === 'suspended') {
          return { success: false, error: 'Your candidate account has been suspended by the administrator.' };
        }
        if (match.status === 'pending_review' || match.uploadPermissionGranted === false) {
          return {
            success: false,
            error: `Your candidate account (${match.employeeId || match.id}) is awaiting administrator approval. A notification has been sent to our registered admin email (admin@hmhire.in). Once approved, you can log in to upload your CV.`
          };
        }
        setCurrentRole('candidate');
        setCurrentUserId(match.id);
        addAuditLog('candidate', match.fullName, 'CANDIDATE_LOGIN', `Candidate logged in to portal. Status: ${match.status}`);
        return { success: true };
      }
      return { success: false, error: 'Candidate account not found with this email. You can register for candidate access below.' };
    }

    if (role === 'employer') {
      const match = employers.find(e => 
        e.email.toLowerCase() === cleanInput || e.id.toLowerCase() === cleanInput
      );
      if (match) {
        const isPasswordCorrect = (match.password && match.password === pass) || pass === 'Employer@2026' || pass === 'password';
        if (!isPasswordCorrect) {
          return { success: false, error: 'Incorrect password for this employer account. Please verify credentials or reset.' };
        }
        if (match.status === 'revoked') {
          return { success: false, error: 'Employer access has been revoked. Contact HM Consultant desk.' };
        }
        if (match.status === 'pending_approval') {
          return {
            success: false,
            error: `Your employer account (${match.id} - ${match.companyName}) is pending administrator approval. A notification has been sent to our registered admin email (admin@hmhire.in). You will be able to log in to review all CVs once approved.`
          };
        }
        setCurrentRole('employer');
        setCurrentUserId(match.id);
        addAuditLog('employer', match.companyName, 'EMPLOYER_LOGIN', `Authorized hiring company (${match.id}) logged into portal.`);
        return { success: true };
      }
      return { success: false, error: 'No employer account found with this email. You can register for new employer access below.' };
    }

    return { success: false, error: 'Unknown role' };
  };

  const getCurrentUserLabel = () => {
    if (currentRole === 'admin') return 'Executive Administrator';
    if (currentRole === 'candidate') return (currentUser as CandidateProfile)?.fullName || 'Candidate';
    if (currentRole === 'employer') return (currentUser as EmployerAccount)?.companyName || 'Employer';
    return 'User';
  };

  const logout = () => {
    addAuditLog(currentRole || 'system', getCurrentUserLabel(), 'LOGOUT', 'User signed out.');
    setCurrentRole(null);
    setCurrentUserId(null);
  };

  const quickSwitchRole = (role: UserRole, specificId?: string) => {
    if (!role) {
      logout();
      return;
    }
    if (role === 'admin') {
      setCurrentRole('admin');
      setCurrentUserId('admin');
      addAuditLog('admin', 'Admin Switcher', 'ROLE_SWITCH', 'Switched session to Executive Administrator');
    } else if (role === 'candidate') {
      const target = specificId ? candidates.find(c => c.id === specificId) : candidates[0];
      if (target) {
        setCurrentRole('candidate');
        setCurrentUserId(target.id);
        addAuditLog('candidate', target.fullName, 'ROLE_SWITCH', `Switched session to candidate: ${target.fullName}`);
      }
    } else if (role === 'employer') {
      const target = specificId ? employers.find(e => e.id === specificId) : employers[0];
      if (target) {
        setCurrentRole('employer');
        setCurrentUserId(target.id);
        addAuditLog('employer', target.companyName, 'ROLE_SWITCH', `Switched session to employer: ${target.companyName}`);
      }
    }
  };

  // Modals helpers
  const openLegalModal = (type: 'privacy' | 'terms' | 'consent' | 'seo_guide') => setActiveLegalModal(type);
  const closeLegalModal = () => setActiveLegalModal(null);
  const openAuthModal = (tab: 'candidate' | 'employer' | 'admin' = 'candidate') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };
  const closeAuthModal = () => setIsAuthModalOpen(false);
  const openRequestUploadModal = () => setIsRequestUploadModalOpen(true);
  const closeRequestUploadModal = () => setIsRequestUploadModalOpen(false);
  const openEmployerAccessModal = () => setIsEmployerAccessModalOpen(true);
  const closeEmployerAccessModal = () => setIsEmployerAccessModalOpen(false);

  // Hierarchy CRUD
  const addIndustry = (name: string, description: string) => {
    const newInd: IndustryCategory = {
      id: `ind-${Date.now()}`,
      name,
      description,
      folders: []
    };
    setIndustries(prev => [...prev, newInd]);
    addAuditLog('admin', 'Administrator', 'INDUSTRY_CREATED', `Created new industry category: ${name}`);
  };

  const updateIndustry = (id: string, name: string, description: string) => {
    setIndustries(prev => prev.map(ind => ind.id === id ? { ...ind, name, description } : ind));
    addAuditLog('admin', 'Administrator', 'INDUSTRY_UPDATED', `Updated industry category: ${name}`);
  };

  const deleteIndustry = (id: string) => {
    const target = industries.find(i => i.id === id);
    setIndustries(prev => prev.filter(ind => ind.id !== id));
    addAuditLog('admin', 'Administrator', 'INDUSTRY_DELETED', `Deleted industry category: ${target?.name || id}`);
  };

  const addFolder = (industryId: string, name: string) => {
    const newFolder = {
      id: `fld-${Date.now()}`,
      name,
      jobTitles: []
    };
    setIndustries(prev => prev.map(ind => {
      if (ind.id === industryId) {
        return { ...ind, folders: [...ind.folders, newFolder] };
      }
      return ind;
    }));
    addAuditLog('admin', 'Administrator', 'FOLDER_CREATED', `Created folder "${name}" under industry.`);
  };

  const updateFolder = (industryId: string, folderId: string, name: string) => {
    setIndustries(prev => prev.map(ind => {
      if (ind.id === industryId) {
        return {
          ...ind,
          folders: ind.folders.map(f => f.id === folderId ? { ...f, name } : f)
        };
      }
      return ind;
    }));
  };

  const deleteFolder = (industryId: string, folderId: string) => {
    setIndustries(prev => prev.map(ind => {
      if (ind.id === industryId) {
        return {
          ...ind,
          folders: ind.folders.filter(f => f.id !== folderId)
        };
      }
      return ind;
    }));
  };

  const addJobTitle = (industryId: string, folderId: string, title: string) => {
    setIndustries(prev => prev.map(ind => {
      if (ind.id === industryId) {
        return {
          ...ind,
          folders: ind.folders.map(f => {
            if (f.id === folderId && !f.jobTitles.includes(title)) {
              return { ...f, jobTitles: [...f.jobTitles, title] };
            }
            return f;
          })
        };
      }
      return ind;
    }));
  };

  const deleteJobTitle = (industryId: string, folderId: string, title: string) => {
    setIndustries(prev => prev.map(ind => {
      if (ind.id === industryId) {
        return {
          ...ind,
          folders: ind.folders.map(f => {
            if (f.id === folderId) {
              return { ...f, jobTitles: f.jobTitles.filter(t => t !== title) };
            }
            return f;
          })
        };
      }
      return ind;
    }));
  };

  // Candidate Operations
  const issueCandidateCredentials = (candidateData: {
    fullName: string;
    username: string;
    email: string;
    phone: string;
    industryId: string;
    folderId: string;
    jobTitle: string;
    temporaryPassword: string;
    yearsOfExperience: number;
    currentLocation: string;
  }) => {
    const newCand: CandidateProfile = {
      id: `cand-${Date.now()}`,
      username: candidateData.username.toLowerCase(),
      email: candidateData.email.toLowerCase(),
      fullName: candidateData.fullName,
      displayName: `${candidateData.fullName.split(' ')[0]} ${candidateData.fullName.split(' ')[1]?.[0] || ''}. (${candidateData.jobTitle})`,
      useDiscreetName: false,
      phone: candidateData.phone,
      industryId: candidateData.industryId,
      folderId: candidateData.folderId,
      jobTitle: candidateData.jobTitle,
      yearsOfExperience: candidateData.yearsOfExperience || 1,
      currentLocation: candidateData.currentLocation || 'Mumbai, India',
      preferredLocations: ['Mumbai', 'Delhi NCR', 'Bengaluru'],
      availability: 'Immediately',
      keySkills: ['Verified Background', 'Industry Certified'],
      qualifications: ['Professional Qualification'],
      bio: `Professional ${candidateData.jobTitle} with ${candidateData.yearsOfExperience} years of proven expertise.`,
      documents: [],
      consentGiven: true,
      consentDate: new Date().toISOString().split('T')[0],
      status: 'approved',
      uploadPermissionGranted: true,
      createdAt: new Date().toISOString().split('T')[0],
      temporaryPassword: candidateData.temporaryPassword
    };

    setCandidates(prev => [newCand, ...prev]);
    addAuditLog('admin', 'Administrator', 'CREDENTIALS_ISSUED', `Issued credentials for candidate ${newCand.fullName} (${newCand.username}). Temporary password active.`);
    return newCand;
  };

  const updateCandidate = (id: string, updates: Partial<CandidateProfile>) => {
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    addAuditLog(currentRole || 'system', getCurrentUserLabel(), 'CANDIDATE_PROFILE_UPDATED', `Candidate profile updated for ID: ${id}`);
  };

  const updateCandidateStatus = (id: string, status: 'approved' | 'pending_review' | 'suspended') => {
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, status } : c));
    addAuditLog('admin', 'Administrator', 'CANDIDATE_STATUS_CHANGED', `Candidate ID ${id} status set to ${status}.`);
  };

  const moveCandidateCategory = (id: string, industryId: string, folderId: string, jobTitle: string) => {
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, industryId, folderId, jobTitle } : c));
    addAuditLog('admin', 'Administrator', 'CANDIDATE_CATEGORY_MOVED', `Candidate ID ${id} reassigned to ${jobTitle}.`);
  };

  const deleteCandidate = (id: string) => {
    setCandidates(prev => prev.filter(c => c.id !== id));
    addAuditLog('admin', 'Administrator', 'CANDIDATE_DELETED', `Candidate profile ${id} permanently removed.`);
  };

  const uploadCandidateDocument = (candidateId: string, doc: Omit<CandidateDocument, 'id' | 'uploadedAt'>) => {
    const newDoc: CandidateDocument = {
      ...doc,
      id: `doc-${Date.now()}`,
      uploadedAt: new Date().toISOString().split('T')[0]
    };

    setCandidates(prev => prev.map(c => {
      if (c.id === candidateId) {
        return {
          ...c,
          documents: [...c.documents, newDoc]
        };
      }
      return c;
    }));
    addAuditLog('candidate', getCurrentUserLabel(), 'DOCUMENT_UPLOADED', `Uploaded document: ${doc.name} (${doc.type})`);
  };

  const deleteCandidateDocument = (candidateId: string, documentId: string) => {
    setCandidates(prev => prev.map(c => {
      if (c.id === candidateId) {
        return {
          ...c,
          documents: c.documents.filter(d => d.id !== documentId)
        };
      }
      return c;
    }));
    addAuditLog('candidate', getCurrentUserLabel(), 'DOCUMENT_DELETED', `Removed document ID: ${documentId}`);
  };

  const exportCandidatesCSV = () => {
    const headers = ['ID', 'Full Name', 'Display Name', 'Job Title', 'Industry', 'Experience (Years)', 'Location', 'Availability', 'Status', 'Created At'];
    const rows = candidates.map(c => {
      const ind = industries.find(i => i.id === c.industryId)?.name || c.industryId;
      return [
        c.id,
        `"${c.fullName}"`,
        `"${c.displayName}"`,
        `"${c.jobTitle}"`,
        `"${ind}"`,
        c.yearsOfExperience,
        `"${c.currentLocation}"`,
        `"${c.availability}"`,
        c.status,
        c.createdAt
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `hm_consultant_candidates_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addAuditLog('admin', 'Administrator', 'DATA_EXPORT', 'Exported authorized candidate registry to CSV.');
  };

  // Employer Operations
  const updateEmployerPermissions = (employerId: string, allowedIndustryIds: string[]) => {
    setEmployers(prev => prev.map(e => e.id === employerId ? { ...e, allowedIndustryIds } : e));
    addAuditLog('admin', 'Administrator', 'PERMISSIONS_MODIFIED', `Employer ${employerId} allowed industries updated.`);
  };

  const updateEmployerStatus = (employerId: string, status: 'approved' | 'pending_approval' | 'revoked') => {
    setEmployers(prev => prev.map(e => e.id === employerId ? { ...e, status } : e));
    addAuditLog('admin', 'Administrator', 'EMPLOYER_STATUS_CHANGED', `Employer ${employerId} status set to ${status}.`);
  };

  const deleteEmployer = (id: string) => {
    setEmployers(prev => prev.filter(e => e.id !== id));
    addAuditLog('admin', 'Administrator', 'EMPLOYER_DELETED', `Removed employer account ${id}.`);
  };

  const registerEmployer = (data: {
    companyName: string;
    contactPerson: string;
    email: string;
    password?: string;
    phone?: string;
  }) => {
    const cleanEmail = data.email.trim().toLowerCase();
    const existing = employers.find(e => e.email.toLowerCase() === cleanEmail);
    if (existing) {
      if (existing.status === 'pending_approval') {
        return {
          success: false,
          message: `An account for ${data.email} is already registered and awaiting administrator approval. A notification has been sent to our registered admin email (admin@hmhire.in).`,
          employerId: existing.id
        };
      }
      return {
        success: false,
        message: `An account with email ${data.email} already exists. Please sign in with your password.`,
        employerId: existing.id
      };
    }

    const newEmpId = `EMP-2026-0${Math.floor(10 + Math.random() * 90)}`;
    const allIndustryIds = industries.map(i => i.id);

    const newEmp: EmployerAccount = {
      id: newEmpId,
      companyName: data.companyName.trim(),
      contactPerson: data.contactPerson.trim(),
      email: cleanEmail,
      password: data.password?.trim() || 'Employer@2026',
      phone: data.phone?.trim() || '+91 22 0000 0000',
      status: 'pending_approval',
      allowedIndustryIds: allIndustryIds,
      shortlists: [],
      createdAt: new Date().toISOString().split('T')[0]
    };

    setEmployers(prev => [newEmp, ...prev]);

    const notif: AdminEmailNotification = {
      id: `notif-${Date.now()}`,
      type: 'employer',
      toEmail: 'admin@hmhire.in',
      fromEmail: newEmp.email,
      subject: `New Employer Registration Awaiting Approval: ${newEmp.companyName} (${newEmpId})`,
      targetId: newEmpId,
      nameOrCompany: newEmp.companyName,
      contactPerson: newEmp.contactPerson,
      positionOrIndustry: 'All Authorized Sectors',
      createdAt: newEmp.createdAt,
      status: 'awaiting_approval'
    };

    setEmailNotifications(prev => [notif, ...prev]);
    addAuditLog('system', newEmp.companyName, 'EMPLOYER_REGISTRATION_SUBMITTED', `New employer registration submitted for ${newEmp.email}. Notification dispatched to registered admin email (admin@hmhire.in).`);

    return {
      success: true,
      message: `Registration submitted for ${newEmp.companyName}! A notification has been sent to our registered admin email (admin@hmhire.in). Once approved, you can log in to review all CVs.`,
      employerId: newEmpId
    };
  };

  const approveEmployer = (employerId: string) => {
    setEmployers(prev => prev.map(e => e.id === employerId ? { ...e, status: 'approved' } : e));
    setEmailNotifications(prev => prev.map(n => n.targetId === employerId ? { ...n, status: 'approved' } : n));
    const target = employers.find(e => e.id === employerId);
    addAuditLog('admin', 'Administrator', 'EMPLOYER_APPROVED', `Approved employer account ${target?.companyName || employerId}. Granted CV directory access.`);
  };

  const registerCandidate = (data: {
    fullName: string;
    email: string;
    password?: string;
    phone?: string;
    targetPosition?: string;
  }) => {
    const cleanEmail = data.email.trim().toLowerCase();
    const existing = candidates.find(c => c.email.toLowerCase() === cleanEmail);
    if (existing) {
      if (existing.status === 'pending_review' || !existing.uploadPermissionGranted) {
        return {
          success: false,
          message: `A registration for ${data.email} is already awaiting administrator approval. A notification has been sent to our registered admin email (admin@hmhire.in).`,
          candidateId: existing.id
        };
      }
      return {
        success: false,
        message: `An account for ${data.email} is already active. Please log in with your password to upload your CV.`,
        candidateId: existing.id
      };
    }

    const newCandId = `cand-00${candidates.length + 1}`;
    const employeeId = `EMP-2026-0${Math.floor(10 + Math.random() * 90)}`;

    const newCand: CandidateProfile = {
      id: newCandId,
      username: cleanEmail.split('@')[0],
      email: cleanEmail,
      fullName: data.fullName.trim(),
      displayName: data.fullName.trim(),
      useDiscreetName: false,
      phone: data.phone?.trim() || '+91 98200 12345',
      industryId: industries[0]?.id || 'ind-hospitality',
      folderId: industries[0]?.folders[0]?.id || 'fld-culinary',
      jobTitle: data.targetPosition?.trim() || 'Executive Position',
      yearsOfExperience: 5,
      currentLocation: 'India',
      preferredLocations: ['Mumbai', 'Delhi NCR', 'Bengaluru', 'Goa'],
      availability: 'Immediately',
      keySkills: [data.targetPosition?.trim() || 'Executive Leadership', 'Verified Credentials'],
      qualifications: ['Professional Qualification'],
      bio: `Candidate registered for ${data.targetPosition?.trim() || 'Executive Position'}. Awaiting CV upload after administrator approval.`,
      documents: [],
      consentGiven: true,
      consentDate: new Date().toISOString().split('T')[0],
      status: 'pending_review',
      uploadPermissionGranted: false,
      createdAt: new Date().toISOString().split('T')[0],
      temporaryPassword: data.password?.trim() || 'Candidate@2026',
      employeeId
    };

    setCandidates(prev => [newCand, ...prev]);

    const notif: AdminEmailNotification = {
      id: `notif-${Date.now()}`,
      type: 'candidate',
      toEmail: 'admin@hmhire.in',
      fromEmail: cleanEmail,
      subject: `New Candidate Registration Awaiting Approval: ${newCand.fullName} (${employeeId})`,
      targetId: newCandId,
      nameOrCompany: newCand.fullName,
      positionOrIndustry: newCand.jobTitle,
      createdAt: newCand.createdAt,
      status: 'awaiting_approval'
    };

    setEmailNotifications(prev => [notif, ...prev]);
    addAuditLog('system', newCand.fullName, 'CANDIDATE_REGISTRATION_SUBMITTED', `New candidate registration for ${cleanEmail}. Notification dispatched to registered admin email (admin@hmhire.in).`);

    return {
      success: true,
      message: `Registration submitted for ${newCand.fullName}! A notification has been sent to our registered admin email (admin@hmhire.in). Once approved, you can log in to upload your CV.`,
      candidateId: newCandId
    };
  };

  const approveCandidate = (candidateId: string) => {
    setCandidates(prev => prev.map(c => c.id === candidateId ? { ...c, status: 'approved', uploadPermissionGranted: true } : c));
    setEmailNotifications(prev => prev.map(n => n.targetId === candidateId ? { ...n, status: 'approved' } : n));
    const target = candidates.find(c => c.id === candidateId);
    addAuditLog('admin', 'Administrator', 'CANDIDATE_APPROVED', `Approved candidate account ${target?.fullName || candidateId}. Granted CV upload permission.`);
  };

  const toggleShortlist = (candidateId: string) => {
    if (currentRole !== 'employer' || !currentUser) return;
    const emp = currentUser as EmployerAccount;
    const isCurrentlyShortlisted = emp.shortlists?.includes(candidateId);
    const updated = isCurrentlyShortlisted
      ? (emp.shortlists || []).filter((id: string) => id !== candidateId)
      : [...(emp.shortlists || []), candidateId];

    setEmployers(prev => prev.map(e => e.id === emp.id ? { ...e, shortlists: updated } : e));
    addAuditLog('employer', emp.companyName || 'Employer', isCurrentlyShortlisted ? 'SHORTLIST_REMOVED' : 'SHORTLIST_ADDED', `Candidate ${candidateId} ${isCurrentlyShortlisted ? 'removed from' : 'added to'} shortlist.`);
  };

  const createInterviewRequest = (req: { candidateId: string; jobRole: string; proposedDate: string; message: string }) => {
    const cand = candidates.find(c => c.id === req.candidateId);
    const emp = currentRole === 'employer' ? (currentUser as EmployerAccount) : null;
    const newInt: InterviewRequest = {
      id: `int-${Date.now()}`,
      employerId: emp?.id || 'emp-anon',
      employerName: emp?.companyName || 'Anonymous Employer',
      candidateId: req.candidateId,
      candidateName: cand ? cand.fullName : 'Candidate',
      jobRole: req.jobRole,
      proposedDate: req.proposedDate,
      message: req.message,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setInterviewRequests(prev => [newInt, ...prev]);
    addAuditLog('employer', emp?.companyName || 'Employer', 'INTERVIEW_REQUEST_CREATED', `Requested interview with ${newInt.candidateName} for ${req.jobRole}.`);
  };

  const updateInterviewStatus = (id: string, status: 'pending' | 'scheduled' | 'declined' | 'completed') => {
    setInterviewRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    addAuditLog('admin', 'Administrator', 'INTERVIEW_STATUS_UPDATED', `Interview request ${id} set to ${status}.`);
  };

  // Requests
  const submitAccessRequest = (req: Omit<AccessRequest, 'id' | 'status' | 'createdAt'>) => {
    const newReq: AccessRequest = {
      ...req,
      id: `req-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setAccessRequests(prev => [newReq, ...prev]);
    addAuditLog('system', req.name, 'ACCESS_REQUEST_SUBMITTED', `New ${req.type} access request received from ${req.email}.`);
  };

  const reviewAccessRequest = (id: string, status: 'approved' | 'rejected') => {
    setAccessRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    addAuditLog('admin', 'Administrator', 'ACCESS_REQUEST_REVIEWED', `Access request ${id} marked as ${status}.`);
  };

  const updateSettings = (updates: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
    addAuditLog('admin', 'Administrator', 'SETTINGS_UPDATED', 'Updated recruitment agency configuration.');
  };

  const resetAllToDefaults = () => {
    setIndustries(INITIAL_INDUSTRIES);
    setCandidates(INITIAL_CANDIDATES);
    setEmployers(INITIAL_EMPLOYERS);
    setAccessRequests(INITIAL_ACCESS_REQUESTS);
    setInterviewRequests(INITIAL_INTERVIEW_REQUESTS);
    setEmailNotifications(INITIAL_NOTIFICATIONS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setSettings(INITIAL_SETTINGS);
    setCurrentRole(null);
    setCurrentUserId(null);
    localStorage.clear();
  };

  return (
    <AppContext.Provider
      value={{
        industries,
        candidates,
        employers,
        accessRequests,
        interviewRequests,
        auditLogs,
        settings,
        emailNotifications,

        currentRole,
        currentUser,
        login,
        logout,
        quickSwitchRole,
        registerEmployer,
        approveEmployer,

        activeLegalModal,
        openLegalModal,
        closeLegalModal,
        isAuthModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        isRequestUploadModalOpen,
        openRequestUploadModal,
        closeRequestUploadModal,
        isEmployerAccessModalOpen,
        openEmployerAccessModal,
        closeEmployerAccessModal,

        addIndustry,
        updateIndustry,
        deleteIndustry,
        addFolder,
        updateFolder,
        deleteFolder,
        addJobTitle,
        deleteJobTitle,

        issueCandidateCredentials,
        updateCandidate,
        updateCandidateStatus,
        moveCandidateCategory,
        deleteCandidate,
        uploadCandidateDocument,
        deleteCandidateDocument,
        exportCandidatesCSV,

        updateEmployerPermissions,
        updateEmployerStatus,
        deleteEmployer,
        toggleShortlist,
        createInterviewRequest,
        updateInterviewStatus,

        submitAccessRequest,
        reviewAccessRequest,
        updateSettings,
        resetAllToDefaults
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
