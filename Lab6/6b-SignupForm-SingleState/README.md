# Lab 6b - Signup Form with Single State Management

This project implements the same signup form using React function components with **single useState hook** to manage all form fields.

## Features

- **Single State Management**: All form fields are managed using a single `useState` hook with an object structure
- **Unified Error States**: All error states are managed in a single `useState` hook as an object
- **Regex Validation**: Same validation rules as Lab 6a using regular expressions
- **Centralized Handler**: Single `handleInputChange` function handles all input changes using the `name` attribute

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

- Single state object for all form fields: `formData` with properties `name`, `email`, `password`, `gender`, `mobileNumber`, `dateOfBirth`
- Single state object for all errors: `errors` with matching property names
- Unified handler function: `handleInputChange` that works with any field using the input's `name` attribute
- Single validation function: `validateField` that accepts field name and value

## Advantages of Single State Approach

- Less code duplication
- Easier to manage and update
- More scalable for forms with many fields
- Cleaner code structure

## Validation Rules

- **Name**: Required, 2-50 characters, letters and spaces only
- **Email**: Required, valid email format
- **Password**: Required, min 8 characters, must contain uppercase, lowercase, number, and special character
- **Gender**: Required selection
- **Mobile Number**: Required, 10 digits starting with 6-9
- **Date of Birth**: Required, age must be between 13 and 120 years
