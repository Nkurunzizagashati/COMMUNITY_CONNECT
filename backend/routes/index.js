import express from 'express';
import consumerRouter from './consumer.js';
import providerRouter from './provider.js';

const router = express.Router();

router.use('/consumers', consumerRouter);
router.use('/providers', providerRouter);

export default router;
