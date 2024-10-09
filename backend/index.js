import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';

dotenv.config();

const app = express();

// Middleware to parse JSON request bodies

app.use(express.json());

// Connect to MongoDB

connectDB();

// END POINTS

app.get('/', (req, res) => {
	res.send('Welcome to Community connect...');
});

// Import routes

// CREATE SERVER
const PORT = process.env.PORT || 3000;

try {
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
} catch (error) {
	console.log("Can't connect to the server: " + error.message);
}
