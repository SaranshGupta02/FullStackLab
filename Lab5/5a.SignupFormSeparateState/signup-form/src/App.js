import React, { useState } from 'react';
import './App.css';

function App() {
  // Separate useState for each field
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  // Separate error states for each field
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [dateError, setDateError] = useState('');

  // Regular expressions for validation
  const nameRegex = /^[a-zA-Z\s]{2,50}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^[6-9]\d{9}$/;

  // Validation functions
  const validateName = (value) => {
    if (!value.trim()) {
      setNameError('Name is required');
      return false;
    }
    if (!nameRegex.test(value)) {
      setNameError('Name should contain only letters and spaces (2-50 characters)');
      return false;
    }
    setNameError('');
    return true;
  };

  const validatePassword = (value) => {
    if (!value) {
      setPasswordError('Password is required');
      return false;
    }
    if (!passwordRegex.test(value)) {
      setPasswordError('Password must be at least 8 characters with uppercase, lowercase, number, and special character');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const validateEmail = (value) => {
    if (!value.trim()) {
      setEmailError('Email is required');
      return false;
    }
    if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validateGender = (value) => {
    if (!value) {
      setGenderError('Please select a gender');
      return false;
    }
    setGenderError('');
    return true;
  };

  const validateMobile = (value) => {
    if (!value.trim()) {
      setMobileError('Mobile number is required');
      return false;
    }
    if (!mobileRegex.test(value)) {
      setMobileError('Please enter a valid 10-digit mobile number starting with 6-9');
      return false;
    }
    setMobileError('');
    return true;
  };

  const validateDateOfBirth = (value) => {
    if (!value) {
      setDateError('Date of birth is required');
      return false;
    }
    const today = new Date();
    const birthDate = new Date(value);
    const age = today.getFullYear() - birthDate.getFullYear();
    
    if (age < 13 || age > 120) {
      setDateError('Age must be between 13 and 120 years');
      return false;
    }
    setDateError('');
    return true;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = validateName(name);
    const isPasswordValid = validatePassword(password);
    const isEmailValid = validateEmail(email);
    const isGenderValid = validateGender(gender);
    const isMobileValid = validateMobile(mobileNumber);
    const isDateValid = validateDateOfBirth(dateOfBirth);

    if (isNameValid && isPasswordValid && isEmailValid && isGenderValid && isMobileValid && isDateValid) {
      alert('Form submitted successfully!');
      // Reset form
      setName('');
      setPassword('');
      setEmail('');
      setGender('');
      setMobileNumber('');
      setDateOfBirth('');
      setNameError('');
      setPasswordError('');
      setEmailError('');
      setGenderError('');
      setMobileError('');
      setDateError('');
    }
  };

  return (
    <div className="App">
      <div className="signup-container">
        <h1>Sign Up Form</h1>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                validateName(e.target.value);
              }}
              className={nameError ? 'error' : ''}
            />
            {nameError && <span className="error-message">{nameError}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
              className={passwordError ? 'error' : ''}
            />
            {passwordError && <span className="error-message">{passwordError}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
              className={emailError ? 'error' : ''}
            />
            {emailError && <span className="error-message">{emailError}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
                validateGender(e.target.value);
              }}
              className={genderError ? 'error' : ''}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {genderError && <span className="error-message">{genderError}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile Number:</label>
            <input
              type="tel"
              id="mobile"
              value={mobileNumber}
              onChange={(e) => {
                setMobileNumber(e.target.value);
                validateMobile(e.target.value);
              }}
              className={mobileError ? 'error' : ''}
              placeholder="Enter 10-digit mobile number"
            />
            {mobileError && <span className="error-message">{mobileError}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              value={dateOfBirth}
              onChange={(e) => {
                setDateOfBirth(e.target.value);
                validateDateOfBirth(e.target.value);
              }}
              className={dateError ? 'error' : ''}
            />
            {dateError && <span className="error-message">{dateError}</span>}
          </div>

          <button type="submit" className="submit-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default App;