import React from 'react';
import { Search, MapPin, Briefcase, Sparkles, TrendingUp, Users } from 'lucide-react';

export default function HeroSection({ 
  searchKeyword, 
  setSearchKeyword, 
  locationFilter, 
  setLocationFilter, 
  jobTypeFilter, 
  setJobTypeFilter, 
  onSearch, 
  stats 
}) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-indigo-900 via-indigo-800 to-slate-900 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Decorative blurred background shapes */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs sm:text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4 text-indigo-300" />
          <span>Connecting top talent with leading employers worldwide</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
          Discover Your Dream Job With <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-100 to-purple-300">
            Speed & Precision
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 mb-10">
          Explore thousands of verified career opportunities across engineering, product, design, and operations. Apply in seconds.
        </p>

        {/* Search Bar Card */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-2xl text-slate-800 max-w-4xl mx-auto border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-3 items-center">
            {/* Keyword Input */}
            <div className="md:col-span-5 flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100/80 rounded-xl transition-colors border border-slate-200/80 focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Job title, keywords, or company..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-sm focus:outline-none placeholder:text-slate-400 text-slate-800"
              />
            </div>

            {/* Location Input */}
            <div className="md:col-span-3 flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100/80 rounded-xl transition-colors border border-slate-200/80 focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100">
              <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="City, State, or Remote..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-sm focus:outline-none placeholder:text-slate-400 text-slate-800"
              />
            </div>

            {/* Job Type Dropdown */}
            <div className="md:col-span-2 flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100/80 rounded-xl transition-colors border border-slate-200/80 focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100">
              <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={jobTypeFilter}
                onChange={(e) => setJobTypeFilter(e.target.value)}
                className="w-full bg-transparent text-sm focus:outline-none text-slate-700 cursor-pointer"
              >
                <option value="All">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Remote">Remote</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="md:col-span-2">
              <button
                type="button"
                onClick={onSearch}
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-medium text-sm rounded-xl transition-all shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Find Jobs</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Metrics Ribbon */}
        {stats && (
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="text-2xl font-bold text-white">{stats.openJobs || 0}</div>
              <div className="text-xs text-indigo-200 flex items-center justify-center gap-1 mt-0.5">
                <Briefcase className="w-3.5 h-3.5" /> Open Jobs
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="text-2xl font-bold text-white">{stats.totalJobs || 0}</div>
              <div className="text-xs text-indigo-200 flex items-center justify-center gap-1 mt-0.5">
                <TrendingUp className="w-3.5 h-3.5" /> Total Posted
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="text-2xl font-bold text-white">{stats.totalApplications || 0}</div>
              <div className="text-xs text-indigo-200 flex items-center justify-center gap-1 mt-0.5">
                <Users className="w-3.5 h-3.5" /> Applications
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="text-2xl font-bold text-emerald-400">{stats.acceptedApplications || 0}</div>
              <div className="text-xs text-indigo-200 flex items-center justify-center gap-1 mt-0.5">
                <Sparkles className="w-3.5 h-3.5" /> Placements
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

