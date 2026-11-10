import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import JobCard from './components/JobCard';
import JobDetailModal from './components/JobDetailModal';
import ApplyModal from './components/ApplyModal';
import PostJobModal from './components/PostJobModal';
import EmployerDashboard from './components/EmployerDashboard';
import Toast from './components/Toast';
import { jobApi } from './services/api';
import { Briefcase, Filter, RefreshCw, AlertTriangle, Sparkles, Database, Code2 } from 'lucide-react';

const jobTypes = ['All', 'Full-time', 'Remote', 'Part-time', 'Contract', 'Internship'];

export default function App() {
  const [activeTab, setActiveTab] = useState('browse'); // 'browse' | 'dashboard'
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backendConnected, setBackendConnected] = useState(false);

  // Search and Filters
  const [searchKeyword, setSearchKeyword] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('All');

  // Modals state
  const [selectedJobForDetails, setSelectedJobForDetails] = useState(null);
  const [selectedJobForApply, setSelectedJobForApply] = useState(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [jobToEdit, setJobToEdit] = useState(null);

  // Toast
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const fetchJobsList = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await jobApi.getJobs({
        keyword: searchKeyword,
        location: locationFilter,
        jobType: jobTypeFilter,
      });
      setJobs(data);
      setBackendConnected(true);
    } catch (err) {
      console.error(err);
      setError('Unable to connect to the backend server. Make sure Spring Boot is running on port 8080.');
      setBackendConnected(false);
    } finally {
      setLoading(false);
    }
  }, [searchKeyword, locationFilter, jobTypeFilter]);

  const fetchStatsData = useCallback(async () => {
    try {
      const data = await jobApi.getStats();
      setStats(data);
    } catch (err) {
      console.warn('Could not fetch stats', err);
    }
  }, []);

  useEffect(() => {
    fetchJobsList();
    fetchStatsData();
  }, [fetchJobsList, fetchStatsData]);

  const handleSearch = () => {
    fetchJobsList();
  };

  const handleResetFilters = () => {
    setSearchKeyword('');
    setLocationFilter('');
    setJobTypeFilter('All');
  };

  const handleEditJob = (job) => {
    setJobToEdit(job);
    setIsPostModalOpen(true);
  };

  return (
    <div className="min-vh-100 flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPostModal={() => {
          setJobToEdit(null);
          setIsPostModalOpen(true);
        }}
        backendConnected={backendConnected}
      />

      {/* Main Content */}
      <main className="flex-1">
        {activeTab === 'browse' ? (
          <div>
            {/* Hero Section */}
            <HeroSection
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
              locationFilter={locationFilter}
              setLocationFilter={setLocationFilter}
              jobTypeFilter={jobTypeFilter}
              setJobTypeFilter={setJobTypeFilter}
              onSearch={handleSearch}
              stats={stats}
            />

            {/* Job Listings Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              {/* Category Filter Pills & Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Featured Opportunities
                  </h2>
                  <p className="text-sm text-slate-500 mt-0.5">
                    Showing <strong className="text-slate-800">{jobs.length}</strong> available position{jobs.length === 1 ? '' : 's'}
                  </p>
                </div>

                {/* Job type pill selector */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {jobTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setJobTypeFilter(type)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        jobTypeFilter === type
                          ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {type}
                    </button>
                  ))}

                  {(searchKeyword || locationFilter || jobTypeFilter !== 'All') && (
                    <button
                      onClick={handleResetFilters}
                      className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold px-2 py-1 ml-1"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>

              {/* Status and Error handling */}
              {error && (
                <div className="my-8 p-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-base mb-1">Backend Connection Error</h3>
                    <p className="text-sm mb-3">{error}</p>
                    <button
                      onClick={fetchJobsList}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Retry Connection</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Jobs Grid */}
              {loading ? (
                <div className="py-20 text-center space-y-4">
                  <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-sm text-slate-500 font-medium">Fetching job listings...</p>
                </div>
              ) : jobs.length === 0 ? (
                <div className="py-20 text-center bg-white rounded-2xl border border-slate-200/80 p-8 my-6">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1">No Jobs Found</h3>
                  <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
                    We couldn't find any job matches for your current filter criteria. Try adjusting your search keywords or location.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-xl transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
                  {jobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onSelect={(selected) => setSelectedJobForDetails(selected)}
                      onApply={(toApply) => setSelectedJobForApply(toApply)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <EmployerDashboard
            onOpenPostModal={() => {
              setJobToEdit(null);
              setIsPostModalOpen(true);
            }}
            onEditJob={handleEditJob}
            showToast={showToast}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 text-sm">JobSphere</span>
            <span>• Full Stack Job Recruitment Platform</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <Code2 className="w-3.5 h-3.5 text-indigo-500" />
              Spring Boot 3 + React
            </span>
            <span className="flex items-center gap-1">
              <Database className="w-3.5 h-3.5 text-indigo-500" />
              PostgreSQL
            </span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedJobForDetails && (
        <JobDetailModal
          job={selectedJobForDetails}
          onClose={() => setSelectedJobForDetails(null)}
          onApply={(job) => setSelectedJobForApply(job)}
        />
      )}

      {selectedJobForApply && (
        <ApplyModal
          job={selectedJobForApply}
          onClose={() => setSelectedJobForApply(null)}
          onSuccess={() => {
            showToast('Application sent successfully! Good luck!', 'success');
            fetchJobsList();
            fetchStatsData();
          }}
        />
      )}

      {isPostModalOpen && (
        <PostJobModal
          jobToEdit={jobToEdit}
          onClose={() => {
            setIsPostModalOpen(false);
            setJobToEdit(null);
          }}
          onSuccess={() => {
            showToast(jobToEdit ? 'Job listing updated!' : 'Job vacancy posted successfully!', 'success');
            fetchJobsList();
            fetchStatsData();
          }}
        />
      )}

      {/* Toast notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
