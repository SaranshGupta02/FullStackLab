// Ordered List with User-defined Sorting Manager
class OrderedListManager {
    constructor() {
        this.items = [];
        this.isShowing = false;
        this.currentSortType = 'added-order';
        this.initializeElements();
        this.attachEventListeners();
        this.updateDisplay();
    }

    initializeElements() {
        this.itemInput = document.getElementById('itemInput');
        this.addBtn = document.getElementById('addBtn');
        this.showBtn = document.getElementById('showBtn');
        this.sortBtn = document.getElementById('sortBtn');
        this.sortType = document.getElementById('sortType');
        this.listContainer = document.getElementById('listContainer');
        this.itemCount = document.getElementById('itemCount');
    }

    attachEventListeners() {
        // Add button click
        this.addBtn.addEventListener('click', () => this.addItem());

        // Show button click
        this.showBtn.addEventListener('click', () => this.showItems());

        // Sort button click
        this.sortBtn.addEventListener('click', () => this.applySort());

        // Sort type change
        this.sortType.addEventListener('change', (e) => {
            this.currentSortType = e.target.value;
            if (this.isShowing && this.items.length > 0) {
                this.applySort();
            }
        });

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
        this.applySort();
        this.updateDisplay();
        this.showMessage(`Displaying ${this.items.length} item(s) in ${this.getSortTypeName()} order!`, 'success');
    }

    applySort() {
        if (this.items.length === 0) {
            this.showMessage('No items to sort!', 'warning');
            return;
        }

        const sortedItems = [...this.items]; // Create a copy to avoid mutating original

        switch (this.currentSortType) {
            case 'alphabetical':
                sortedItems.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
                break;
            case 'reverse-alphabetical':
                sortedItems.sort((a, b) => b.toLowerCase().localeCompare(a.toLowerCase()));
                break;
            case 'length':
                sortedItems.sort((a, b) => a.length - b.length);
                break;
            case 'reverse-length':
                sortedItems.sort((a, b) => b.length - a.length);
                break;
            case 'added-order':
                // Items are already in added order
                break;
            case 'reverse-added-order':
                sortedItems.reverse();
                break;
            default:
                break;
        }

        this.renderItems(sortedItems);
        this.showMessage(`Items sorted by ${this.getSortTypeName()}!`, 'success');
    }

    renderItems(itemsToRender = this.items) {
        if (itemsToRender.length === 0) {
            this.listContainer.innerHTML = `
                <div class="no-items">
                    <p>No items added yet. Add some items and click "Show Items" to display them.</p>
                </div>
            `;
            return;
        }

        const listHTML = `
            <ul class="items-list">
                ${itemsToRender.map((item, index) => `
                    <li class="list-item">
                        <span class="item-number">${index + 1}</span>
                        <span class="item-text">${this.escapeHtml(item)}</span>
                        <span class="sort-indicator">${this.getSortTypeName()}</span>
                    </li>
                `).join('')}
            </ul>
        `;

        this.listContainer.innerHTML = listHTML;
    }

    getSortTypeName() {
        const sortNames = {
            'alphabetical': 'A-Z',
            'reverse-alphabetical': 'Z-A',
            'length': 'Length',
            'reverse-length': 'Length (Rev)',
            'added-order': 'Added',
            'reverse-added-order': 'Added (Rev)'
        };
        return sortNames[this.currentSortType] || 'Custom';
    }

    updateDisplay() {
        // Update item count
        this.itemCount.textContent = this.items.length;

        // Update button states
        this.showBtn.disabled = this.items.length === 0;
        this.sortBtn.disabled = this.items.length === 0;

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
                messageDiv.style.background = 'linear-gradient(135deg, #8e44ad 0%, #9b59b6 100%)';
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

    getCurrentSortType() {
        return this.currentSortType;
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

// Initialize the ordered list manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const orderedListManager = new OrderedListManager();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to add item
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            orderedListManager.addItem();
        }
        
        // Ctrl/Cmd + S to show items
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            orderedListManager.showItems();
        }
        
        // Ctrl/Cmd + R to apply sort
        if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
            e.preventDefault();
            orderedListManager.applySort();
        }
    });

    // Add some demo functionality
    console.log('Ordered List with User-defined Sorting Manager initialized!');
    console.log('Keyboard shortcuts:');
    console.log('- Enter: Add item');
    console.log('- Ctrl/Cmd + Enter: Add item');
    console.log('- Ctrl/Cmd + S: Show items');
    console.log('- Ctrl/Cmd + R: Apply sort');
});
