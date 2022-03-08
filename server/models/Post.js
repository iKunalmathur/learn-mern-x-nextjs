import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  slug: String,
  content: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Post = mongoose.model("Post", postSchema);
export default Post;
