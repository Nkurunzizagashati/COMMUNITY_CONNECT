import React from 'react';
import styled from 'styled-components';

const ServiceCard = ({ title, description, price, imageUrl }) => (
	<Card>
		<Image src={imageUrl} alt={title} />
		<CardBody>
			<h2>{title}</h2>
			<p>{description}</p>
			<p className="price">${price}</p>
		</CardBody>
	</Card>
);

export default ServiceCard;

const Card = styled.div`
	border-radius: 10px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	overflow: hidden;
	background-color: #fff;
	margin-bottom: 20px;
`;

const Image = styled.img`
	width: 100%;
	height: 200px;
	object-fit: cover;
`;

const CardBody = styled.div`
	padding: 15px;
	h2 {
		font-size: 1.5rem;
		color: #333;
	}
	p {
		color: #777;
	}
	.price {
		font-weight: bold;
		color: #ff5a5f;
	}
`;
