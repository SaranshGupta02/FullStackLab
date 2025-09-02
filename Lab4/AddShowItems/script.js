// Add and Show Items Manager
class ItemsManager {
    constructor() {
        this.items = [];
        this.isShowing = false;
        this.initializeElements();
        this.attachEventListeners();
        this.updateDisplay();
    }

    initializeElements() {
        this.itemInput = document.getElementById('itemInput');
        this.addBtn = document.getElementById('addBtn');
        this.showBtn = document.getElementById('showBtn');
        this.listContainer = document.getElementById('listContainer');
        this.itemCount = document.getElementById('itemCount');
    }

    attachEventListeners() {
        // Add button click
        this.addBtn.addEventListener('click', () => this.addItem());

        // Show button click
        this.showBtn.addEventListener('click', () => this.showItems());

        // Enter key press in input
        this.itemInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addItem();
            }
        });

        // Input validation
        this.itemInput.addEventListener('input', () => {
            this.validateInput();
        });
    }

    addItem() {
        const inputValue = this.itemInput.value.trim();
        
        if (inputValue === '') {
            this.showMessage('Please enter an item to add!', 'error');
            this.itemInput.focus();
            return;
        }

        // Check for duplicate items
        if (this.items.includes(inputValue)) {
            this.showMessage('This item already exists in the list!', 'warning');
            this.itemInput.focus();
            return;
        }

        // Add item to array
        this.items.push(inputValue);

        // Clear input and update display
        this.itemInput.value = '';
        this.updateDisplay();
        this.validateInput();

        // Show success message
        this.showMessage(`"${inputValue}" added to the list!`, 'success');

        // Focus back to input
        this.itemInput.focus();
    }

    showItems() {
        if (this.items.length === 0) {
            this.showMessage('No items to show! Add some items first.', 'warning');
            return;
        }

        this.isShowing = true;
        this.renderItems();
        this.updateDisplay();
        this.showMessage(`Displaying ${this.items.length} item(s)!`, 'success');
    }

    renderItems() {
        if (this.items.length === 0) {
            this.listContainer.innerHTML = `
                <div class="no-items">
                    <p>No items added yet. Add some items and click "Show Items" to display them.</p>
                </div>
            `;
            return;
        }

        const listHTML = `
            <ul class="items-list">
                ${this.items.map((item, index) => `
                    <li class="list-item">
                        <span class="item-number">${index + 1}</span>
                        <span class="item-text">${this.escapeHtml(item)}</span>
                    </li>
                `).join('')}
            </ul>
        `;

        this.listContainer.innerHTML = listHTML;
    }

    updateDisplay() {
        // Update item count
        this.itemCount.textContent = this.items.length;

        // Update button states
        this.showBtn.disabled = this.items.length === 0;

        // Update list header
        const listHeader = document.querySelector('.list-header h2');
        if (this.items.length === 0) {
            listHeader.textContent = 'Your Items';
        } else if (this.items.length === 1) {
            listHeader.textContent = 'Your Items (1 item)';
        } else {
            listHeader.textContent = `Your Items (${this.items.length} items)`;
        }

        // Show items if they exist and we're in showing mode
        if (this.isShowing && this.items.length > 0) {
            this.renderItems();
        } else if (this.items.length === 0) {
            this.isShowing = false;
            this.listContainer.innerHTML = `
                <div class="no-items">
                    <p>No items added yet. Add some items and click "Show Items" to display them.</p>
                </div>
            `;
        }
    }

    validateInput() {
        const inputValue = this.itemInput.value.trim();
        const isEmpty = inputValue === '';
        const isDuplicate = this.items.includes(inputValue);

        // Update add button state
        this.addBtn.disabled = isEmpty || isDuplicate;

        // Update input styling
        if (isDuplicate && !isEmpty) {
            this.itemInput.style.borderColor = '#f39c12';
            this.itemInput.style.backgroundColor = '#fef9e7';
        } else {
            this.itemInput.style.borderColor = '#bdc3c7';
            this.itemInput.style.backgroundColor = 'white';
        }
    }

    showMessage(message, type = 'info') {
        // Remove existing message
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${type}`;
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

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Public methods for external access
    getItems() {
        return [...this.items]; // Return a copy
    }

    getItemCount() {
        return this.items.length;
    }

    clearAll() {
        this.items = [];
        this.isShowing = false;
        this.updateDisplay();
        this.showMessage('All items cleared!', 'info');
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

// Initialize the items manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const itemsManager = new ItemsManager();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to add item
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            itemsManager.addItem();
        }
        
        // Ctrl/Cmd + S to show items
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            itemsManager.showItems();
        }
    });

    // Add some demo functionality
    console.log('Add and Show Items Manager initialized!');
    console.log('Keyboard shortcuts:');
    console.log('- Enter: Add item');
    console.log('- Ctrl/Cmd + Enter: Add item');
    console.log('- Ctrl/Cmd + S: Show items');
});
