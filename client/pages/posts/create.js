import React from "react";
import Layout from "../../Components/Layout";
import { isObjEmpty } from "../../helpers";
import { createPost } from "../../services/posts";

/* Post Create form */
async function handleForm(e) {
  e.preventDefault();

  const formData = {
    title: e.target.title.value ?? "",
    content: e.target.content.value ?? "",
  };

  if (isObjEmpty(formData)) return;

  // create post
  await createPost(formData);

  // Reset form
  e.target.title.value = e.target.content.value = "";
}

// Components
export default function create() {
  return (
    <>
      <Layout>
        <section className="mt-8 border p-4 ">
          <p className="mb-4">Create New Post</p>

          <form
            autoComplete="false"
            onSubmit={(e) => handleForm(e)}
            className="grid grid-cols-2 gap-4"
          >
            <input
              type="text"
              name="title"
              placeholder="title"
              className="block mb-1 col-span-2 bg-gray-100"
            />

            <textarea
              name="content"
              cols="30"
              rows="5"
              placeholder="once upon a time..."
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
        </section>
      </Layout>
    </>
  );
}
