import express from 'express';
import * as accountController from '../controllers/accountController.js';

const router = express.Router();

router.get('/:id', accountController.getAccount)

router.post('/', accountController.createAccount)

router.patch('/:id', accountController.updateAccount)

router.delete('/:id', accountController.deleteAccount)

export default router;