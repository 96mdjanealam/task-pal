// src/store/slices/tasksSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  tasks: [], // An array to hold all tasks
};

// Create the tasks slice
const tasksSlice = createSlice({
  name: 'tasks', // Name of the slice
  initialState,
  reducers: {
    // Add a new task
    addTask: (state, action) => {
      state.tasks.push(action.payload); // Add the new task to the array
    },

    // Edit an existing task
    editTask: (state, action) => {
      const { id, updatedTask } = action.payload; // Extract the task ID and updated data
      const taskIndex = state.tasks.findIndex((task) => task.id === id); // Find the task index
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updatedTask }; // Update the task
      }
    },

    // Delete a task
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload); // Remove the task
    },

    // Toggle task completion status
    toggleCompletion: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload); // Find the task
      if (task) {
        task.completed = !task.completed; // Toggle the "completed" status
      }
    },
  },
});

// Export actions
export const { addTask, editTask, deleteTask, toggleCompletion } = tasksSlice.actions;

// Export the reducer
export default tasksSlice.reducer;