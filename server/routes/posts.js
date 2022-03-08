import { Router } from "express";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "../controllers/postController.js";
const router = new Router();

router.get("/", getPosts);
router.post("/", createPost);
router.put("/", updatePost);
router.delete("/", deletePost);

export default router;
