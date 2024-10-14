import React, { useState } from 'react';

const CreateProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [availability, setAvailability] = useState('');
  const [pricing, setPricing] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProfile = {
      name,
      email,
      services: [{ title: service, description: `${service} description`, price: pricing }],
      availability: [availability],
    };

    // Retrieve existing profiles from localStorage
    const profiles = JSON.parse(localStorage.getItem('profiles') || '[]');
    profiles.push(newProfile);

    // Store updated profiles back to localStorage
    localStorage.setItem('profiles', JSON.stringify(profiles));

    // Clear form fields
    setName('');
    setEmail('');
    setService('');
    setAvailability('');
    setPricing(0);
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
        <input
          type="number"
          placeholder="Pricing"
          value={pricing}
          onChange={(e) => setPricing(parseFloat(e.target.value))}
          required
        />
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
};

export default CreateProfile;
