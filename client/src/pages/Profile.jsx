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

	const myServices =
		user.userType === 'provider' ? user.services || [] : [];

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

			{/* Show My Services Section if the user is a provider */}
			{user.userType === 'provider' && (
				<ServicesSection>
					<h3>My Services</h3>
					<Link
						to="/create-service"
						className="add-service-btn"
					>
						+ Add New Service
					</Link>
					<ServiceList>
						{myServices.length > 0 ? (
							myServices.map((service) => (
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
										<ServiceActions>
											<Link
												to={`/update-service/${service._id}`}
												className="edit-btn"
											>
												Edit
											</Link>
											<Link
												to={`/delete-service/${service._id}`}
												className="delete-btn"
											>
												Delete
											</Link>
										</ServiceActions>
									</ServiceDetails>
								</ServiceCard>
							))
						) : (
							<p>
								No services found. Start by adding a new
								service.
							</p>
						)}
					</ServiceList>
				</ServicesSection>
			)}

			{/* Booking Section */}
			<BookingSection>
				<h3>Booking Requests</h3>
				<Link to="/my-requests" className="view-all-link">
					View All Requests
				</Link>
				<h3>Booked Services</h3>
				<Link to="/booked-services" className="view-all-link">
					View All Bookings
				</Link>
			</BookingSection>
		</ProfileContainer>
	);
};

export default ProfilePage;

// Styled components for Profile Page
const ProfileContainer = styled.div`
	max-width: 1000px;
	margin: 0 auto;
	padding: 20px;
	margin-top: 7rem;
	background-color: #f9f9f9;
	border-radius: 10px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const ProfileHeader = styled.div`
	display: flex;
	align-items: center;
	border-bottom: 2px solid #ddd;
	padding-bottom: 20px;
	margin-bottom: 20px;
`;

const ProfileImage = styled.img`
	width: 120px;
	height: 120px;
	border-radius: 50%;
	object-fit: cover;
	margin-right: 20px;
	border: 3px solid #4caf50;
`;

const UserInfo = styled.div`
	h2 {
		font-size: 2rem;
		color: #333;
		margin-bottom: 5px;
	}
	p {
		font-size: 1.1rem;
		color: #555;
	}
`;

const BioSection = styled.div`
	margin-bottom: 30px;
	h3 {
		font-size: 1.8rem;
		color: #333;
		margin-bottom: 10px;
	}
	p {
		color: #666;
		font-size: 1.2rem;
	}
`;

const ServicesSection = styled.div`
	margin-bottom: 40px;
	h3 {
		font-size: 1.8rem;
		color: #333;
		margin-bottom: 15px;
	}
	.add-service-btn {
		display: inline-block;
		padding: 10px 15px;
		background-color: #4caf50;
		color: white;
		border-radius: 5px;
		text-decoration: none;
		margin-bottom: 20px;
	}
`;

const ServiceList = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
	gap: 25px;
`;

const ServiceCard = styled.div`
	border: 1px solid #ddd;
	border-radius: 10px;
	background-color: #fff;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	transition: transform 0.2s;

	&:hover {
		transform: translateY(-8px);
	}
`;

const ServiceImage = styled.img`
	width: 100%;
	height: 180px;
	object-fit: cover;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
`;

const ServiceDetails = styled.div`
	padding: 15px;
	h4 {
		font-size: 1.6rem;
		color: #333;
		margin-bottom: 8px;
	}
	p {
		color: #666;
		margin-bottom: 12px;
	}
	.price {
		font-weight: bold;
		color: #ff5722;
		font-size: 1.3rem;
	}
`;

const ServiceActions = styled.div`
	margin-top: 10px;
	.edit-btn,
	.delete-btn {
		text-decoration: none;
		color: white;
		padding: 8px 12px;
		border-radius: 5px;
		margin-right: 10px;
		font-size: 0.9rem;
	}
	.edit-btn {
		background-color: #4caf50;
	}
	.delete-btn {
		background-color: #f44336;
	}
`;

const BookingSection = styled.div`
	margin-top: 40px;
	h3 {
		font-size: 1.8rem;
		color: #333;
		margin-bottom: 10px;
	}
	.view-all-link {
		display: inline-block;
		margin-bottom: 20px;
		color: #4caf50;
		text-decoration: underline;
	}
`;
