import jwt from 'jsonwebtoken';

const generateJWTauthToken = async (payload) => {
	const token = await jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: '15m',
	});

	return token;
};

const generateJWTrefreshToken = async (payload) => {
	const token = await jwt.sign(
		payload,
		process.env.JWT_REFRESH_SECRET,
		{
			expiresIn: '7d',
		}
	);

	return token;
};

export { generateJWTauthToken, generateJWTrefreshToken };
