export interface JobFolder {
  id: string;
  name: string;
  jobTitles: string[];
}

export interface IndustryCategory {
  id: string;
  name: string;
  description: string;
  folders: JobFolder[];
}

export interface CandidateDocument {
  id: string;
  name: string;
  type: 'cv' | 'photo' | 'certificate' | 'experience_letter' | 'education' | 'other';
  url: string; // data URI or object URL or preview content
  previewContent?: string;
  sizeBytes: number;
  uploadedAt: string;
  mimeType: string;
}

export interface CandidateProfile {
  id: string;
  username: string;
  email: string;
  fullName: string;
  displayName: string;
  useDiscreetName: boolean; // e.g. "Chef Vikram S. – Executive Sous Chef"
  phone: string;
  industryId: string;
  folderId: string;
  jobTitle: string;
  yearsOfExperience: number;
  currentLocation: string; // e.g. "Mumbai, India", "Bengaluru, India"
  preferredLocations: string[];
  availability: 'Immediately' | '15 Days' | '30 Days' | '60 Days' | '90 Days';
  keySkills: string[];
  qualifications: string[];
  bio: string;
  photoUrl?: string;
  documents: CandidateDocument[];
  consentGiven: boolean;
  consentDate: string;
  status: 'approved' | 'pending_review' | 'suspended';
  uploadPermissionGranted: boolean;
  createdAt: string;
  temporaryPassword?: string;
  notes?: string;
  employeeId?: string; // Formatted employee ID for employer view
}

export interface EmployerAccount {
  id: string; // e.g. "EMP-2026-001"
  companyName: string;
  contactPerson: string;
  email: string;
  password?: string;
  phone: string;
  status: 'approved' | 'pending_approval' | 'revoked';
  allowedIndustryIds: string[]; // which industries they can browse
  shortlists: string[]; // candidate IDs
  createdAt: string;
  expiresAt?: string;
}

export interface AdminEmailNotification {
  id: string;
  type: 'candidate' | 'employer';
  toEmail: string; // "admin@hmhire.in"
  fromEmail: string;
  subject: string;
  targetId: string; // candidateId or employerId
  nameOrCompany: string;
  contactPerson?: string;
  positionOrIndustry?: string;
  createdAt: string;
  status: 'awaiting_approval' | 'approved';
}

export interface InterviewRequest {
  id: string;
  employerId: string;
  employerName: string;
  candidateId: string;
  candidateName: string;
  jobRole: string;
  proposedDate: string;
  message: string;
  status: 'pending' | 'scheduled' | 'declined' | 'completed';
  createdAt: string;
}

export interface AccessRequest {
  id: string;
  type: 'candidate' | 'employer';
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  desiredRoleOrIndustry: string;
  experienceYears?: number;
  notes: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorRole: 'admin' | 'candidate' | 'employer' | 'system';
  actorName: string;
  action: string;
  details: string;
}

export interface SiteSettings {
  businessName: string;
  phone: string;
  whatsapp: string;
  email: string;
  officeAddress: string;
  websiteDomain: string;
  linkedinUrl: string;
  instagramUrl: string;
  maxFileSizeMb: number;
  allowedFileExtensions: string[];
  dataRetentionMonths: number;
  dataProtectionOfficer: string;
  grievanceOfficerEmail: string;
}

export type UserRole = 'admin' | 'employer' | 'candidate' | null;

export interface AuthState {
  role: UserRole;
  user: CandidateProfile | EmployerAccount | { email: string; name: string } | null;
}
