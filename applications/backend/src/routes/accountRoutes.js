import express from 'express';
import * as accountController from '../controllers/accountController.js';
import { authenticateAccessToken } from "../services/auth.js";

const router = express.Router();

router.get('/:id', authenticateAccessToken, accountController.getAccount)

router.post('/register', accountController.register)

router.post('/login', accountController.login)

router.post('/logout', authenticateAccessToken, accountController.logout)

router.patch('/updateAccount/:id', authenticateAccessToken, accountController.updateAccount)

router.delete('/deleteAccount/:id', authenticateAccessToken, accountController.deleteAccount)

export default router;