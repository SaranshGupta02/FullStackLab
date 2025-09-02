// HTML Validator Class
class HTMLValidator {
    constructor() {
        this.errors = [];
        this.warnings = [];
        this.successes = [];
    }

    // Main validation method
    validate(htmlCode) {
        this.errors = [];
        this.warnings = [];
        this.successes = [];

        if (!htmlCode.trim()) {
            this.errors.push({
                type: 'empty',
                message: 'HTML code is empty',
                line: 0
            });
            return;
        }

        this.checkBasicStructure(htmlCode);
        this.checkUnclosedTags(htmlCode);
        this.checkNestedTags(htmlCode);
        this.checkSelfClosingTags(htmlCode);
        this.checkAttributes(htmlCode);
        this.checkDoctype(htmlCode);
        this.checkRequiredTags(htmlCode);
        this.checkSpecialCharacters(htmlCode);
    }

    // Check for basic HTML structure
    checkBasicStructure(htmlCode) {
        const lines = htmlCode.split('\n');
        
        // Check for DOCTYPE
        if (!htmlCode.toLowerCase().includes('<!doctype')) {
            this.warnings.push({
                type: 'doctype',
                message: 'Missing DOCTYPE declaration',
                line: this.findLineNumber(htmlCode, '<!doctype')
            });
        }

        // Check for html tag
        if (!htmlCode.toLowerCase().includes('<html')) {
            this.warnings.push({
                type: 'html-tag',
                message: 'Missing <html> tag',
                line: this.findLineNumber(htmlCode, '<html')
            });
        }

        // Check for head tag
        if (!htmlCode.toLowerCase().includes('<head')) {
            this.warnings.push({
                type: 'head-tag',
                message: 'Missing <head> tag',
                line: this.findLineNumber(htmlCode, '<head')
            });
        }

        // Check for body tag
        if (!htmlCode.toLowerCase().includes('<body')) {
            this.warnings.push({
                type: 'body-tag',
                message: 'Missing <body> tag',
                line: this.findLineNumber(htmlCode, '<body')
            });
        }
    }

    // Check for unclosed tags
    checkUnclosedTags(htmlCode) {
        const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^<>]*>/g;
        const openTags = [];
        const selfClosingTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
        let match;

        while ((match = tagRegex.exec(htmlCode)) !== null) {
            const fullTag = match[0];
            const tagName = match[1].toLowerCase();
            const isClosing = fullTag.startsWith('</');
            const isSelfClosing = fullTag.endsWith('/>') || selfClosingTags.includes(tagName);

            if (isClosing) {
                if (openTags.length === 0) {
                    this.errors.push({
                        type: 'unexpected-closing',
                        message: `Unexpected closing tag: </${tagName}>`,
                        line: this.findLineNumber(htmlCode, fullTag)
                    });
                } else {
                    const lastOpenTag = openTags.pop();
                    if (lastOpenTag !== tagName) {
                        this.errors.push({
                            type: 'mismatched-tags',
                            message: `Mismatched tags: <${lastOpenTag}> and </${tagName}>`,
                            line: this.findLineNumber(htmlCode, fullTag)
                        });
                    }
                }
            } else if (!isSelfClosing) {
                openTags.push(tagName);
            }
        }

