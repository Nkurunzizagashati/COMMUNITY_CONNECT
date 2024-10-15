import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const profiles = useSelector((state: any) => state.profile?.profiles || []);

  console.log('Profiles in Redux:', profiles); // Debugging

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
        </div>
      ))}
    </div>
  );
};

export default Profile;
