import express from 'express';
import * as postController from '../controllers/postController.js';
import { authenticateAccessToken } from "../services/auth.js";

const router = express.Router();

router.get('/', postController.getAllPosts)

router.get('/:id', postController.getPost)

router.post('/createPost', authenticateAccessToken, postController.createPost)

router.patch('/updatePost/:id', authenticateAccessToken, postController.updatePost)

router.delete('/deletePost/:id', authenticateAccessToken, postController.deletePost)

export default router;