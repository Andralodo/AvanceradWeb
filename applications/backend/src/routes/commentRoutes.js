import express from 'express';
import * as commentController from '../controllers/commentController.js';
import { verifyAccessToken } from "../services/auth.js";

const router = express.Router();

router.get('/getAllPostComments/:postId', commentController.getAllCommentsByPostId)

router.post('/createComment', verifyAccessToken, commentController.createComment)

router.patch('/updateComment/:commentId', verifyAccessToken, commentController.updateComment)

router.delete('/deleteComment/:commentId', verifyAccessToken, commentController.deleteComment)

export default router;