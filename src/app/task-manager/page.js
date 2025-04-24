// src/app/task-manager/page.js
"use client";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, editTask, deleteTask, toggleCompletion } from '../../store/slices/tasksSlice';
import TaskList from '../../components/TaskList';
import AddTaskModal from '../../components/AddTaskModal';

export default function TaskManager() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  // State for controlling the Add Task modal
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  // Handle adding a new task
  const handleAddTask = (newTask) => {
    dispatch(addTask({ ...newTask, id: Date.now() }));
    setIsAddTaskModalOpen(false);
  };

  // Handle editing an existing task
  const handleEditTask = (updatedTask) => {
    dispatch(editTask({ id: updatedTask.id, updatedTask }));
  };

  // Handle toggling completion status
  const handleToggleCompletion = (taskId) => {
    dispatch(toggleCompletion(taskId));
  };

  // Handle deleting a task
  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Task Manager</h1>

      {/* Add Task Button */}
      <div className="mb-4">
        <button
          onClick={() => setIsAddTaskModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          Add A Task
        </button>
      </div>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        onSubmit={handleAddTask}
      />

      {/* Task Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Work Tasks */}
        <div className="bg-white p-4 shadow-md rounded-md">
          <h3 className="text-lg font-bold text-gray-700 mb-4">Work</h3>
          <TaskList
            tasks={tasks.filter((task) => task.category === 'Work')}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onToggleCompletion={handleToggleCompletion}
          />
        </div>

        {/* Personal Tasks */}
        <div className="bg-white p-4 shadow-md rounded-md">
          <h3 className="text-lg font-bold text-gray-700 mb-4">Personal</h3>
          <TaskList
            tasks={tasks.filter((task) => task.category === 'Personal')}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onToggleCompletion={handleToggleCompletion}
          />
        </div>

        {/* Other Tasks */}
        <div className="bg-white p-4 shadow-md rounded-md">
          <h3 className="text-lg font-bold text-gray-700 mb-4">Other</h3>
          <TaskList
            tasks={tasks.filter((task) => task.category === 'Other')}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onToggleCompletion={handleToggleCompletion}
          />
        </div>
      </div>
    </div>
  );
}