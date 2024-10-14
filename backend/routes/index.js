import express from 'express';
import consumerRouter from './consumer.js';
import providerRouter from './provider.js';
import serviceRouter from './service.js';

const router = express.Router();

router.use('/consumers', consumerRouter);
router.use('/providers', providerRouter);
router.use('/services', serviceRouter);

export default router;
