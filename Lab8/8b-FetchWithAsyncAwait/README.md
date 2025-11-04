# Lab 8b - Fetch API with Async/Await

This project demonstrates how to use the Fetch API in React with **async/await** syntax to fetch data from external APIs.

## Features

- **Fetch API with Async/Await**: Uses `async/await` for cleaner asynchronous code
- **JSONPlaceholder API**: Fetches and displays posts in a table
- **OpenWeather API**: Fetches and displays weather data for any city
- **Loading States**: Shows loading indicators while data is being fetched
- **Error Handling**: Displays error messages when API calls fail (using try/catch)
- **Table Display**: Data is displayed in structured, responsive tables

## APIs Used

1. **JSONPlaceholder** - https://jsonplaceholder.typicode.com/posts
   - No API key required
   - Fetches sample blog posts

2. **OpenWeather** - https://api.openweathermap.org/data/2.5/weather
   - Requires API key (free from openweathermap.org)
   - Fetches current weather data

## Installation

```bash
npm install
```

## Running the Application

```bash
npm start
```

The application will open at `http://localhost:3000`

## Setup for OpenWeather API

1. Visit https://openweathermap.org/api
2. Sign up for a free account
3. Get your API key from the dashboard
4. Replace `'YOUR_API_KEY'` in `src/App.jsx` with your actual API key

## Implementation Details

### Async/Await Fetch

```javascript
const fetchData = async () => {
  try {
    const response = await fetch('https://api.example.com/data');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    // Handle data
  } catch (error) {
    // Handle error
  }
};
```

### Advantages of Async/Await

- Cleaner, more readable code
- Easier error handling with try/catch
- Sequential code flow (easier to understand)
- Better debugging experience

### State Management

- Loading states for each API call
- Error states for proper error handling
- Data states for storing fetched information

## Table Structure

### JSONPlaceholder Posts Table
- ID
- User ID
- Title
- Body

### OpenWeather Table
- City
- Country
- Temperature (°C)
- Feels Like (°C)
- Description (with weather icon)
- Humidity (%)
- Wind Speed (m/s)
- Pressure (hPa)
