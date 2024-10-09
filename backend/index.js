import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware to parse JSON request bodies

app.use(express.json());

// CREATE SERVER

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
