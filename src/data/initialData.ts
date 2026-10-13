import { IndustryCategory, CandidateProfile, EmployerAccount, SiteSettings, AccessRequest, AuditLogEntry, InterviewRequest } from '../types';

export const INITIAL_INDUSTRIES: IndustryCategory[] = [
  {
    id: 'ind-hospitality',
    name: 'Hospitality & Hotels',
    description: 'Five-star luxury hotels, heritage palace properties, fine-dining restaurants, banquet operations, front office, and guest relations across India.',
    folders: [
      {
        id: 'fld-fb',
        name: 'Food & Beverage (F&B)',
        jobTitles: [
          'F&B Manager',
          'Assistant F&B Manager',
          'Restaurant Manager',
          'Outlet Manager',
          'Bar Manager',
          'Banquet Manager',
          'F&B Supervisor',
          'Captain',
          'Senior Steward / Stewardess',
          'Hostess / Host',
          'Bartender / Mixologist',
          'Barista',
          'Cashier'
        ]
      },
      {
        id: 'fld-culinary',
        name: 'Culinary & Kitchen',
        jobTitles: [
          'Executive Chef',
          'Executive Sous Chef',
          'Sous Chef',
          'Chef de Partie',
          'Demi Chef de Partie',
          'Commis I / II / III',
          'Halwai / Indian Sweet Master',
          'Tandoor Master',
          'Pastry Chef',
          'Baker',
          'Kitchen Stewarding Supervisor',
          'Kitchen Steward'
        ]
      },
      {
        id: 'fld-front-office',
        name: 'Front Office & Guest Relations',
        jobTitles: [
          'Front Office Manager',
          'Duty Manager',
          'Assistant Front Desk Manager',
          'Guest Relations Executive',
          'Front Office Associate',
          'Concierge',
          'Bell Captain / Bellboy',
          'Telephone Operator'
        ]
      },
      {
        id: 'fld-housekeeping',
        name: 'Housekeeping',
        jobTitles: [
          'Executive Housekeeper',
          'Assistant Housekeeper',
          'Housekeeping Supervisor',
          'Floor Supervisor',
          'Guest Room Attendant',
          'Public Area Attendant',
          'Laundry Manager',
          'Linen Keeper'
        ]
      },
      {
        id: 'fld-hotel-engineering',
        name: 'Hotel Engineering & Maintenance',
        jobTitles: [
          'Director of Engineering',
          'Chief Engineer',
          'Assistant Chief Engineer',
          'Duty Engineer',
          'HVAC Technician',
          'Kitchen Equipment Technician',
          'Licensed Electrician',
          'STP / WTP Plant Operator'
        ]
      },
      {
        id: 'fld-hotel-admin',
        name: 'Hotel Administration & Management',
        jobTitles: [
          'General Manager',
          'Resident Manager',
          'Director of Operations',
          'Director of Sales & Marketing',
          'Financial Controller',
          'Hotel HR Manager',
          'Training & Quality Manager'
        ]
      }
    ]
  },
  {
    id: 'ind-engineering',
    name: 'Engineering & Infrastructure',
    description: 'Technical directors, mechanical, electrical, civil, MEP project leaders, and industrial plant maintenance across Indian infrastructure hubs.',
    folders: [
      {
        id: 'fld-eng-leadership',
        name: 'Engineering Leadership & Project Management',
        jobTitles: [
          'Chief Engineer',
          'Engineering Manager',
          'Technical Director',
          'MEP Project Manager',
          'Site In-Charge'
        ]
      },
      {
        id: 'fld-eng-disciplines',
        name: 'Specialized Engineers',
        jobTitles: [
          'Electrical Engineer (CEA Certified)',
          'Mechanical Engineer',
          'Civil Engineer',
          'Instrumentation Engineer',
          'Automation & PLC Engineer',
          'HVAC Design Engineer'
        ]
      },
      {
        id: 'fld-eng-maintenance',
        name: 'Technical Maintenance & Trades',
        jobTitles: [
          'HVAC Technician',
          'Industrial Electrician',
          'Plumber & Pipefitter',
          'BMS Operator',
          'DG Set Operator',
          'Facilities Maintenance Supervisor'
        ]
      }
    ]
  },
  {
    id: 'ind-corporate',
    name: 'Administration & Corporate',
    description: 'Corporate HR leaders, POSH compliance officers, chartered accountants, finance heads, administration executives, and commercial sales.',
    folders: [
      {
        id: 'fld-corp-hr',
        name: 'Human Resources & Statutory Compliance',
        jobTitles: [
          'Chief Human Resources Officer (CHRO)',
          'HR Director',
          'HR Manager (Labour Law & POSH Specialist)',
          'HR Executive (Payroll & Statutory Compliance)',
          'Talent Acquisition Specialist',
          'Admin & Liaison Executive'
        ]
      },
      {
        id: 'fld-corp-finance',
        name: 'Finance, Accounts & Taxation',
        jobTitles: [
          'Chief Financial Officer (CFO)',
          'Finance Controller',
          'Chartered Accountant (CA)',
          'Senior Accounts Manager (GST & TDS)',
          'Internal Auditor',
          'Billing & Payables Executive'
        ]
      },
      {
        id: 'fld-corp-operations',
        name: 'Executive Operations & Corporate Admin',
        jobTitles: [
          'Administration Manager',
          'Executive Assistant to Board',
          'Corporate Facilities Manager',
          'Sales & Business Development Director',
          'IT Systems & Security Administrator',
          'Office Administrator'
        ]
      }
    ]
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  businessName: 'HM Consultant India',
  phone: '+91 [OWNER PHONE NUMBER]',
  whatsapp: '+91 [OWNER WHATSAPP NUMBER]',
  email: '[OWNER BUSINESS EMAIL]',
  officeAddress: '[OWNER OFFICE ADDRESS, INDIA]',
  websiteDomain: 'hmhire.in',
  linkedinUrl: '[LINKEDIN URL]',
  instagramUrl: '[INSTAGRAM URL]',
  maxFileSizeMb: 10,
  allowedFileExtensions: ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'],
  dataRetentionMonths: 24,
  dataProtectionOfficer: 'compliance@hmconsultant.in',
  grievanceOfficerEmail: 'grievance@hmconsultant.in'
};

export const INITIAL_CANDIDATES: CandidateProfile[] = [
  {
    id: 'cand-001',
    username: 'chef.vikram',
    email: 'candidate@hmhire.in', // Demo candidate login for India
    fullName: 'Vikram Sharma',
    displayName: 'Chef Vikram S.',
    useDiscreetName: false,
    phone: '+91 98201 23456',
    industryId: 'ind-hospitality',
    folderId: 'fld-culinary',
    jobTitle: 'Executive Chef',
    yearsOfExperience: 14,
    currentLocation: 'Mumbai, Maharashtra',
    preferredLocations: ['Mumbai', 'Delhi NCR', 'Bengaluru', 'Goa', 'Hyderabad'],
    availability: '30 Days',
    keySkills: ['Luxury 5-Star Hotel Kitchens', 'FSSAI FoSTaC Level 3 Certified', 'HACCP Compliance', 'Menu Engineering', 'Kitchen P&L Optimization', 'Contemporary Indian & European Cuisine', 'Large-Scale Banquet Operations'],
    qualifications: ['B.Sc. in Hospitality & Hotel Administration – IHM Pusa (New Delhi)', 'FSSAI Food Safety Supervisor Certification', 'Advanced Culinary Arts Diploma – Le Cordon Bleu'],
    bio: 'Distinguished Executive Chef with 14 years commanding culinary departments in premier luxury hotels across Mumbai and Delhi. Proven excellence heading multi-outlet dining and high-profile banquets accommodating 1,200+ guests while maintaining stringent FSSAI safety protocols.',
    photoUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80',
    documents: [
      {
        id: 'doc-cv-01',
        name: 'Chef_Vikram_Sharma_Executive_Chef_CV.pdf',
        type: 'cv',
        url: '#',
        previewContent: 'CHEF VIKRAM SHARMA - EXECUTIVE CHEF\nLocation: Mumbai, Maharashtra, India\nExperience: 14 Years in Premier 5-Star Luxury Hotels\n\nPROFESSIONAL SUMMARY:\nSeasoned Culinary Director with demonstrated track record managing 6 flagship restaurant outlets and banqueting operations generating ₹18 Crore annual F&B revenue.\n\nEXPERIENCE:\n- Executive Chef | The Heritage Seafront Hotel, Mumbai (2021 - Present)\n- Executive Sous Chef | Palace Luxury Hotel, New Delhi (2017 - 2021)\n- Sous Chef | Grand Luxury Resort, Goa (2013 - 2017)\n\nEDUCATION & CERTIFICATIONS:\n- Institute of Hotel Management (IHM Pusa, New Delhi) - B.Sc. Hospitality\n- FSSAI FoSTaC Special Catering Level 3 Certified\n- HACCP & ISO 22000 Food Safety Management Standards\n- Indian Culinary Forum (ICF) Master Member',
        sizeBytes: 184000,
        uploadedAt: '2026-09-12',
        mimeType: 'application/pdf'
      },
      {
        id: 'doc-cert-01',
        name: 'FSSAI_FoSTaC_Level3_Certificate.pdf',
        type: 'certificate',
        url: '#',
        previewContent: 'FOOD SAFETY AND STANDARDS AUTHORITY OF INDIA (FSSAI)\nOfficial Verification Certificate\nCandidate: Vikram Sharma\nCredential: Food Safety Training and Certification (FoSTaC) - Advanced Catering Level 3\nStatus: Active & Government Verified Under FSS Act 2006',
        sizeBytes: 95000,
        uploadedAt: '2026-09-12',
        mimeType: 'application/pdf'
      }
    ],
    consentGiven: true,
    consentDate: '2026-09-12',
    status: 'approved',
    uploadPermissionGranted: true,
    createdAt: '2026-09-12',
    temporaryPassword: 'Candidate@2026',
    employeeId: 'EMP-2026-001',
    notes: 'Verified by HM Consultant senior hospitality panel. Exceptional references from premier Indian luxury hospitality groups.'
  },
  {
    id: 'cand-002',
    username: 'elena.roy',
    email: 'elena.roy@example.com',
    fullName: 'Elena Roy',
    displayName: 'Elena R. (Discreet)',
    useDiscreetName: true,
    phone: '+91 98450 67890',
    industryId: 'ind-hospitality',
    folderId: 'fld-fb',
    jobTitle: 'Restaurant Manager',
    yearsOfExperience: 8,
    currentLocation: 'Bengaluru, Karnataka',
    preferredLocations: ['Bengaluru', 'Mumbai', 'Goa', 'Hyderabad'],
    availability: 'Immediately',
    keySkills: ['Upselling & Revenue Growth', 'Guest Relationship Management', 'Staff Training & Standards', 'Micros POS & IDS Hotel ERP', 'Wine & Spirits Knowledge (WSET Level 2)', 'FSSAI Compliance'],
    qualifications: ['B.A. International Hospitality Management – IHM Aurangabad', 'WSET Level 2 Award in Wines & Spirits'],
    bio: 'Energetic and polished Restaurant Manager with 8 years of luxury fine-dining and premium microbrewery leadership in Bengaluru and Mumbai. Consistent record of boosting Tripadvisor and Zomato guest ratings to top 1% city rankings.',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    documents: [
      {
        id: 'doc-cv-02',
        name: 'Elena_Roy_Restaurant_Manager_CV.pdf',
        type: 'cv',
        url: '#',
        previewContent: 'ELENA ROY - LUXURY RESTAURANT MANAGER\nExperience: 8 Years in Fine Dining & Premium Hospitality\nLocation: Bengaluru, India\n\nCAREER HIGHLIGHTS:\n- Managed 180-cover rooftop modern pan-Asian outlet achieving 124% of annual budget.\n- Directed 28 front-of-house service team members on five-star sequence of service.\n- Supervised corporate HNWI bookings and private dining suite engagements.',
        sizeBytes: 152000,
        uploadedAt: '2026-09-20',
        mimeType: 'application/pdf'
      }
    ],
    consentGiven: true,
    consentDate: '2026-09-20',
    status: 'approved',
    uploadPermissionGranted: true,
    createdAt: '2026-09-20',
    temporaryPassword: 'Candidate@2026',
    employeeId: 'EMP-2026-002'
  },
  {
    id: 'cand-003',
    username: 'rajesh.mep',
    email: 'rajesh.kumar@example.com',
    fullName: 'Rajesh Kumar',
    displayName: 'Rajesh K. – Chief Engineer',
    useDiscreetName: false,
    phone: '+91 99100 54321',
    industryId: 'ind-engineering',
    folderId: 'fld-eng-leadership',
    jobTitle: 'Chief Engineer',
    yearsOfExperience: 16,
    currentLocation: 'Delhi NCR, India',
    preferredLocations: ['Delhi NCR', 'Bengaluru', 'Pune', 'Mumbai'],
    availability: '30 Days',
    keySkills: ['Central Chilled Water HVAC Systems', 'BMS Automation & Energy Audits', 'National Building Code (NBC 2016) Compliance', 'CEA Certified Electrical Infrastructure', 'Boiler Operations & Fire Life Safety Systems'],
    qualifications: ['B.Tech in Mechanical Engineering – NIT Kurukshetra', 'Certified Energy Manager (Bureau of Energy Efficiency - BEE, India)', 'Central Electricity Authority (CEA) Certified Supervisor'],
    bio: 'Seasoned Chief Technical Engineer directing comprehensive electro-mechanical and facilities infrastructure for landmark luxury hotels and Grade-A commercial IT parks across Delhi NCR and Bengaluru.',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    documents: [
      {
        id: 'doc-cv-03',
        name: 'Rajesh_Kumar_Chief_Engineer_MEP_CV.pdf',
        type: 'cv',
        url: '#',
        previewContent: 'RAJESH KUMAR, BEE CERTIFIED - CHIEF MECHANICAL & ELECTRICAL ENGINEER\n16+ Years Experience in India Commercial & Hotel Facilities\n\nKEY ACHIEVEMENTS:\n- Planned Preventive Maintenance (PPM) for 500-key luxury hotel & convention center.\n- Achieved 19% reduction in electrical power consumption through VFD & chiller plant optimization.\n- Directly supervised team of 40 engineering technicians, BMS operators, and STP specialists.',
        sizeBytes: 210000,
        uploadedAt: '2026-09-25',
        mimeType: 'application/pdf'
      }
    ],
    consentGiven: true,
    consentDate: '2026-09-25',
    status: 'approved',
    uploadPermissionGranted: true,
    createdAt: '2026-09-25',
    temporaryPassword: 'Candidate@2026',
    employeeId: 'EMP-2026-003'
  },
  {
    id: 'cand-004',
    username: 'priya.hr',
    email: 'priya.sundaram@example.com',
    fullName: 'Priya Sundaram',
    displayName: 'Priya S. (Discreet)',
    useDiscreetName: true,
    phone: '+91 98800 11223',
    industryId: 'ind-corporate',
    folderId: 'fld-corp-hr',
    jobTitle: 'HR Director',
    yearsOfExperience: 12,
    currentLocation: 'Bengaluru, Karnataka',
    preferredLocations: ['Bengaluru', 'Mumbai', 'Chennai', 'Delhi NCR'],
    availability: '60 Days',
    keySkills: ['Indian Labour Codes Compliance', 'POSH Act Internal Committee Chairperson', 'Compensation & Benefits Strategy', 'HRIS Implementation (Darwinbox, Workday)', 'Union Negotiation & Employee Relations', 'Talent Acquisition & Retention'],
    qualifications: ['Post Graduate Diploma in Personnel Management & Industrial Relations – XLRI Jamshedpur', 'Certified POSH Enabler & Trainer', 'SHRM-SCP Senior Certified Professional'],
    bio: 'Strategic People & Culture leader with 12 years spearheading human resource operations across luxury hospitality chains and enterprise technology firms in India. Recognized authority on statutory labour compliance and workplace equality.',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    documents: [
      {
        id: 'doc-cv-04',
        name: 'Priya_Sundaram_HR_Director_Profile.pdf',
        type: 'cv',
        url: '#',
        previewContent: 'PRIYA SUNDARAM, XLRI - HR DIRECTOR\nWorkforce Architecture & Indian Statutory Labour Excellence\n\nPROFESSIONAL SUMMARY:\nHeaded HR departments across 1,500+ employee luxury hotel networks. Deep specialization in Indian Industrial Relations, Code on Wages, EPF/ESIC statutory norms, and POSH Act compliance.',
        sizeBytes: 165000,
        uploadedAt: '2026-10-01',
        mimeType: 'application/pdf'
      }
    ],
    consentGiven: true,
    consentDate: '2026-10-01',
    status: 'approved',
    uploadPermissionGranted: true,
    createdAt: '2026-10-01',
    temporaryPassword: 'Candidate@2026',
    employeeId: 'EMP-2026-004'
  },
  {
    id: 'cand-005',
    username: 'rohan.fo',
    email: 'rohan.verma@example.com',
    fullName: 'Rohan Verma',
    displayName: 'Rohan V. – Front Office Duty Manager',
    useDiscreetName: false,
    phone: '+91 98111 22334',
    industryId: 'ind-hospitality',
    folderId: 'fld-front-office',
    jobTitle: 'Duty Manager',
    yearsOfExperience: 6,
    currentLocation: 'Jaipur, Rajasthan',
    preferredLocations: ['Jaipur', 'Udaipur', 'Delhi NCR', 'Mumbai'],
    availability: 'Immediately',
    keySkills: ['Opera PMS & IDS Enterprise', 'VIP Dignitary Protocol Handling', 'Crisis & Service Recovery', 'Night Audit Operations', 'Heritage Palace Guest Experience'],
    qualifications: ['B.Sc. Hospitality & Hotel Administration – IHM Gwalior'],
    bio: 'Dynamic Front Office Duty Manager with extensive background in luxury heritage palace hotels and high-occupancy business resorts. Expert in VIP arrival protocols, guest delight initiatives, and smooth night audits.',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    documents: [
      {
        id: 'doc-cv-05',
        name: 'Rohan_Verma_Duty_Manager_CV.pdf',
        type: 'cv',
        url: '#',
        previewContent: 'ROHAN VERMA - FRONT OFFICE DUTY MANAGER\nExperience: 6 Years in Premier Indian Luxury & Heritage Hotels\n\nACHIEVEMENTS:\n- Awarded Hospitality Employee of the Year (2024) across regional resort cluster.\n- Maintained 97.2% overall guest satisfaction rating on check-in and concierge experiences.',
        sizeBytes: 140000,
        uploadedAt: '2026-10-05',
        mimeType: 'application/pdf'
      }
    ],
    consentGiven: true,
    consentDate: '2026-10-05',
    status: 'approved',
    uploadPermissionGranted: true,
    createdAt: '2026-10-05',
    temporaryPassword: 'Candidate@2026',
    employeeId: 'EMP-2026-005'
  },
  {
    id: 'cand-006',
    username: 'amit.sengupta',
    email: 'amit.sengupta@example.com',
    fullName: 'Amit Sengupta',
    displayName: 'Amit Sengupta',
    useDiscreetName: false,
    phone: '+91 98300 44556',
    industryId: 'ind-hospitality',
    folderId: 'fld-culinary',
    jobTitle: 'Pastry Chef',
    yearsOfExperience: 7,
    currentLocation: 'Kolkata, West Bengal',
    preferredLocations: ['Mumbai', 'Bengaluru', 'Kolkata', 'Delhi NCR'],
    availability: '30 Days',
    keySkills: ['Artisanal Pastry & Boulangerie', 'FSSAI FoSTaC Certified', 'Chocolate Confectionery', 'Banquet Dessert Buffets'],
    qualifications: ['Diploma in Bakery & Confectionery – IHM Kolkata'],
    bio: 'Passionate Pastry Chef with 7 years fine dining experience in luxury Indian properties. Seeking to upload CV and target Executive Pastry Chef roles.',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    documents: [],
    consentGiven: true,
    consentDate: '2026-10-13',
    status: 'pending_review',
    uploadPermissionGranted: false,
    createdAt: '2026-10-13',
    temporaryPassword: 'Candidate@2026',
    employeeId: 'EMP-2026-006'
  }
];

export const INITIAL_EMPLOYERS: EmployerAccount[] = [
  {
    id: 'emp-001',
    companyName: 'The Taj & Heritage Palace Hotels (IHCL)',
    contactPerson: 'Ananya Sen (VP Talent Acquisition)',
    email: 'employer@hmhire.in', // Demo employer login for India
    password: 'Employer@2026',
    phone: '+91 22 6665 3366',
    status: 'approved',
    allowedIndustryIds: ['ind-hospitality', 'ind-corporate'],
    shortlists: ['cand-001', 'cand-002'],
    createdAt: '2026-08-10'
  },
  {
    id: 'emp-002',
    companyName: 'Oberoi Luxury Hotels & Resorts',
    contactPerson: 'Vikram Mehra (Head of Culinary & Operations Recruitment)',
    email: 'recruitment@oberoihotels.com',
    password: 'Employer@2026',
    phone: '+91 11 2389 0606',
    status: 'approved',
    allowedIndustryIds: ['ind-hospitality'],
    shortlists: ['cand-001'],
    createdAt: '2026-08-15'
  },
  {
    id: 'emp-003',
    companyName: 'Larsen & Toubro (L&T) Infrastructure & Facilities',
    contactPerson: 'Sanjay Kulkarni (Senior Technical Talent Manager)',
    email: 'careers@Intecc.com',
    password: 'Employer@2026',
    phone: '+91 22 6752 5656',
    status: 'approved',
    allowedIndustryIds: ['ind-engineering', 'ind-corporate'],
    shortlists: ['cand-003'],
    createdAt: '2026-09-01'
  },
  {
    id: 'emp-004',
    companyName: 'ITC Hotels & Luxury Collections',
    contactPerson: 'Manish Chawla (Head of Hospitality Hiring)',
    email: 'talent@itchotels.in',
    password: 'Itc@2026',
    phone: '+91 11 4166 2233',
    status: 'pending_approval',
    allowedIndustryIds: ['ind-hospitality', 'ind-corporate'],
    shortlists: [],
    createdAt: '2026-10-12'
  }
];

export const INITIAL_NOTIFICATIONS: AdminEmailNotification[] = [
  {
    id: 'notif-001',
    type: 'employer',
    toEmail: 'admin@hmhire.in',
    fromEmail: 'talent@itchotels.in',
    subject: 'New Employer Registration Awaiting Approval: ITC Hotels & Luxury Collections (emp-004)',
    targetId: 'emp-004',
    nameOrCompany: 'ITC Hotels & Luxury Collections',
    contactPerson: 'Manish Chawla (Head of Hospitality Hiring)',
    positionOrIndustry: 'Hospitality & Hotels',
    createdAt: '2026-10-12',
    status: 'awaiting_approval'
  },
  {
    id: 'notif-002',
    type: 'candidate',
    toEmail: 'admin@hmhire.in',
    fromEmail: 'amit.sengupta@example.com',
    subject: 'New Candidate Registration Awaiting Approval: Amit Sengupta (cand-006)',
    targetId: 'cand-006',
    nameOrCompany: 'Amit Sengupta',
    positionOrIndustry: 'Pastry Chef (Hospitality)',
    createdAt: '2026-10-13',
    status: 'awaiting_approval'
  }
];

export const INITIAL_ACCESS_REQUESTS: AccessRequest[] = [
  {
    id: 'req-001',
    type: 'candidate',
    name: 'Amit Sengupta',
    email: 'amit.pastry@example.com',
    phone: '+91 98300 44556',
    desiredRoleOrIndustry: 'Pastry Chef (Hospitality)',
    experienceYears: 7,
    notes: 'IHM Kolkata graduate with 7 years fine dining experience in Kolkata & Mumbai seeking Executive Pastry Chef opening in luxury hotel.',
    status: 'pending',
    createdAt: '2026-10-10'
  },
  {
    id: 'req-002',
    type: 'employer',
    name: 'Manish Chawla',
    companyName: 'ITC Hotels & Luxury Collections',
    email: 'talent@itchotels.in',
    phone: '+91 11 4166 2233',
    desiredRoleOrIndustry: 'Hospitality & Hotels (Culinary / F&B)',
    notes: 'Urgent requirement for 2 Executive Sous Chefs and 3 Fine-Dining Restaurant Managers for new luxury property opening in Bengaluru.',
    status: 'pending',
    createdAt: '2026-10-12'
  }
];

export const INITIAL_INTERVIEW_REQUESTS: InterviewRequest[] = [
  {
    id: 'int-001',
    employerId: 'emp-001',
    employerName: 'The Taj & Heritage Palace Hotels (IHCL)',
    candidateId: 'cand-001',
    candidateName: 'Vikram Sharma',
    jobRole: 'Cluster Executive Chef',
    proposedDate: '2026-10-22 at 11:30 AM IST',
    message: 'We are very impressed with Chef Vikram Sharma\'s credentials and would like to arrange an in-person tasting & panel interview at our flagship Mumbai property.',
    status: 'scheduled',
    createdAt: '2026-10-11'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log-001',
    timestamp: '2026-10-13 10:15:22',
    actorRole: 'admin',
    actorName: 'System Administrator',
    action: 'CANDIDATE_CREDENTIALS_ISSUED',
    details: 'Issued initial credentials for Vikram Sharma (cand-001) with upload permissions enabled under DPDP Act 2023 compliance.'
  },
  {
    id: 'log-002',
    timestamp: '2026-10-13 11:40:10',
    actorRole: 'employer',
    actorName: 'The Taj & Heritage Palace Hotels (IHCL)',
    action: 'CV_DOCUMENT_VIEWED',
    details: 'Authorized preview of CV for Vikram Sharma (cand-001).'
  },
  {
    id: 'log-003',
    timestamp: '2026-10-13 12:02:18',
    actorRole: 'employer',
    actorName: 'The Taj & Heritage Palace Hotels (IHCL)',
    action: 'INTERVIEW_REQUEST_SUBMITTED',
    details: 'Interview request submitted for candidate Vikram Sharma (Role: Cluster Executive Chef).'
  }
];
