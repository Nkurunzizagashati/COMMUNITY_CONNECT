import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Navbar = () => (
	<Nav>
		<Logo>Community Connect</Logo>
		<Menu>
			<a href="/">Home</a>
			<a href="/profile">Profile</a>
			<a href="/login">Login</a>
		</Menu>
	</Nav>
);

export default Navbar;

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
`;

const Logo = styled.h1`
	font-size: 24px;
	color: #ff5a5f;
`;

const Menu = styled.div`
	a {
		margin: 0 15px;
		font-size: 18px;
		font-weight: 500;
		color: #333;
		&:hover {
			color: #ff5a5f;
		}
	}
`;
