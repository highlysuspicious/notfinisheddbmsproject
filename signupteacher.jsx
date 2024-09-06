import React, { useState } from 'react';
import './firstpage.css'; // Ensure the path to your CSS file is correct

const Signupteacher = () => {
  const [phoneNumbers, setPhoneNumbers] = useState(['']);

  const addPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, '']);
  };

  const handlePhoneNumberChange = (index, value) => {
    const newPhoneNumbers = [...phoneNumbers];
    newPhoneNumbers[index] = value;
    setPhoneNumbers(newPhoneNumbers);
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1>Sign Up as <span id="role-name">Teacher</span></h1>
        <label>ID</label>
        <input type="number" placeholder="ID" required />
        <label>Name</label>
        <input type="text" placeholder="Name" required />
        <label>Email</label>
        <input type="email" placeholder="Email" required />
        <div className="phone-container">
          <label>Phone Numbers</label>
          <div id="phone-numbers">
            {phoneNumbers.map((phone, index) => (
              <input
                key={index}
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
              />
            ))}
          </div>
          <button type="button" id="add-phone-btn" onClick={addPhoneNumber}>
            Add Phone Number
          </button>
        </div>
        <label>Department</label>
        <input type="text" placeholder="Department" required />
        <label>Post</label>
        <input type="text" placeholder="Post" required />
        <label>Date of Birth</label>
        <input type="date" placeholder="Date of Birth" required />
        <label>Today Date</label>
        <input type="date" placeholder="Today Date" required />
        <label>Street</label>
        <input type="text" placeholder="Street" required />
        <label>Avenue</label>
        <input type="text" placeholder="Avenue" required />
        <label>Block</label>
        <input type="text" placeholder="Block" required />
        <label>Area</label>
        <input type="text" placeholder="Area" required />
        <label>Password</label>
        <input type="password" placeholder="Password" required />
        <label>Confirm Password</label>
        <input type="password" placeholder="Confirm Password" required />
        <button type="submit">Sign Up</button>
      </div>
    </div>
  );
};

export default Signupteacher;
