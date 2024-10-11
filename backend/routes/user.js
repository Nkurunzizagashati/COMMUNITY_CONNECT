import express from 'express';

const router = express.Router();

router.get('/users', (req, res) => {
	res.json({ message: 'GET users route' });
});

router.post('/users', (req, res) => {
	res.json({ message: 'POST users route' });
});

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
