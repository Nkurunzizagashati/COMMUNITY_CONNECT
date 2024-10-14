import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import ServicesLoader from './utils/ServicesLoader';
import Footer from './components/Footer';

const App = () => {
	return (
		<>
			<ServicesLoader />
			<Navbar />
			<Outlet />
			<Footer />
		</>
	);
};

export default App;
