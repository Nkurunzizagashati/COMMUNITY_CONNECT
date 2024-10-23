import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCaretLeft, FaStar } from 'react-icons/fa';
import { FaCaretRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Modal = ({ service }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const showNextImage = () => {
		if (service.images.length - 1 > currentIndex) {
			setCurrentIndex(currentIndex + 1);
		} else {
			setCurrentIndex(0);
		}
	};
	const showPreviousImage = () => {
		if (currentIndex === 0) {
			setCurrentIndex(service.images.length - 1);
		} else {
			setCurrentIndex(currentIndex - 1);
		}
	};

	const showImage = (index) => {
		console.log(index);
		setCurrentIndex(index);
	};

	return (
		<ModalOverlay>
			<ModalContent onClick={(e) => e.stopPropagation()}>
				<h2>{service.name}</h2>
				<p>{service.description}</p>
				<ServiceInfo>
					<p className="price">Price: ${service.price}</p>
					<div className="reviewContainer">
						<p>Reviews(5): </p>
						<Stars>
							<FaStar />
							<FaStar />
							<FaStar />
							<FaStar />
							<FaStar />
						</Stars>
					</div>

					<Link
						to={`/reviews/${service._id}`}
						state={{ service }}
						className="showReviewsBtn"
					>
						all reviews
					</Link>
				</ServiceInfo>
				<ImageCarousel>
					<div className="imageContainer">
						<Image
							src={service.images[currentIndex]}
							alt={service.name}
						/>
					</div>

					<div className="imagesPreviewContainer">
						{service.images.map((image, index) => {
							return (
								<div
									className="imagePreview"
									key={index}
									onClick={() => showImage(index)}
								>
									<img
										src={image}
										alt={service.name}
										className={`${
											currentIndex === index
												? 'selected'
												: ''
										}`}
									/>
								</div>
							);
						})}
					</div>
				</ImageCarousel>
			</ModalContent>
		</ModalOverlay>
	);
};

export default Modal;

// Styled components for Modal
const ModalOverlay = styled.div`
	position: fixed;
	top: 2rem;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.7);
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ModalContent = styled.div`
	background: white;
	padding: 20px;
	border-radius: 10px;
	width: 80%;
	max-width: 600px;
	position: relative;
	max-height: 70%;
	overflow-y: auto;
`;

const ImageCarousel = styled.div`
	display: flex;
	position: relative;
	align-items: center;
	justify-content: center;
	gap: 2rem;
	height: 70%;

	.imageContainer {
		display: flex;
		align-items: center;
		width: 60%;
		padding: 0.5rem;

		aspect-ratio: 4 / 3;
		overflow: hidden;
		justify-content: center;
		position: relative;
	}

	.imagesPreviewContainer {
		display: flex;
		flex-direction: column;
		padding: 0.5rem;
		border-radius: 0.5rem;
		gap: 0.5rem;
		overflow-y: auto;
		max-height: 200px;

		.imagePreview {
		}

		img {
			width: 40px;
			height: 40px;
			object-fit: cover;
			cursor: pointer;
			border: 1px solid #ddd;

			&.selected {
				border: 3px solid #4caf50;
			}
		}
	}
`;

const Image = styled.img`
	object-fit: cover;
	height: 100%;
	width: 100%;
`;

const ServiceInfo = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1rem 0;
	.price {
		font-weight: bold;
	}

	.showReviewsBtn {
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

	.reviewContainer {
		display: flex;
		align-items: center;
		gap: 1rem;
		font-weight: bold;
	}
`;

const Stars = styled.div`
	color: #ffcc00;

	/* Adding some styling to the stars */
	svg {
		margin-right: 2px;
	}
`;
