import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import './firstpage.css'; // Import your CSS file
import Passengerfine from './passengersfine';

const Landingadmin = () => {
  return (
    <body>
    <div class="landing-container">
        <header>
            <h1>Welcome, Admin!</h1>
            <nav>
                <ul>
                    <li><a href="">Vehicle Status</a></li>
                    <li><a href="/passengerlist">Passenger List</a></li>
                    <li><a href="/routee">Route</a></li>
                    <li><a href="">Logout</a></li>
                </ul>
            </nav>
        </header>
        <main>
            <section id="payment">
                <h2>passenger fine</h2>
            <nav>
                <ul>
                    <li><a href="/passengersfine">Passenger that has fine list</a></li>   
                </ul>
            </nav>
             <p>View passenger who has fine.</p>
            </section>
            <section id="status">
                <h2>Driver</h2>
                <nav>
                <ul>
                    <li><a href="/driverwithvehicle">Driver with assigned vehicle</a></li>   
                </ul>
            </nav>
                <p>Driver with assigned vehicle.</p>
            </section>
            <section id="route">
                <h2>Pending Payment</h2>
                <nav>
                <ul>
                    <li><a href="/pendingpayment">Pending payment</a></li>   
                </ul>
            </nav>
                <p>Passengers whose payment is pending.</p>
            </section>
            <section id="route">
                <h2>Maintainance</h2>
                <p>Maintainance of the vehicle</p>
            </section>
        </main>
    </div>
</body>
  );
}

export default Landingadmin;
