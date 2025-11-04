# Ordered List App (Assignment 4.c)

An extended version of the Item List App that displays items in an ordered list with user-defined ordering capabilities.

## Features

- Input box to enter items
- "Add Item" button to add items to the list
- "Show Items" button to toggle display of all items
- Items displayed in an ordered list (numbered)
- Multiple sorting options:
  - Original Order (as added)
  - A-Z (alphabetical ascending)
  - Z-A (alphabetical descending)
- Manual reordering controls (up/down arrows) when in original order
- Delete individual items
- Clear All button to remove all items
- Item count display
- Enter key support for adding items
- Modern, responsive UI

## How to Run

1. Navigate to the `4c-OrderedListApp` directory
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

## Usage

1. Type an item in the input field
2. Click "Add Item" or press Enter to add the item to the list
3. Click "Show Items" to display all stored items
4. Use the "Sort Order" dropdown to choose how items are ordered:
   - **Original Order**: Items appear in the order they were added
   - **A-Z**: Items sorted alphabetically (ascending)
   - **Z-A**: Items sorted alphabetically (descending)
5. When in "Original Order", you can:
   - Use ↑ and ↓ buttons to manually reorder items
   - Use × button to delete individual items
6. Click "Clear All" to remove all items from the list

## Technologies Used

- React 18.2.0
- JSX
- CSS3
- React Hooks (useState)
