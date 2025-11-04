# Lab 6 - Signup Form with State Management

This lab contains two implementations of a signup form demonstrating different state management approaches in React.

## Projects

### Lab 6a - Separate State Management
- Location: `6a-SignupForm-SeparateState/`
- Uses separate `useState` hooks for each form field
- Separate `useState` hooks for each error state
- Individual handler functions for each field

### Lab 6b - Single State Management
- Location: `6b-SignupForm-SingleState/`
- Uses single `useState` hook to manage all form fields (object)
- Single `useState` hook to manage all error states (object)
- Unified handler function for all fields

## Form Fields (Both Implementations)

Both projects include the following form fields with validation:

1. **Name** - Full name (letters and spaces only, 2-50 characters)
2. **Password** - Secure password (min 8 chars, uppercase, lowercase, number, special character)
3. **Email** - Email address (standard email format)
4. **Gender** - Gender selection (Male, Female, Other)
5. **Mobile Number** - 10-digit mobile number (starting with 6-9)
6. **Date of Birth** - Date picker (age 13-120 years)

## Validation

All fields use regular expression (regex) validation:
- **Name Regex**: `/^[a-zA-Z\s]{2,50}$/`
- **Email Regex**: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- **Password Regex**: `/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/`
- **Mobile Regex**: `/^[6-9]\d{9}$/`

## Running the Projects

For each project:

```bash
cd 6a-SignupForm-SeparateState  # or 6b-SignupForm-SingleState
npm install
npm start
```

The application will run on `http://localhost:3000`

## Key Differences

### Lab 6a (Separate State)
- **Pros**: 
  - Clear separation of concerns
  - Easy to understand individual field state
- **Cons**: 
  - More code duplication
  - Many useState hooks and handlers

### Lab 6b (Single State)
- **Pros**: 
  - Less code duplication
  - Easier to scale for many fields
  - Cleaner, more maintainable code
- **Cons**: 
  - Slightly more complex state structure

Both implementations provide the same user experience and validation functionality!
