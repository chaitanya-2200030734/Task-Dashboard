import React from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { setSearch } from '../features/tasks/taskSlice';
import { selectSearch } from '../features/tasks/taskSelectors';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const search = useAppSelector(selectSearch);

  const handleSearchChange = (e) => {
    dispatch(setSearch(e.target.value));
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400 dark:text-slate-500">
        <Search size={18} />
      </div>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search tasks..."
        className="w-full pl-10 pr-4 py-2 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 dark:focus:ring-blue-900/50 dark:focus:border-blue-500 dark:bg-slate-700 dark:text-slate-100 dark:placeholder-slate-400 transition-all duration-200 shadow-sm"
      />
    </div>
  );
};

export default SearchBar;