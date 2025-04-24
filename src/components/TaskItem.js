import { useState } from 'react';
import EditTaskModal from './EditTaskModal';

export default function TaskItem({ task, onEdit, onDelete, onToggleCompletion }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <li className="p-4 bg-gray-100 rounded-md shadow-sm">
      <h3 className="text-lg font-bold">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>
      <p className="text-sm text-gray-500">
        Status: {task.completed ? 'Completed' : 'Pending'}
      </p>

      {/* Buttons */}
      <div className="mt-4 flex space-x-2">
        {/* Toggle Completion Button */}
        <button
          onClick={() => onToggleCompletion(task.id)}
          className={`px-3 py-1 rounded-md ${
            task.completed ? 'bg-green-500' : 'bg-yellow-500'
          } text-white hover:opacity-90 transition duration-300`}
        >
          {task.completed ? 'Undo' : 'Complete'}
        </button>

        {/* Edit Task Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          Edit Task
        </button>

        {/* Delete Task Button */}
        <button
          onClick={() => onDelete(task.id)}
          className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
        >
          Delete
        </button>
      </div>

      {/* Edit Task Modal */}
      <EditTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={task}
        onEdit={onEdit}
      />
    </li>
  );
}