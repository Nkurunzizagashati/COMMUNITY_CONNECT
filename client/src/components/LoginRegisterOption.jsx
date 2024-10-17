import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const LoginRegisterOption = ({ message, link }) => {
	return (
		<LoginOrRegisterOption>
			<p>
				{message} <Link to={`/${link}`}>{link} now</Link>
			</p>
		</LoginOrRegisterOption>
	);
};

LoginRegisterOption.propTypes = {
	message: PropTypes.string,
	link: PropTypes.string,
};

export default LoginRegisterOption;

const LoginOrRegisterOption = styled.div`
	margin-top: 20px;

	p {
		font-size: 1rem;
		color: #555;

		a {
			color: #007bff;
			text-decoration: none;

			&:hover {
				text-decoration: underline;
			}
		}
	}
`;
