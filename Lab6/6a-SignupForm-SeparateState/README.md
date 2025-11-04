# Lab 6a - Signup Form with Separate State Management

This project implements a signup form using React function components with **separate useState hooks** for each form field and separate error states.

## Features

- **Separate State Management**: Each form field (name, email, password, gender, mobile number, date of birth) uses its own `useState` hook
- **Separate Error States**: Each field has its own error state managed independently
- **Regex Validation**: All fields are validated using regular expressions:
  - **Name**: Letters and spaces only (2-50 characters)
  - **Email**: Standard email format validation
  - **Password**: Minimum 8 characters with uppercase, lowercase, number, and special character
  - **Gender**: Required field validation
  - **Mobile Number**: 10-digit number starting with 6-9
  - **Date of Birth**: Age validation (13-120 years)

## Form Fields

1. **Full Name** - Text input
2. **Email Address** - Email input
3. **Password** - Password input with strength requirements
4. **Gender** - Dropdown select (Male, Female, Other)
5. **Mobile Number** - Tel input (10 digits)
6. **Date of Birth** - Date input

## Installation

```bash
npm install
```

## Running the Application

```bash
npm start
```

The application will open at `http://localhost:3000`

## Implementation Details

- Each form field has its own state: `name`, `email`, `password`, `gender`, `mobileNumber`, `dateOfBirth`
- Each field has its own error state: `nameError`, `emailError`, `passwordError`, etc.
- Separate handler functions for each field: `handleNameChange`, `handleEmailChange`, etc.
- Individual validation functions: `validateName`, `validateEmail`, etc.

## Validation Rules

- **Name**: Required, 2-50 characters, letters and spaces only
- **Email**: Required, valid email format
- **Password**: Required, min 8 characters, must contain uppercase, lowercase, number, and special character
- **Gender**: Required selection
- **Mobile Number**: Required, 10 digits starting with 6-9
- **Date of Birth**: Required, age must be between 13 and 120 years
