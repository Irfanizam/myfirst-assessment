"use client";

import { useState } from "react";
import { 
  collection, 
  query, 
  orderBy, 
  limit, 
  startAfter, 
  getDocs 
} from "@firebase/firestore";
import { db } from "../../utils/fireStore";
import Link from "next/link";

const POSTS_PER_PAGE = 3;

const BlogItems = ({ initialPosts = [], totalPosts = 0, initialHasMore = false }) => {
  const [posts, setPosts] = useState(initialPosts);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialHasMore);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const nextPage = page + 1;
      const postsRef = collection(db, 'blogs');
      const q = query(
        postsRef,
        orderBy('date', 'desc'),
        limit(nextPage * POSTS_PER_PAGE)
      );

      const querySnapshot = await getDocs(q);
      const newPosts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setPosts(newPosts);
      setPage(nextPage);
      setHasMore(newPosts.length < totalPosts);
    } catch (error) {
      console.error('Error loading more posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <li
            key={post.id}
            className="bg-white border border-transparent shadow-xl hover:border-blue-500 hover:shadow-md rounded-xl p-4 transition flex flex-col h-full"
          >
            <Link href={`/blog/${post.id}`} className="flex flex-col h-full">
              <h2 className="text-lg font-semibold text-gray-800">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500">
                {new Date(post.date).toLocaleDateString()}
              </p>
              <p className="mt-2 text-gray-600 text-sm line-clamp-3">
                {post.detail}
              </p>
              <div className="mt-auto pt-4">
                <span className="text-blue-500 text-sm hover:underline">Read More →</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}

      {!hasMore && posts.length > 0 && (
        <div className="mt-8 text-center text-gray-500">
          No more posts to load
        </div>
      )}

      {posts.length === 0 && !loading && (
        <div className="text-center py-10 text-gray-500">
          No blog posts found.
        </div>
      )}
    </div>
  );
};

export default BlogItems;