import PostCard from "@/components/PostCard";
import getPostMetaData from "@/utils/getPostMetaData";

export default function Home() {
  const postMetadata = getPostMetaData("posts");

  return (
    <main>
      <div className="postsContainer">
      {postMetadata.map((post, postIndex) => {
        return (
          <PostCard key={postIndex} post={post}/>
        )
      })}
      </div>
    </main>
  );
}
