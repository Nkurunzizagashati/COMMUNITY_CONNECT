import { matchedData, validationResult } from 'express-validator';
import Consumer from '../models/consumer.js';
import { comparePasswords, hashPassword } from '../utils/helpers.js';
import {
	generateJWTauthToken,
	generateJWTrefreshToken,
} from '../utils/authTokens.js';
import RefreshToken from '../models/token.js';

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

const registerConsumer = async (req, res) => {
	try {
		const result = validationResult(req);
		if (!result.isEmpty()) {
			return res
				.status(400)
				.json({ errors: result.array()[0].msg });
		}

		const data = matchedData(req);
		const password = data.password;

		const hashedPassword = await hashPassword(password);
		data.password = hashedPassword;

		// REGISTER CONSUMER
		const consumer = await Consumer.create(data);
		const accessToken = generateJWTauthToken(consumer.email);

		// GENERATE TOKENS
		const refreshToken = generateJWTrefreshToken(consumer.email);
		const expireAt = new Date();
		expireAt.setDate(expireAt.getDate() + 7);

		await RefreshToken.create(refreshToken, consumer._id, expireAt);

		const consumerData = consumer.toObject();
		delete consumerData.password;

		res.status(201).json({
			message: 'Consumer registered successfully',
			accessToken,
		});
	} catch (error) {
		console.log(error.message);
		return res
			.status(500)
			.json({ message: 'Something went wrong' });
	}
};

const loginConsumer = async (req, res) => {
	try {
		const result = validationResult(req);
		if (!result.isEmpty()) {
			return res
				.status(400)
				.json({ errors: result.array()[0].msg });
		}

		const data = matchedData(req);
		const { email, password } = data;
		const consumer = await Consumer.findOne({ email });
		if (!consumer) {
			return res.status(404).json({ message: 'User not found' });
		}

		const passwordsMatch = await comparePasswords(
			password,
			consumer.password
		);

		if (!passwordsMatch) {
			return res
				.status(401)
				.json({ message: 'Invalid email or password' });
		}

		const accessToken = generateJWTauthToken(consumer.email);
		const refreshToken = generateJWTrefreshToken(consumer.email);
		const expireAt = new Date();
		expireAt.setDate(expireAt.getDate() + 7);

		await RefreshToken.create(refreshToken, consumer._id, expireAt);

		const consumerData = consumer.toObject();
		delete consumerData.password;
		res.status(200).json({
			message: 'Logged in successfully',
			accessToken,
		});
	} catch (error) {
		console.log(error.message);
		return res
			.status(500)
			.json({ message: 'Something went wrong' });
	}
};

export { getAllConsumers, registerConsumer, loginConsumer };
