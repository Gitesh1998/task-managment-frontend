"use client";

import { useState } from 'react';
import { Task } from './types/task';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const addTask = (task: Omit<Task, 'id'>) => {
    setTasks([...tasks, { ...task, id: uuidv4() }]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    setEditingTask(null);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
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
