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

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchWord, setSearchWord] = useState("");
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const handleAddTask = (newTask) => {
    dispatch(addTask({ ...newTask, id: Date.now() }));
    setIsAddTaskModalOpen(false);
  };

  const handleEditTask = (updatedTask) => {
    dispatch(editTask({ id: updatedTask.id, updatedTask }));
  };

  const handleToggleCompletion = (taskId) => {
    dispatch(toggleCompletion(taskId));
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const filteredTasks = tasks.filter((task) => {
    const matchSearch =
      searchWord === "" ||
      task.title.toLowerCase().includes(searchWord.toLowerCase()) ||
      task.description.toLowerCase().includes(searchWord.toLowerCase());

    const matchStatus =
      statusFilter === "All" ||
      (statusFilter === "Completed" && task.completed) ||
      (statusFilter === "Pending" && !task.completed);

    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Task Manager
        </h1>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
          <button
            onClick={() => setIsAddTaskModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow transition cursor-pointer"
          >
            + Add A Task
          </button>

          <input
            type="text"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            placeholder="Search tasks..."
            className="border border-blue-400 rounded-md max-w-30 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          {searchWord && (
            <button
              onClick={() => setSearchWord("")}
              title="Clear search"
              className="px-3 py-2 bg-yellow-300 hover:bg-yellow-400 text-gray-700 rounded-md font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="mb-6 gap-4 md:gap-8 flex flex-col md:flex-row justify-center items-center md:justify-start md:mt-16">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-gray-700">Category:</span>
            {["All", "Work", "Personal", "Other"].map((category) => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category)}
                className={`cursor-pointer px-3 py-1 rounded-md text-sm ${
                  categoryFilter === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-gray-700">Status:</span>
            {["All", "Completed", "Pending"].map((status) => {
              const bg =
                status === "Completed"
                  ? "bg-green-600 hover:bg-green-700"
                  : status === "Pending"
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-blue-600 hover:bg-blue-700";

              return (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`cursor-pointer px-3 py-1 rounded-md text-sm ${
                    statusFilter === status
                      ? `${bg} text-white`
                      : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                  }`}
                >
                  {status}
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal */}
        <AddTaskModal
          isOpen={isAddTaskModalOpen}
          onClose={() => setIsAddTaskModalOpen(false)}
          onSubmit={handleAddTask}
        />

        {/* Task Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Work", "Personal", "Other"].map((category) =>
            categoryFilter === "All" || categoryFilter === category ? (
              <div key={category} className="bg-white p-4 shadow rounded-lg">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                  {category}
                </h2>
                <TaskList
                  tasks={filteredTasks.filter(
                    (task) => task.category === category
                  )}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onToggleCompletion={handleToggleCompletion}
                />
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}
