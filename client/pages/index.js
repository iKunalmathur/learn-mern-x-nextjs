import Link from "next/link";
import axios from "axios";
import Layout from "../Components/Layout";

/* Get Posts */
async function getPosts(params) {
  let config = {
    method: "GET",
    // url: `https://jsonplaceholder.typicode.com/posts?_limit=4`,
    url: `http://localhost:5500/posts`,
    header: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  const res = await axios(config);
  return res.data;
}

/* like post */

async function likePost(post_id) {
  console.log(post_id);
  let config = {
    method: "post",
    url: `http://localhost:5500/posts/like`,
    header: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      post_id,
    },
  };
  const res = await axios(config);

  const { _id, likes } = res.data.data;
  document.getElementById(post_id).innerText = likes;

  return res.data;
}

/* dislike post */
async function dislikePost(post_id) {
  console.log(post_id);
  let config = {
    method: "post",
    url: `http://localhost:5500/posts/dislike`,
    header: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      post_id,
    },
  };
  const res = await axios(config);

  const { _id, likes } = res.data.data;
  document.getElementById(post_id).innerText = likes;

  return res.data;
}

export async function getStaticProps(context) {
  const posts = await getPosts();

  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }) {
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
        <section className="grid sm:grid-cols-3 gap-4 mt-auto">
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
              </div>
            ))}
        </section>
      </main>
      <footer className="mt-auto"></footer>
    </Layout>
  );
}
