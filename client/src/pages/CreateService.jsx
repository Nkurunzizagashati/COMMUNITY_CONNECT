import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import variables from '../config';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../redux/store';

const CreateService = () => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [category, setCategory] = useState('');
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const accessToken = useSelector((state) => state.authUser?.token);

	console.log(accessToken);

	if (!accessToken) {
		navigate('/login');
	}

	const handleImageUpload = (e) => {
		setImages([...e.target.files]);
	};

	const handleCreateService = async (e) => {
		e.preventDefault();

		setLoading(true);
		setError('');

		const formData = new FormData();
		formData.append('name', name);
		formData.append('description', description);
		formData.append('price', price);
		formData.append('category', category);
		images.forEach((image) => formData.append('images', image));

		const BACKEND_URL = `${variables.backendUrl}/services`;

		// dispatch(createServiceStart());

		try {
			const response = await axios.post(BACKEND_URL, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${accessToken}`,
				},
				withCredentials: true,
			});

			if (response.status === 201) {
				// dispatch(createServiceSuccess(response.data));
				navigate('/');
			} else {
				// dispatch(createServiceFailure(response.data.message));
				setError(response.data.message);
			}
		} catch (error) {
			// dispatch(createServiceFailure(error.response.data.message));
			setError(error.response.data.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<CreateServiceContainer>
			<h1>Create a Service</h1>
			{error && <ErrorMessage>{error}</ErrorMessage>}
			<Form onSubmit={handleCreateService}>
				<Input
					type="text"
					placeholder="Service Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
				<Textarea
					placeholder="Description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<Input
					type="number"
					placeholder="Price"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					required
				/>
				<Input
					type="text"
					placeholder="Category"
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					required
				/>
				<Input
					type="file"
					accept="image/*"
					multiple
					onChange={handleImageUpload}
				/>
				<Button type="submit" disabled={loading}>
					{loading ? 'Creating Service...' : 'Create Service'}
				</Button>
			</Form>
		</CreateServiceContainer>
	);
};

export default CreateService;

const CreateServiceContainer = styled.div`
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

const Textarea = styled.textarea`
	padding: 10px;
	border-radius: 5px;
	border: 1px solid #ccc;
	width: 250px;
	height: 100px;
`;

const Button = styled.button`
	padding: 10px 20px;
	background-color: #28a745;
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
