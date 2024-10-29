import React, { useState } from 'react';
import axios from 'axios';
import './Login.js.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegistering) {
      await registerUser();
    } else {
      await loginUser();
    }
  };

  const registerUser = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('https://todoApp-backend.cloud-stacks.com/api/v1/register', {
        email,
        password,
        confirmPassword,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.message) {
        setVerificationSent(true);
      }
    } catch (error) {
      alert('Registration failed');
    }
  };

  const loginUser = async () => {
    try {
      const response = await axios.post('https://todoApp-backend.cloud-stacks.com/api/v1/login', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.token) {
        alert('Login successful');
        // Redirect to dashboard
        window.location.href = '/dashboard';
      }
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        {isRegistering && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        )}
        <button type="submit">
          {isRegistering ? 'Register' : 'Login'}
        </button>
      </form>
      {isRegistering && verificationSent && <p>Verification email sent!</p>}
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'Already have an account? Login' : 'Create an account'}
      </button>
    </div>
  );
};

export default Login;
