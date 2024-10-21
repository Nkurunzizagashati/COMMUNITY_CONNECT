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
import LoginRegisterOption from '../components/LoginRegisterOption';
import variables from '../config';

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

		const BackendURL = variables.backendUrl;

		try {
			const response = await axios.post(
				loginAs === 'provider'
					? `${BackendURL}/providers/login`
					: `${BackendURL}/consumers/login`,
				{
					email,
					password,
				}
			);

			if (response.status === 200) {
				dispatch(
					loginSuccess({
						user: response.data.user,
						token: response.data.token,
					})
				);

				localStorage.setItem('token', response.data.token);
				navigate('/');
			} else {
				alert('Login failed');
				dispatch(loginFailure('Invalid credentials'));
			}
		} catch (error) {
			dispatch(loginFailure(error.message));
		} finally {
			setIsLoading(false);
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

			<LoginRegisterOption
				message="Don't have an account"
				link="register"
			/>
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
		width: 100%;
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
