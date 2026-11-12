import React from 'react';
import { X, Building2, MapPin, Briefcase, DollarSign, Clock, Mail, CheckCircle, ArrowRight } from 'lucide-react';

export default function JobDetailModal({ job, onClose, onApply }) {
  if (!job) return null;

  const isClosed = job.status === 'CLOSED';
  const requirementsList = (job.requirements || '')
    .split('\n')
    .map(r => r.trim())
    .filter(r => r.length > 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
              {job.jobType}
            </span>
            {job.experienceLevel && (
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-slate-200">
                {job.experienceLevel}
              </span>
            )}
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
              isClosed ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
            }`}>
              {job.status}
            </span>
          </div>

          <h2 className="text-2xl font-bold mb-2 text-white">{job.title}</h2>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
            <span className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-indigo-400" />
              {job.company}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-indigo-400" />
              {job.location}
            </span>
            <span className="flex items-center gap-1.5 text-emerald-300 font-semibold">
              <DollarSign className="w-4 h-4" />
              {job.salary || 'Competitive'}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto">
          {/* Overview */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
              Job Description
            </h3>
            <p className="text-slate-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
              {job.description}
            </p>
          </div>

          {/* Requirements */}
          {requirementsList.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
                Requirements & Qualifications
              </h3>
              <ul className="space-y-2">
                {requirementsList.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{req.replace(/^[-*•]\s*/, '')}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact & Meta */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
            {job.contactEmail && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Contact hiring manager: <strong className="text-slate-800">{job.contactEmail}</strong></span>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-slate-500">
              <Clock className="w-3.5 h-3.5" />
              <span>Posted {new Date(job.postedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Close
          </button>

          <button
            type="button"
            disabled={isClosed}
            onClick={() => {
              onClose();
              onApply(job);
            }}
            className={`px-5 py-2 text-sm font-medium text-white rounded-lg transition-all flex items-center gap-2 ${
              isClosed
                ? 'bg-slate-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-300 active:scale-95'
            }`}
          >
            <span>Apply Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

