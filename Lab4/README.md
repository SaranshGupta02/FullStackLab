# Lab 4 - React Applications

This directory contains three React applications as part of Lab 4 assignments.

## Applications

### 4.a) Counter App (`4a-CounterApp/`)
A React application that implements a button click counter with an input box to set the initial counter value.

**Features:**
- Input box to set initial counter value
- Button that increments counter by 1 on each click
- Reset functionality
- Modern UI with hover effects

### 4.b) Item List App (`4b-ItemListApp/`)
A web page containing an input box and two buttons: "Add Item" and "Show Items". Items are stored in a list and displayed in an unordered list.

**Features:**
- Add items to a list
- Show/hide items functionality
- Items displayed in unordered list
- Clear all items functionality
- Enter key support

### 4.c) Ordered List App (`4c-OrderedListApp/`)
An extended version of 4.b that displays items in an ordered list with user-defined ordering capabilities.

**Features:**
- All features from 4.b
- Items displayed in ordered list (numbered)
- Multiple sorting options (Original, A-Z, Z-A)
- Manual reordering controls
- Individual item deletion
- Enhanced user experience

## Getting Started

Each application is a standalone React project. To run any of them:

1. Navigate to the specific application directory (e.g., `4a-CounterApp/`)
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view the application

## Technologies Used

- **React 18.2.0** - Frontend framework
- **JSX** - JavaScript XML syntax for React components
- **CSS3** - Styling with modern CSS features
- **React Hooks** - useState for state management
- **npm** - Package management

## File Structure

```
Lab4/
├── 4a-CounterApp/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── README.md
├── 4b-ItemListApp/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── README.md
├── 4c-OrderedListApp/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── README.md
└── README.md (this file)
```

## Notes

- All applications use JSX files as requested
- Each application is self-contained with its own dependencies
- Modern React patterns and hooks are used throughout
- Responsive design ensures compatibility across devices
- Clean, maintainable code structure
