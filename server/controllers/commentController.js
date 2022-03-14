import Comment from "../models/Comment.js";

export const getComments = async (req, res) => {
  const query = req.query;
  try {
    const comments = await Comment.find({ post_id: query.post_id }).exec();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createComment = async (req, res) => {
  const body = req.body;

  const newComment = new Comment({
    post_id: body.post_id,
    name: body.name,
    email: body.email,
    message: body.message,
  });

  try {
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
