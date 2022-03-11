import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { dislikePost, getPosts, likePost } from "../services/posts";

export async function getStaticProps(context) {
  const posts = await getPosts();

  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }) {
  const [currentPostId, setCurrentPostId] = useState(null);
  const [currentPost, setCurrentPost] = useState({});

  const findPost = (post_id) => {
    setCurrentPost(posts.find((p) => p._id == post_id));
  };

  useEffect(() => {
    findPost(currentPostId);
  }, [currentPostId]);

  return (
    <Layout>
      <header className="flex justify-between flex-wrap py-8">
        <div>
          <div>
            <span className="text-4xl font-semibold text-lime-600">MERN </span>

            <span>With </span>
            <span className="bg-black text-white px-2 font-semibold">
              Next JS
            </span>
          </div>
        </div>
        <nav>v1.0.0</nav>
      </header>
      <main className="space-y-8">
        <section>
          <h1 className="text-6xl font-semibold">Blog</h1>
        </section>
        <div className={`${currentPostId ? "grid grid-cols-3 gap-4" : ""}`}>
          <section className={`${currentPostId ? "col-span-2" : "hidden"}`}>
            {currentPost && (
              <article className="prose-sm border rounded-lg p-6 h-full">
                <p>
                  <small>
                    {new Date(currentPost.createdAt).toLocaleDateString(
                      "en-gb",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        timeZone: "utc",
                      }
                    )}
                  </small>
                </p>
                <h1>{currentPost.title}</h1>
                <div>{currentPost.content}</div>
              </article>
            )}
          </section>
          <section
            className={`${
              currentPostId
                ? "col-span-1 space-y-4"
                : "grid sm:grid-cols-3 gap-4 mt-auto"
            }`}
          >
            {posts?.length &&
              posts.map((post, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 flex flex-col justify-between"
                >
                  <div>
                    <Link href={`/posts/[slug]`} as={`/posts/${post.slug}`}>
                      <a className="font-semibold text-lg">{post.title}</a>
                    </Link>
                    <p className="text-muted text-sm mt-2 line-clamp-3">
                      {post.content}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={(e) => {
                          likePost(post._id);
                        }}
                      >
                        👍
                      </button>
                      <p className="bg-gray-100 p-1 rounded-md" id={post._id}>
                        {post.likes ?? 0}
                      </p>
                      <button
                        onClick={(e) => {
                          dislikePost(post._id);
                        }}
                      >
                        👎
                      </button>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={(e) => {
                          setCurrentPostId(post._id);
                        }}
                      >
                        {currentPostId === post._id ? "📖" : "📘"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </section>
        </div>
      </main>
      <footer className="mt-auto py-6"></footer>
    </Layout>
  );
}
