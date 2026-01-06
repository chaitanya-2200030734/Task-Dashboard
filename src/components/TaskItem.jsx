import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import { updateTask, deleteTask } from '../features/tasks/taskThunks';
import { CheckCircle, RotateCcw, Edit, Trash2, X, AlertTriangle } from 'lucide-react';

const TaskItem = ({ task }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editPriority, setEditPriority] = useState(task.priority);
  const [modalState, setModalState] = useState(null); // 'delete', 'edit', or 'toggle'

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = modalState ? 'hidden' : 'unset';
    return () => document.body.style.overflow = 'unset';
  }, [modalState]);

  // Handle status toggle with confirmation
  const handleToggleStatus = () => setModalState('toggle');
  const confirmToggleStatus = () => {
    dispatch(updateTask({
      id: task.id,
      updates: { status: task.status === 'pending' ? 'completed' : 'pending' }
    }));
    setModalState(null);
  };

  // Handle edit mode and save
  const handleEdit = () => {
    if (isEditing && editTitle.trim()) {
      setModalState('edit');
    } else {
      setIsEditing(true);
    }
  };

  const confirmEdit = () => {
    dispatch(updateTask({
      id: task.id,
      updates: { title: editTitle.trim(), priority: editPriority }
    }));
    setIsEditing(false);
    setModalState(null);
  };

  // Handle delete with confirmation
  const handleDelete = () => setModalState('delete');
  const confirmDelete = () => {
    dispatch(deleteTask(task.id));
    setModalState(null);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditTitle(task.title);
    setEditPriority(task.priority);
    setIsEditing(false);
  };

  // Close modal
  const closeModal = () => setModalState(null);

  return (
    <>
      {/* Confirmation Modal */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] animate-in fade-in-200 ${
          modalState ? '' : 'hidden'
        }`}
        onClick={closeModal}
      >
        <div
          className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-slate-200 dark:border-slate-700 animate-in zoom-in-95-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-4 mb-6">
            {modalState === 'delete' && <AlertTriangle className="text-red-500 flex-shrink-0" size={28} />}
            {modalState === 'edit' && <Edit className="text-blue-500 flex-shrink-0" size={28} />}
            {modalState === 'toggle' && (
              task.status === 'pending' ? (
                <CheckCircle className="text-green-500 flex-shrink-0" size={28} />
              ) : (
                <RotateCcw className="text-yellow-500 flex-shrink-0" size={28} />
              )
            )}
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {modalState === 'delete' && 'Delete Task'}
                {modalState === 'edit' && 'Confirm Changes'}
                {modalState === 'toggle' && (task.status === 'pending' ? 'Mark as Completed' : 'Mark as Pending')}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {modalState === 'delete' && 'This action cannot be undone'}
                {modalState === 'edit' && 'Save your changes'}
                {modalState === 'toggle' && 'Update task status'}
              </p>
            </div>
          </div>

          <p className="text-slate-700 dark:text-slate-300 mb-8 leading-relaxed">
            {modalState === 'delete' && `Are you sure you want to permanently delete "${task.title}"?`}
            {modalState === 'edit' && `Are you sure you want to save the changes to "${task.title}"?`}
            {modalState === 'toggle' && `Are you sure you want to mark "${task.title}" as ${task.status === 'pending' ? 'completed' : 'pending'}?`}
          </p>

          <div className="flex gap-3 justify-end">
            <button
              onClick={closeModal}
              className="px-6 py-3 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all duration-200 font-medium hover:shadow-sm"
            >
              Cancel
            </button>
            <button
              onClick={
                modalState === 'delete' ? confirmDelete :
                modalState === 'edit' ? confirmEdit :
                confirmToggleStatus
              }
              className={`px-6 py-3 rounded-xl transition-all duration-200 font-semibold hover:shadow-lg hover:-translate-y-0.5 ${
                modalState === 'delete'
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : modalState === 'edit'
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : task.status === 'pending'
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-yellow-500 hover:bg-yellow-600 text-white'
              }`}
            >
              {modalState === 'delete' && 'Delete Task'}
              {modalState === 'edit' && 'Save Changes'}
              {modalState === 'toggle' && (task.status === 'pending' ? 'Mark Completed' : 'Mark Pending')}
            </button>
          </div>
        </div>
      </div>

      <div className="group relative rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/95 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="relative z-10 px-4 py-4 md:px-5 md:py-4 flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-slate-100 transition-all duration-200"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleEdit();
                    if (e.key === 'Escape') handleCancel();
                  }}
                  autoFocus
                />
                <select
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-slate-100 text-sm transition-all duration-200"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className={`text-base md:text-lg font-semibold break-words ${
                      task.status === 'completed'
                        ? 'line-through text-slate-500 dark:text-slate-400'
                        : 'text-slate-900 dark:text-slate-100'
                    }`}
                  >
                    {task.title}
                  </h3>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase ${
                      task.priority === 'high'
                        ? 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-200 dark:border-red-700/60'
                        : task.priority === 'medium'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-700/60'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-200 dark:border-emerald-700/60'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        task.priority === 'high'
                          ? 'bg-red-500'
                          : task.priority === 'medium'
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                    />
                    {task.priority === 'high' && 'High'}
                    {task.priority === 'medium' && 'Medium'}
                    {task.priority === 'low' && 'Low'}
                  </span>
                </div>
              </>
            )}
            <div className="flex items-center gap-2 mt-3">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                task.status === 'completed'
                  ? 'bg-gradient-to-r from-emerald-400 to-green-500 text-white'
                  : 'bg-gradient-to-r from-amber-400 to-orange-500 text-white'
              }`}>
                {task.status === 'pending' ? 'Pending' : 'Completed'}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-4">
            {!isEditing && (
              <button
                onClick={handleToggleStatus}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  task.status === 'pending'
                    ? 'text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20'
                    : 'text-yellow-600 hover:bg-yellow-50 dark:text-yellow-400 dark:hover:bg-yellow-900/20'
                }`}
                title={task.status === 'pending' ? 'Mark as completed' : 'Mark as pending'}
                aria-label={task.status === 'pending' ? 'Mark as completed' : 'Mark as pending'}
              >
                {task.status === 'pending' ? <CheckCircle size={18} /> : <RotateCcw size={18} />}
              </button>
            )}
            <button
              onClick={handleEdit}
              className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 dark:text-slate-400 dark:hover:text-blue-400 dark:hover:bg-blue-900/20 rounded-md transition-colors duration-200"
              title={isEditing ? 'Save changes' : 'Edit task'}
              aria-label={isEditing ? 'Save changes' : 'Edit task'}
            >
              {isEditing ? <CheckCircle size={18} /> : <Edit size={18} />}
            </button>
            {isEditing && (
              <button
                onClick={handleCancel}
                className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-700/50 rounded-md transition-colors duration-200"
                title="Cancel editing"
                aria-label="Cancel editing"
              >
                <X size={18} />
              </button>
            )}
            <button
              onClick={handleDelete}
              className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 dark:text-slate-400 dark:hover:text-red-400 dark:hover:bg-red-900/20 rounded-md transition-colors duration-200"
              title="Delete task"
              aria-label="Delete task"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskItem;