import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ProfilePage = () => {
	// Fetch user data from the Redux store
	const user = useSelector((state) => state.authUser.user);
	const services = useSelector(
		(state) => state.services?.data.services || []
	);

	// If user data is not available, display a loading message
	if (!user) {
		return <p>Loading...</p>;
	}

	const myServices = services.filter(
		(service) => service.provider === user._id
	);

	return (
		<ProfileContainer>
			<ProfileHeader>
				<ProfileImage src={user.profileImage} alt={user.name} />
				<UserInfo>
					<h2>{user.name}</h2>
					<p>{user.email}</p>
					<p>{user.location}</p>
				</UserInfo>
			</ProfileHeader>
			<BioSection>
				<h3>About Me</h3>
				<p>{user.bio}</p>
			</BioSection>
			<ServicesSection>
				<h3>My Services</h3>
				<ServiceList>
					{myServices &&
						myServices.map((service, index) => (
							<ServiceCard key={service._id}>
								<ServiceImage
									src={service.images[0]}
									alt={service.title}
								/>
								<ServiceDetails>
									<h4>{service.title}</h4>
									<p>{service.description}</p>
									<p className="price">
										Price: ${service.price}
									</p>
								</ServiceDetails>
							</ServiceCard>
						))}
				</ServiceList>
			</ServicesSection>
			<Link to="/create-service">Add Service</Link>
		</ProfileContainer>
	);
};

export default ProfilePage;

// Styled components for Profile Page
const ProfileContainer = styled.div`
	max-width: 800px;
	margin: 0 auto;
	padding: 20px;
	margin-top: 7rem;
`;

const ProfileHeader = styled.div`
	display: flex;
	align-items: center;
	border-bottom: 1px solid #ddd;
	padding-bottom: 20px;
	margin-bottom: 20px;
`;

const ProfileImage = styled.img`
	width: 100px;
	height: 100px;
	border-radius: 50%;
	object-fit: cover;
	margin-right: 20px;
`;

const UserInfo = styled.div`
	h2 {
		font-size: 1.8rem;
		color: #333;
		margin-bottom: 5px;
	}
	p {
		font-size: 1rem;
		color: #777;
	}
`;

const BioSection = styled.div`
	margin-bottom: 30px;
	h3 {
		font-size: 1.6rem;
		color: #333;
		margin-bottom: 10px;
	}
	p {
		color: #555;
		font-size: 1.1rem;
	}
`;

const ServicesSection = styled.div`
	h3 {
		font-size: 1.6rem;
		color: #333;
		margin-bottom: 10px;
	}
`;

const ServiceList = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	gap: 20px;
`;

const ServiceCard = styled.div`
	border: 1px solid #ddd;
	border-radius: 8px;
	overflow: hidden;
	background-color: #fff;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	transition: transform 0.2s;

	&:hover {
		transform: translateY(-5px);
	}
`;

const ServiceImage = styled.img`
	width: 100%;
	height: 150px;
	object-fit: cover;
`;

const ServiceDetails = styled.div`
	padding: 15px;

	h4 {
		font-size: 1.4rem;
		color: #333;
		margin-bottom: 5px;
	}
	p {
		color: #777;
		margin-bottom: 10px;
	}
	.price {
		font-weight: bold;
		color: #ff5a5f;
		font-size: 1.2rem;
	}
`;
