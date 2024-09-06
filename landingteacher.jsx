import React from 'react';
import { Link } from 'react-router-dom';
import './firstpage.css'; // Import your CSS file

const Landingteacher = () => {
  return (
    <body>
    <div class="landing-container">
        <header>
            <h1>Welcome, Teacher!</h1>
            <nav>
                <ul>
                    <li><a href="">Payment</a></li>
                    <li><a href="">Vehicle Status</a></li>
                    <li><a href="">Route</a></li>
                    <li><a href="">Logout</a></li>
                </ul>
            </nav>
        </header>
        <main>
            <section id="payment">
                <h2>Payment</h2>
                <p>View and update your payment.</p>
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
</body>
  );
}

export default Landingteacher;
