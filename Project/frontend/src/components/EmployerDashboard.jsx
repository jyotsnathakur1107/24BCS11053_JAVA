import React, { useState, useEffect } from 'react';
import { 
  Briefcase, Users, CheckCircle, Clock, PlusCircle, Trash2, Edit3, 
  ExternalLink, FileText, ChevronRight, Filter, AlertCircle, Eye, UserCheck, XCircle
} from 'lucide-react';
import { jobApi } from '../services/api';

const statusBadgeColors = {
  APPLIED: 'bg-blue-50 text-blue-700 border-blue-200',
  UNDER_REVIEW: 'bg-amber-50 text-amber-700 border-amber-200',
  SHORTLISTED: 'bg-purple-50 text-purple-700 border-purple-200',
  ACCEPTED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  REJECTED: 'bg-rose-50 text-rose-700 border-rose-200',
};

export default function EmployerDashboard({ 
  onOpenPostModal, 
  onEditJob, 
  showToast 
}) {
  const [activeTab, setActiveTab] = useState('jobs'); // 'jobs' | 'applicants'
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedJobFilter, setSelectedJobFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedApplication, setSelectedApplication] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [jobsData, appsData, statsData] = await Promise.all([
        jobApi.getJobs(),
        jobApi.getApplications(),
        jobApi.getStats(),
      ]);
      setJobs(jobsData);
      setApplications(appsData);
      setStats(statsData);
    } catch (err) {
      console.error(err);
      if (showToast) showToast('Failed to load dashboard data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleJobStatus = async (job) => {
    try {
      const newStatus = job.status === 'OPEN' ? 'CLOSED' : 'OPEN';
      await jobApi.updateJob(job.id, {
        title: job.title,
        company: job.company,
        location: job.location,
        jobType: job.jobType,
        experienceLevel: job.experienceLevel,
        salary: job.salary,
        description: job.description,
        requirements: job.requirements,
        contactEmail: job.contactEmail,
        status: newStatus,
      });
      showToast(`Job marked as ${newStatus}`, 'success');
      loadData();
    } catch (err) {
      showToast('Failed to change job status', 'error');
    }
  };

  const handleDeleteJob = async (jobId, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This will also remove associated applications.`)) {
      return;
    }
    try {
      await jobApi.deleteJob(jobId);
      showToast('Job listing deleted successfully', 'success');
      loadData();
    } catch (err) {
      showToast('Failed to delete job', 'error');
    }
  };

  const handleStatusChange = async (appId, newStatus) => {
    try {
      await jobApi.updateApplicationStatus(appId, newStatus);
      showToast(`Application updated to ${newStatus}`, 'success');
      loadData();
    } catch (err) {
      showToast('Failed to update applicant status', 'error');
    }
  };

  const filteredApplications = applications.filter((app) => {
    const matchesJob = selectedJobFilter === 'ALL' || app.job?.id === parseInt(selectedJobFilter, 10);
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    return matchesJob && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Employer Management Center
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Monitor listings, review candidates, and manage hiring workflows
          </p>
        </div>
        <button
          onClick={() => onOpenPostModal()}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl shadow-md shadow-indigo-200 transition-all active:scale-95 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post New Vacancy</span>
        </button>
      </div>

      {/* KPI Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Posted</span>
              <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Briefcase className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">{stats.totalJobs}</div>
            <div className="text-xs text-slate-500 mt-1">{stats.openJobs} currently open</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Active Listings</span>
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-emerald-600 mt-2">{stats.openJobs}</div>
            <div className="text-xs text-slate-500 mt-1">{stats.closedJobs} closed listings</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Applicants</span>
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">{stats.totalApplications}</div>
            <div className="text-xs text-slate-500 mt-1">{stats.pendingApplications} awaiting review</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Shortlisted & Hired</span>
              <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <UserCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-purple-700 mt-2">
              {(stats.shortlistedApplications || 0) + (stats.acceptedApplications || 0)}
            </div>
            <div className="text-xs text-slate-500 mt-1">{stats.acceptedApplications} offers accepted</div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="flex items-center border-b border-slate-200 px-6 pt-4 gap-6">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`pb-4 text-sm font-semibold transition-colors relative flex items-center gap-2 ${
              activeTab === 'jobs'
                ? 'text-indigo-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Manage Job Postings ({jobs.length})</span>
            {activeTab === 'jobs' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('applicants')}
            className={`pb-4 text-sm font-semibold transition-colors relative flex items-center gap-2 ${
              activeTab === 'applicants'
                ? 'text-indigo-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Candidate Applications ({applications.length})</span>
            {activeTab === 'applicants' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full" />
            )}
          </button>
        </div>

        {/* Tab 1: Manage Job Postings */}
        {activeTab === 'jobs' && (
          <div className="divide-y divide-slate-100 overflow-x-auto">
            {jobs.length === 0 ? (
              <div className="p-12 text-center">
                <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-base font-semibold text-slate-700">No jobs posted yet</p>
                <p className="text-sm text-slate-400 mt-1 mb-4">Post your first opening to start receiving candidates.</p>
                <button
                  onClick={() => onOpenPostModal()}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium"
                >
                  Create Listing
                </button>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                  <tr>
                    <th className="py-3 px-6">Job Title & Details</th>
                    <th className="py-3 px-6">Location</th>
                    <th className="py-3 px-6">Status</th>
                    <th className="py-3 px-6 text-center">Applicants</th>
                    <th className="py-3 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {jobs.map((job) => (
                    <tr key={job.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-semibold text-slate-900">{job.title}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                          <span className="font-medium text-slate-700">{job.company}</span>
                          <span>•</span>
                          <span className="text-indigo-600 font-medium">{job.jobType}</span>
                          <span>•</span>
                          <span>{job.salary || 'Competitive'}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-600">
                        {job.location}
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleToggleJobStatus(job)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition-all ${
                            job.status === 'OPEN'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                              : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                          }`}
                          title="Click to toggle status"
                        >
                          {job.status === 'OPEN' ? 'Active (Open)' : 'Closed'}
                        </button>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => {
                            setSelectedJobFilter(job.id.toString());
                            setActiveTab('applicants');
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs rounded-lg transition-colors"
                        >
                          <Users className="w-3.5 h-3.5" />
                          <span>{job.applicationCount || 0}</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onEditJob(job)}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            title="Edit Job"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteJob(job.id, job.title)}
                            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Delete Job"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Tab 2: Candidate Applications */}
        {activeTab === 'applicants' && (
          <div>
            {/* Filter controls */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-sm">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-semibold text-slate-600 uppercase">Filter by Job:</span>
                  <select
                    value={selectedJobFilter}
                    onChange={(e) => setSelectedJobFilter(e.target.value)}
                    className="text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="ALL">All Jobs ({applications.length})</option>
                    {jobs.map((j) => (
                      <option key={j.id} value={j.id}>
                        {j.title} ({j.applicationCount || 0})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-600 uppercase">Status:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="APPLIED">Applied</option>
                    <option value="UNDER_REVIEW">Under Review</option>
                    <option value="SHORTLISTED">Shortlisted</option>
                    <option value="ACCEPTED">Accepted</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </div>
              </div>

              {(selectedJobFilter !== 'ALL' || statusFilter !== 'ALL') && (
                <button
                  onClick={() => {
                    setSelectedJobFilter('ALL');
                    setStatusFilter('ALL');
                  }}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Applications list */}
            {filteredApplications.length === 0 ? (
              <div className="p-12 text-center">
                <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-base font-semibold text-slate-700">No applications found</p>
                <p className="text-sm text-slate-400 mt-1">
                  Try clearing the filters or check back when candidates apply.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                    <tr>
                      <th className="py-3 px-6">Candidate</th>
                      <th className="py-3 px-6">Applied For</th>
                      <th className="py-3 px-6">Experience</th>
                      <th className="py-3 px-6">Resume / Portfolio</th>
                      <th className="py-3 px-6">Application Status</th>
                      <th className="py-3 px-6 text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredApplications.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-4 px-6">
                          <div className="font-semibold text-slate-900">{app.applicantName}</div>
                          <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                            <span>{app.applicantEmail}</span>
                            {app.applicantPhone && (
                              <>
                                <span>•</span>
                                <span>{app.applicantPhone}</span>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-medium text-slate-800 line-clamp-1">
                            {app.job?.title || 'Unknown Role'}
                          </div>
                          <div className="text-xs text-slate-400">
                            {app.job?.company}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-slate-600">
                          {app.experienceYears != null ? `${app.experienceYears} yrs` : 'Not specified'}
                        </td>
                        <td className="py-4 px-6">
                          {app.resumeUrl ? (
                            <a
                              href={app.resumeUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium hover:underline"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>View Profile</span>
                            </a>
                          ) : (
                            <span className="text-xs text-slate-400">None provided</span>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          <select
                            value={app.status}
                            onChange={(e) => handleStatusChange(app.id, e.target.value)}
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none ${
                              statusBadgeColors[app.status] || 'bg-slate-100 text-slate-700 border-slate-200'
                            }`}
                          >
                            <option value="APPLIED">APPLIED</option>
                            <option value="UNDER_REVIEW">UNDER REVIEW</option>
                            <option value="SHORTLISTED">SHORTLISTED</option>
                            <option value="ACCEPTED">ACCEPTED</option>
                            <option value="REJECTED">REJECTED</option>
                          </select>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => setSelectedApplication(app)}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors inline-flex items-center gap-1 text-xs font-medium"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Candidate Application Detail Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">{selectedApplication.applicantName}</h3>
                <p className="text-xs text-indigo-300">
                  Applied for {selectedApplication.job?.title} at {selectedApplication.job?.company}
                </p>
              </div>
              <button
                onClick={() => setSelectedApplication(null)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-sm">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Email:</span>
                  <span className="font-semibold text-slate-800">{selectedApplication.applicantEmail}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Phone:</span>
                  <span className="font-semibold text-slate-800">{selectedApplication.applicantPhone || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Experience:</span>
                  <span className="font-semibold text-slate-800">
                    {selectedApplication.experienceYears != null ? `${selectedApplication.experienceYears} Years` : 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Applied On:</span>
                  <span className="font-semibold text-slate-800">
                    {new Date(selectedApplication.appliedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {selectedApplication.resumeUrl && (
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                    Resume / Portfolio:
                  </span>
                  <a
                    href={selectedApplication.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 font-medium hover:underline text-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{selectedApplication.resumeUrl}</span>
                  </a>
                </div>
              )}

              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  Candidate Cover Note:
                </span>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-slate-700 text-xs sm:text-sm whitespace-pre-line leading-relaxed">
                  {selectedApplication.coverLetter || 'No cover letter provided.'}
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  Update Candidate Status:
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {['APPLIED', 'UNDER_REVIEW', 'SHORTLISTED', 'ACCEPTED', 'REJECTED'].map((st) => (
                    <button
                      key={st}
                      onClick={async () => {
                        await handleStatusChange(selectedApplication.id, st);
                        setSelectedApplication((prev) => ({ ...prev, status: st }));
                      }}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                        selectedApplication.status === st
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {st.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedApplication(null)}
                className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

