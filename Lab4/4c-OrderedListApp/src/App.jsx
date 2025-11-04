import React, { useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showItems, setShowItems] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc', 'desc', 'original'

  const handleAddItem = () => {
    if (inputValue.trim() !== '') {
      const newItem = {
        id: Date.now(),
        text: inputValue.trim(),
        timestamp: new Date()
      };
      setItems(prevItems => [...prevItems, newItem]);
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

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const getSortedItems = () => {
    switch (sortOrder) {
      case 'asc':
        return [...items].sort((a, b) => a.text.localeCompare(b.text));
      case 'desc':
        return [...items].sort((a, b) => b.text.localeCompare(a.text));
      case 'original':
        return items;
      default:
        return items;
    }
  };

  const handleMoveUp = (id) => {
    setItems(prevItems => {
      const newItems = [...prevItems];
      const index = newItems.findIndex(item => item.id === id);
      if (index > 0) {
        [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
      }
      return newItems;
    });
  };

  const handleMoveDown = (id) => {
    setItems(prevItems => {
      const newItems = [...prevItems];
      const index = newItems.findIndex(item => item.id === id);
      if (index < newItems.length - 1) {
        [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
      }
      return newItems;
    });
  };

  const handleDeleteItem = (id) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ordered List Manager</h1>
        
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
          
          {showItems && (
            <div className="sort-section">
              <label htmlFor="sortOrder">Sort Order:</label>
              <select 
                id="sortOrder" 
                value={sortOrder} 
                onChange={handleSortOrderChange}
                className="sort-select"
              >
                <option value="original">Original Order</option>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
              </select>
            </div>
          )}
          
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
                  <ol className="items-list">
                    {getSortedItems().map((item, index) => (
                      <li key={item.id} className="item">
                        <span className="item-text">{item.text}</span>
                        {sortOrder === 'original' && (
                          <div className="item-controls">
                            <button 
                              className="move-btn up-btn" 
                              onClick={() => handleMoveUp(item.id)}
                              disabled={index === 0}
                            >
                              ↑
                            </button>
                            <button 
                              className="move-btn down-btn" 
                              onClick={() => handleMoveDown(item.id)}
                              disabled={index === items.length - 1}
                            >
                              ↓
                            </button>
                            <button 
                              className="delete-btn" 
                              onClick={() => handleDeleteItem(item.id)}
                            >
                              ×
                            </button>
                          </div>
                        )}
                      </li>
                    ))}
                  </ol>
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
