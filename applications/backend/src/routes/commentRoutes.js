import express from 'express';
import * as commentController from '../controllers/commentController.js';

const router = express.Router();

router.get('/getAllPostComments/:postId', commentController.getAllCommentsByPostId)

router.get('/getComment/:commentId', commentController.getComment)

router.post('/createComment', commentController.createComment)

router.patch('/updateComment/:commentId', commentController.updateComment)

router.delete('/deleteComment/:commentId', commentController.deleteComment)

export default router;