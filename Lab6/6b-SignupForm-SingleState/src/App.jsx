import React, { useState } from 'react';
import './App.css';

const App = () => {
  // Single useState to manage all form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    mobileNumber: '',
    dateOfBirth: ''
  });

  // Single useState to manage all error states
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    mobileNumber: '',
    dateOfBirth: ''
  });

  // Regular expressions for validation
  const nameRegex = /^[a-zA-Z\s]{2,50}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const mobileRegex = /^[6-9]\d{9}$/;

  // Validation functions
  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'name':
        if (!value.trim()) {
          return 'Name is required';
        }
        if (!nameRegex.test(value)) {
          return 'Name should contain only letters and spaces (2-50 characters)';
        }
        return '';

      case 'email':
        if (!value.trim()) {
          return 'Email is required';
        }
        if (!emailRegex.test(value)) {
          return 'Please enter a valid email address';
        }
        return '';

      case 'password':
        if (!value) {
          return 'Password is required';
        }
        if (!passwordRegex.test(value)) {
          return 'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
        }
        return '';

      case 'gender':
        if (!value) {
          return 'Please select a gender';
        }
        return '';

      case 'mobileNumber':
        if (!value.trim()) {
          return 'Mobile number is required';
        }
        if (!mobileRegex.test(value)) {
          return 'Please enter a valid 10-digit mobile number starting with 6-9';
        }
        return '';

      case 'dateOfBirth':
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

      default:
        return '';
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    // Validate the field and update errors
    const errorMessage = validateField(name, value);
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: errorMessage
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(fieldName => {
      newErrors[fieldName] = validateField(fieldName, formData[fieldName]);
    });

    // Update all errors
    setErrors(newErrors);

    // Check if form is valid
    const isFormValid = Object.values(newErrors).every(error => error === '');
    
    if (isFormValid) {
      alert('Form submitted successfully!');
      console.log('Form Data:', formData);
    } else {
      alert('Please fix the errors before submitting');
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      gender: '',
      mobileNumber: '',
      dateOfBirth: ''
    });
    setErrors({
      name: '',
      email: '',
      password: '',
      gender: '',
      mobileNumber: '',
      dateOfBirth: ''
    });
  };

  return (
    <div className="app">
      <div className="form-container">
        <h1 className="form-title">Sign Up</h1>
        <p className="form-subtitle">Create your account with single state management</p>
        
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? 'error' : ''}
              placeholder="Enter your full name"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={errors.password ? 'error' : ''}
              placeholder="Enter your password"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className={errors.gender ? 'error' : ''}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <span className="error-message">{errors.gender}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              className={errors.mobileNumber ? 'error' : ''}
              placeholder="Enter your mobile number"
              maxLength="10"
            />
            {errors.mobileNumber && <span className="error-message">{errors.mobileNumber}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className={errors.dateOfBirth ? 'error' : ''}
            />
            {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
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
