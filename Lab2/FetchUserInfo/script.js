// Regular expression patterns for extracting personal information
const patterns = {
    name: [
        /(?:name is|my name is|i am|i'm)\s+([A-Za-z\s]+?)(?:\s|,|\.|$)/i,
        /(?:name:)\s*([A-Za-z\s]+?)(?:\s|,|\.|$)/i,
        /^([A-Za-z\s]+?)(?:\s|,|\.|$)/i
    ],
    email: [
        /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,
        /(?:email|e-mail|mail)\s*(?:is|:)?\s*([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/gi
    ],
    mobile: [
        /(?:mobile|phone|contact|number)\s*(?:is|:)?\s*(\d{10})/gi,
        /(\d{10})/g,
        /(?:mobile|phone|contact|number)\s*(?:is|:)?\s*(\+?91[\s-]?\d{10})/gi
    ],
    ip: [
        /(?:ip|ip address)\s*(?:is|:)?\s*(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/gi,
        /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/g
    ],
    dob: [
        /(?:dob|date of birth|birthday|born)\s*(?:is|:)?\s*(\d{1,2}-\d{1,2}-\d{4})/gi,
        /(\d{1,2}-\d{1,2}-\d{4})/g,
        /(?:dob|date of birth|birthday|born)\s*(?:is|:)?\s*(\d{1,2}\/\d{1,2}\/\d{4})/gi
    ],
    pincode: [
        /(?:pin|pincode|postal code|zip code)\s*(?:is|:)?\s*(\d{6})/gi,
        /(\d{6})/g,
        /(?:pin|pincode|postal code|zip code)\s*(?:is|:)?\s*(\d{5,6})/gi
    ]
};

// Function to extract information using regex patterns
function extractInformation(text) {
    const extractedData = {
        name: '',
        email: '',
        mobile: '',
        ip: '',
        dob: '',
        pincode: ''
    };

    // Extract Name
    for (let pattern of patterns.name) {
        const match = text.match(pattern);
        if (match && match[1]) {
            extractedData.name = match[1].trim();
            break;
        }
    }

    // Extract Email
    for (let pattern of patterns.email) {
        const match = text.match(pattern);
        if (match) {
            extractedData.email = match[1] || match[0];
            break;
        }
    }

    // Extract Mobile Number
    for (let pattern of patterns.mobile) {
        const match = text.match(pattern);
        if (match) {
            let mobile = match[1] || match[0];
            // Clean up mobile number (remove spaces, dashes, +91)
            mobile = mobile.replace(/[\s\-+]/g, '');
            if (mobile.length === 10 || (mobile.length === 12 && mobile.startsWith('91'))) {
                extractedData.mobile = mobile.length === 12 ? mobile.substring(2) : mobile;
                break;
            }
        }
    }

    // Extract IP Address
    for (let pattern of patterns.ip) {
        const match = text.match(pattern);
        if (match) {
            const ip = match[1] || match[0];
            // Validate IP address format
            if (isValidIP(ip)) {
                extractedData.ip = ip;
                break;
            }
        }
    }

    // Extract Date of Birth
    for (let pattern of patterns.dob) {
        const match = text.match(pattern);
        if (match) {
            let dob = match[1] || match[0];
            // Convert / to - for consistency
            dob = dob.replace(/\//g, '-');
            if (isValidDate(dob)) {
                extractedData.dob = dob;
                break;
            }
        }
    }

    // Extract Pin Code
    for (let pattern of patterns.pincode) {
        const match = text.match(pattern);
        if (match) {
            const pincode = match[1] || match[0];
            if (pincode.length === 6) {
                extractedData.pincode = pincode;
                break;
            }
        }
    }

    return extractedData;
}

// Function to validate IP address
function isValidIP(ip) {
    const parts = ip.split('.');
    if (parts.length !== 4) return false;
    
    for (let part of parts) {
        const num = parseInt(part, 10);
        if (isNaN(num) || num < 0 || num > 255) return false;
    }
    return true;
}

// Function to validate date format (dd-mm-yyyy)
function isValidDate(dateString) {
    const parts = dateString.split('-');
    if (parts.length !== 3) return false;
    
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    
    if (isNaN(day) || isNaN(month) || isNaN(year)) return false;
    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > 2100) return false;
    
    return true;
}

// Function to display extracted information in the table
function displayInformation(data) {
    document.getElementById('name').textContent = data.name || '-';
    document.getElementById('email').textContent = data.email || '-';
    document.getElementById('mobile').textContent = data.mobile || '-';
    document.getElementById('ip').textContent = data.ip || '-';
    document.getElementById('dob').textContent = data.dob || '-';
    document.getElementById('pincode').textContent = data.pincode || '-';
}

// Function to clear the table
function clearTable() {
    document.getElementById('name').textContent = '-';
    document.getElementById('email').textContent = '-';
    document.getElementById('mobile').textContent = '-';
    document.getElementById('ip').textContent = '-';
    document.getElementById('dob').textContent = '-';
    document.getElementById('pincode').textContent = '-';
}

// Event listener for the extract button
document.addEventListener('DOMContentLoaded', function() {
    const extractBtn = document.getElementById('extractBtn');
    const textarea = document.getElementById('personalInfo');
    
    extractBtn.addEventListener('click', function() {
        const text = textarea.value.trim();
        
        if (text === '') {
            alert('Please enter some personal information in the text area.');
            return;
        }
        
        const extractedData = extractInformation(text);
        displayInformation(extractedData);
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.textContent = 'Information extracted successfully!';
        successMsg.style.cssText = `
            background: #d4edda;
            color: #155724;
            padding: 10px;
            border-radius: 5px;
            margin-top: 10px;
            border: 1px solid #c3e6cb;
        `;
        
        // Remove any existing success message
        const existingMsg = document.querySelector('.success-msg');
        if (existingMsg) {
            existingMsg.remove();
        }
        
        successMsg.className = 'success-msg';
        extractBtn.parentNode.appendChild(successMsg);
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            if (successMsg.parentNode) {
                successMsg.remove();
            }
        }, 3000);
    });
    
    // Clear table when textarea is cleared
    textarea.addEventListener('input', function() {
        if (this.value.trim() === '') {
            clearTable();
        }
    });
    
    // Add example text on focus if textarea is empty
    textarea.addEventListener('focus', function() {
        if (this.value.trim() === '') {
            this.placeholder = 'Example: My name is John Doe, email is john.doe@email.com, mobile number is 9876543210, IP address is 192.168.1.1, date of birth is 15-03-1990, and pin code is 123456.';
        }
    });
});
