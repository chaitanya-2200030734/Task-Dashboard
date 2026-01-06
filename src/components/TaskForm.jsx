import React, { useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { addTask } from '../features/tasks/taskThunks';

const TaskForm = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      await dispatch(addTask({
        title: title.trim(),
        status: 'pending',
        priority: priority,
        createdAt: new Date().toISOString(),
      })).unwrap();
      setTitle('');
      setPriority('medium');
    } catch (error) {
      console.error('Failed to add task:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 rounded-xl shadow-lg border border-slate-200 dark:border-slate-600 p-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
        Add New Task
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 dark:focus:ring-blue-900/50 dark:focus:border-blue-500 dark:bg-slate-700 dark:text-slate-100 transition-all duration-200 placeholder:text-slate-400"
            required
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 dark:focus:ring-blue-900/50 dark:focus:border-blue-500 dark:bg-slate-700 dark:text-slate-100 transition-all duration-200"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-blue-300 disabled:to-indigo-400 text-white font-semibold rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-all duration-200 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {loading ? 'Adding...' : 'Add Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;