import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './firstpage.css'; // Import your CSS file

const Loginstaff = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://localhost:5127/loginstaff', {
        id,
        password
      });

      if (response.data.success) {
        navigate('/landingstaff');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login as <span id="role-name">Staff</span></h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <div className="links">
          <a href="#">Forgot password?</a>
          <a href="/signupstaff">Sign up</a>
        </div>
      </div>
      <div className="login-image"></div>
    </div>
  );
}

export default Loginstaff;
