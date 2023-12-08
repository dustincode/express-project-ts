import express from 'express';
import authRoute from '~/features/auth/auth.route';

const router = express.Router();

router.use('/api/v1', authRoute);

export default router;