        // Check for unclosed opening tags
        openTags.forEach(tagName => {
            this.errors.push({
                type: 'unclosed-tag',
                message: `Unclosed tag: <${tagName}>`,
                line: this.findLineNumber(htmlCode, `<${tagName}`)
            });
        });
    }

    // Check for properly nested tags
    checkNestedTags(htmlCode) {
        const lines = htmlCode.split('\n');
        const problematicNestings = [
            { parent: 'p', child: 'div' },
            { parent: 'p', child: 'p' },
            { parent: 'a', child: 'a' },
            { parent: 'button', child: 'button' }
        ];

        problematicNestings.forEach(nesting => {
            const parentRegex = new RegExp(`<${nesting.parent}[^>]*>`, 'gi');
            const childRegex = new RegExp(`<${nesting.child}[^>]*>`, 'gi');
            
            let parentMatch;
            while ((parentMatch = parentRegex.exec(htmlCode)) !== null) {
                const parentStart = parentMatch.index;
                const parentEnd = htmlCode.indexOf(`</${nesting.parent}>`, parentStart);
                
                if (parentEnd !== -1) {
                    const content = htmlCode.substring(parentStart, parentEnd);
                    if (childRegex.test(content)) {
                        this.warnings.push({
                            type: 'invalid-nesting',
                            message: `<${nesting.parent}> should not contain <${nesting.child}>`,
                            line: this.findLineNumber(htmlCode, parentMatch[0])
                        });
                    }
                }
            }
        });
    }

    // Check self-closing tags
    checkSelfClosingTags(htmlCode) {
        const selfClosingTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
        
        selfClosingTags.forEach(tag => {
            const regex = new RegExp(`<${tag}[^>]*>(?!\\s*</${tag}>)`, 'gi');
            let match;
            
            while ((match = regex.exec(htmlCode)) !== null) {
                if (!match[0].endsWith('/>')) {
                    this.warnings.push({
                        type: 'self-closing',
                        message: `<${tag}> should be self-closing: <${tag} />`,
                        line: this.findLineNumber(htmlCode, match[0])
                    });
                }
            }
        });
    }

    // Check attributes
    checkAttributes(htmlCode) {
        // Check for unquoted attributes
        const unquotedAttrRegex = /\s([a-zA-Z-]+)=([^"'\s>]+)/g;
        let match;
        
        while ((match = unquotedAttrRegex.exec(htmlCode)) !== null) {
            this.warnings.push({
                type: 'unquoted-attribute',
                message: `Unquoted attribute value: ${match[1]}="${match[2]}"`,
                line: this.findLineNumber(htmlCode, match[0])
            });
        }

        // Check for missing alt attributes on images
        const imgRegex = /<img[^>]*>/gi;
        while ((match = imgRegex.exec(htmlCode)) !== null) {
            if (!match[0].includes('alt=')) {
                this.warnings.push({
                    type: 'missing-alt',
                    message: 'Image missing alt attribute',
                    line: this.findLineNumber(htmlCode, match[0])
                });
            }
        }
    }

    // Check DOCTYPE
    checkDoctype(htmlCode) {
        const doctypeRegex = /<!doctype\s+html\s*>/i;
        if (doctypeRegex.test(htmlCode)) {
            this.successes.push({
                type: 'doctype',
                message: 'Valid DOCTYPE declaration found',
                line: this.findLineNumber(htmlCode, '<!doctype')
            });
        }
    }

    // Check required tags
    checkRequiredTags(htmlCode) {
        const requiredTags = ['html', 'head', 'body'];
        
        requiredTags.forEach(tag => {
            if (htmlCode.toLowerCase().includes(`<${tag}`)) {
                this.successes.push({
                    type: 'required-tag',
                    message: `Required <${tag}> tag found`,
                    line: this.findLineNumber(htmlCode, `<${tag}`)
                });
            }
        });
    }

    // Check for special characters
    checkSpecialCharacters(htmlCode) {
        const specialChars = /[<>]/g;
        const lines = htmlCode.split('\n');
        
        lines.forEach((line, index) => {
            if (line.includes('<') && !line.includes('>')) {
                this.errors.push({
                    type: 'incomplete-tag',
                    message: 'Incomplete tag (missing closing >)',
                    line: index + 1
                });
            }
        });
    }

    // Helper method to find line number
    findLineNumber(htmlCode, searchString) {
        const lines = htmlCode.split('\n');
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes(searchString)) {
                return i + 1;
            }
        }
        return 1;
    }

    // Get validation results
    getResults() {
        return {
            isValid: this.errors.length === 0,
            errors: this.errors,
            warnings: this.warnings,
            successes: this.successes,
            totalIssues: this.errors.length + this.warnings.length
        };
    }
}

// Code formatter
function formatHTML(htmlCode) {
    let formatted = htmlCode
        .replace(/></g, '>\n<')
        .replace(/^\s+|\s+$/g, '');
    
    const lines = formatted.split('\n');
    let indentLevel = 0;
    const indentSize = 2;
    
    return lines.map(line => {
        const trimmed = line.trim();
        if (!trimmed) return '';
        
        if (trimmed.startsWith('</')) {
            indentLevel = Math.max(0, indentLevel - 1);
        }
        
        const indented = ' '.repeat(indentLevel * indentSize) + trimmed;
        
        if (trimmed.startsWith('<') && !trimmed.startsWith('</') && !trimmed.endsWith('/>') && !trimmed.includes('<!')) {
            indentLevel++;
        }
        
        return indented;
    }).join('\n');
}

