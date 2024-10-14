import React from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import CreateProfile from './pages/TempoProfile';
import ProfileList from './pages/ProfileList';

const App = () => {
	return (
		<>
			<Navbar />
			<Home />
		</>
	);
};

export default App;
