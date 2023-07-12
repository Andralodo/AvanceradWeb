import express from 'express';
import * as accountController from '../controllers/accountController.js';

const router = express.Router();

router.get('/', accountController.getAllAccount)

router.get('/:id', accountController.getAccount)

router.post('/signUp', accountController.createAccount)

router.post('/signIn', accountController.createAccount)

router.patch('/updateAccount', accountController.updateAccount)

router.delete('/deleteAccount/:id', accountController.deleteAccount)

export default router;