import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import ServiceCard from '../components/ServiceCard';
import Modal from '../components/ServiceModel';

const Home = () => {
	const [selectedService, setSelectedService] = useState(null); // State to manage selected service
	const services = useSelector(
		(state) => state.services?.data.services || []
	);

	const handleServiceClick = (service) => {
		setSelectedService(service); // Set the selected service on click
	};

	const handleCloseModal = () => {
		setSelectedService(null); // Close modal
	};

	return (
		<HomeContainer>
			<HeroSection>
				<h1>Discover Local Services in Your Community</h1>
				<p>
					Book appointments with top-rated artisans, service
					providers, and businesses.
				</p>
				<SearchBar placeholder="Search services (e.g. plumber, electrician)" />
			</HeroSection>
			<ServiceSection>
				<h2>Featured Services</h2>
				<ServiceGrid>
					{/* Map over the services and render ServiceCard for each */}
					{services?.map((service) => (
						<ServiceCard
							key={service._id}
							title={service.title}
							description={service.description}
							price={service.price}
							imageUrl={service.images[0]}
							onClick={() => handleServiceClick(service)} // Show modal on click
						/>
					))}
				</ServiceGrid>
			</ServiceSection>
			{selectedService && (
				<Modal
					service={selectedService}
					onClose={handleCloseModal}
				/>
			)}{' '}
			{/* Show modal if a service is selected */}
		</HomeContainer>
	);
};

export default Home;

// Styled components remain the same
const HomeContainer = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 20px;
	margin-top: 8rem;
`;

const HeroSection = styled.div`
	text-align: center;
	padding: 60px 20px;
	background-color: #f5f5f5;
	h1 {
		font-size: 2.5rem;
		margin-bottom: 20px;
	}
	p {
		color: #777;
		font-size: 1.2rem;
	}
`;

const SearchBar = styled.input`
	padding: 15px;
	width: 100%;
	max-width: 600px;
	margin-top: 20px;
	border-radius: 8px;
	border: 1px solid #ddd;
`;

const ServiceSection = styled.div`
	margin-top: 50px;
	h2 {
		font-size: 1.8rem;
		margin-bottom: 30px;
		text-align: center;
	}
`;

const ServiceGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	gap: 20px;
`;
