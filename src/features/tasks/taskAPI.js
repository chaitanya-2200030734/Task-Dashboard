const API_BASE_URL = 'http://localhost:3001';

export const fetchTasksAPI = async () => {
  const response = await fetch(`${API_BASE_URL}/tasks`);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  // Simulate latency
  await new Promise(resolve => setTimeout(resolve, 500));
  return response.json();
};

export const addTaskAPI = async (task) => {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error('Failed to add task');
  }
  // Simulate latency
  await new Promise(resolve => setTimeout(resolve, 300));
  return response.json();
};

export const updateTaskAPI = async (id, updates) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    throw new Error('Failed to update task');
  }
  // Simulate latency
  await new Promise(resolve => setTimeout(resolve, 300));
  return response.json();
};

export const deleteTaskAPI = async (id) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
  // Simulate latency
  await new Promise(resolve => setTimeout(resolve, 200));
};