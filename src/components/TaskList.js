import TaskItem from './TaskItem';

export default function TaskList({ tasks, onEdit, onDelete, onToggleCompletion }) {
  return (
    <ul className="space-y-4">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleCompletion={onToggleCompletion}
          />
        ))
      ) : (
        <p className="text-gray-600">No tasks found.</p>
      )}
    </ul>
  );
}