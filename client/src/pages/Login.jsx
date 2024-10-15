import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
	loginStart,
	loginSuccess,
	loginFailure,
} from '../redux/authSlice';
import axios from 'axios';
import styled from 'styled-components';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loginAs, setLoginAs] = useState('provider');
	const [isLoading, setIsLoading] = useState(false); // Loading state
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogin = async (e) => {
		e.preventDefault();
		dispatch(loginStart());
		setIsLoading(true); // Start loading

		try {
			const response = await axios.post(
				loginAs === 'provider'
					? 'http://localhost:3001/api/providers/login'
					: 'http://localhost:3001/api/consumers/login',
				{
					email,
					password,
				}
			);

			if (response.status === 200) {
				dispatch(
					loginSuccess({
						user: response.data.user,
						token: response.data.accessToken,
					})
				);
				navigate('/');
			} else {
				alert('Login failed');
				dispatch(loginFailure('Invalid credentials'));
			}
		} catch (error) {
			dispatch(loginFailure(error.message));
		} finally {
			setIsLoading(false); // Stop loading
		}
	};

	return (
		<LoginContainer>
			<h1>Login</h1>
			<form onSubmit={handleLogin}>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<select
					value={loginAs}
					onChange={(e) => setLoginAs(e.target.value)}
				>
					<option value="provider">Provider</option>
					<option value="consumer">Consumer</option>
				</select>

				<button type="submit" disabled={isLoading}>
					{isLoading ? 'Logging in...' : 'Login'}
				</button>
			</form>

			<RegisterOption>
				<p>
					Don't have an account?{' '}
					<Link to="/register">Register now</Link>
				</p>
			</RegisterOption>
		</LoginContainer>
	);
};

export default Login;

// Styled components for the login page
const LoginContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 50px;
	margin-top: 7rem;

	form {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	input {
		padding: 10px;
		border-radius: 5px;
		border: 1px solid #ccc;
		width: 250px;
	}

	select {
		padding: 10px;
		border-radius: 5px;
		border: 1px solid #ccc;
		width: 250px;
	}

	button {
		padding: 10px 20px;
		background-color: #ff5a5f;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;

		&:disabled {
			background-color: #ccc;
		}
	}
`;

const RegisterOption = styled.div`
	margin-top: 20px;

	p {
		font-size: 1rem;
		color: #555;

		a {
			color: #007bff;
			text-decoration: none;

			&:hover {
				text-decoration: underline;
			}
		}
	}
`;
