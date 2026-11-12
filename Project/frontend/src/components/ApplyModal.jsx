import React, { useState } from 'react';
import { X, Send, CheckCircle2, User, Mail, Phone, Briefcase, Link2, FileText, AlertCircle } from 'lucide-react';
import { jobApi } from '../services/api';

export default function ApplyModal({ job, onClose, onSuccess }) {
  if (!job) return null;

  const [formData, setFormData] = useState({
    applicantName: '',
    applicantEmail: '',
    applicantPhone: '',
    experienceYears: '',
    resumeUrl: '',
    coverLetter: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.applicantName.trim()) {
      setError('Please provide your full name.');
      return;
    }
    if (!formData.applicantEmail.trim() || !formData.applicantEmail.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      await jobApi.submitApplication({
        jobId: job.id,
        applicantName: formData.applicantName.trim(),
        applicantEmail: formData.applicantEmail.trim(),
        applicantPhone: formData.applicantPhone.trim() || null,
        experienceYears: formData.experienceYears ? parseInt(formData.experienceYears, 10) : null,
        resumeUrl: formData.resumeUrl.trim() || null,
        coverLetter: formData.coverLetter.trim() || null,
      });

      setSubmitted(true);
      if (onSuccess) onSuccess();
      setTimeout(() => {
        onClose();
      }, 1800);
    } catch (err) {
      setError(err.message || 'Something went wrong while submitting your application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">Apply for Position</h2>
            <p className="text-xs text-indigo-300 mt-0.5">
              {job.title} at <strong className="text-white">{job.company}</strong>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Application Submitted!</h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              Your application has been delivered to <strong>{job.company}</strong>. The hiring team will review your profile soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{error}</span>
              </div>
            )}

            {/* Applicant Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  name="applicantName"
                  value={formData.applicantName}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  required
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="email"
                    name="applicantEmail"
                    value={formData.applicantEmail}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="tel"
                    name="applicantPhone"
                    value={formData.applicantPhone}
                    onChange={handleChange}
                    placeholder="+1 555-0100"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
                  />
                </div>
              </div>
            </div>

            {/* Experience & Resume Link */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Experience (Years)
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="number"
                    min="0"
                    max="40"
                    name="experienceYears"
                    value={formData.experienceYears}
                    onChange={handleChange}
                    placeholder="e.g. 3"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Resume / Portfolio URL
                </label>
                <div className="relative">
                  <Link2 className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="url"
                    name="resumeUrl"
                    value={formData.resumeUrl}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
                  />
                </div>
              </div>
            </div>

            {/* Cover Letter */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Cover Note / Message
              </label>
              <div className="relative">
                <textarea
                  rows="3"
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  placeholder="Introduce yourself and share why you are a great fit for this role..."
                  className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-lg shadow-sm shadow-indigo-200 transition-all flex items-center gap-2 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Application</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

