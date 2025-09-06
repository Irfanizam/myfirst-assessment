import Markdown from "markdown-to-jsx";
import getPostMetaData from "@/utils/getPostMetaData";
import React from "react";
import fs from "fs";
import matter from "gray-matter";

function getPostContent(slug) {
  const folder = "posts/";
  const file = folder + `${slug}.md`;
  const content = fs.readFileSync(file, "utf8");

  const matterResult = matter(content);
  return matterResult;
}

export const generateStaticParams = async () => {
  const posts = getPostMetaData("posts");
  return posts.map((post) => ({ slug: post.slug }));
};

export async function generateMetadata({ params }) {
  const slug = (await params).slug;
  const id = slug ? " ⋅ " + slug : "";
  return {
    title: `Blog Post ${id.replaceAll("_", " ")}`,
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPostContent(slug);
  return (
    <main>
      <article>
        <header style={{ marginBottom: "10rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p>{post.data.title}</p>
            <p>
              <em>{post.data.date}</em>
            </p>
            <p>{post.data.content}</p>
          </div>
        </header>
        <Markdown>{post.content}</Markdown>
      </article>
    </main>
  );
}
