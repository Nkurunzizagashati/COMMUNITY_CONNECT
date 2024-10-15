import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaHome, FaUserCircle, FaSignInAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Navbar = () => {
	// Get the authenticated user from the Redux store
	const user = useSelector((state) => state.authUser?.user);

	return (
		<Nav>
			<Logo>Community Connect</Logo>
			<Menu>
				<StyledLink to="/">
					<FaHome /> Home
				</StyledLink>
				{user ? (
					// If user exists, show the Profile link
					<StyledLink to="/profile">
						<FaUserCircle /> {user.name}
					</StyledLink>
				) : (
					// If no user, display plain text for Profile
					<DisabledLink>
						<FaUserCircle /> Profile
					</DisabledLink>
				)}
				<StyledLink to={user ? '/logout' : '/login'}>
					<FaSignInAlt /> {user ? 'Logout' : 'Login'}
				</StyledLink>
			</Menu>
		</Nav>
	);
};

export default Navbar;

// Styled components
const Nav = styled.nav`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px;
	background-color: #fff;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 1000; /* Ensure the navbar is on top */
`;

const Logo = styled.h1`
	font-size: 24px;
	color: #ff5a5f;
`;

const Menu = styled.div`
	display: flex; /* Use flexbox to arrange links horizontally */
`;

const StyledLink = styled(Link)`
	display: flex; /* Display flex for icon alignment */
	align-items: center; /* Align items vertically center */
	margin: 0 15px;
	font-size: 18px;
	font-weight: 500;
	color: #333;
	text-decoration: none; /* Remove underline from links */
	transition: color 0.3s; /* Smooth color transition */

	&:hover {
		color: #ff5a5f; /* Change color on hover */
	}

	svg {
		margin-right: 5px; /* Space between icon and text */
	}
`;

const DisabledLink = styled.span`
	display: flex;
	align-items: center;
	margin: 0 15px;
	font-size: 18px;
	font-weight: 500;
	color: #999;
	cursor: not-allowed;

	svg {
		margin-right: 5px;
	}
`;
