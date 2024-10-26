"use client";

import { useState, useEffect } from 'react';
import { Task } from './types/task';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import {
  fetchTasks,
  addTask,
  updateTask,
  deleteTask,
} from './api/taskService'; // Import API functions

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]); // Initialize tasks

  // Fetch tasks from the backend on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const tasks = await fetchTasks();
      setTasks(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Handle task submission for adding or updating a task
  const handleTaskSubmit = async (task: Omit<Task, 'id'> | Task) => {
    try {
      if ('id' in task) {
        await updateTask(task as Task); // Update task
      } else {
        await addTask(task as Omit<Task, 'id'>); // Add new task
      }
      loadTasks(); // Refresh the task list
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  // Handle task deletion
  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      loadTasks(); // Refresh the task list
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 text-black flex items-center justify-center p-6">
      <div className="bg-white p-12 rounded-3xl shadow-2xl w-full max-w-8xl min-h-[90vh]">
        <h1 className="text-4xl font-bold mb-8 text-center">Task Management For User</h1>

        <div className="mb-10">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <TaskForm onSubmit={handleTaskSubmit} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <TaskList
            tasks={tasks}
            onDelete={handleDeleteTask}
            onUpdate={handleTaskSubmit} // Pass submit function to handle updates
          />
        </div>
      </div>
    </div>
  );
}
