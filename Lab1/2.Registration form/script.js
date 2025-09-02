const registrationForm = document.getElementById('registrationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const ageInput = document.getElementById('age');
const passwordInput = document.getElementById('password');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const ageError = document.getElementById('ageError');
const passwordError = document.getElementById('passwordError');
const successMessage = document.getElementById('successMessage');

function setError(inputEl, message, errorEl) {
  inputEl.classList.add('invalid');
  errorEl.textContent = message;
}

function clearError(inputEl, errorEl) {
  inputEl.classList.remove('invalid');
  errorEl.textContent = '';
}

function validateName() {
  const value = nameInput.value.trim();
  const regex = /^[A-Z][a-zA-Z]*$/; // Only alphabets, first letter capital
  if (value.length === 0) {
    setError(nameInput, 'Name is required.', nameError);
    return false;
  }
  if (!regex.test(value)) {
    setError(nameInput, 'Only letters, first letter must be uppercase.', nameError);
    return false;
  }
  clearError(nameInput, nameError);
  return true;
}

function validateEmail() {
  const value = emailInput.value.trim();
  // Alphanumeric with . and _ before @, typical domain after @
  const regex = /^[A-Za-z0-9._]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (value.length === 0) {
    setError(emailInput, 'Email is required.', emailError);
    return false;
  }
  if (!regex.test(value)) {
    setError(emailInput, 'Enter a valid email (alphanumeric with . and _).', emailError);
    return false;
  }
  clearError(emailInput, emailError);
  return true;
}

function validateAge() {
  const value = ageInput.value.trim();
  const ageNumber = Number(value);
  if (value.length === 0) {
    setError(ageInput, 'Age is required.', ageError);
    return false;
  }
  if (!Number.isInteger(ageNumber)) {
    setError(ageInput, 'Enter a whole number for age.', ageError);
    return false;
  }
  if (ageNumber < 18 || ageNumber > 60) {
    setError(ageInput, 'Age must be between 18 and 60.', ageError);
    return false;
  }
  clearError(ageInput, ageError);
  return true;
}

function validatePassword() {
  const value = passwordInput.value;
  const lengthOk = value.length >= 8; // at least 8 characters
  const hasLower = /[a-z]/.test(value);
  const hasUpper = /[A-Z]/.test(value);
  const hasDigit = /\d/.test(value);
  const hasSpecial = /[^A-Za-z0-9]/.test(value);

  if (!lengthOk || !hasLower || !hasUpper || !hasDigit || !hasSpecial) {
    setError(
      passwordInput,
      'Password must be ≥8 chars and include upper, lower, number, and special character.',
      passwordError
    );
    return false;
  }
  clearError(passwordInput, passwordError);
  return true;
}

nameInput.addEventListener('input', () => {
  successMessage.hidden = true;
  validateName();
});
emailInput.addEventListener('input', () => {
  successMessage.hidden = true;
  validateEmail();
});
ageInput.addEventListener('input', () => {
  successMessage.hidden = true;
  validateAge();
});
passwordInput.addEventListener('input', () => {
  successMessage.hidden = true;
  validatePassword();
});

registrationForm.addEventListener('submit', (event) => {
  successMessage.hidden = true;
  const isNameOk = validateName();
  const isEmailOk = validateEmail();
  const isAgeOk = validateAge();
  const isPasswordOk = validatePassword();

  if (!(isNameOk && isEmailOk && isAgeOk && isPasswordOk)) {
    event.preventDefault();
    const firstInvalid = [nameInput, emailInput, ageInput, passwordInput].find(el => el.classList.contains('invalid'));
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  event.preventDefault();
  successMessage.hidden = false;
  registrationForm.reset();
});


