import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import variables from '../config';
import LoginRegisterOption from '../components/LoginRegisterOption';
import { useDispatch } from 'react-redux';
import {
	registerStart,
	registerSuccess,
	registerFailure,
} from '../redux/authSlice';

const Signup = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [profileImage, setProfileImage] = useState(null);
	const [userType, setUserType] = useState('provider');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const handleSignup = async (e) => {
		e.preventDefault();

		setLoading(true);
		setError('');

		const formData = new FormData();
		formData.append('name', name);
		formData.append('email', email);
		formData.append('password', password);
		formData.append('profileImage', profileImage);

		const BACKEND_URL = `${variables.backendUrl}/${
			userType === 'provider' ? 'providers' : 'consumers'
		}/register`;

		dispatch(registerStart());

		try {
			const response = await axios.post(BACKEND_URL, formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
				withCredentials: true,
			});

			if (response.status === 201) {
				dispatch(
					registerSuccess({
						user: response.data.user,
						token: response.data.accessToken,
						message: response.data.message,
					})
				);
				navigate('/');
			} else {
				dispatch(registerFailure(response.data.message));
				setError(response.data.message);
				console.log(response.message);
			}
		} catch (error) {
			dispatch(registerFailure(error.response.data.message));
			setError(error.response.data.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<SignupContainer>
			<h1>Sign Up</h1>
			{error && <ErrorMessage>{error}</ErrorMessage>}
			<Form onSubmit={handleSignup}>
				<Input
					type="text"
					placeholder="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
				<Input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<Input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<Input
					type="file"
					accept="image/*"
					onChange={(e) => setProfileImage(e.target.files[0])}
					required
				/>
				<Select
					value={userType}
					onChange={(e) => setUserType(e.target.value)}
				>
					<option value="provider">Provider</option>
					<option value="consumer">Consumer</option>
				</Select>
				<Button type="submit" disabled={loading}>
					{loading ? 'Signing Up...' : 'Sign Up'}
				</Button>
			</Form>
			<LoginRegisterOption
				message="Already have an account?"
				link="login"
			/>
		</SignupContainer>
	);
};

export default Signup;

const SignupContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 50px;
	margin-top: 7rem;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const Input = styled.input`
	padding: 10px;
	border-radius: 5px;
	border: 1px solid #ccc;
	width: 250px;
`;

const Select = styled.select`
	padding: 10px;
	border-radius: 5px;
	border: 1px solid #ccc;
	width: 100%;
`;

const Button = styled.button`
	padding: 10px 20px;
	background-color: #ff5a5f;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	&:disabled {
		background-color: #ccc;
		cursor: not-allowed;
	}
`;

const ErrorMessage = styled.p`
	color: red;
	font-size: 14px;
`;
