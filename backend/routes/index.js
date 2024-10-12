import express from 'express';
import consumerRouter from './consumer.js';

const router = express.Router();

router.use('/consumers', consumerRouter);

export default router;
