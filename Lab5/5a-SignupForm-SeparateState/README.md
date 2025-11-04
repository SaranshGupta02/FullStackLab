# Lab 5a - Signup Form with Separate State Management

This React application demonstrates a signup form implementation using **separate useState hooks** for each form field and validation.

## Features

- **Separate State Management**: Each form field (name, email, password, gender, mobile number, date of birth) uses its own `useState` hook
- **Individual Error States**: Each field has its own error state managed separately
- **Real-time Validation**: Form validation occurs on input change using regular expressions
- **Comprehensive Validation Rules**:
  - Name: 2-50 characters, letters and spaces only
  - Email: Valid email format
  - Password: Minimum 8 characters with uppercase, lowercase, number, and special character
  - Gender: Required selection
  - Mobile: 10-digit number starting with 6-9
  - Date of Birth: Age between 13-120 years
- **Attractive UI**: Modern gradient design with smooth animations and responsive layout

## Form Fields

1. **Full Name** - Text input with name validation
2. **Email Address** - Email input with email format validation
3. **Password** - Password input with strong password requirements
4. **Gender** - Dropdown selection (Male/Female/Other)
5. **Mobile Number** - Tel input with Indian mobile number validation
6. **Date of Birth** - Date input with age validation

## Getting Started

1. Navigate to the project directory:
   ```bash
   cd Lab5/5a-SignupForm-SeparateState
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## State Management Approach

This implementation uses **separate useState hooks** for each form field:

```javascript
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [gender, setGender] = useState('');
const [mobileNumber, setMobileNumber] = useState('');
const [dateOfBirth, setDateOfBirth] = useState('');

// Separate error states
const [nameError, setNameError] = useState('');
const [emailError, setEmailError] = useState('');
// ... and so on for each field
```

## Validation

Each field has its own validation function and error state, providing immediate feedback to users as they type.

## Technologies Used

- React 18.2.0
- CSS3 with modern features (gradients, animations, backdrop-filter)
- Regular Expressions for validation
- Responsive design principles
