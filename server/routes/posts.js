import { Router } from "express";
import { getPosts } from "../controllers/postController.js";

const router = new Router();

router.get("/", getPosts);

export default router;