// Display validation results
function displayResults(results) {
    const container = document.getElementById('validationResults');
    container.innerHTML = '';

    if (results.totalIssues === 0 && results.successes.length > 0) {
        // Show success summary
        const summary = document.createElement('div');
        summary.className = 'validation-summary valid';
        summary.innerHTML = `
            <span class="validation-icon">✓</span>
            <span>HTML is valid! No errors found.</span>
        `;
        container.appendChild(summary);
    } else if (results.errors.length > 0) {
        // Show error summary
        const summary = document.createElement('div');
        summary.className = 'validation-summary invalid';
        summary.innerHTML = `
            <span class="validation-icon">✗</span>
            <span>Found ${results.totalIssues} issue(s): ${results.errors.length} error(s), ${results.warnings.length} warning(s)</span>
        `;
        container.appendChild(summary);
    } else if (results.warnings.length > 0) {
        // Show warning summary
        const summary = document.createElement('div');
        summary.className = 'validation-summary invalid';
        summary.innerHTML = `
            <span class="validation-icon">⚠</span>
            <span>Found ${results.warnings.length} warning(s)</span>
        `;
        container.appendChild(summary);
    }

    // Display errors
    if (results.errors.length > 0) {
        const errorList = document.createElement('ul');
        errorList.className = 'error-list';
        
        results.errors.forEach(error => {
            const errorItem = document.createElement('li');
            errorItem.className = 'error-item';
            errorItem.innerHTML = `
                <span class="error-icon">✗</span>
                <div class="error-message">
                    ${error.message}
                    <div class="error-line">Line ${error.line}</div>
                </div>
            `;
            errorList.appendChild(errorItem);
        });
        
        container.appendChild(errorList);
    }

    // Display warnings
    if (results.warnings.length > 0) {
        const warningList = document.createElement('ul');
        warningList.className = 'error-list';
        
        results.warnings.forEach(warning => {
            const warningItem = document.createElement('li');
            warningItem.className = 'warning-item';
            warningItem.innerHTML = `
                <span class="warning-icon">⚠</span>
                <div class="warning-message">
                    ${warning.message}
                    <div class="error-line">Line ${warning.line}</div>
                </div>
            `;
            warningList.appendChild(warningItem);
        });
        
        container.appendChild(warningList);
    }

    // Display successes
    if (results.successes.length > 0) {
        const successList = document.createElement('ul');
        successList.className = 'error-list';
        
        results.successes.forEach(success => {
            const successItem = document.createElement('li');
            successItem.className = 'success-item';
            successItem.innerHTML = `
                <span class="success-icon">✓</span>
                <div class="success-message">
                    ${success.message}
                    <div class="error-line">Line ${success.line}</div>
                </div>
            `;
            successList.appendChild(successItem);
        });
        
        container.appendChild(successList);
    }
}

// Update preview
function updatePreview(htmlCode) {
    const iframe = document.getElementById('previewFrame');
    iframe.srcdoc = htmlCode;
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    const validateBtn = document.getElementById('validateBtn');
    const clearBtn = document.getElementById('clearBtn');
    const formatBtn = document.getElementById('formatBtn');
    const htmlCodeTextarea = document.getElementById('htmlCode');

    // Validate button
    validateBtn.addEventListener('click', function() {
        const htmlCode = htmlCodeTextarea.value;
        const validator = new HTMLValidator();
        validator.validate(htmlCode);
        const results = validator.getResults();
        displayResults(results);
        updatePreview(htmlCode);
    });

    // Clear button
    clearBtn.addEventListener('click', function() {
        htmlCodeTextarea.value = '';
        document.getElementById('validationResults').innerHTML = `
            <div class="no-results">
                <p>Click "Validate HTML" to check your code</p>
            </div>
        `;
        document.getElementById('previewFrame').srcdoc = '';
    });

    // Format button
    formatBtn.addEventListener('click', function() {
        const htmlCode = htmlCodeTextarea.value;
        if (htmlCode.trim()) {
            htmlCodeTextarea.value = formatHTML(htmlCode);
        }
    });

    // Real-time preview update
    htmlCodeTextarea.addEventListener('input', function() {
        const htmlCode = this.value;
        if (htmlCode.trim()) {
            updatePreview(htmlCode);
        } else {
            document.getElementById('previewFrame').srcdoc = '';
        }
    });

    // Add example HTML on focus if empty
    htmlCodeTextarea.addEventListener('focus', function() {
        if (this.value.trim() === '') {
            this.placeholder = `<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <h1>Hello World</h1>
    <p>This is a paragraph.</p>
</body>
</html>`;
        }
    });
});
