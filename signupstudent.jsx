import React, { useState } from 'react';
import './firstpage.css';
import axios from 'axios';

const Signupstudent = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    phoneNumbers: [''],
    department: '',
    level: '',
    dob: '',
    todayDate: '',
    street: '',
    avenue: '',
    block: '',
    area: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const addPhoneNumber = () => {
    setFormData((prevData) => ({
      ...prevData,
      phoneNumbers: [...prevData.phoneNumbers, ''],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhoneNumberChange = (index, value) => {
    const newPhoneNumbers = [...formData.phoneNumbers];
    newPhoneNumbers[index] = value;
    setFormData({
      ...formData,
      phoneNumbers: newPhoneNumbers,
    });
  };

  const validateForm = () => {
    const { password, confirmPassword, phoneNumbers } = formData;

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return false;
    }

    // Validate phone numbers (e.g., check for empty or invalid format)
    if (phoneNumbers.some(phone => phone.trim() === '')) {
      setErrorMessage('Please fill all phone number fields.');
      return false;
    }

    // Additional validation can be added here

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:5000/student/signup', formData);

    
      setSuccessMessage('Signup successful!');
      console.log('Response:', response.data);
    } catch (error) {
      setErrorMessage('Signup failed. Please try again.');
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>Sign Up as <span id="role-name">Student</span></h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        
        <label>ID</label>
        <input
          type="number"
          name="id"
          value={formData.id}
          onChange={handleInputChange}
          placeholder="ID"
          required
        />
        
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
        />
        
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
        />
        
        <div className="phone-container">
          <label>Phone Numbers</label>
          <div id="phone-numbers">
            {formData.phoneNumbers.map((phone, index) => (
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
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleInputChange}
          placeholder="Department"
          required
        />
        
        <label>Level</label>
        <input
          type="number"
          name="level"
          value={formData.level}
          onChange={handleInputChange}
          placeholder="Level"
          required
        />
        
        <label>Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleInputChange}
          required
        />
        
        <label>Today Date</label>
        <input
          type="date"
          name="todayDate"
          value={formData.todayDate}
          onChange={handleInputChange}
          required
        />
        
        <label>Street</label>
        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={handleInputChange}
          placeholder="Street"
          required
        />
        
        <label>Avenue</label>
        <input
          type="text"
          name="avenue"
          value={formData.avenue}
          onChange={handleInputChange}
          placeholder="Avenue"
          required
        />
        
        <label>Block</label>
        <input
          type="text"
          name="block"
          value={formData.block}
          onChange={handleInputChange}
          placeholder="Block"
          required
        />
        
        <label>Area</label>
        <input
          type="text"
          name="area"
          value={formData.area}
          onChange={handleInputChange}
          placeholder="Area"
          required
        />
        
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          required
        />
        
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm Password"
          required
        />
        
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signupstudent;
