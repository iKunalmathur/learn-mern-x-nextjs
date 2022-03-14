import React from "react";
import Layout from "../../../Components/Layout";
import { isObjEmpty } from "../../../helpers";
import { getPostById, updatePost } from "../../../services/posts";

/* Server side props */
export async function getServerSideProps(context) {
  const { id } = context.params;
  const post = await getPostById(id);
  return {
    props: {
      post,
    },
  };
}

// Components
export default function edit({ post }) {
  /* Post Update form */
  async function handleForm(e) {
    e.preventDefault();

    const formData = {
      post_id: post._id,
      title: e.target.title.value ?? "",
      content: e.target.content.value ?? "",
    };

    if (isObjEmpty(formData)) return;

    // create post
    await updatePost(formData);

    // Reset form
    // e.target.title.value = e.target.content.value = "";
  }

  return (
    <>
      <Layout>
        <section className="mt-8 border p-4 ">
          <p className="mb-4">Update Post</p>

          <form
            autoComplete="false"
            onSubmit={(e) => handleForm(e)}
            className="grid grid-cols-2 gap-4"
          >
            <input
              type="text"
              name="title"
              placeholder="title"
              defaultValue={post.title ?? ""}
              className="block mb-1 col-span-2 bg-gray-100"
            />

            <textarea
              name="content"
              cols="30"
              rows="5"
              placeholder="once upon a time..."
              className="block mb-1 col-span-2 bg-gray-100"
              defaultValue={post.content ?? ""}
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
        </section>
      </Layout>
    </>
  );
}
