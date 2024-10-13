import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import routes from './routes/index.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();

const app = express();

// Middleware to parse JSON request bodies

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
	cors({
		origin: ['http://localhost:5713'],
		credentials: true,
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
	})
);

// app.use(
// 	session({
// 		secret: process.env.SESSION_SECRET,
// 		resave: false,
// 		saveUninitialized: false,
// 		cookie: { secure: false, maxAge: 3600 * 24 * 60 * 60 },
// 	})
// );

// Connect to MongoDB

connectDB();

// END POINTS

app.get('/', (req, res) => {
	res.send('Welcome to Community connect...');
});

// Import routes

app.use('/api', routes);

// CREATE SERVER
const PORT = process.env.PORT || 3000;

try {
	app.listen(PORT, () => {
		console.log(
			`Server is running on port http://localhost:${PORT}`
		);
	});
} catch (error) {
	console.log("Can't connect to the server: " + error.message);
}
