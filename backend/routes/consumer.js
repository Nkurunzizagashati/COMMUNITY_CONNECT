import express from 'express';
import { checkSchema } from 'express-validator';
import {
	getAllConsumers,
	loginConsumer,
	registerConsumer,
} from '../controllers/consumer.js';
import {
	createConsumerValidator,
	loginConsumerValidator,
} from '../middlewares/consumerValidator.js';

const router = express.Router();

router.get('/', getAllConsumers);

router.post(
	'/register',
	checkSchema(createConsumerValidator),
	registerConsumer
);

router.post(
	'/login',
	checkSchema(loginConsumerValidator),
	loginConsumer
);

router.get('/:id', (req, res) => {
	res.json({ message: 'GET user by ID route' });
});

router.put('/:id', (req, res) => {
	res.json({ message: 'PUT user by ID route' });
});

router.delete('/:id', (req, res) => {
	res.json({ message: 'DELETE user by ID route' });
});

export default router;
