import React, { useState } from 'react';
import './App.css';

function App() {
  const [counter, setCounter] = useState(0);
  const [initialValue, setInitialValue] = useState('');

  const handleSetInitialValue = () => {
    const value = parseInt(initialValue);
    if (!isNaN(value)) {
      setCounter(value);
      setInitialValue('');
    }
  };

  const handleIncrement = () => {
    setCounter(prevCounter => prevCounter + 1);
  };

  const handleReset = () => {
    setCounter(0);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Button Click Counter</h1>
        
        <div className="counter-container">
          <div className="counter-display">
            <h2>Counter: {counter}</h2>
          </div>
          
          <div className="input-section">
            <label htmlFor="initialValue">Set Initial Value:</label>
            <input
              id="initialValue"
              type="number"
              value={initialValue}
              onChange={(e) => setInitialValue(e.target.value)}
              placeholder="Enter initial value"
            />
            <button onClick={handleSetInitialValue}>
              Set Initial Value
            </button>
          </div>
          
          <div className="button-section">
            <button className="increment-btn" onClick={handleIncrement}>
              Click Me! (+1)
            </button>
            <button className="reset-btn" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
