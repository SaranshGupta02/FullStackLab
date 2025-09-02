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
      <div className="container">
        <h1>React Button Counter</h1>
        <p className="description">
          Set an initial counter value and click the button to increment it by 1.
        </p>

        <div className="counter-section">
          <div className="current-counter">
            <h2>Current Counter</h2>
            <div className="counter-display">
              {counter}
            </div>
          </div>

          <div className="initial-value-section">
            <h3>Set Initial Value</h3>
            <div className="input-group">
              <input
                type="number"
                value={initialValue}
                onChange={(e) => setInitialValue(e.target.value)}
                placeholder="Enter initial value"
                className="initial-input"
              />
              <button 
                onClick={handleSetInitialValue}
                className="set-button"
                disabled={!initialValue || isNaN(parseInt(initialValue))}
              >
                Set Value
              </button>
            </div>
          </div>

          <div className="button-section">
            <button 
              onClick={handleIncrement}
              className="increment-button"
            >
              Click Me! (+1)
            </button>
            <button 
              onClick={handleReset}
              className="reset-button"
            >
              Reset
            </button>
          </div>

          <div className="stats">
            <p>Total clicks: {counter}</p>
            <p>Last updated: {new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
