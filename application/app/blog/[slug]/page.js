"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import db from "../../../utils/fireStore";
import { doc, getDoc } from "@firebase/firestore";

export default function BlogSlug() {
  const { slug } = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "blogs", slug);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const fetchedPost = { id: docSnap.id, ...docSnap.data() };
          setPost(fetchedPost);

          document.title = `Facts Blog · ${fetchedPost.title}`;
        } else {
          setPost(null);
          document.title = "Facts Blog · Not Found";
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    if (slug) fetchPost();
  }, [slug]);

  return (
    <div className="flex justify-center items-center p-6">
      <div className="max-w-2xl w-full bg-white shadow-md rounded-xl p-6">
        {post ? (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {post.title}
            </h1>
            <p className="text-sm text-gray-500 mb-4">{post.date}</p>

            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              {post.detail}
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">{post.content}</p>

            <button
              onClick={() => router.push("/blog")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              ← Back to Blog
            </button>
          </>
        ) : (
          <p className="text-gray-500 text-center">Loading or not found...</p>
        )}
      </div>
    </div>
  );
}
