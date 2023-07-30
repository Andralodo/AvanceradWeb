import express from 'express';
import * as commentController from '../controllers/commentController.js';
import { authenticateAccessToken } from "../services/auth.js";

const router = express.Router();

router.get('/getAllPostComments/:postId', commentController.getAllCommentsByPostId)

router.get('/getComment/:commentId', commentController.getComment)

router.post('/createComment', authenticateAccessToken, commentController.createComment)

router.patch('/updateComment/:commentId', authenticateAccessToken, commentController.updateComment)

router.delete('/deleteComment/:commentId', authenticateAccessToken, commentController.deleteComment)

export default router;