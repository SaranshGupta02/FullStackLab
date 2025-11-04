// Dynamic List Manager
class ListManager {
    constructor() {
        this.items = [];
        this.itemCounter = 0;
        this.initializeElements();
        this.attachEventListeners();
        this.updateDisplay();
    }

    initializeElements() {
        this.itemInput = document.getElementById('itemInput');
        this.addBtn = document.getElementById('addBtn');
        this.deleteBtn = document.getElementById('deleteBtn');
        this.itemList = document.getElementById('itemList');
        this.itemCount = document.getElementById('itemCount');
    }

    attachEventListeners() {
        // Add button click
        this.addBtn.addEventListener('click', () => this.addItem());

        // Delete button click
        this.deleteBtn.addEventListener('click', () => this.deleteItem());

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
        this.itemCounter++;

        // Create list item element
        const listItem = this.createListItem(inputValue, this.itemCounter);

        // Add to DOM with animation
        this.itemList.appendChild(listItem);

        // Clear input and update display
        this.itemInput.value = '';
        this.updateDisplay();
        this.renumberItems();
        this.validateInput();

        // Show success message
        this.showMessage(`"${inputValue}" added to the list!`, 'success');

        // Focus back to input
        this.itemInput.focus();
    }

    deleteItem() {
        if (this.items.length === 0) {
            this.showMessage('No items to delete!', 'warning');
            return;
        }

        const inputValue = this.itemInput.value.trim();
        let itemToDelete;
        let itemIndex = -1;
        let listItemToRemove;

        if (inputValue === '') {
            // Echo mode: Delete the last item
            itemToDelete = this.items.pop();
            listItemToRemove = this.itemList.lastElementChild;
            this.showMessage(`"${itemToDelete}" removed from the list!`, 'success');
        } else {
            // Specific item mode: Delete the specified item if it exists
            itemIndex = this.items.indexOf(inputValue);
            if (itemIndex !== -1) {
                itemToDelete = this.items.splice(itemIndex, 1)[0];
                // Find the corresponding DOM element
                const listItems = this.itemList.children;
                for (let i = 0; i < listItems.length; i++) {
                    const itemText = listItems[i].querySelector('.item-text').textContent;
                    if (itemText === itemToDelete) {
                        listItemToRemove = listItems[i];
                        break;
                    }
                }
                this.showMessage(`"${itemToDelete}" removed from the list!`, 'success');
                // Clear the input after successful deletion
                this.itemInput.value = '';
            } else {
                this.showMessage(`"${inputValue}" not found in the list!`, 'warning');
                return;
            }
        }

        // Add visual feedback and removing animation
        if (listItemToRemove) {
            
            listItemToRemove.classList.add('deleting');
            
            // After a brief moment, start the removal animation
            setTimeout(() => {
                listItemToRemove.classList.remove('deleting');
                listItemToRemove.classList.add('removing');
                
                // Remove from DOM after animation
                setTimeout(() => {
                    if (listItemToRemove.parentNode) {
                        listItemToRemove.remove();
                        // Renumber items after DOM removal
                        this.renumberItems();
                    }
                }, 300);
            }, 200);
        }

        // Update display
        this.updateDisplay();
        this.validateInput();
    }

    createListItem(text, number) {
        const li = document.createElement('li');
        li.className = 'list-item';
        li.innerHTML = `
            <span class="item-number">${number}</span>
            <span class="item-text">${this.escapeHtml(text)}</span>
        `;
        return li;
    }

    updateDisplay() {
        // Update item count
        this.itemCount.textContent = this.items.length;

        // Update button states
        this.deleteBtn.disabled = this.items.length === 0;

        // Update list header
        const listHeader = document.querySelector('.list-header h2');
        if (this.items.length === 0) {
            listHeader.textContent = 'Your List';
        } else if (this.items.length === 1) {
            listHeader.textContent = 'Your List (1 item)';
        } else {
            listHeader.textContent = `Your List (${this.items.length} items)`;
        }
    }

    renumberItems() {
        // Renumber all remaining items sequentially starting from 1
        const listItems = this.itemList.children;
        for (let i = 0; i < listItems.length; i++) {
            const itemNumber = listItems[i].querySelector('.item-number');
            if (itemNumber) {
                itemNumber.textContent = i + 1;
            }
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
            this.itemInput.style.borderColor = '#e9ecef';
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
                messageDiv.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
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
        this.itemList.innerHTML = '';
        this.updateDisplay();
        this.renumberItems();
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

// Initialize the list manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const listManager = new ListManager();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to add item
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            listManager.addItem();
        }
        
        // Ctrl/Cmd + Delete to delete item
        if ((e.ctrlKey || e.metaKey) && e.key === 'Delete') {
            e.preventDefault();
            listManager.deleteItem();
        }
    });

    // Add some demo functionality
    console.log('Dynamic List Manager initialized!');
    console.log('Keyboard shortcuts:');
    console.log('- Enter: Add item');
    console.log('- Ctrl/Cmd + Enter: Add item');
    console.log('- Ctrl/Cmd + Delete: Delete last item');
});
