import express from 'express';
import { checkSchema } from 'express-validator';
import {
	getAllConsumers,
	registerConsumer,
} from '../controllers/consumer';
import { createConsumerValidator } from '../middlewares/consumerValidator';

const router = express.Router();

router.get('/users', getAllConsumers);

router.post(
	'/users/register',
	checkSchema(createConsumerValidator),
	registerConsumer
);

router.get('/users/:id', (req, res) => {
	res.json({ message: 'GET user by ID route' });
});

router.put('/users/:id', (req, res) => {
	res.json({ message: 'PUT user by ID route' });
});

router.delete('/users/:id', (req, res) => {
	res.json({ message: 'DELETE user by ID route' });
});

export default router;
