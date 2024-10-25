"use client";

import { useState } from 'react';
import { Task } from '../types/task';

type Props = {
  onSubmit: (task: Omit<Task, 'id'>) => void; // No 'id' since it's only for adding
};

export default function TaskForm({ onSubmit }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<Task['status']>('Pending'); // Default to 'pending'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = { title, description, status };
    onSubmit(newTask); // Add the new task
    setTitle('');
    setDescription('');
    setStatus('Pending');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex space-x-4">
        {/* Title Input - 3 Columns */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className="flex-[3] h-12 px-2 py-1 rounded-lg bg-gray-200 placeholder-gray-500 text-black shadow-xl"
          required
        />

        {/* Description Input - 8 Columns */}
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          className="flex-[6] h-12 px-2 py-1 rounded-lg bg-gray-200 placeholder-gray-500 text-black shadow-xl"
          required
        />

        {/* Status Dropdown - Fills Remaining Space */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Task['status'])}
          className="flex-1 h-12 px-2 py-1 rounded-lg bg-gray-200 text-black shadow-md"
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg mt-4"
      >
        Add Task
      </button>
    </form>

  );
}
