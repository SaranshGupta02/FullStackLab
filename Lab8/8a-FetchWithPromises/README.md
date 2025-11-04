# Lab 8a - Fetch API with Promises

This project demonstrates how to use the Fetch API in React with **Promises** (`.then()` and `.catch()`) to fetch data from external APIs.

## Features

- **Fetch API with Promises**: Uses `.then()` and `.catch()` for handling asynchronous operations
- **JSONPlaceholder API**: Fetches and displays posts in a table
- **OpenWeather API**: Fetches and displays weather data for any city
- **Loading States**: Shows loading indicators while data is being fetched
- **Error Handling**: Displays error messages when API calls fail
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

### Promise-based Fetch (`.then()` / `.catch()`)

```javascript
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Handle data
  })
  .catch(error => {
    // Handle error
  });
```

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
