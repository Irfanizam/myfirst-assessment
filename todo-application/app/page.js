"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold text-gray-800 mb-10">
        myFirst Assessment - Irfan 📑
      </h1>
      <div className="flex gap-8">
        <Link
          href="/blog"
          className="px-8 py-4 rounded-2xl bg-white/70 shadow-md hover:shadow-xl hover:scale-105 hover:bg-white transition cursor-pointer text-gray-800 font-medium"
        >
          ✨ Blog Application
        </Link>
        <Link
          href="/todo"
          className="px-8 py-4 rounded-2xl bg-white/70 shadow-md hover:shadow-xl hover:scale-105 hover:bg-white transition cursor-pointer text-gray-800 font-medium"
        >
          ✨ To-Do List Application
        </Link>
      </div>
    </div>
  );
}
