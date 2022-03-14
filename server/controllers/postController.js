import Post from "../models/Post.js";

/* all posts */
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* get a post by slug */
export const getPostBySlug = async (req, res) => {
  const { slug } = req.query;
  try {
    const post = await Post.findOne({ slug: slug });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* get a post by id */
export const getPostById = async (req, res) => {
  const { post_id } = req.query;
  try {
    const post = await Post.findById(post_id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* create new post */
export const createPost = async (req, res) => {
  const body = req.body;

  const newPost = new Post({
    title: body.title,
    slug: generateSlug(body.title),
    content: body.content,
  });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* update post */
export const updatePost = async (req, res) => {
  const body = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      body.post_id,
      {
        title: body.title,
        slug: generateSlug(body.title),
        content: body.content,
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* delete post */
export const deletePost = async (req, res) => {
  const body = req.body;
  try {
    await Post.deleteOne({ _id: body.post_id });
    res.status(200).json({ message: "record deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Add like */
export const likePost = async (req, res) => {
  const body = req.body;
  const post = await Post.findById(body.post_id).select("likes");
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      post._id,
      {
        likes: post.likes + 1,
      },
      { new: true }
    );
    res.status(200).json({
      message: "post liked",
      data: updatedPost,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Add like */
export const dislikePost = async (req, res) => {
  const body = req.body;
  const post = await Post.findById(body.post_id).select("likes");

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      post._id,
      {
        likes: post.likes ? post.likes - 1 : 0,
      },
      { new: true }
    );
    res.status(200).json({
      message: "post disliked",
      data: updatedPost,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supporting methods
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[-]+/g, "-")
    .replace(/[^\w-]+/g, "");
};
