import Link from "next/link";
import React from "react";
import Layout from "../../Components/Layout";
import { getPosts } from "../../services/posts";

/* Get Static props */
export async function getStaticProps(context) {
  const posts = await getPosts();

  return {
    props: {
      posts,
    },
  };
}

/* Components */
export default function posts({ posts }) {
  return (
    <Layout>
      <main className="space-y-8">
        <section className="flex justify-between">
          <h1 className="text-6xl font-semibold">All Posts</h1>
          <div>
            <Link href={"/posts/create"}>
              <a className="border px-3 py-2 capitalize block bg-gray-100 hover:bg-gray-200">
                📝 Create new
              </a>
            </Link>
          </div>
        </section>
        <div className="grid sm:grid-cols-12 gap-6">
          {posts?.length &&
            posts.map((post, index) => (
              <div key={index} className="sm:col-span-4 border rounded-lg p-4">
                <div>
                  <p>
                    <small>
                      {new Date(post.createdAt).toLocaleDateString("en-gb", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        timeZone: "utc",
                      })}
                    </small>
                  </p>
                  <Link href={`/posts/[slug]`} as={`/posts/${post.slug}`}>
                    <a className="text-lg font-semibold my-2 hover:underline">
                      {post.title}
                    </a>
                  </Link>
                  <p className="text-muted text-sm mt-2 line-clamp-3">
                    {post.content}
                  </p>
                </div>
                <div></div>
              </div>
            ))}
        </div>
      </main>
    </Layout>
  );
}
