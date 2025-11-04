# Lab 8 - Fetch API with React

This lab contains two implementations of fetching data from external APIs using React, demonstrating both **Promises** and **async/await** approaches.

## Projects

### Lab 8a - Fetch with Promises
- Location: `8a-FetchWithPromises/`
- Uses `.then()` and `.catch()` for handling asynchronous operations
- Traditional Promise-based approach

### Lab 8b - Fetch with Async/Await
- Location: `8b-FetchWithAsyncAwait/`
- Uses `async/await` with `try/catch` for error handling
- Modern, cleaner syntax for asynchronous code

## APIs Used

Both projects fetch data from:

1. **JSONPlaceholder API** - https://jsonplaceholder.typicode.com/posts
   - Free, no API key required
   - Returns sample blog posts

2. **OpenWeather API** - https://api.openweathermap.org/data/2.5/weather
   - Free API key required (get from openweathermap.org)
   - Returns current weather data for cities

## Features

✅ Fetch data from JSONPlaceholder API  
✅ Fetch data from OpenWeather API  
✅ Display data in responsive tables  
✅ Loading states while fetching  
✅ Error handling for failed requests  
✅ Refresh functionality for posts  
✅ City search for weather data  

## Running the Projects

### Lab 8a (Promises)
```bash
cd 8a-FetchWithPromises
npm install
npm start
```

### Lab 8b (Async/Await)
```bash
cd 8b-FetchWithAsyncAwait
npm install
npm start
```

Both applications will run on `http://localhost:3000`

## Setup for OpenWeather API

1. Visit https://openweathermap.org/api
2. Sign up for a free account
3. Navigate to your API keys section
4. Copy your API key
5. Replace `'YOUR_API_KEY'` in the `App.jsx` file with your actual key

## Key Differences

### Promises (.then/.catch)
```javascript
fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

**Pros:**
- Works in all JavaScript environments
- Good for chaining multiple operations

**Cons:**
- Can lead to callback hell with complex chains
- Less readable with multiple promises

### Async/Await
```javascript
const fetchData = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
```

**Pros:**
- Cleaner, more readable code
- Easier error handling
- Sequential flow that's easier to understand
- Better for complex async operations

**Cons:**
- Requires modern JavaScript support
- Can be slower if not used correctly (sequential vs parallel)

## Table Displays

### JSONPlaceholder Posts
- Displays 10 posts in a table
- Columns: ID, User ID, Title, Body
- Refresh button to reload data

### OpenWeather Data
- Displays current weather for a city
- Columns: City, Country, Temperature, Feels Like, Description, Humidity, Wind Speed, Pressure
- City search input with search button
- Weather icon displayed with description

## Error Handling

Both implementations handle:
- Network errors
- HTTP errors (404, 500, etc.)
- Invalid API keys
- Missing data
- Loading states during fetch operations
