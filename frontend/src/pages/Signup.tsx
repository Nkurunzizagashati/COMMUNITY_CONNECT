import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    if (response.ok) {
      alert('Account created successfully');
      navigate('/login');
    } else {
      alert('Failed to create account');
    }
  };

  return (
    <SignupContainer>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </SignupContainer>
  );
};

export default Signup;

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 250px;
  }

  button {
    padding: 10px 20px;
    background-color: #ff5a5f;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;
