import React from 'react';
import { Link } from 'react-router-dom';
import Payment from './payment'; // Adjust the import path as needed
import './firstpage.css'; // Import your CSS file

const Landingstaff = ({ userId }) => {
    <payment userId={userId} />
  return (
    <div className="landing-container">
        <header>
            <h1>Welcome, Staff!</h1>
            <nav>
                <ul>
                
                    <li><Link to="/payment">Payment</Link></li>
                    <li><Link to="/status">Vehicle Status</Link></li>
                    <li><Link to="/route">Route</Link></li>
                    <li><Link to="/logout">Logout</Link></li>
                </ul>
            </nav>
        </header>
        <main>
            <section id="payment">
                <h2>Payment</h2>
                
            </section>
            <section id="status">
                <h2>Status</h2>
                <p>Current status of the vehicle</p>
            </section>
            <section id="route">
                <h2>Route</h2>
                <p>Route of the vehicle</p>
            </section>
        </main>
    </div>
  );
}

export default Landingstaff;
