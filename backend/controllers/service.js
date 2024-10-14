import { matchedData, validationResult } from 'express-validator';

const createService = async (req, res) => {
	try {
		const result = validationResult(req);

		if (!result.isEmpty()) {
			return res
				.status(400)
				.json({ errors: result.array()[0].msg });
		}

		const data = matchedData(req);
	} catch (error) {}
};
