import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Folder, ChevronRight, Search, Briefcase, Users, FileText, CheckCircle } from 'lucide-react';

interface TalentHierarchyExplorerProps {
  initialIndustryId?: string;
  onRequestTalent: (jobTitle?: string) => void;
  onRequestAccess: () => void;
}

export const TalentHierarchyExplorer: React.FC<TalentHierarchyExplorerProps> = ({
  initialIndustryId,
  onRequestTalent,
  onRequestAccess
}) => {
  const { industries, candidates } = useApp();
  const [selectedIndustryId, setSelectedIndustryId] = useState<string>(
    initialIndustryId || industries[0]?.id || ''
  );
  const [selectedFolderId, setSelectedFolderId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  const currentIndustry = industries.find(i => i.id === selectedIndustryId) || industries[0];

  // Count candidates for a folder or job title
  const getCandidateCountForFolder = (folderId: string) => {
    return candidates.filter(c => c.folderId === folderId && c.status === 'approved').length;
  };

  const getCandidateCountForTitle = (title: string) => {
    return candidates.filter(c => c.jobTitle.toLowerCase() === title.toLowerCase() && c.status === 'approved').length;
  };

  // Filtered job titles if searching
  const searchResults = searchQuery.trim()
    ? industries.flatMap(ind =>
        ind.folders.flatMap(fld =>
          fld.jobTitles
            .filter(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
            .map(t => ({
              industryName: ind.name,
              industryId: ind.id,
              folderName: fld.name,
              folderId: fld.id,
              jobTitle: t
            }))
        )
      )
    : null;

  return (
    <section id="categories" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
              Structured Talent Taxonomy
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 tracking-tight">
              Browse Talent &amp; Job Hierarchy
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Explore our hierarchical folder system. HM Consultant maintains verified pipelines across every operational rank, from executive directors to specialized frontline captains and technicians.
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search job title (e.g. Sous Chef, HVAC)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white text-slate-900"
            />
          </div>
        </div>

        {/* Search Results Mode */}
        {searchResults ? (
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-900">
                Found {searchResults.length} matching job titles for "{searchQuery}"
              </h3>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-amber-700 hover:underline font-medium"
              >
                Clear Search
              </button>
            </div>

            {searchResults.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-xs">
                No matching job roles found. Our administration can create custom industry job titles on request.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {searchResults.map((item, idx) => {
                  const count = getCandidateCountForTitle(item.jobTitle);
                  return (
                    <div
                      key={idx}
                      className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between hover:border-slate-400 transition-colors"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                          <span>{item.industryName}</span>
                          <span aria-hidden="true">/</span>
                          <span>{item.folderName}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">{item.jobTitle}</h4>
                        <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-600">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          <span className="font-mono tabular-nums">{count > 0 ? `${count} active candidate${count > 1 ? 's' : ''}` : 'Vetted on demand'}</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <button
                          onClick={() => onRequestTalent(item.jobTitle)}
                          className="text-xs font-semibold text-slate-900 hover:text-amber-700"
                        >
                          Request Shortlist &rarr;
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* Standard Hierarchical Tree Navigation */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Industry Selector Tabs */}
            <div className="lg:col-span-4 space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 mb-2">
                Industries ({industries.length})
              </p>
              {industries.map((ind) => {
                const isSelected = ind.id === currentIndustry?.id;
                const totalTitles = ind.folders.reduce((acc, f) => acc + f.jobTitles.length, 0);

                return (
                  <button
                    key={ind.id}
                    onClick={() => {
                      setSelectedIndustryId(ind.id);
                      setSelectedFolderId('');
                    }}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <h4 className="text-sm font-bold">{ind.name}</h4>
                      <p className={`text-xs mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                        {ind.folders.length} Departments · {totalTitles} Titles
                      </p>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                  </button>
                );
              })}

              {/* Informational Callout */}
              <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-900">
                <p className="font-semibold mb-1 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  Custom Job Hierarchies Supported
                </p>
                <p className="text-amber-800 text-[11px] leading-relaxed">
                  Admins can create unlimited custom folders, subcategories, and designations tailored to specific hotel brands and engineering firms.
                </p>
              </div>
            </div>

            {/* Right: Folders and Job Titles Tree */}
            <div className="lg:col-span-8 bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8">
              <div className="border-b border-slate-200 pb-4 mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold font-display text-slate-900">
                    {currentIndustry?.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {currentIndustry?.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onRequestTalent(currentIndustry?.name)}
                    className="px-3.5 py-1.5 text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  >
                    Hire in This Sector
                  </button>
                </div>
              </div>

              {/* Folders Accordion / Card Grid */}
              <div className="space-y-6">
                {currentIndustry?.folders.map((fld) => {
                  const candidateCount = getCandidateCountForFolder(fld.id);

                  return (
                    <div
                      key={fld.id}
                      className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="p-1.5 bg-slate-100 text-slate-700 rounded-lg">
                            <Folder className="w-4 h-4 text-amber-600" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-900">{fld.name}</h4>
                            <span className="text-[11px] text-slate-500 font-mono tabular-nums">
                              {fld.jobTitles.length} Job Designations
                            </span>
                          </div>
                        </div>

                        {candidateCount > 0 && (
                          <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-mono tabular-nums">
                            {candidateCount} Active Profiles
                          </span>
                        )}
                      </div>

                      {/* Job Titles Tags */}
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                        {fld.jobTitles.map((title, idx) => (
                          <button
                            key={idx}
                            onClick={() => onRequestTalent(title)}
                            title={`Request talent for ${title}`}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-slate-50 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-900 text-slate-700 border border-slate-200 rounded-md transition-colors cursor-pointer"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                            <span>{title}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
