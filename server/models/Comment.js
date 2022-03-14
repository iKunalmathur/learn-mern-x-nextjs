import mongoose from "mongoose";
const ObjectId = mongoose.Schema.ObjectId;

const commentSchema = mongoose.Schema({
  post_id: ObjectId,
  name: String,
  email: String,
  message: String,
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
