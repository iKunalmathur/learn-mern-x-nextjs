import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import { getComments, makeComments } from "../../services/comments";
import { getPostBySlug } from "../../services/posts";
import Image from "next/image";
import useSWR from "swr";
import { capitalize, isObjEmpty } from "../../helpers";
import Link from "next/link";

/* Get Static paths */
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

/* Get Static props */
export async function getStaticProps(context) {
  const { slug } = context.params;
  const post = await getPostBySlug(slug);
  return {
    props: {
      post,
    },
  };
}

/* Supporting methods */
//none
/* Components */
export default function post({ post }) {
  const [comments, setComments] = useState([]);

  const fetchComments = async (post_id) => {
    setComments(await getComments(post_id));
  };

  /* Comment form */
  async function handleForm(e) {
    e.preventDefault();

    const formData = {
      post_id: post._id,
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    if (isObjEmpty(formData)) return;

    await makeComments(formData);
    fetchComments(post._id);
    // Reset form
    e.target.name.value = e.target.email.value = e.target.message.value = "";
  }

  useEffect(() => {
    fetchComments(post._id);
  }, []);
  return (
    <Layout>
      <div>
        {post ? (
          <div>
            {/* Meta */}
            <div>
              <div className="flex justify-between">
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
                <Link href={`/posts/edit/${post._id}`}>
                  <a className="border px-3 py-2 capitalize block bg-gray-100 hover:bg-gray-200">
                    📎 Edit
                  </a>
                </Link>
              </div>
              <h1 className="text-3xl font-semibold my-4">{post.title}</h1>
              <div className="my-4">
                <p className="text-muted">Likes - {post.likes}</p>
              </div>
            </div>
            {/* Content */}
            <div className="prose-lg">{post.content}</div>
            {/* show comments */}
            <div className="mt-auto">
              <div className="border-b my-8"></div>
              {comments?.length ? (
                comments.map((comment, index) => (
                  <div key={index} className="space-y-2 mt-4">
                    <h3>
                      <div className="flex items-center gap-4">
                        <Image
                          width={"40px"}
                          height={"40px"}
                          layout="fixed"
                          src={`https://ui-avatars.com/api/?name=${comment.name}&background=random`}
                        />
                        <div>
                          <p className="text-lg font-semibold">
                            {capitalize(comment.name)} &nbsp;
                          </p>
                          <p className="text-muted">{comment.email}</p>
                        </div>
                      </div>
                    </h3>
                    <p className="text-muted">{comment.message}</p>
                  </div>
                ))
              ) : (
                <div className="space-y-2 mt-4">
                  <h3>
                    <div className="flex items-center gap-4">
                      <div className="w-[40px] aspect-1 bg-gray-300"></div>
                      <div>
                        <div className="text-lg font-semibold ">
                          <div className="w-[100px] h-4 bg-gray-300 "></div>
                        </div>
                        <div className="text-muted ">
                          <div className="w-[200px] mt-1 h-4 bg-gray-300"></div>
                        </div>
                      </div>
                    </div>
                  </h3>
                  <div className="text-muted">
                    <div className="w-[400px] h-4 bg-gray-300"></div>
                  </div>
                </div>
              )}
              <div className="mt-8 border p-4 ">
                <p className="mb-4">Add your thoughts</p>
                <form
                  autoComplete="false"
                  onSubmit={(e) => handleForm(e)}
                  className="grid grid-cols-2 gap-4"
                >
                  <input
                    type="text"
                    placeholder="name"
                    name="name"
                    className="block mb-1 col-span-1 bg-gray-100"
                  />
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    className="block mb-1 col-span-1 bg-gray-100"
                  />
                  <textarea
                    name="message"
                    cols="30"
                    rows="5"
                    placeholder="hmmm.."
                    className="block mb-1 col-span-2 bg-gray-100"
                  ></textarea>
                  <div className="col-span-1">
                    <button
                      type="submit"
                      className="border px-3 py-2 capitalize block bg-gray-100 hover:bg-gray-200"
                    >
                      🚀 Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          "no post"
        )}
      </div>
    </Layout>
  );
}
