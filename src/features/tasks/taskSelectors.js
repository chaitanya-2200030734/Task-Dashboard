import { createSelector } from '@reduxjs/toolkit';

const selectTasksState = (state) => state.tasks;

export const selectTasks = createSelector(
  [selectTasksState],
  (tasksState) => tasksState.tasks
);

export const selectFilter = createSelector(
  [selectTasksState],
  (tasksState) => tasksState.filter
);

export const selectSearch = createSelector(
  [selectTasksState],
  (tasksState) => tasksState.search
);

export const selectSortBy = createSelector(
  [selectTasksState],
  (tasksState) => tasksState.sortBy
);

export const selectSortOrder = createSelector(
  [selectTasksState],
  (tasksState) => tasksState.sortOrder
);

export const selectFilteredTasks = createSelector(
  [selectTasks, selectFilter, selectSearch, selectSortBy, selectSortOrder],
  (tasks, filter, search, sortBy, sortOrder) => {
    let filtered = tasks;
    if (filter !== 'all') {
      filtered = filtered.filter(task => task.status === filter);
    }
    if (search) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    // Sorting
    const sorted = [...filtered].sort((a, b) => {
      let aValue, bValue;
      if (sortBy === 'createdAt') {
        aValue = new Date(a.createdAt);
        bValue = new Date(b.createdAt);
      } else if (sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        aValue = priorityOrder[a.priority] || 2;
        bValue = priorityOrder[b.priority] || 2;
      } else if (sortBy === 'status') {
        aValue = a.status;
        bValue = b.status;
      }
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });
    return sorted;
  }
);

export const selectLoading = createSelector(
  [selectTasksState],
  (tasksState) => tasksState.loading
);

export const selectError = createSelector(
  [selectTasksState],
  (tasksState) => tasksState.error
);