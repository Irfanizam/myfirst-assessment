"use client";

import BlogItems from "@/components/blogComp/BlogItem";

export default function Blog() {

  return (
    <div className="justify-center flex flex-col items-center p-6 flex-grow">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          ✨ Posts Page
        </h1>
        <BlogItems />
      </div>
    </div>
  );
}
