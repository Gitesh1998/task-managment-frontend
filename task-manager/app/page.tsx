"use client";

import { useState, useEffect } from 'react';
import { Task } from './types/task';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const API_URL = 'http://localhost:3000/api/tasks'; // Backend API URL

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]); // Initialize tasks as an empty array
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Fetch tasks from the backend on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // GET: Fetch all tasks
  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      console.log('Fetched tasks:', data.docs); // Debugging the API response
      setTasks(Array.isArray(data.docs) ? data.docs : []); // Ensure data is an array
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setTasks([]); // Set to empty array on error
    }
  };

  // POST: Add a new task
  const addTask = async (task: Omit<Task, 'id'>) => {
    console.log("update: ", task);

    try {
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
      const newTask: Task = await response.json();
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // PUT: Update an existing task
  const updateTask = async (updatedTask: Task) => {  
    console.log("updated123: ", updatedTask);
  
    try {
      const response = await fetch(`${API_URL}/${updatedTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      const task: Task = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? task : t))
      );
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // DELETE: Delete a task
  const deleteTask = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Task Management</h1>
        <TaskForm
          onSubmit={editingTask ? updateTask : addTask}
          initialTask={editingTask || undefined}
        />
        <TaskList tasks={tasks} onEdit={setEditingTask} onDelete={deleteTask} />
      </div>
    </div>
  );
}
