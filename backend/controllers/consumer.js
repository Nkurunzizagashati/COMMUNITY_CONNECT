import { matchedData, validationResult } from 'express-validator';
import Consumer from '../models/consumer.js';

const getAllConsumers = async (req, res) => {
	try {
		const users = await Consumer.find();
		if (users.length === 0) {
			return res.status(404).json({ message: 'No users found' });
		}
		return res.status(200).json({ users });
	} catch (error) {
		return res
			.status(500)
			.json({ message: 'Something went wrong' });
	}
};

const getUserById = async (req, res) => {};

const registerConsumer = async (req, res) => {
	try {
		const result = validationResult(req);
		if (!result.isEmpty()) {
			return res
				.status(400)
				.json({ errors: result.array()[0].msg });
		}

		const data = matchedData(req);
		const consumer = await Consumer.create(data);
		const consumerData = consumer.toObject();
		delete consumerData.password;
		res.status(201).json({
			message: 'Consumer registered successfully',
			consumerData,
		});
	} catch (error) {}
};

export { getAllConsumers, registerConsumer };
