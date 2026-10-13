import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight, UtensilsCrossed, Wrench, BriefcaseBusiness, Sparkles } from 'lucide-react';

interface IndustriesSectionProps {
  onSelectIndustry: (industryId: string) => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onSelectIndustry }) => {
  const { industries } = useApp();

  const getIndustryImage = (id: string) => {
    if (id.includes('hospitality')) return '/src/assets/images/hospitality_recruitment_1791891176685.jpg';
    if (id.includes('engineering')) return '/src/assets/images/engineering_industry_1791891177331.jpg';
    if (id.includes('corporate')) return '/src/assets/images/corporate_admin_1791891176126.jpg';
    return '/src/assets/images/hero_recruitment_1791891177218.jpg';
  };

  const getIndustryIcon = (id: string) => {
    if (id.includes('hospitality')) return <UtensilsCrossed className="w-5 h-5 text-amber-600" />;
    if (id.includes('engineering')) return <Wrench className="w-5 h-5 text-blue-600" />;
    if (id.includes('corporate')) return <BriefcaseBusiness className="w-5 h-5 text-slate-700" />;
    return <Sparkles className="w-5 h-5 text-amber-600" />;
  };

  return (
    <section id="industries" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
            Specialized Recruitment Sectors
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 tracking-tight">
            Industries We Serve
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Our talent registry spans five-star luxury hospitality, technical engineering disciplines, corporate operations, and custom client verticals. Each candidate undergoes meticulous background verification.
          </p>
        </div>

        {/* Dynamic Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((ind) => {
            const totalRoles = ind.folders.reduce((acc, f) => acc + f.jobTitles.length, 0);
            const imageSrc = getIndustryImage(ind.id);

            return (
              <div
                key={ind.id}
                className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md transition-all flex flex-col group"
              >
                {/* Visual Header */}
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={imageSrc}
                    alt={ind.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                  
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                    <span className="text-xs font-medium text-amber-300">
                      {ind.folders.length} Sub-Departments
                    </span>
                    <span className="text-xs font-mono tabular-nums text-slate-300">
                      {totalRoles} Role Titles
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getIndustryIcon(ind.id)}
                        <h3 className="text-xl font-bold font-display text-slate-900">
                          {ind.name}
                        </h3>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {ind.description}
                    </p>

                    {/* Department preview */}
                    <div className="space-y-1.5 border-t border-slate-100 pt-3">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Key Departments
                      </p>
                      <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-slate-700">
                        {ind.folders.slice(0, 4).map((fld, idx) => (
                          <span key={fld.id}>
                            {fld.name}
                            {idx < Math.min(ind.folders.length, 4) - 1 ? <span className="text-slate-300 ml-2" aria-hidden="true">·</span> : null}
                          </span>
                        ))}
                        {ind.folders.length > 4 && (
                          <span className="text-amber-700 font-medium">+{ind.folders.length - 4} more</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-100">
                    <button
                      onClick={() => onSelectIndustry(ind.id)}
                      className="w-full py-2.5 px-4 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-2 group-hover:bg-amber-400 group-hover:text-slate-950 cursor-pointer"
                    >
                      <span>Explore Hierarchy &amp; Job Titles</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
