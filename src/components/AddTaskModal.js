import TaskForm from "./TaskForm";

export default function AddTaskModal({ isOpen, onClose, onSubmit }) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className=" fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-md shadow-md z-10 w-full max-w-md relative"
      >
        <button
          onClick={onClose}
          className="absolute top-2 cursor-pointer right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Add a New Task
        </h2>
        <TaskForm onSubmit={onSubmit} />
      </div>
    </div>
  );
}
