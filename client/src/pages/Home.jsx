import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import ServiceCard from '../components/ServiceCard';
import Modal from '../components/ServiceModel';

const Home = () => {
	const [selectedService, setSelectedService] = useState(null);
	const [filteredServices, setFilteredServices] = useState([]);
	const services = useSelector(
		(state) => state.services?.data.services || []
	);

	const handleServiceClick = (service) => {
		setSelectedService(service);
	};

	const handleCloseModal = () => {
		if (selectedService) {
			setSelectedService(null);
		}
	};

	const handleSearch = (e) => {
		const searchValue = e.target.value.toLowerCase();
		if (searchValue) {
			const filtered = services.filter(
				(service) =>
					service.name.toLowerCase().includes(searchValue) ||
					service.category.toLowerCase().includes(searchValue)
			);
			setFilteredServices(filtered);
		} else {
			setFilteredServices(services);
		}
	};

	// Decide which services to show: filtered services or all services
	const servicesToDisplay = filteredServices.length
		? filteredServices
		: services;

	console.log(filteredServices);

	return (
		<HomeContainer onClick={handleCloseModal}>
			<HeroSection>
				<h1>Discover Local Services in Your Community</h1>
				<p>
					Book appointments with top-rated artisans, service
					providers, and businesses.
				</p>
				<SearchBar
					placeholder="Search services (e.g. plumber, electrician)"
					onChange={handleSearch} // Change from onKeyDown to onChange
				/>
			</HeroSection>
			<ServiceSection>
				<h2>Featured Services</h2>
				<ServiceGrid>
					{servicesToDisplay.map((service) => (
						<ServiceCard
							key={service._id}
							title={service.name}
							description={service.description}
							price={service.price}
							imageUrl={service.images[0]}
							onClick={() => handleServiceClick(service)}
						/>
					))}
				</ServiceGrid>
			</ServiceSection>
			{selectedService && <Modal service={selectedService} />}
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

	@media (max-width: 844px) {
		margin-top: 4rem;
	}
`;

const HeroSection = styled.div`
	text-align: center;
	padding: 60px 20px;
	background-color: #f5f5f5;
	h1 {
		font-size: 2.5rem;
		margin-bottom: 20px;

		@media (max-width: 844px) {
			font-size: 1.4rem;
		}
	}
	p {
		color: #777;
		font-size: 1.2rem;
	}
`;

const SearchBar = styled.input`
	padding: 1rem;
	width: 90%;
	max-width: 600px;
	margin-top: 20px;
	border-radius: 8px;
	border: 1px solid #ddd;
	font-size: 1.2rem;

	@media (max-width: 844px) {
		margin-top: 1rem;
		max-width: 80%;

		&:focus {
			outline: none;
		}
	}
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

	@media (max-width: 1194px) {
		grid-template-columns: 1fr;
	}
`;
