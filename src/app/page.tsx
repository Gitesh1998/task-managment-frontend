"use client";

import { useState, useEffect } from 'react';
import { Task } from './types/task';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const API_URL = 'http://localhost:3000/api/tasks'; // Backend API URL

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]); // Initialize tasks

  // Fetch tasks from the backend on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // GET: Fetch all tasks
  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      console.log('Fetched tasks:', data.docs); // Debugging
      setTasks(Array.isArray(data.docs) ? data.docs : []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // POST or PUT: Add or Update a task
  const handleTaskSubmit = async (task: Omit<Task, 'id'> | Task) => {
    if ('id' in task) {
      // If task has an ID, it's an update
      await updateTask(task as Task);
    } else {
      // If task doesn't have an ID, it's a new task
      await addTask(task as Omit<Task, 'id'>);
    }
    fetchTasks(); // Refresh the task list
  };

  // POST: Add a new task
  const addTask = async (task: Omit<Task, 'id'>) => {
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
      console.log('Task added successfully');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // PUT: Update an existing task
  const updateTask = async (task: Task) => {

    try {
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
      console.log('Task updated successfully');
      await fetchTasks();
    } catch (error) {
      console.log("error: ", error);

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
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 text-black flex items-center justify-center p-6">
      <div className="bg-white p-12 rounded-3xl shadow-2xl w-full max-w-8xl min-h-[90vh]">
        <h1 className="text-4xl font-bold mb-8 text-center">Task Management</h1>

        <div className="mb-10">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <TaskForm onSubmit={handleTaskSubmit} />
          </div>
        </div>

        <div className="overflow-x-auto ">
          <TaskList
            tasks={tasks}
            onDelete={deleteTask}
            onUpdate={updateTask} // Pass the updateTask function to TaskList
          />
        </div>
      </div>
    </div>
  );
}
