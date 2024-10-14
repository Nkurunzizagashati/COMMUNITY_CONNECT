import React from 'react';
import useFetchServices from '../redux/actions';

const ServicesLoader = () => {
	useFetchServices();
	return null;
};

export default ServicesLoader;
