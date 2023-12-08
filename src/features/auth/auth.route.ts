import express from 'express';
import { catchErrors } from '~/middlewares/error.middleware';
import authController from './auth.controller';

const router = express.Router();

router.post('/login', catchErrors(authController.login));

export default router;
