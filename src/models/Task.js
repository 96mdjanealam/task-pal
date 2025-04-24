// src/models/Task.js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: { type: String, enum: ["Work", "Personal", "Other"] },
  completed: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.models.Task || mongoose.model("Task", taskSchema);