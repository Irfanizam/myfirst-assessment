import BlogItems from "@/components/blogComp/BlogItem";
import { getBlogPosts } from "@/utils/blogUtils";

export default async function Blog() {
  const { posts, totalPosts, hasMore } = await getBlogPosts(1);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          ✨ Blog Posts
        </h1>
        <BlogItems 
          initialPosts={posts} 
          totalPosts={totalPosts}
          initialHasMore={hasMore} 
        />
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';