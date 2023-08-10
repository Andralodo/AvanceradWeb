import express from 'express';
import * as postController from '../controllers/postController.js';
import { verifyAccessToken } from "../services/auth.js";

const router = express.Router();

router.get('/', postController.getAllPosts)

router.get('/:id', postController.getPost)

router.post('/createPost', verifyAccessToken, postController.createPost)

router.put('/updatePost/:id', verifyAccessToken, postController.updatePost)

router.delete('/deletePost/:id', verifyAccessToken, postController.deletePost)

export default router;