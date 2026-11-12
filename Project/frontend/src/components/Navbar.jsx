import React from 'react';
import { Briefcase, PlusCircle, LayoutDashboard, Search, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenPostModal, backendConnected }) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('browse')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                JobSphere
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
                Spring & React
              </span>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('browse')}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'browse'
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Browse Jobs</span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={onOpenPostModal}
              className="flex items-center gap-2 ml-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-lg shadow-sm shadow-indigo-200 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Post a Job</span>
              <span className="sm:hidden">Post</span>
            </button>

            {/* Backend health indicator */}
            <div className="hidden lg:flex items-center gap-1.5 ml-3 pl-3 border-l border-slate-200 text-xs">
              {backendConnected ? (
                <span className="flex items-center gap-1 text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  API Online
                </span>
              ) : (
                <span className="flex items-center gap-1 text-amber-600 font-medium bg-amber-50 px-2 py-1 rounded-md border border-amber-200">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                  Connecting...
                </span>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

