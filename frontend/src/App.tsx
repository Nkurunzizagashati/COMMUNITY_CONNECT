import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';  // Correct import
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import CreateProfile from './pages/CreateProfile';
import Login from './pages/Login';  // Import Login component

const App = () => (
  <Provider store={store}>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/login" element={<Login />} /> {/* Ensure Login route is set */}
        {/* Add the following to handle authentication if needed */}
        {/* <Route path="/signup" element={<Signup />} /> */}
      </Routes>
    </Router>
  </Provider>
);

export default App;
