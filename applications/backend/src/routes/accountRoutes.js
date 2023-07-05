import express from 'express';
import * as accountController from '../controllers/accountController.js';

const router = express.Router();

router.get('/', accountController.getAllAccount)

router.get('/:id', accountController.getAccount)

router.post('/createAccount', accountController.createAccount)

router.patch('/updateAccount/:id', accountController.updateAccount)

router.delete('/deleteAccount/:id', accountController.deleteAccount)

export default router;