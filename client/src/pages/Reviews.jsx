import React, { useEffect } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import styled from 'styled-components';
import image from '../assets/images/travel4.jpg';
import AddReviewModal from '../components/AddReviewModal';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const ReviewPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	console.log(location);
	const { service } = location.state || {};
	console.log(service);

	useEffect(() => {
		if (!service) {
			// navigate('/');
		}
	}, [service, navigate]);

	const overalRating = service.reviews?.reduce(
		(total, review) => total + review.rating,
		0
	);

	const averageRating = overalRating / service.reviews.length;

	// Function to render stars with half-stars
	const renderStars = (rating) => {
		const fullStars = Math.floor(rating); // Full stars
		const hasHalfStar = rating % 1 !== 0; // Check if there's a decimal part
		const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Empty stars

		return (
			<Stars>
				{[...Array(fullStars)].map((_, i) => (
					<FaStar key={i} />
				))}
				{hasHalfStar && <FaStarHalfAlt />}
				{[...Array(emptyStars)].map((_, i) => (
					<FaRegStar key={i} />
				))}
			</Stars>
		);
	};

	return (
		<MainContainer>
			<div className="header">
				<h2>
					Overall Ratings:{' '}
					{averageRating ? averageRating.toFixed(1) : 'N/A'}
				</h2>
			</div>
			{service?.reviews?.length > 0 ? (
				<div className="reviewCardsContainer">
					{service.reviews.map((review, index) => (
						<div className="reviewCard" key={index}>
							<div className="reviewerInfo">
								<img
									src={
										review.consumer.profileImage
											? review.consumer
													.profileImage
											: image
									}
									alt="Profile picture"
								/>
								<p className="reviewerName">
									{review.consumer.name ||
										'Anonymous'}
								</p>
							</div>
							<div className="ratingsInfo">
								{renderStars(review.rating)}
								<span>
									{review.createdAt
										? formatDistanceToNow(
												new Date(
													review.createdAt
												),
												{ addSuffix: true }
										  ).replace('about ', '')
										: 'anonymous'}
								</span>
							</div>
							<div className="message">
								<p>
									{review.comment ||
										'No review message provided.'}
								</p>
							</div>
						</div>
					))}
				</div>
			) : (
				<p>No reviews yet</p>
			)}
			<AddReviewModal serviceId={service?._id} />
		</MainContainer>
	);
};

export default ReviewPage;

const MainContainer = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 20px;
	margin-top: 8rem;

	h2 {
		text-align: center;
		margin-bottom: 30px;
	}

	.reviewCardsContainer {
		display: grid;
		grid-template-columns: repeat(2, minmax(300px, 1fr));
		gap: 2rem;
	}

	.reviewerInfo {
		display: flex;
		align-items: center;
		gap: 1rem;
		font-weight: bold;
		margin-bottom: 1rem;

		img {
			width: 60px;
			height: 60px;
			border-radius: 50%;
			object-fit: cover;
		}
	}

	.ratingsInfo {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		font-size: 1.2rem;
		color: #999;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 2rem;
	}

	.addReviewBtn {
		background-color: #ff5a5f;
		color: white;
		text-decoration: none;
		border: none;
		border-radius: 8px;
		padding: 10px 20px;
		cursor: pointer;
		font-size: 1rem;
		font-weight: bold;
		transition: background-color 0.2s, transform 0.2s;

		&:hover {
			background-color: #e74c3c;
			transform: translateY(-2px);
		}

		&:active {
			transform: translateY(0);
		}
	}
`;

const Stars = styled.div`
	color: #ffcc00;

	svg {
		margin-right: 2px;
		font-size: 1rem;
	}
`;
