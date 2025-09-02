// Real-time Form Validation System
class FormValidator {
    constructor() {
        this.fields = {
            name: { required: true, pattern: /^[a-zA-Z\s]{2,50}$/, message: 'Name must be 2-50 characters, letters and spaces only' },
            email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email address' },
            dob: { required: true, validator: this.validateDOB, message: 'Please enter a valid date of birth' },
            pincode: { required: true, pattern: /^\d{6}$/, message: 'Pincode must be exactly 6 digits' },
            mobile: { required: true, pattern: /^\d{10}$/, message: 'Mobile number must be exactly 10 digits' },
            ip: { required: true, validator: this.validateIP, message: 'Please enter a valid IP address' }
        };

        this.validationState = {
            name: { isValid: false, message: '', isTouched: false },
            email: { isValid: false, message: '', isTouched: false },
            dob: { isValid: false, message: '', isTouched: false },
            pincode: { isValid: false, message: '', isTouched: false },
            mobile: { isValid: false, message: '', isTouched: false },
            ip: { isValid: false, message: '', isTouched: false }
        };

        this.initializeElements();
        this.attachEventListeners();
        this.updateSubmitButton();
    }

    initializeElements() {
        this.form = document.getElementById('validationForm');
        this.submitBtn = document.getElementById('submitBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.summaryContent = document.getElementById('summaryContent');
    }

    attachEventListeners() {
        // Add event listeners for each field
        Object.keys(this.fields).forEach(fieldName => {
            const input = document.getElementById(fieldName);
            const messageElement = document.getElementById(`${fieldName}Message`);

            // Real-time validation on input
            input.addEventListener('input', (e) => {
                this.validateField(fieldName, e.target.value);
                this.updateFieldDisplay(fieldName);
                this.updateSubmitButton();
                this.updateSummary();
            });

            // Validation on blur (when user leaves field)
            input.addEventListener('blur', (e) => {
                this.validationState[fieldName].isTouched = true;
                this.validateField(fieldName, e.target.value);
                this.updateFieldDisplay(fieldName);
                this.updateSubmitButton();
                this.updateSummary();
            });

            // Clear validation state on focus
            input.addEventListener('focus', () => {
                this.clearFieldValidation(fieldName);
            });
        });

        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission();
        });

