import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5500";

const globalConfig = {
  header: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

/* Get Posts */
export async function getPosts() {
  let config = {
    method: "GET",
    url: `${API_URL}/posts`,
    ...globalConfig,
  };
  const res = await axios(config);
  return res.data;
}

/* Get Post By Slug */
export async function getPostBySlug(slug) {
  let config = {
    method: "GET",
    url: `${API_URL}/posts/slug`,
    ...globalConfig,
    params: {
      slug,
    },
  };
  const res = await axios(config);
  return res.data;
}

/* Get Post By ID */
export async function getPostById(post_id) {
  let config = {
    method: "GET",
    url: `${API_URL}/posts/id`,
    ...globalConfig,
    params: {
      post_id,
    },
  };

  try {
    const res = await axios(config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

/* Create Post*/
export async function createPost(data) {
  let config = {
    method: "POST",
    url: `${API_URL}/posts`,
    ...globalConfig,
    data,
  };

  try {
    const res = await axios(config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

/* Update Post*/
export async function updatePost(data) {
  let config = {
    method: "PUT",
    url: `${API_URL}/posts`,
    ...globalConfig,
    data,
  };

  try {
    const res = await axios(config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

/* like post */

export async function likePost(post_id) {
  try {
    let config = {
      method: "put",
      url: `${API_URL}/posts/like`,
      ...globalConfig,
      data: {
        post_id,
      },
    };
    const res = await axios(config);

    const { _id, likes } = res.data.data;
    document.getElementById(post_id).innerText = likes;
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

/* dislike post */
export async function dislikePost(post_id) {
  try {
    let config = {
      method: "put",
      url: `${API_URL}/posts/dislike`,
      ...globalConfig,
      data: {
        post_id,
      },
    };
    const res = await axios(config);

    const { _id, likes } = res.data.data;
    document.getElementById(post_id).innerText = likes;

    return res.data;
  } catch (error) {
    console.log(error);
  }
}
