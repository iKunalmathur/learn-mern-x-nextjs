import { Router } from "express";
import {
  createPost,
  deletePost,
  dislikePost,
  getPosts,
  likePost,
  updatePost,
} from "../controllers/postController.js";
const router = new Router();

router.get("/", getPosts);
router.post("/", createPost);
router.put("/", updatePost);
router.delete("/", deletePost);

router.post("/like", likePost);
router.post("/dislike", dislikePost);
export default router;
