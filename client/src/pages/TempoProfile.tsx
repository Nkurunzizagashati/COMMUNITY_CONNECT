import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProfile } from '../redux/profileSlice'; // Ensure the import is correct

const CreateProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [availability, setAvailability] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProfile = {
      name,
      email,
      services: [{ title: service, description: `${service} description`, price: 100 }],
      availability: [availability],
    };

    console.log('Submitting profile:', newProfile); // Debugging

    // Dispatch the action to create the profile
    dispatch(createProfile(newProfile));

    // Clear the form fields after submission
    setName('');
    setEmail('');
    setService('');
    setAvailability('');
  };

  return (
    <div>
      <h2>Create Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Availability"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          required
        />
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
};

export default CreateProfile;
