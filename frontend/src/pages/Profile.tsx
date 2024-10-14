import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [profiles, setProfiles] = useState<any[]>([]);

  useEffect(() => {
    // Retrieve profiles from localStorage
    const storedProfiles = JSON.parse(localStorage.getItem('profiles') || '[]');
    setProfiles(storedProfiles);
    console.log('Profiles in localStorage:', storedProfiles);  // Debugging
  }, []);

  if (profiles.length === 0) {
    return <p>No profiles found.</p>;
  }

  return (
    <div>
      {profiles.map((profile: any, index: number) => (
        <div key={index}>
          <h1>{profile.name}</h1>
          <p>{profile.email}</p>
          <p>Services:</p>
          <ul>
            {profile.services.map((service: any, i: number) => (
              <li key={i}>{service.title} - {service.description} (${service.price})</li>
            ))}
          </ul>
          <p>Availability: {profile.availability.join(', ')}</p>
        </div>
      ))}
    </div>
  );
};

export default Profile;
