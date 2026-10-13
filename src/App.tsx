import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/public/Navbar';
import { Hero } from './components/public/Hero';
import { IndustriesSection } from './components/public/IndustriesSection';
import { TalentHierarchyExplorer } from './components/public/TalentHierarchyExplorer';
import { CandidateRegistrationGuide } from './components/public/CandidateRegistrationGuide';
import { EmployerLeadSection } from './components/public/EmployerLeadSection';
import { AboutSection } from './components/public/AboutSection';
import { ContactSection } from './components/public/ContactSection';
import { Footer } from './components/public/Footer';
import { LegalModals } from './components/public/LegalModals';
import { AuthModal } from './components/auth/AuthModal';
import { RequestUploadModal } from './components/modals/RequestUploadModal';
import { EmployerAccessModal } from './components/modals/EmployerAccessModal';
import { CandidatePortal } from './components/portals/CandidatePortal';
import { EmployerPortal } from './components/portals/EmployerPortal';
import { AdminPortal } from './components/portals/AdminPortal';

function MainApp() {
  const [activeView, setActiveView] = useState<string>('home');
  const [selectedIndustryFilter, setSelectedIndustryFilter] = useState<string>('');
  
  const {
    currentRole,
    openAuthModal,
    openRequestUploadModal,
    openEmployerAccessModal
  } = useApp();

  const handleSelectIndustry = (indId: string) => {
    setSelectedIndustryFilter(indId);
    setActiveView('categories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRequestTalentForRole = (jobTitle?: string) => {
    openEmployerAccessModal();
  };

  // Synchronize view when authenticated role changes
  React.useEffect(() => {
    if (currentRole === 'admin' && activeView !== 'admin_portal') {
      setActiveView('admin_portal');
    } else if (currentRole === 'employer' && activeView !== 'employer_portal') {
      setActiveView('employer_portal');
    } else if (currentRole === 'candidate' && activeView !== 'candidate_portal') {
      setActiveView('candidate_portal');
    }
  }, [currentRole]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      
      {/* Top Navbar strictly obeying 3-Zone Contract */}
      <Navbar activeView={activeView} setActiveView={setActiveView} />

      {/* Main View Router */}
      <main className="flex-1">
        {activeView === 'home' && (
          <>
            <Hero
              onExploreCategories={() => {
                setActiveView('categories');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onHireTalent={() => {
                setActiveView('employers');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onRequestAccess={() => openRequestUploadModal()}
            />
            <IndustriesSection onSelectIndustry={handleSelectIndustry} />
            <TalentHierarchyExplorer
              initialIndustryId={selectedIndustryFilter}
              onRequestTalent={handleRequestTalentForRole}
              onRequestAccess={() => openRequestUploadModal()}
            />
            <CandidateRegistrationGuide
              onRequestUploadAccess={() => openRequestUploadModal()}
              onOpenCandidateLogin={() => openAuthModal('candidate')}
            />
            <EmployerLeadSection
              onRequestEmployerAccess={() => openEmployerAccessModal()}
              onOpenEmployerLogin={() => openAuthModal('employer')}
            />
            <AboutSection />
            <ContactSection />
          </>
        )}

        {activeView === 'industries' && (
          <div className="pt-4">
            <IndustriesSection onSelectIndustry={handleSelectIndustry} />
            <TalentHierarchyExplorer
              initialIndustryId={selectedIndustryFilter}
              onRequestTalent={handleRequestTalentForRole}
              onRequestAccess={() => openRequestUploadModal()}
            />
          </div>
        )}

        {activeView === 'categories' && (
          <div className="pt-4">
            <TalentHierarchyExplorer
              initialIndustryId={selectedIndustryFilter}
              onRequestTalent={handleRequestTalentForRole}
              onRequestAccess={() => openRequestUploadModal()}
            />
          </div>
        )}

        {activeView === 'employers' && (
          <div className="pt-4">
            <EmployerLeadSection
              onRequestEmployerAccess={() => openEmployerAccessModal()}
              onOpenEmployerLogin={() => openAuthModal('employer')}
            />
            <TalentHierarchyExplorer
              onRequestTalent={handleRequestTalentForRole}
              onRequestAccess={() => openRequestUploadModal()}
            />
          </div>
        )}

        {activeView === 'candidates' && (
          <div className="pt-4">
            <CandidateRegistrationGuide
              onRequestUploadAccess={() => openRequestUploadModal()}
              onOpenCandidateLogin={() => openAuthModal('candidate')}
            />
            <TalentHierarchyExplorer
              onRequestTalent={handleRequestTalentForRole}
              onRequestAccess={() => openRequestUploadModal()}
            />
          </div>
        )}

        {activeView === 'about' && (
          <div className="pt-4">
            <AboutSection />
            <CandidateRegistrationGuide
              onRequestUploadAccess={() => openRequestUploadModal()}
              onOpenCandidateLogin={() => openAuthModal('candidate')}
            />
          </div>
        )}

        {activeView === 'contact' && (
          <div className="pt-4">
            <ContactSection />
          </div>
        )}

        {/* Protected Portals */}
        {activeView === 'candidate_portal' && (
          <CandidatePortal />
        )}

        {activeView === 'employer_portal' && (
          <EmployerPortal />
        )}

        {activeView === 'admin_portal' && (
          <AdminPortal />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveView={setActiveView} />

      {/* Interactive Global Modals */}
      <AuthModal
        onSuccess={(role) => {
          if (role === 'candidate') setActiveView('candidate_portal');
          if (role === 'employer') setActiveView('employer_portal');
          if (role === 'admin') setActiveView('admin_portal');
        }}
      />
      <RequestUploadModal />
      <EmployerAccessModal />
      <LegalModals />

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
