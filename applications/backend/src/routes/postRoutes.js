import express from 'express';
import * as postController from '../controllers/postController.js';

const router = express.Router();

router.get('/', postController.getAllPosts)

router.get('/:id', postController.getPost)

router.post('/createPost', postController.createPost)

router.patch('/updatePost/:id', postController.updatePost)

router.delete('/deletePost/:id', postController.deletePost)

export default router;