import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { fetchTasks } from '../features/tasks/taskThunks';
import { selectFilteredTasks, selectLoading, selectError } from '../features/tasks/taskSelectors';
import TaskItem from './TaskItem';
import { ClipboardList } from 'lucide-react';

const TaskList = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectFilteredTasks);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-slate-600 dark:text-slate-400">Loading tasks...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 dark:text-red-400 text-lg font-medium mb-2">Error loading tasks</div>
        <div className="text-slate-600 dark:text-slate-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-3 overflow-visible">
      {tasks.length === 0 ? (
        <div className="text-center py-16">
          <ClipboardList size={64} className="mx-auto text-slate-400 dark:text-slate-500 mb-4" />
          <h3 className="text-xl font-medium text-slate-900 dark:text-slate-100 mb-2">No tasks found</h3>
          <p className="text-slate-600 dark:text-slate-400">Get started by adding your first task above.</p>
        </div>
      ) : (
        tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))
      )}
    </div>
  );
};

export default TaskList;