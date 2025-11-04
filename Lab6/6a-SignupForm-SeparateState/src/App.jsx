import React, { useState } from 'react';
import './App.css';

const App = () => {
  // Separate useState for each form field
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  // Separate useState for each error state
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [dateOfBirthError, setDateOfBirthError] = useState('');

  // Regular expressions for validation
  const nameRegex = /^[a-zA-Z\s]{2,50}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const mobileRegex = /^[6-9]\d{9}$/;

  // Validation functions for each field
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

  const validateGender = (value) => {
    if (!value) {
      setGenderError('Please select a gender');
      return false;
    }
    setGenderError('');
    return true;
  };

  const validateMobileNumber = (value) => {
    if (!value.trim()) {
      setMobileNumberError('Mobile number is required');
      return false;
    }
    if (!mobileRegex.test(value)) {
      setMobileNumberError('Please enter a valid 10-digit mobile number starting with 6-9');
      return false;
    }
    setMobileNumberError('');
    return true;
  };

  const validateDateOfBirth = (value) => {
    if (!value) {
      setDateOfBirthError('Date of birth is required');
      return false;
    }
    const today = new Date();
    const birthDate = new Date(value);
    const age = today.getFullYear() - birthDate.getFullYear();
    
    if (age < 13 || age > 120) {
      setDateOfBirthError('Age must be between 13 and 120 years');
      return false;
    }
    setDateOfBirthError('');
    return true;
  };

  // Handle input changes
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (value) {
      validateName(value);
    } else {
      setNameError('');
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value) {
      validateEmail(value);
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value) {
      validatePassword(value);
    } else {
      setPasswordError('');
    }
  };

  const handleGenderChange = (e) => {
    const value = e.target.value;
    setGender(value);
    if (value) {
      validateGender(value);
    } else {
      setGenderError('');
    }
  };

  const handleMobileNumberChange = (e) => {
    const value = e.target.value;
    setMobileNumber(value);
    if (value) {
      validateMobileNumber(value);
    } else {
      setMobileNumberError('');
    }
  };

  const handleDateOfBirthChange = (e) => {
    const value = e.target.value;
    setDateOfBirth(value);
    if (value) {
      validateDateOfBirth(value);
    } else {
      setDateOfBirthError('');
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isGenderValid = validateGender(gender);
    const isMobileValid = validateMobileNumber(mobileNumber);
    const isDateValid = validateDateOfBirth(dateOfBirth);

    if (isNameValid && isEmailValid && isPasswordValid && isGenderValid && isMobileValid && isDateValid) {
      alert('Form submitted successfully!');
      console.log('Form Data:', {
        name,
        email,
        password,
        gender,
        mobileNumber,
        dateOfBirth
      });
    } else {
      alert('Please fix the errors before submitting');
    }
  };

  // Reset form
  const handleReset = () => {
    setName('');
    setEmail('');
    setPassword('');
    setGender('');
    setMobileNumber('');
    setDateOfBirth('');
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setGenderError('');
    setMobileNumberError('');
    setDateOfBirthError('');
  };

  return (
    <div className="app">
      <div className="form-container">
        <h1 className="form-title">Sign Up</h1>
        <p className="form-subtitle">Create your account with separate state management</p>
        
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              className={nameError ? 'error' : ''}
              placeholder="Enter your full name"
            />
            {nameError && <span className="error-message">{nameError}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className={emailError ? 'error' : ''}
              placeholder="Enter your email"
            />
            {emailError && <span className="error-message">{emailError}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className={passwordError ? 'error' : ''}
              placeholder="Enter your password"
            />
            {passwordError && <span className="error-message">{passwordError}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              value={gender}
              onChange={handleGenderChange}
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
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input
              type="tel"
              id="mobileNumber"
              value={mobileNumber}
              onChange={handleMobileNumberChange}
              className={mobileNumberError ? 'error' : ''}
              placeholder="Enter your mobile number"
              maxLength="10"
            />
            {mobileNumberError && <span className="error-message">{mobileNumberError}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              value={dateOfBirth}
              onChange={handleDateOfBirthChange}
              className={dateOfBirthError ? 'error' : ''}
            />
            {dateOfBirthError && <span className="error-message">{dateOfBirthError}</span>}
          </div>

          <div className="button-group">
            <button type="submit" className="submit-btn">
              Create Account
            </button>
            <button type="button" onClick={handleReset} className="reset-btn">
              Reset Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
