import React from 'react';
import styled from 'styled-components';

const Modal = ({ service, onClose }) => {
	return (
		<ModalOverlay>
			<ModalContent>
				<button onClick={onClose}>Close</button>
				<h2>{service.title}</h2>
				<p>{service.description}</p>
				<p className="price">Price: ${service.price}</p>
				<ImageCarousel>
					{service.images.map((image, index) => (
						<Image
							key={index}
							src={image}
							alt={service.title}
						/>
					))}
				</ImageCarousel>
			</ModalContent>
		</ModalOverlay>
	);
};

export default Modal;

// Styled components for Modal
const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
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

	button {
		position: absolute;
		top: 10px;
		right: 10px;
	}
`;

const ImageCarousel = styled.div`
	display: flex;
	overflow-x: auto;
`;

const Image = styled.img`
	width: 100%;
	height: auto;
	margin-right: 10px;
`;
