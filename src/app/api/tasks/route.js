// app/api/tasks/route.js
import dbConnect from "../../../lib/dbConnect";
import Task from "../../../models/Task";
import jwt from "jsonwebtoken";

export async function GET(request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) {
    return Response.json({ message: "Access denied. No token provided." }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  let userId;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    userId = decoded.userId;
  } catch (error) {
    return Response.json({ message: "Invalid token." }, { status: 403 });
  }

  try {
    await dbConnect();
    const tasks = await Task.find({ userId });
    return Response.json(tasks, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Something went wrong." }, { status: 500 });
  }
}

export async function POST(request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) {
    return Response.json({ message: "Access denied. No token provided." }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  let userId;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    userId = decoded.userId;
  } catch (error) {
    return Response.json({ message: "Invalid token." }, { status: 403 });
  }

  const { title, description, category } = await request.json();

  try {
    await dbConnect();
    const newTask = new Task({ title, description, category, userId });
    await newTask.save();

    return Response.json({ message: "Task added successfully.", task: newTask }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Something went wrong." }, { status: 500 });
  }
}