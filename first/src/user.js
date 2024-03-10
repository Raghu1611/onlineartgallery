import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('user1'); // Default username
  const [password, setPassword] = useState('user@123'); // Default password
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('your-backend-login-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      // Assuming the API returns a token upon successful login
      if (response.ok) {
        localStorage.setItem('token', data.token);
        // Redirect the user to the dashboard or desired page
        window.location.replace('/dashboard');
      } else {
        setError(data.message); // Display error message to the user
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username/Email:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Enter your username or email"
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
