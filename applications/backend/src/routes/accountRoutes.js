import express from 'express';
import * as accountController from '../controllers/accountController.js';
import { verifyAccessToken, decodeIdToken } from "../services/auth.js";

const router = express.Router();

router.get('/fetchCurrentUser', verifyAccessToken, decodeIdToken, accountController.fetchCurrentUser)

router.get('/:id', verifyAccessToken, accountController.getAccountById)

router.post('/register', accountController.register)

router.post('/login', accountController.login)

router.post('/logout', verifyAccessToken, accountController.logout)

router.patch('/updateAccount/:id', verifyAccessToken, accountController.updateAccount)

router.delete('/deleteAccount/:id', verifyAccessToken, accountController.deleteAccount)

export default router;