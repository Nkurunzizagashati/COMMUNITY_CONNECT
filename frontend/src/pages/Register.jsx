import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [profileImage, setProfileImage] = useState(null); // Handle file as object
	const navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault(); // Prevent form from reloading the page

		// Create a FormData object
		const formData = new FormData();
		formData.append('name', name);
		formData.append('email', email);
		formData.append('password', password);
		formData.append('profileImage', profileImage); // Append the file

		try {
			// REGISTER USER
			const response = await axios.post(
				'http://localhost:3001/api/consumers/register',
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data', // Set correct headers for file upload
					},
					withCredentials: true, // Include credentials
				}
			);

			if (response.status === 200) {
				navigate('/users');
			} else {
				alert('Registration failed');
			}
		} catch (error) {
			console.error('Error during registration', error);
			alert('Registration failed');
		}
	};

	return (
		<div>
			<h2>REGISTER</h2>
			<form onSubmit={handleRegister}>
				<label htmlFor="name">Name:</label>
				<input
					type="text"
					id="name"
					name="name"
					required
					onChange={(e) => setName(e.target.value)}
				/>
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
					type="password" // Ensure password field is masked
					id="password"
					name="password"
					required
					onChange={(e) => setPassword(e.target.value)}
				/>
				<label htmlFor="profileImage">Profile Image:</label>
				<input
					type="file"
					name="profileImage"
					id="profileImage"
					onChange={(e) => setProfileImage(e.target.files[0])} // Capture file
				/>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default Register;
