import React from 'react';
import { Link } from 'react-router-dom';
import './landing-styles.css'; // Ensure you have the CSS file in the correct path

const Routee = () => {
  return (
    <div className="landing-container">
        <header>
            <h1>Route Details</h1>
            <nav>
                <ul>
                    <li><Link to="/landingsupervisor">Home</Link></li>
                    <li><Link to="/routee">Route</Link></li>
                    <li><Link to="/maintanance">Maintenance</Link></li>
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
                <h2>Route Information</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Road No</th>
                            <th>Avenue</th>
                            <th>Street</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Main Avenue</td>
                            <td>1st Street</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Second Avenue</td>
                            <td>2nd Street</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </main>
    </div>
  );
}

export default Routee;
