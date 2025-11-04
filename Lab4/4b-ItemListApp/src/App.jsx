import React, { useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showItems, setShowItems] = useState(false);

  const handleAddItem = () => {
    if (inputValue.trim() !== '') {
      setItems(prevItems => [...prevItems, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleShowItems = () => {
    setShowItems(!showItems);
  };

  const handleClearItems = () => {
    setItems([]);
    setShowItems(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddItem();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Item List Manager</h1>
        
        <div className="container">
          <div className="input-section">
            <label htmlFor="itemInput">Enter Item:</label>
            <input
              id="itemInput"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type an item and press Enter or click Add Item"
            />
          </div>
          
          <div className="button-section">
            <button className="add-btn" onClick={handleAddItem}>
              Add Item
            </button>
            <button className="show-btn" onClick={handleShowItems}>
              {showItems ? 'Hide Items' : 'Show Items'}
            </button>
            <button className="clear-btn" onClick={handleClearItems}>
              Clear All
            </button>
          </div>
          
          <div className="items-section">
            <div className="items-count">
              Total Items: {items.length}
            </div>
            
            {showItems && (
              <div className="items-display">
                <h3>Items List:</h3>
                {items.length === 0 ? (
                  <p className="no-items">No items added yet!</p>
                ) : (
                  <ul className="items-list">
                    {items.map((item, index) => (
                      <li key={index} className="item">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
