import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import ServiceCard from '../components/ServiceCard';
import Modal from '../components/ServiceModel';
import CardSkeleton from '../components/CardSkeleton';

const categories = [
	{ name: 'Plumber', icon: '🚰' },
	{ name: 'Electrician', icon: '💡' },
	{ name: 'Cleaning', icon: '🧹' },
	{ name: 'Carpenter', icon: '🔨' },
	{ name: 'Gardening', icon: '🌱' },
	{ name: 'Technology', icon: '💻' },
];

const Home = () => {
	const [selectedService, setSelectedService] = useState(null);
	const [filteredServices, setFilteredServices] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState('');
	const [loading, setLoading] = useState(true);
	const services = useSelector(
		(state) => state.services?.data.services || []
	);

	// useEffect to update loading state based on services data
	useEffect(() => {
		if (services.length > 0) {
			setFilteredServices(services); // Set initial filtered services
			setLoading(false); // Set loading to false once services are available
		}
	}, [services]);

	const handleServiceClick = (service) => {
		setSelectedService(service);
	};

	const handleCloseModal = () => {
		if (selectedService) {
			setSelectedService(null);
		}
	};

	const handleCategoryClick = (category) => {
		if (selectedCategory === category) {
			setSelectedCategory('');
			setFilteredServices(services); // Show all services
		} else {
			setSelectedCategory(category);
			filterServices(category);
		}
	};

	const handleSearch = (e) => {
		const searchValue = e.target.value.toLowerCase();
		filterServices(selectedCategory, searchValue);
	};

	const filterServices = (category, searchValue = '') => {
		let filtered = services;

		if (category) {
			filtered = filtered.filter(
				(service) =>
					service.category.toLowerCase() ===
					category.toLowerCase()
			);
		}

		if (searchValue) {
			filtered = filtered.filter(
				(service) =>
					service.name.toLowerCase().includes(searchValue) ||
					service.category.toLowerCase().includes(searchValue)
			);
		}

		setFilteredServices(filtered);
	};

	const servicesToDisplay = filteredServices.length
		? filteredServices
		: services;

	return (
		<HomeContainer onClick={handleCloseModal}>
			<SearchAndFilterContainer>
				<SearchBar
					placeholder="Search services (e.g., plumber, electrician)"
					onChange={handleSearch}
				/>
				<CategoryList>
					{categories.map((cat) => (
						<CategoryItem
							key={cat.name}
							selected={cat.name === selectedCategory}
							onClick={() =>
								handleCategoryClick(cat.name)
							}
						>
							<span>{cat.icon}</span>
							<p>{cat.name}</p>
						</CategoryItem>
					))}
				</CategoryList>
			</SearchAndFilterContainer>
			<HeroSection>
				<h1>Discover Local Services in Your Community</h1>
				<p>
					Book appointments with top-rated artisans, service
					providers, and businesses.
				</p>
			</HeroSection>

			{/* Conditional rendering of CardSkeleton and ServiceCards */}
			{loading ? (
				<CardSkeleton />
			) : (
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
								onClick={() =>
									handleServiceClick(service)
								}
							/>
						))}
					</ServiceGrid>
				</ServiceSection>
			)}

			{selectedService && <Modal service={selectedService} />}
		</HomeContainer>
	);
};

export default Home;

// Styled components
const HomeContainer = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 20px;
	margin-top: 8rem;

	@media (max-width: 844px) {
		margin-top: 4rem;
	}
`;

const SearchAndFilterContainer = styled.div`
	position: sticky;
	top: 6rem; /* Adjust according to the height of your navbar */
	background-color: #fff;
	z-index: 10;
	padding: 10px 0;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

	@media (max-width: 844px) {
		top: 4rem;
	}
`;

const SearchBar = styled.input`
	padding: 0.8rem;
	width: 100%;
	max-width: 500px;
	margin: 20px auto;
	display: block;
	border-radius: 8px;
	border: 1px solid #ddd;
	font-size: 1rem;

	@media (max-width: 844px) {
		margin-top: 1rem;
		max-width: 90%;

		&:focus {
			outline: none;
		}
	}
`;

const HeroSection = styled.div`
	text-align: center;
	padding: 40px 20px;
	background-color: #f5f5f5;
	margin-top: 1rem;
	h1 {
		font-size: 2rem;
		margin-bottom: 20px;

		@media (max-width: 844px) {
			font-size: 1.2rem;
		}
	}
	p {
		color: #777;
		font-size: 1rem;
	}
`;

const CategoryList = styled.div`
	display: flex;
	overflow-x: auto;
	padding: 10px;
	margin-top: 10px;
	gap: 10px;
	align-items: center;
	justify-content: center;

	::-webkit-scrollbar {
		display: none;
	}
`;

const CategoryItem = styled.div`
	flex-shrink: 0;
	padding: 5px 10px;
	border-radius: 6px;
	cursor: pointer;
	text-align: center;
	background-color: ${(props) =>
		props.selected ? '#ff385c' : '#f0f0f0'};
	color: ${(props) => (props.selected ? '#fff' : '#000')};
	transition: background-color 0.3s ease;

	span {
		font-size: 1.2rem;
	}

	p {
		margin-top: 3px;
		font-size: 0.8rem;
	}

	&:hover {
		background-color: #ff385c;
		color: #fff;
	}
`;

const ServiceSection = styled.div`
	margin-top: 30px;
	h2 {
		font-size: 1.6rem;
		margin-bottom: 20px;
		text-align: center;
	}
`;

const ServiceGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
	gap: 15px;

	@media (max-width: 1194px) {
		grid-template-columns: 1fr;
	}
`;
