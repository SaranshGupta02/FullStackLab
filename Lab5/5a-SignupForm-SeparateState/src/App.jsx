import React, { useState } from 'react';
import './App.css';

const App = () => {
  // Separate useState hooks for each field
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  // Separate error states for each field
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [dobError, setDobError] = useState('');

  // Regular expressions for validation
  const nameRegex = /^[a-zA-Z\s]{2,50}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const mobileRegex = /^[6-9]\d{9}$/;

  // Validation functions
  const validateName = (value) => {
    if (!value.trim()) {
      return 'Name is required';
    }
    if (!nameRegex.test(value)) {
      return 'Name should contain only letters and spaces (2-50 characters)';
    }
    return '';
  };

  const validateEmail = (value) => {
    if (!value.trim()) {
      return 'Email is required';
    }
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validatePassword = (value) => {
    if (!value) {
      return 'Password is required';
    }
    if (!passwordRegex.test(value)) {
      return 'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
    }
    return '';
  };

  const validateGender = (value) => {
    if (!value) {
      return 'Please select a gender';
    }
    return '';
  };

  const validateMobile = (value) => {
    if (!value.trim()) {
      return 'Mobile number is required';
    }
    if (!mobileRegex.test(value)) {
      return 'Please enter a valid 10-digit mobile number starting with 6-9';
    }
    return '';
  };

  const validateDateOfBirth = (value) => {
    if (!value) {
      return 'Date of birth is required';
    }
    const today = new Date();
    const birthDate = new Date(value);
    const age = today.getFullYear() - birthDate.getFullYear();
    
    if (age < 13 || age > 120) {
      return 'Age must be between 13 and 120 years';
    }
    return '';
  };

  // Handle input changes and validation
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setNameError(validateName(value));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  const handleGenderChange = (e) => {
    const value = e.target.value;
    setGender(value);
    setGenderError(validateGender(value));
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    setMobileNumber(value);
    setMobileError(validateMobile(value));
  };

  const handleDobChange = (e) => {
    const value = e.target.value;
    setDateOfBirth(value);
    setDobError(validateDateOfBirth(value));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const errors = {
      name: validateName(name),
      email: validateEmail(email),
      password: validatePassword(password),
      gender: validateGender(gender),
      mobile: validateMobile(mobileNumber),
      dob: validateDateOfBirth(dateOfBirth)
    };

    // Set all errors
    setNameError(errors.name);
    setEmailError(errors.email);
    setPasswordError(errors.password);
    setGenderError(errors.gender);
    setMobileError(errors.mobile);
    setDobError(errors.dob);

    // Check if form is valid
    const isFormValid = Object.values(errors).every(error => error === '');
    
    if (isFormValid) {
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
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="tel"
              id="mobile"
              value={mobileNumber}
              onChange={handleMobileChange}
              className={mobileError ? 'error' : ''}
              placeholder="Enter your mobile number"
              maxLength="10"
            />
            {mobileError && <span className="error-message">{mobileError}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              value={dateOfBirth}
              onChange={handleDobChange}
              className={dobError ? 'error' : ''}
            />
            {dobError && <span className="error-message">{dobError}</span>}
          </div>

          <button type="submit" className="submit-btn">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
