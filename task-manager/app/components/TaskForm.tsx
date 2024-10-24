"use client";

import { useState } from 'react';
import { Task } from '../types/task';

type Props = {
  onSubmit: (task: Omit<Task, 'id'>) => void;
  initialTask?: Task;
};

export default function TaskForm({ onSubmit, initialTask }: Props) {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [status, setStatus] = useState<Task['status']>(initialTask?.status || 'pending');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, status });
    setTitle('');
    setDescription('');
    setStatus('pending');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        className="w-full p-3 rounded-lg bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
        className="w-full p-3 rounded-lg bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as Task['status'])}
        className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit" className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
        {initialTask ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
}
