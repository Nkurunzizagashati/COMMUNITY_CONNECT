import React from 'react';
import styled from 'styled-components';
import ServiceCard from '../components/ServiceCard';

const Home = () => (
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
				<ServiceCard
					title="Plumbing"
					description="Expert plumbing services for your home."
					price="50"
					imageUrl="/plumbing.jpg"
				/>
				<ServiceCard
					title="Electrician"
					description="Certified electricians for repairs."
					price="75"
					imageUrl="/electrician.jpg"
				/>
				<ServiceCard
					title="Hair Salon"
					description="Get styled by the best."
					price="80"
					imageUrl="/salon.jpg"
				/>
				{/* Add more service cards */}
			</ServiceGrid>
		</ServiceSection>
	</HomeContainer>
);

export default Home;

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
