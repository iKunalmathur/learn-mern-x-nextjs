import { Router } from "express";
import {
  createPost,
  deletePost,
  dislikePost,
  getPostById,
  getPostBySlug,
  getPosts,
  likePost,
  updatePost,
} from "../controllers/postController.js";
const router = new Router();

router.get("/", getPosts);
router.get("/slug", getPostBySlug);
router.get("/id", getPostById);
router.post("/", createPost);
router.put("/", updatePost);
router.delete("/", deletePost);

router.put("/like", likePost);
router.put("/dislike", dislikePost);
export default router;
