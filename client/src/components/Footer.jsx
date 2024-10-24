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
					<h1>Isoko</h1>
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
					&copy; {new Date().getFullYear()} Isoko. All rights
					reserved.
				</p>
			</CopyRightSection>
		</FooterContainer>
	);
};

export default Footer;

// Styled components
const FooterContainer = styled.footer`
	background-color: #f5f5f5;
	color: #333;
	padding: 40px 20px;
	margin-top: 30px;
	box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);

	h1 {
		font-size: 24px;
		color: #ff5a5f;
		text-transform: uppercase;

		/* Media query for smaller screens */
		@media (max-width: 768px) {
			font-size: 20px;
			margin-bottom: 10px;
		}
	}
`;

const FooterContent = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;

	@media (max-width: 768px) {
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
`;

const LogoSection = styled.div`
	flex: 1;
	margin-bottom: 20px;

	h1 {
		font-size: 2rem;
		margin-bottom: 10px;
		color: #ff385c;

		@media (max-width: 768px) {
			font-size: 1.5rem;
		}
	}

	p {
		color: #777;
	}
`;

const LinksSection = styled.div`
	flex: 1;
	margin-bottom: 20px;

	h3 {
		margin-bottom: 15px;
		color: #ff385c;
	}

	@media (max-width: 768px) {
		margin-top: 20px;
	}
`;

const Links = styled.div`
	a {
		color: #333;
		text-decoration: none;
		display: block;
		margin: 5px 0;
		transition: color 0.3s;

		&:hover {
			color: #ff385c;
		}
	}
`;

const SocialSection = styled.div`
	flex: 1;
	margin-bottom: 20px;

	h3 {
		margin-bottom: 15px;
		color: #ff385c;
	}

	@media (max-width: 768px) {
		margin-top: 20px;
	}
`;

const SocialIcons = styled.div`
	a {
		color: #333;
		font-size: 1.5rem;
		margin-right: 15px;
		transition: color 0.3s;

		&:hover {
			color: #ff385c;
		}
	}

	@media (max-width: 768px) {
		margin-right: 10px;
		font-size: 1.2rem;
	}
`;

const CopyRightSection = styled.div`
	text-align: center;
	margin-top: 20px;
	color: #777;

	@media (max-width: 768px) {
		font-size: 0.9rem;
	}
`;
