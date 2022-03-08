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

/* create new post */
export const createPost = async (req, res) => {
  const body = req.body;

  const newPost = new Post({
    title: body.title,
    slug: body.slug,
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
    const updatedPost = await Post.findByIdAndUpdate(body.post_id, {
      title: body.title,
      slug: body.slug,
      content: body.content,
    });
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
