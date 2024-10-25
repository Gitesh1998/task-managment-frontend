"use client";

import { useState } from 'react';
import { Task } from '../types/task';

type Props = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onUpdate: (task: Task) => void; // Trigger update API call
};

export default function TaskList({ tasks, onEdit, onDelete, onUpdate }: Props) {
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editableTitle, setEditableTitle] = useState('');
  const [editableDescription, setEditableDescription] = useState('');
  const [editableStatus, setEditableStatus] = useState<Task['status']>('Pending');

  const handleEditClick = (task: Task) => {
    setEditingTaskId(task.id);
    setEditableTitle(task.title);
    setEditableDescription(task.description);
    setEditableStatus(task.status); // Set initial status value
  };

  const handleUpdateClick = (task: Task) => {
    const updatedTask = {
      ...task,
      title: editableTitle,
      description: editableDescription,
      status: editableStatus, // Include updated status
    };
    onUpdate(updatedTask); // Trigger update API call
    setEditingTaskId(null); // Exit edit mode
  };

  return (
    <div className="overflow-hidden rounded-2xl shadow-lg bg-gray-100">
      <div className="overflow-y-auto max-h-[50vh]">
        <table className="w-full text-left text-sm text-black border-separate border-spacing-0">
          <thead className="bg-blue-500 text-white text-lg font-bold sticky top-0 z-10">
            <tr>
              <th className="p-3 text-center rounded-tl-2xl">Title</th>
              <th className="p-3 text-center">Description</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 pl-12 rounded-tr-2xl">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white rounded-b-2xl">
            {tasks.map((task, index) => (
              <tr
                key={task.id}
                className={`hover:bg-gray-100 transition-all duration-300 ${index === tasks.length - 1 ? 'rounded-b-xl' : ''
                  }`}
              >
                <td className="p-2 text-center font-semibold w-[30vh]">
                  {editingTaskId === task.id ? (
                    <input
                      type="text"
                      value={editableTitle}
                      onChange={(e) => setEditableTitle(e.target.value)}
                      className="w-full p-2 rounded-lg bg-gray-200 text-black"
                    />
                  ) : (
                    task.title
                  )}
                </td>
                <td className="p-2 w-[90vh]">
                  {editingTaskId === task.id ? (
                    <input
                      type="text"
                      value={editableDescription}
                      onChange={(e) => setEditableDescription(e.target.value)}
                      className="w-full p-2 rounded-lg bg-gray-200 text-black"
                    />
                  ) : (
                    task.description
                  )}
                </td>
                <td className="p-2 text-center">
                  {editingTaskId === task.id ? (
                    <select
                      value={editableStatus}
                      onChange={(e) => setEditableStatus(e.target.value as Task['status'])}
                      className="bg-gray-200 text-black font-semibold p-2 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 cursor-pointer"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In_Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  ) : (
                    <span className="font-semibold">{task.status.replace('_', ' ')}</span>
                  )}
                </td>
                <td className="p-2 flex space-x-8">
                  {editingTaskId === task.id ? (
                    <button
                      onClick={() => handleUpdateClick(task)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300"
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditClick(task)}
                      className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-all duration-300"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => onDelete(task.id)}
                    className="px-2 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
