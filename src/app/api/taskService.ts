// services/taskService.ts

import { Task } from '../types/task';

const API_URL = 'http://localhost:3000/api/tasks'; // Backend API URL

// GET: Fetch all tasks
export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  const data = await response.json();
  return Array.isArray(data.docs) ? data.docs : [];
};

// POST: Add a new task
export const addTask = async (task: Omit<Task, 'id'>): Promise<void> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error('Failed to create task');
  }
};

// PUT: Update an existing task
export const updateTask = async (task: Task): Promise<void> => {
  const response = await fetch(`${API_URL}/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error('Failed to update task');
  }
};

// DELETE: Delete a task
export const deleteTask = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
};
