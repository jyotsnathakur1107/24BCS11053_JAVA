import React from 'react';
import { MapPin, DollarSign, Clock, Users, ArrowUpRight, Building2 } from 'lucide-react';

const jobTypeColors = {
  'Full-time': 'bg-blue-50 text-blue-700 border-blue-200',
  'Remote': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Part-time': 'bg-purple-50 text-purple-700 border-purple-200',
  'Contract': 'bg-amber-50 text-amber-700 border-amber-200',
  'Internship': 'bg-pink-50 text-pink-700 border-pink-200',
};

const companyAvatarColors = [
  'bg-blue-600',
  'bg-emerald-600',
  'bg-purple-600',
  'bg-indigo-600',
  'bg-amber-600',
  'bg-rose-600',
  'bg-cyan-600',
];

export default function JobCard({ job, onSelect, onApply }) {
  // Generate consistent color based on company name
  const colorIndex = Math.abs(
    (job.company || 'C').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  ) % companyAvatarColors.length;
  const avatarBg = companyAvatarColors[colorIndex];

  const formatRelativeTime = (dateStr) => {
    if (!dateStr) return 'Recently';
    const date = new Date(dateStr);
    const diffMs = new Date() - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays}d ago`;
  };

  const isClosed = job.status === 'CLOSED';

  return (
    <div className={`group relative bg-white rounded-2xl border transition-all duration-200 hover:shadow-xl hover:-translate-y-1 p-5 sm:p-6 flex flex-col justify-between ${
      isClosed ? 'border-slate-200 opacity-70 bg-slate-50/50' : 'border-slate-200/90 hover:border-indigo-300'
    }`}>
      <div>
        {/* Top Header: Avatar + Title & Company + Status badge */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl ${avatarBg} text-white font-bold text-lg flex items-center justify-center shadow-sm shrink-0`}>
              {(job.company || 'C').charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 
                onClick={() => onSelect(job)}
                className="font-semibold text-lg text-slate-900 group-hover:text-indigo-600 cursor-pointer transition-colors line-clamp-1"
              >
                {job.title}
              </h3>
              <div className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span>{job.company}</span>
              </div>
            </div>
          </div>

          <div>
            {isClosed ? (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                Closed
              </span>
            ) : (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Active
              </span>
            )}
          </div>
        </div>

        {/* Tags row: Type, Experience, Location */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-md border ${jobTypeColors[job.jobType] || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
            {job.jobType}
          </span>

          {job.experienceLevel && (
            <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
              {job.experienceLevel}
            </span>
          )}

          <span className="inline-flex items-center gap-1 text-xs text-slate-600 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/60">
            <MapPin className="w-3 h-3 text-slate-400" />
            {job.location}
          </span>
        </div>

        {/* Short description snippet */}
        <p className="text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
          {job.description}
        </p>
      </div>

      {/* Footer: Salary + Applications count + Actions */}
      <div className="pt-4 border-t border-slate-100 mt-2">
        <div className="flex items-center justify-between mb-3 text-xs text-slate-500">
          <div className="font-semibold text-slate-900 text-sm flex items-center text-indigo-700">
            {job.salary || 'Competitive'}
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              {job.applicationCount || 0} applied
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              {formatRelativeTime(job.postedAt)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelect(job)}
            className="flex-1 py-2 px-3 text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-center"
          >
            Details
          </button>
          
          <button
            disabled={isClosed}
            onClick={() => onApply(job)}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-1 ${
              isClosed
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-200 active:scale-95'
            }`}
          >
            <span>Apply</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

