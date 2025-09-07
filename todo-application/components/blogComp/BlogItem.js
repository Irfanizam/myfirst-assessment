"use client";

import { useState, useEffect } from "react";
import db from "../../utils/fireStore";
import { collection, onSnapshot } from "@firebase/firestore";
import Link from "next/link";

const BlogItems = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "blogs"), (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <ul className="grid grid-cols-2 gap-4 items-stretch">
        {posts.map((post) => (
          <li
            key={post.id}
            className="bg-white border border-transparent shadow-xl hover:border-blue-500 hover:shadow-md rounded-xl p-4 transition flex flex-col"
          >
            <Link href={`blog/${post.id}`} className="flex flex-col h-full">
              <h2 className="text-lg font-semibold text-gray-800">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500">{post.date}</p>
              <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                {post.detail}
              </p>
              <div className="mt-auto text-blue-500 text-sm">Read More →</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogItems;
