import jwt from 'jsonwebtoken';
import { matchedData, validationResult } from 'express-validator';
import { RefreshToken } from '../models/RefreshToken';
import Service from '../models/service';

const createService = async (req, res) => {
	try {
		const result = validationResult(req);

		if (!result.isEmpty()) {
			return res
				.status(400)
				.json({ errors: result.array()[0].msg });
		}

		const data = matchedData(req);
		const authHeader = req.headers.authorization;
		let accessToken =
			authHeader && authHeader.startsWith('Bearer ')
				? authHeader.split(' ')[1]
				: null;

		if (!accessToken) {
			// If no accessToken is provided, check for refreshToken
			const refreshToken = req.cookies.refreshToken;

			if (!refreshToken) {
				return res.status(401).json({
					message:
						'No access token or refresh token provided',
				});
			}

			// Verify the refresh token
			try {
				const decodedRefreshToken = jwt.verify(
					refreshToken,
					process.env.REFRESH_TOKEN_SECRET
				);

				// Find the refresh token in the database to ensure it's still valid
				const storedToken = await RefreshToken.findOne({
					token: refreshToken,
				});
				if (!storedToken) {
					return res
						.status(403)
						.json({ message: 'Not authorized' });
				}

				// Generate a new accessToken
				accessToken = generateJWTauthToken({
					email: decodedRefreshToken.email,
				});

				res.setHeader('Authorization', `Bearer ${accessToken}`);
			} catch (err) {
				return res
					.status(403)
					.json({ message: 'Something went wrong' });
			}
		}

		const createdService = await Service.create(data);

		res.status(200).json({
			message: 'Service created successfully',
			accessToken,
		});
	} catch (error) {
		console.error('Error in creating service:', error.message);
		return res
			.status(500)
			.json({ message: 'Something went wrong' });
	}
};

const getAllServices = async (req, res) => {
	try {
		const services = await Service.find();
		if (services.length === 0) {
			return res
				.status(404)
				.json({ message: 'No service found' });
		}

		return res.status(200).json({ services });
	} catch (error) {
		return res
			.status(500)
			.json({ message: 'Something went wrong' });
	}
};

export { createService };
