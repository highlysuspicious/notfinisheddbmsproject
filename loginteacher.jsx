import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './firstpage.css'; // Import your CSS file

const Loginteacher = () => {
  const [user, setUser] = useState('');
  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login as <span id="role-name">Teacher</span></h1>
        <input type="text" placeholder="ID" required></input>
        <input type="password" placeholder="Password" required></input>
        <button type="submit">Login</button>
        <div className="links">
          <a href="#">Forgot password?</a>
          <Link to="/signupteacher">Sign up</Link>
        </div>
      </div>
      <div className="login-image"></div>
    </div>
  );
}

export default Loginteacher;
