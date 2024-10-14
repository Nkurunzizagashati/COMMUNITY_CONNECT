import React from 'react';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa6';

const ServiceCard = ({
	title,
	description,
	price,
	imageUrl,
	onClick,
}) => (
	<Card onClick={onClick}>
		<Image src={imageUrl} alt={title} />
		<CardBody>
			<h2>{title}</h2>
			<p>{description}</p>
			<PriceContainer>
				<p className="price">Price: ${price}</p>
				<ReviewsContainer>
					<span>Reviews:</span>
					<Stars>
						<FaStar />
						<FaStar />
						<FaStar />
						<FaStar />
						<FaStar />
					</Stars>
				</ReviewsContainer>
			</PriceContainer>
			<BookButton>Book Now</BookButton>
		</CardBody>
	</Card>
);

export default ServiceCard;

// Styled components
const Card = styled.div`
	border-radius: 12px;
	box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
	overflow: hidden;
	background-color: #ffffff;
	margin-bottom: 20px;
	transition: transform 0.2s;

	&:hover {
		cursor: pointer;
	}
`;

const Image = styled.img`
	width: 100%;
	height: 200px;
	object-fit: cover;
`;

const CardBody = styled.div`
	padding: 20px;

	h2 {
		font-size: 1.6rem;
		color: #333;
		margin: 0 0 10px;
	}

	p {
		color: #555;
		margin-bottom: 15px;
		line-height: 1.5;
	}

	.price {
		font-weight: bold;
		color: #ff5a5f;
		font-size: 1.2rem;
	}
`;

const PriceContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 15px;
`;

const ReviewsContainer = styled.div`
	display: flex;
	align-items: center;

	span {
		margin-right: 5px;
		font-weight: 500;
		color: #333;
	}
`;

const Stars = styled.div`
	color: #ffcc00;

	/* Adding some styling to the stars */
	svg {
		margin-right: 2px;
	}
`;

const BookButton = styled.button`
	background-color: #ff5a5f;
	color: white;
	border: none;
	border-radius: 8px;
	padding: 12px 20px;
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
`;
