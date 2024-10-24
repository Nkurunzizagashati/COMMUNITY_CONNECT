import React, { useState } from 'react';
import styled from 'styled-components';
import variables from '../config';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AddReviewModal = ({ serviceId }) => {
	const [rating, setRating] = useState(1);
	const [message, setMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	// get access token
	const accessToken = useSelector((state) => state.authUser?.token);
	const handleAddReview = async (e) => {
		e.preventDefault();
		const backendUrl = `${variables.backendUrl}/reviews/${serviceId}`;

		try {
			setIsLoading(true);
			const response = await axios.post(
				backendUrl,
				{
					rating: rating,
					comment: message,
				},
				{
					headers: { Authorization: `Bearer ${accessToken}` },
					withCredentials: true,
				}
			);

			if (response.status === 201) {
				alert('Review added successfully');
			} else {
				alert('There was an error', response.status);
			}
		} catch (error) {
			console.error('Error adding review:', error);
			alert('Failed to add review. Please try again later.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<AddReviewModalOverlay>
			<h3>rate the service</h3>
			<form onSubmit={(e) => handleAddReview(e)}>
				<div className="inputWrapper">
					<label htmlFor="rating">Rating:</label>
					<input
						type="number"
						placeholder="rating"
						value={rating}
						onChange={(e) => setRating(e.target.value)}
						required
						min="1"
						max="5"
						step="0.1"
						id="rating"
					/>
				</div>

				<div className="inputWrapper">
					<label htmlFor="message">Add Comment:</label>
					<textarea
						placeholder="Add your comment ..."
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						required
						rows="4"
						cols="50"
					></textarea>
				</div>

				<button type="submit" disabled={isLoading}>
					{isLoading ? 'Submitting review...' : 'Add review'}
				</button>
			</form>
		</AddReviewModalOverlay>
	);
};

export default AddReviewModal;

const AddReviewModalOverlay = styled.div`
	margin-top: 2rem;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 2rem;

	h3 {
		font-size: 1.6rem;
		font-weight: 400;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1.2rem;
	}
	.inputWrapper {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	label {
		font-weight: bold;
	}

	input,
	textarea {
		padding: 10px;
		border-radius: 5px;
		border: 1px solid #ccc;
		width: 250px;

		@media (max-width: 844px) {
			font-size: 1.2rem;
		}
	}

	button {
		padding: 0.8rem 1.4rem;
		background-color: #ff5a5f;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		width: 100%;

		&:disabled {
			background-color: #ccc;
		}
	}
`;

const AddReviewModalContent = styled.div`
	background: white;
	padding: 20px;
	border-radius: 10px;
	width: 80%;
	max-width: 600px;
	position: relative;
	max-height: 70%;
	overflow-y: auto;
`;
