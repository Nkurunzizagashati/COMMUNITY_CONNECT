import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
	FaHome,
	FaUserCircle,
	FaSignInAlt,
	FaSignOutAlt,
} from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import variables from '../config';
import axios from 'axios';
import { clearAuthUser } from '../redux/authSlice';

const Navbar = () => {
	// Get the authenticated user from the Redux store
	const [loading, setLoading] = useState(false);

	const user = useSelector((state) => state.authUser?.user);
	const dispatch = useDispatch();

	const handleLogout = async () => {
		const backendUrl = `${variables.backendUrl}/logout`;

		try {
			setLoading(true);
			const response = await axios.get(backendUrl, {
				withCredentials: true,
			});

			if (response.status === 200) {
				dispatch(clearAuthUser());
				setLoading(false);
			} else {
				alert('something went wrong try again later');
				setLoading(false);
			}
		} catch (error) {
			alert('something went wrong try again later');
		}
	};

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

				{!user ? (
					<StyledLink to="/login">
						<FaSignInAlt /> {user ? 'Logout' : 'Login'}
					</StyledLink>
				) : (
					<span className="logoutBtn" onClick={handleLogout}>
						<FaSignOutAlt />{' '}
						{loading ? 'Logging out..' : 'Logout'}
					</span>
				)}
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
	z-index: 1000;

	.logoutBtn {
		display: flex;
		align-items: center;
		margin: 0 15px;
		font-size: 18px;
		font-weight: 500;
		color: #333;
		text-decoration: none;
		transition: color 0.3s;

		&:hover {
			color: #ff5a5f;
			cursor: pointer;
		}

		svg {
			margin-right: 5px;
		}
	}
`;

const Logo = styled.h1`
	font-size: 24px;
	color: #ff5a5f;
`;

const Menu = styled.div`
	display: flex;
`;

const StyledLink = styled(Link)`
	display: flex;
	align-items: center;
	margin: 0 15px;
	font-size: 18px;
	font-weight: 500;
	color: #333;
	text-decoration: none;
	transition: color 0.3s;

	&:hover {
		color: #ff5a5f;
	}

	svg {
		margin-right: 5px;
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
