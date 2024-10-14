import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const ProfileList = () => {
	const profiles = useSelector((state) => state.profile.profiles);

	return (
		<ProfileListContainer>
			<h1>User Profiles</h1>
			<ul>
				{profiles.map((profile, index) => (
					<li key={index}>
						<strong>{profile.name}</strong> -{' '}
						{profile.service} - Available:{' '}
						{profile.availability}
					</li>
				))}
			</ul>
		</ProfileListContainer>
	);
};

export default ProfileList;

const ProfileListContainer = styled.div`
	padding: 50px;
	ul {
		list-style: none;
		padding: 0;
	}
	li {
		background: #f9f9f9;
		margin-bottom: 10px;
		padding: 15px;
		border-radius: 5px;
	}
`;
