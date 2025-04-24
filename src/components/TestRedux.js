import { useDispatch, useSelector } from 'react-redux';
import { addTask, toggleCompletion } from '../store/slices/tasksSlice';

export default function TestRedux() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  const handleAddTask = () => {
    const newTask = {
      id: Date.now(), // Generate a unique ID
      title: 'Test Task',
      description: 'This is a test task.',
      category: 'Personal',
      completed: false,
    };
    dispatch(addTask(newTask));
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Test Redux</h1>
      <button
        onClick={handleAddTask}
        className="px-4 py-2 bg-blue-600 text-white rounded-md mb-4"
      >
        Add Task
      </button>

      {/* Render the list of tasks */}
      <ul className="mt-4">
        {tasks.map((task) => (
          <li key={task.id} className="mb-2 flex items-center justify-between">
            <div>
              <strong>{task.title}</strong> -{' '}
              {task.completed ? 'Completed' : 'Pending'}
            </div>
            <button
              onClick={() => dispatch(toggleCompletion(task.id))}
              className={`px-3 py-1 rounded-md ${
                task.completed ? 'bg-green-500' : 'bg-yellow-500'
              } text-white`}
            >
              {task.completed ? 'Undo' : 'Complete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}