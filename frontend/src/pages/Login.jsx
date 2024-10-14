import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [profileImage, setProfileImage] = useState('');
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault(); // Prevent form from reloading the page

		try {
			// LOGIN USER
			const response = await axios.post(
				'http://localhost:3001/api/consumers/login',
				{
					email,
					password,
					profileImage,
				}
			);

			if (response.status === 200) {
				navigate('/users');
			} else {
				alert('Login failed');
			}
		} catch (error) {
			console.error('Error during login', error);
			alert('Login failed');
		}
	};

	return (
		<div>
			<h2>LOGIN</h2>
			<form onSubmit={handleLogin}>
				<label htmlFor="email">Email:</label>
				<input
					type="email"
					id="email"
					name="email"
					required
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label htmlFor="password">Password:</label>
				<input
					type="password" // Change input type to "password"
					id="password"
					name="password"
					required
					onChange={(e) => setPassword(e.target.value)}
				/>
				<input
					type="file"
					name="profileImage"
					id="profileImage"
					onChange={(e) => setProfileImage(e.target.files[0])}
				/>
				<button type="submit">Submit</button>{' '}
				{/* Submit triggers form submission */}
			</form>
		</div>
	);
};

export default Login;
