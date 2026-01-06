import React from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { setFilter } from '../features/tasks/taskSlice';
import { setSortBy, setSortOrder } from '../features/tasks/taskSlice';
import { selectFilter, selectSortBy, selectSortOrder } from '../features/tasks/taskSelectors';
import { ArrowUp, ArrowDown } from 'lucide-react';

const Filters = () => {
  const dispatch = useAppDispatch();
  const currentFilter = useAppSelector(selectFilter);
  const sortBy = useAppSelector(selectSortBy);
  const sortOrder = useAppSelector(selectSortOrder);

  const handleFilterChange = (filter) => {
    dispatch(setFilter(filter));
  };

  const handleSortByChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  const toggleSortOrder = () => {
    dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'));
  };

  const filters = [
    { key: 'all', label: 'All Tasks' },
    { key: 'pending', label: 'Pending' },
    { key: 'completed', label: 'Completed' },
  ];

  const sortOptions = [
    { key: 'createdAt', label: 'Date Created' },
    { key: 'priority', label: 'Priority' },
    { key: 'status', label: 'Status' },
  ];

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="grid grid-cols-1 gap-2 w-full">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => handleFilterChange(filter.key)}
            className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 ${
              currentFilter === filter.key
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-blue-200'
                : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="sort-select" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Sort by:
        </label>
        <div className="flex items-center gap-2">
          <select
            id="sort-select"
            value={sortBy}
            onChange={handleSortByChange}
            className="w-full px-4 py-2 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 dark:focus:ring-blue-900/50 dark:focus:border-blue-500 dark:bg-slate-700 dark:text-slate-100 transition-all duration-200 shadow-sm"
          >
            {sortOptions.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            onClick={toggleSortOrder}
            className="p-2 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-300 hover:from-slate-200 hover:to-slate-300 dark:hover:from-slate-600 dark:hover:to-slate-500 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
            aria-label={sortOrder === 'asc' ? 'Sort descending' : 'Sort ascending'}
          >
            {sortOrder === 'asc' ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;