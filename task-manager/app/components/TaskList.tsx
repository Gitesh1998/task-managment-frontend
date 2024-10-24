"use client";

import { Task } from '../types/task';

type Props = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
};

export default function TaskList({ tasks, onEdit, onDelete }: Props) {
  return (
    <ul className="space-y-2 mt-6">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="p-4 bg-gray-700 rounded-lg flex justify-between items-center"
        >
          <div>
            <h3 className="text-xl font-semibold">{task.title}</h3>
            <p className="text-gray-300">{task.description}</p>
            <p className="text-sm text-gray-400">Status: {task.status}</p>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => onEdit(task)}
              className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
