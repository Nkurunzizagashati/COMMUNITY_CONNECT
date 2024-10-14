import React from 'react';
import styled from 'styled-components';
import {
	FaFacebookF,
	FaTwitter,
	FaInstagram,
	FaLinkedinIn,
} from 'react-icons/fa';

const Footer = () => {
	return (
		<FooterContainer>
			<FooterContent>
				<LogoSection>
					<h1>Community Connect</h1>
					<p>Your go-to platform for local services</p>
				</LogoSection>
				<LinksSection>
					<h3>Quick Links</h3>
					<Links>
						<a href="#">Home</a>
						<a href="#">About Us</a>
						<a href="#">Services</a>
						<a href="#">Contact</a>
						<a href="#">Privacy Policy</a>
					</Links>
				</LinksSection>
				<SocialSection>
					<h3>Follow Us</h3>
					<SocialIcons>
						<a href="#">
							<FaFacebookF />
						</a>
						<a href="#">
							<FaTwitter />
						</a>
						<a href="#">
							<FaInstagram />
						</a>
						<a href="#">
							<FaLinkedinIn />
						</a>
					</SocialIcons>
				</SocialSection>
			</FooterContent>
			<CopyRightSection>
				<p>
					&copy; {new Date().getFullYear()} Community Connect.
					All rights reserved.
				</p>
			</CopyRightSection>
		</FooterContainer>
	);
};

export default Footer;

// Styled components
const FooterContainer = styled.footer`
	background-color: #333;
	color: #fff;
	padding: 40px 20px;
`;

const FooterContent = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
`;

const LogoSection = styled.div`
	flex: 1;
	margin-bottom: 20px;

	h1 {
		font-size: 2rem;
		margin-bottom: 10px;
	}

	p {
		color: #bbb;
	}
`;

const LinksSection = styled.div`
	flex: 1;
	margin-bottom: 20px;

	h3 {
		margin-bottom: 15px;
	}

	/* List of links */
`;

const Links = styled.div`
	a {
		color: #bbb;
		text-decoration: none;
		display: block;
		margin: 5px 0;
		transition: color 0.3s;

		&:hover {
			color: #ff5a5f;
		}
	}
`;

const SocialSection = styled.div`
	flex: 1;
	margin-bottom: 20px;

	h3 {
		margin-bottom: 15px;
	}
`;

const SocialIcons = styled.div`
	a {
		color: #bbb;
		font-size: 1.5rem;
		margin-right: 15px;
		transition: color 0.3s;

		&:hover {
			color: #ff5a5f;
		}
	}
`;

const CopyRightSection = styled.div`
	text-align: center;
	margin-top: 20px;
	color: #bbb;
`;