        // Clear form
        this.clearBtn.addEventListener('click', () => {
            this.clearForm();
        });
    }

    validateField(fieldName, value) {
        const field = this.fields[fieldName];
        const state = this.validationState[fieldName];
        
        // Reset state
        state.isValid = false;
        state.message = '';

        // Check if field is empty
        if (field.required && (!value || value.trim() === '')) {
            state.message = `${this.getFieldDisplayName(fieldName)} is required`;
            return;
        }

        // Skip validation if field is empty and not required
        if (!value || value.trim() === '') {
            state.isValid = true;
            return;
        }

        // Custom validator
        if (field.validator) {
            const result = field.validator(value);
            if (result !== true) {
                state.message = result || field.message;
                return;
            }
        }

        // Pattern validation
        if (field.pattern && !field.pattern.test(value)) {
            state.message = field.message;
            return;
        }

        // Field is valid
        state.isValid = true;
    }

    validateDOB(value) {
        const dob = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();

        // Check if date is valid
        if (isNaN(dob.getTime())) {
            return 'Please enter a valid date';
        }

        // Check if date is in the future
        if (dob > today) {
            return 'Date of birth cannot be in the future';
        }

        // Check if age is reasonable (between 0 and 150)
        if (age < 0 || (age === 0 && monthDiff < 0) || age > 150) {
            return 'Please enter a valid date of birth';
        }

        // Check minimum age (13 years)
        if (age < 13 || (age === 13 && monthDiff < 0)) {
            return 'You must be at least 13 years old';
        }

        return true;
    }

    validateIP(value) {
        const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        
        if (!ipRegex.test(value)) {
            return 'Please enter a valid IP address (e.g., 192.168.1.1)';
        }

        return true;
    }

    updateFieldDisplay(fieldName) {
        const input = document.getElementById(fieldName);
        const messageElement = document.getElementById(`${fieldName}Message`);
        const state = this.validationState[fieldName];

        // Remove all validation classes
        input.classList.remove('valid', 'invalid', 'warning');
        messageElement.classList.remove('valid', 'invalid', 'warning', 'info');

        if (state.isTouched || input.value.trim() !== '') {
            if (state.isValid) {
                input.classList.add('valid');
                messageElement.classList.add('valid');
                messageElement.textContent = '✓ Valid';
            } else {
                input.classList.add('invalid');
                messageElement.classList.add('invalid');
                messageElement.textContent = state.message;
            }
        } else {
            messageElement.textContent = '';
        }
    }

    clearFieldValidation(fieldName) {
        const input = document.getElementById(fieldName);
        const messageElement = document.getElementById(`${fieldName}Message`);
        
        input.classList.remove('valid', 'invalid', 'warning');
        messageElement.classList.remove('valid', 'invalid', 'warning', 'info');
        messageElement.textContent = '';
    }

    updateSubmitButton() {
        const allFieldsValid = Object.values(this.validationState).every(state => state.isValid);
        const hasRequiredFields = Object.values(this.validationState).some(state => state.isTouched);
        
        this.submitBtn.disabled = !allFieldsValid || !hasRequiredFields;
    }

    updateSummary() {
        const validCount = Object.values(this.validationState).filter(state => state.isValid).length;
        const invalidCount = Object.values(this.validationState).filter(state => !state.isValid && state.isTouched).length;
        const pendingCount = Object.values(this.validationState).filter(state => !state.isTouched).length;
        const totalFields = Object.keys(this.fields).length;

        let summaryHTML = `
            <div class="summary-stats">
                <div class="stat-item valid">
                    <span class="stat-number">${validCount}</span>
                    <span class="stat-label">Valid</span>
                </div>
                <div class="stat-item invalid">
                    <span class="stat-number">${invalidCount}</span>
                    <span class="stat-label">Invalid</span>
                </div>
                <div class="stat-item warning">
                    <span class="stat-number">${pendingCount}</span>
                    <span class="stat-label">Pending</span>
                </div>
            </div>
            <div class="field-statuses">
        `;

        Object.keys(this.fields).forEach(fieldName => {
            const state = this.validationState[fieldName];
            const displayName = this.getFieldDisplayName(fieldName);
            
            let statusClass = 'pending';
            let statusIcon = '?';
            let statusMessage = 'Not validated yet';

            if (state.isTouched) {
                if (state.isValid) {
                    statusClass = 'valid';
                    statusIcon = '✓';
                    statusMessage = 'Valid';
                } else {
                    statusClass = 'invalid';
                    statusIcon = '✗';
                    statusMessage = state.message;
                }
            }

            summaryHTML += `
                <div class="field-status">
                    <span class="field-name">${displayName}:</span>
                    <span class="field-status-icon ${statusClass}">${statusIcon}</span>
                    <span class="field-message">${statusMessage}</span>
                </div>
            `;
        });

        summaryHTML += '</div>';
        this.summaryContent.innerHTML = summaryHTML;
    }

    getFieldDisplayName(fieldName) {
        const displayNames = {
            name: 'Name',
            email: 'Email',
            dob: 'Date of Birth',
            pincode: 'Pincode',
            mobile: 'Mobile Number',
            ip: 'IP Address'
        };
        return displayNames[fieldName] || fieldName;
    }

    clearForm() {
        // Clear all input values
        Object.keys(this.fields).forEach(fieldName => {
            const input = document.getElementById(fieldName);
            input.value = '';
            this.validationState[fieldName] = { isValid: false, message: '', isTouched: false };
            this.clearFieldValidation(fieldName);
        });

        this.updateSubmitButton();
        this.updateSummary();
        
        // Show success message
        this.showMessage('Form cleared successfully!', 'success');
    }

    handleFormSubmission() {
        // Double-check all fields are valid
        const allValid = Object.values(this.validationState).every(state => state.isValid);
        
        if (!allValid) {
            this.showMessage('Please fix all validation errors before submitting.', 'error');
            return;
        }

        // Collect form data
        const formData = {};
        Object.keys(this.fields).forEach(fieldName => {
            formData[fieldName] = document.getElementById(fieldName).value;
        });

        // Simulate form submission
        this.showMessage('Form submitted successfully!', 'success');
        console.log('Form Data:', formData);
        
        // You can add actual form submission logic here
        // For example: send data to server, redirect, etc.
    }

    showMessage(message, type = 'info') {
        // Remove existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message form-message-${type}`;
        messageDiv.textContent = message;

        // Style the message
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 1000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;

        // Set background color based on type
        switch (type) {
            case 'success':
                messageDiv.style.background = 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)';
                break;
            case 'error':
                messageDiv.style.background = 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)';
                break;
            case 'warning':
                messageDiv.style.background = 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)';
                break;
            default:
                messageDiv.style.background = 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)';
        }

        // Add to document
        document.body.appendChild(messageDiv);

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    if (messageDiv.parentNode) {
                        messageDiv.remove();
                    }
                }, 300);
            }
        }, 3000);
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the form validator when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const formValidator = new FormValidator();
    
    console.log('Real-time Form Validation initialized!');
    console.log('Features:');
    console.log('- Real-time validation on input');
    console.log('- Visual feedback with colors and icons');
    console.log('- Comprehensive validation rules');
    console.log('- Form submission only when all fields are valid');
});
