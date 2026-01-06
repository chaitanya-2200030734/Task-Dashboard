import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTasksAPI, addTaskAPI, updateTaskAPI, deleteTaskAPI } from './taskAPI';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchTasksAPI();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (task, { rejectWithValue }) => {
    try {
      const response = await addTaskAPI(task);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const response = await updateTaskAPI(id, updates);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id, { rejectWithValue }) => {
    try {
      await deleteTaskAPI(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);