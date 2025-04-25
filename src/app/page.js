"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/task-manager");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-4 text-center">
      <h1 className="text-4xl text-blue-900 mb-4">Welcome to <span className="font-bold ">Task Pal</span> </h1>
      <p className="text-lg text-blue-800 mb-8">
        Organize your tasks and boost productivity.
      </p>
      <button
        onClick={handleStart}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 cursor-pointer"
      >
        Start
      </button>
    </div>
  );
}
