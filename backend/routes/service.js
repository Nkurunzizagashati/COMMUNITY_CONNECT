import express from 'express';

const router = express.Router();

router.get('/services', (req, res) => {
	// Logic to fetch all services from the database
	// Return the services as JSON response
	res.json([
		{ id: 1, name: 'Service 1' },
		{ id: 2, name: 'Service 2' },
		{ id: 3, name: 'Service 3' },
	]);
});

router.post('/services', (req, res) => {
	// Logic to create a new service in the database
	// Return the created service as JSON response
	res.status(201).json({ message: 'Service created successfully' });
});
