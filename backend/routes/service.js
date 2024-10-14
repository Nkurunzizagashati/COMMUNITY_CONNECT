import express from 'express';
import { checkSchema } from 'express-validator';
import { createServiceValidator } from '../middlewares/serviceValidator';
import { createService } from '../controllers/service';

const router = express.Router();

router.post('/', checkSchema(createServiceValidator), createService);

export default router;
