// src/components/AddTaskModal.js
import { useState } from 'react';
import TaskForm from './TaskForm';

export default function AddTaskModal({ isOpen, onClose, onSubmit }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white p-6 rounded-md shadow-md z-10 w-full max-w-md relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold text-gray-700 mb-4">Add a New Task</h2>
        <TaskForm onSubmit={onSubmit} />
      </div>
    </div>
  );
}