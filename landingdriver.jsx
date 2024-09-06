import React from 'react';
import { Link } from 'react-router-dom';
import './firstpage.css';

const Landingdriver = () => {
  return (
    <div className="landing-container">
      <header>
        <h1>Welcome to the Driver page</h1>
        <nav>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/route">Route</Link></li>
            <li><Link to="/maintenance">Maintenance</Link></li>
            <li><Link to="/parking">Parking Slot</Link></li>
            <li><Link to="/passenger">Passenger Number</Link></li>
            <li><Link to="/schedule">Time Schedule</Link></li>
            <li><Link to="/change-route">Change Route</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <section id="route">
          <h2>Route</h2>
          <p>View and update your route.</p>
        </section>
        <section id="maintenance">
          <h2>Maintenance</h2>
          <p>Current maintenance location</p>
        </section>
        <section id="parking">
          <h2>Parking slot</h2>
          <p>Route of the vehicle</p>
        </section>
        <section id="schedule">
          <h2>Time schedule</h2>
          <p>View and update your time schedule.</p>
        </section>
        <section id="change-route">
          <h2>Change route</h2>
          <p>Update your location</p>
        </section>
        <section id="passenger">
          <h2>Passenger information</h2>
          <p>You can check passenger information here</p>
        </section>
      </main>
    </div>
  );
};

export default Landingdriver;
