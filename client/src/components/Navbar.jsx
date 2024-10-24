import React, { useState, useEffect } from 'react';
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
import { GiHamburgerMenu } from 'react-icons/gi';

const Navbar = () => {
	const [loading, setLoading] = useState(false);
	const [showNavbar, setShowNavbar] = useState(false);
	const user = useSelector((state) => state.authUser?.user);
	const dispatch = useDispatch();

	const handleLogout = async () => {
		const backendUrl = `${variables.backendUrl}logout`;

		try {
			setLoading(true);
			const response = await axios.get(backendUrl, {
				withCredentials: true,
			});

			if (response.status === 200) {
				dispatch(clearAuthUser());
				setLoading(false);
			} else {
				alert('Something went wrong, try again later');
				setLoading(false);
			}
		} catch (error) {
			alert('Something went wrong, try again later');
			setLoading(false);
		}
	};

	const handleNavigate = () => {
		setShowNavbar(false);
	};

	const handShowNavbar = () => {
		console.log('clicked');
		setShowNavbar((prev) => !prev);
	};

	return (
		<Nav>
			<Logo>ISOKO</Logo>
			<Menu className="menuLargerScreens">
				<StyledLink to="/" onClick={handleNavigate}>
					<FaHome /> Home
				</StyledLink>
				{user ? (
					<StyledLink to="/profile" onClick={handleNavigate}>
						<FaUserCircle /> {user.name}
					</StyledLink>
				) : (
					<DisabledLink>
						<FaUserCircle /> Profile
					</DisabledLink>
				)}

				{!user ? (
					<StyledLink to="/login" onClick={handleNavigate}>
						<FaSignInAlt /> Login
					</StyledLink>
				) : (
					<span className="logoutBtn" onClick={handleLogout}>
						<FaSignOutAlt />{' '}
						{loading ? 'Logging out..' : 'Logout'}
					</span>
				)}
			</Menu>
			<GiHamburgerMenu
				className="hamburgerMenu"
				aria-label="Toggle navigation menu"
				onClick={handShowNavbar}
			/>
			{showNavbar && (
				<MenuMobile className="menuMobile">
					<MenuSmallScreens>
						<StyledLink to="/" onClick={handleNavigate}>
							<FaHome /> Home
						</StyledLink>
						{user ? (
							<StyledLink
								to="/profile"
								onClick={handleNavigate}
							>
								<FaUserCircle /> {user.name}
							</StyledLink>
						) : (
							<DisabledLink>
								<FaUserCircle /> Profile
							</DisabledLink>
						)}

						{!user ? (
							<StyledLink
								to="/login"
								onClick={handleNavigate}
							>
								<FaSignInAlt /> Login
							</StyledLink>
						) : (
							<span
								className="logoutBtn"
								onClick={handleLogout}
							>
								<FaSignOutAlt />{' '}
								{loading ? 'Logging out..' : 'Logout'}
							</span>
						)}
					</MenuSmallScreens>
				</MenuMobile>
			)}
		</Nav>
	);
};

export default Navbar;

// Styled components with media queries
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

	.hamburgerMenu {
		display: none;
		position: fixed;
		top: 20px;
		right: 20px;
		font-size: 2rem;
		z-index: 999;
		cursor: pointer;
	}

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

	/* Media query for smaller screens */
	@media (max-width: 768px) {
		flex-direction: column;
		padding: 10px;

		.hamburgerMenu {
			display: flex;
		}
	}
`;

const Logo = styled.h1`
	font-size: 24px;
	color: #ff5a5f;

	/* Media query for smaller screens */
	@media (max-width: 768px) {
		font-size: 20px;
		margin-bottom: 10px;
	}
`;

const Menu = styled.div`
	display: flex;

	/* Media query for smaller screens */
	@media (max-width: 768px) {
		display: none;
	}
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

	/* Media query for smaller screens */
	@media (max-width: 768px) {
		margin: 5px 0;
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

	/* Media query for smaller screens */
	@media (max-width: 768px) {
		margin: 5px 0;
	}
`;

const MenuMobile = styled.div`
	/* Media query for smaller screens */
	@media (max-width: 768px) {
		display: flex;
		background-color: white;
		height: 100vh;
		width: 80vw;
		position: fixed;
		top: 0;
		left: 0;
		align-items: center;
		justify-content: center;
		gap: 2rem;
	}
`;

const MenuSmallScreens = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
	justify-content: center;
	gap: 2rem;
	padding: 2rem;
	align-items: center;
`;
