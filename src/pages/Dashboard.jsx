import React, { useState } from 'react';
import TaskForm from '../components/TaskForm';
import Filters from '../components/Filters';
import SearchBar from '../components/SearchBar';
import TaskList from '../components/TaskList';
import ThemeToggle from '../components/ThemeToggle';
import { Menu, X } from 'lucide-react';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-200">
      <div className="w-full px-3 sm:px-4 py-4 md:py-8">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between mb-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 dark:border-slate-700/80 bg-white/90 dark:bg-slate-900/90 shadow-sm hover:shadow-md transition-all duration-200"
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>
          <ThemeToggle />
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Sidebar */}
          <aside
            className={`z-30 md:z-auto fixed md:static top-0 left-0 h-full md:h-auto w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shadow-xl md:shadow-md md:shadow-none md:border md:border-slate-200/80 md:dark:border-slate-800 rounded-none md:rounded-2xl p-5 flex flex-col gap-6 transform transition-transform duration-200 ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            }`}
          >
            {/* Close on mobile */}
            <div className="md:hidden flex justify-end">
              <button
                onClick={closeSidebar}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 dark:border-slate-700/80 bg-white/90 dark:bg-slate-800/90 shadow-sm hover:shadow-md transition-all duration-200"
                aria-label="Close sidebar"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex items-start justify-between gap-3">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
                  Task Manager
                </h1>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Overview & Control
                </p>
              </div>
              <div className="hidden md:block">
                <ThemeToggle />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800" />

            {/* Filters */}
            <div>
              <h2 className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400 mb-2">
                Status & Sorting
              </h2>
              <Filters />
            </div>

            {/* Small hint / helper text */}
            <p className="mt-auto text-[11px] leading-relaxed text-slate-500 dark:text-slate-500">
              Use the controls above to focus on the work that matters: filter by status,
              sort tasks, and quickly find what you need.
            </p>
          </aside>

          {/* Mobile overlay when sidebar open */}
          {sidebarOpen && (
            <div
              onClick={closeSidebar}
              className="fixed inset-0 bg-black/30 backdrop-blur-[1px] md:hidden z-20"
            />
          )}

          {/* Main content */}
          <main className="flex-1 flex flex-col gap-4 md:gap-5 md:pl-4">
            {/* Task form (component already styled) */}
            <TaskForm />

            {/* Header with title and search on the right */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-slate-50">
                  Your tasks
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Manage, track, and complete your work.
                </p>
              </div>
              <div className="w-full md:w-72">
                <SearchBar />
              </div>
            </div>

            {/* Task list (tiles handle their own styling) */}
            <TaskList />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;