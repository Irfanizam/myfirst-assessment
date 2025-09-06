import Link from "next/link";

export default function PostCard(props) {
  const { post } = props;
  return (
    <Link className="unstyled" href={`/post/${post.slug}`}>
      <div className="postCard">
        <h3>{post.title}</h3>
        <div className="statsContainer">
          <div>
            <h5>Date</h5>
            <p>{post.date}</p>
          </div>
          <div>
            <h5>Content</h5>
            <p>{post.content}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
