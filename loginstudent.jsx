import React from 'react';
import { Link } from 'react-router-dom';
import './firstpage.css'; // Import your CSS file

const Loginstudent=() =>{
    


    return (
        <div class="login-container">
          
        <div class="login-form">
       
            <h1>Login as <span id="role-name">Student</span></h1>
            <input type="text" placeholder="ID" required></input>
            <input type="password" placeholder="Password" required></input>
            <button type="submit">Login</button>
            <div className="links">
          <a href="#">Forgot password?</a>
          <Link to="/signupstudent">Sign up</Link>
        </div>
        </div>
        <div class="login-image"></div>
    </div>
    
    );
}

    export default Loginstudent;

