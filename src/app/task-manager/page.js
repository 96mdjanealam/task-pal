// src/app/task-manager/page.js
"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  editTask,
  deleteTask,
  toggleCompletion,
} from "../../store/slices/tasksSlice";
import TaskList from "../../components/TaskList";
import AddTaskModal from "../../components/AddTaskModal";

export default function TaskManager() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  // State for controlling filters
  const [categoryFilter, setCategoryFilter] = useState("All"); // Default: All categories
  const [statusFilter, setStatusFilter] = useState("All"); // Default: All statuses
  const [searchWord, setSearchWord] = useState("");

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

  // Apply filters to tasks
  const filteredTasks = tasks.filter((task) => {
    const matchSearchWord =
      searchWord === "" ||
      task.title.toLowerCase().includes(searchWord.toLowerCase()) ||
      task.description.toLowerCase().includes(searchWord.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Completed" && task.completed) ||
      (statusFilter === "Pending" && !task.completed);
    return matchesStatus && matchSearchWord;
  });

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Task Manager</h1>

      {/* Add Task Button */}
      <div className="mb-4 flex gap-3">
        <button
          onClick={() => setIsAddTaskModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          Add A Task
        </button>
        <input
          className="px-4 py-2 border-2 max-w-56 border-blue-500 rounded-md"
          onChange={(e) => setSearchWord(e.target.value)}
          value={searchWord}
          placeholder="Search task"
        />
        {searchWord && (
          <button
            onClick={() => setSearchWord("")}
            className="px-4 font-bold py-2 cursor-pointer rounded-md bg-amber-300 hover:bg-amber-400 text-gray-700"
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filter Buttons */}
      <div className="mb-4 space-y-2">
        {/* Category Filter */}
        <div>
          <p className="font-semibold text-gray-700 mr-2">
            Filter by Category:
          </p>
          <button
            onClick={() => setCategoryFilter("All")}
            className={`px-3 py-1 rounded-md ${
              categoryFilter === "All"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            } hover:bg-blue-700 hover:text-white transition duration-300`}
          >
            All
          </button>
          <button
            onClick={() => setCategoryFilter("Work")}
            className={`px-3 py-1 rounded-md ml-2 ${
              categoryFilter === "Work"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            } hover:bg-blue-700 hover:text-white transition duration-300`}
          >
            Work
          </button>
          <button
            onClick={() => setCategoryFilter("Personal")}
            className={`px-3 py-1 rounded-md ml-2 ${
              categoryFilter === "Personal"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            } hover:bg-blue-700 hover:text-white transition duration-300`}
          >
            Personal
          </button>
          <button
            onClick={() => setCategoryFilter("Other")}
            className={`px-3 py-1 rounded-md ml-2 ${
              categoryFilter === "Other"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            } hover:bg-blue-700 hover:text-white transition duration-300`}
          >
            Other
          </button>
        </div>

        {/* Status Filter */}
        <div>
          <p className="font-semibold text-gray-700 mr-2">Filter by Status:</p>
          <button
            onClick={() => setStatusFilter("All")}
            className={`px-3 py-1 rounded-md ${
              statusFilter === "All"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            } hover:bg-blue-700 hover:text-white transition duration-300`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter("Completed")}
            className={`px-3 py-1 rounded-md ml-2 ${
              statusFilter === "Completed"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700"
            } hover:bg-green-700 hover:text-white transition duration-300`}
          >
            Completed
          </button>
          <button
            onClick={() => setStatusFilter("Pending")}
            className={`px-3 py-1 rounded-md ml-2 ${
              statusFilter === "Pending"
                ? "bg-yellow-600 text-white"
                : "bg-gray-200 text-gray-700"
            } hover:bg-yellow-700 hover:text-white transition duration-300`}
          >
            Pending
          </button>
        </div>
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

        {(categoryFilter === "Work" || categoryFilter === "All") && (
          <div className="bg-white p-4 shadow-md rounded-md">
            <h3 className="text-lg font-bold text-gray-700 mb-4">Work</h3>
            <TaskList
              tasks={filteredTasks.filter((task) => task.category === "Work")}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onToggleCompletion={handleToggleCompletion}
            />
          </div>
        )}

        {/* Personal Tasks */}
        {(categoryFilter === "Personal" || categoryFilter === "All") && (
          <div className="bg-white p-4 shadow-md rounded-md">
            <h3 className="text-lg font-bold text-gray-700 mb-4">Personal</h3>
            <TaskList
              tasks={filteredTasks.filter(
                (task) => task.category === "Personal"
              )}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onToggleCompletion={handleToggleCompletion}
            />
          </div>
        )}

        {/* Other Tasks */}
        {(categoryFilter === "Other" || categoryFilter === "All") && (
          <div className="bg-white p-4 shadow-md rounded-md">
            <h3 className="text-lg font-bold text-gray-700 mb-4">Other</h3>
            <TaskList
              tasks={filteredTasks.filter((task) => task.category === "Other")}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onToggleCompletion={handleToggleCompletion}
            />
          </div>
        )}
      </div>
    </div>
  );
}
