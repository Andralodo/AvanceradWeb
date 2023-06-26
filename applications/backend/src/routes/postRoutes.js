import express from 'express';
import * as postController from '../controllers/postController.js';

const router = express.Router();

router.get('/', postController.getAllPosts)

router.get('/:id', postController.getPost)

router.post('/', postController.createPost)

router.patch('/:id', postController.updatePost)

router.delete('/:id', postController.deletePost)

export default router;