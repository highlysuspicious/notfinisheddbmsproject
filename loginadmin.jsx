import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './firstpage.css'; // Import your CSS file

const Loginadmin = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    // Check if ID and password are correct
    if (id === 'admin' && password === 'admin') {
      navigate('/landingadmin');
    } else {
      setError('Invalid ID or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login as <span id="role-name">Admin</span></h1>
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
        
        </div>
      </div>
      <div className="login-image"></div>
    </div>
  );
}

export default Loginadmin;
