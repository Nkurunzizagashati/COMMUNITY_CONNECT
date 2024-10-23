import React from 'react';
import { useGetToken } from '../redux/actions';

const Authenticate = () => {
	useGetToken();
	return null;
};

export default Authenticate;
