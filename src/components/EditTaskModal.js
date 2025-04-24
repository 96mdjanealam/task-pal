import TaskForm from "./TaskForm";

export default function EditTaskModal({ isOpen, onClose, task, onEdit }) {
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
          className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h3 className="text-lg font-bold mb-4">Edit Task</h3>
        <TaskForm
          initialData={task}
          onSubmit={(updatedTask) => {
            onEdit(updatedTask);
            onClose();
          }}
        />
      </div>
    </div>
  );
}
