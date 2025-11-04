import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  // JSONPlaceholder data state
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState(null);

  // OpenWeather data state
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(null);
  const [city, setCity] = useState('London'); // Default city

  // Fetch JSONPlaceholder data using async/await
  const fetchPosts = async () => {
    setPostsLoading(true);
    setPostsError(null);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setPosts(data.slice(0, 10)); // Get first 10 posts
      setPostsLoading(false);
    } catch (error) {
      setPostsError(error.message);
      setPostsLoading(false);
      console.error('Error fetching posts:', error);
    }
  };

  // Fetch OpenWeather data using async/await
  const fetchWeather = async () => {
    setWeatherLoading(true);
    setWeatherError(null);

    try {
      // Replace 'YOUR_API_KEY' with your OpenWeather API key
      const API_KEY = 'YOUR_API_KEY'; // Get free API key from openweathermap.org
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setWeather(data);
      setWeatherLoading(false);
    } catch (error) {
      setWeatherError(error.message);
      setWeatherLoading(false);
      console.error('Error fetching weather:', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchPosts();
    fetchWeather();
  }, []);

  // Handle city search
  const handleCitySearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather();
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">Fetch API with Async/Await</h1>
        <p className="subtitle">Using async/await for API calls</p>

        {/* JSONPlaceholder Section */}
        <section className="api-section">
          <div className="section-header">
            <h2>JSONPlaceholder API</h2>
            <button onClick={fetchPosts} className="refresh-btn">
              Refresh Posts
            </button>
          </div>

          {postsLoading && <div className="loading">Loading posts...</div>}
          {postsError && (
            <div className="error">
              Error: {postsError}
            </div>
          )}

          {!postsLoading && !postsError && posts.length > 0 && (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User ID</th>
                    <th>Title</th>
                    <th>Body</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id}>
                      <td>{post.id}</td>
                      <td>{post.userId}</td>
                      <td className="title-cell">{post.title}</td>
                      <td className="body-cell">{post.body}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!postsLoading && !postsError && posts.length === 0 && (
            <div className="empty-state">No posts available</div>
          )}
        </section>

        {/* OpenWeather Section */}
        <section className="api-section">
          <div className="section-header">
            <h2>OpenWeather API</h2>
            <form onSubmit={handleCitySearch} className="search-form">
              <input
                type="text"
                className="city-input"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <button type="submit" className="search-btn">
                Search Weather
              </button>
            </form>
          </div>

          {weatherLoading && <div className="loading">Loading weather data...</div>}
          {weatherError && (
            <div className="error">
              Error: {weatherError}
              <p className="error-note">
                Note: Please replace 'YOUR_API_KEY' in App.jsx with your OpenWeather API key.
                Get a free key from <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer">openweathermap.org</a>
              </p>
            </div>
          )}

          {!weatherLoading && !weatherError && weather && (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>City</th>
                    <th>Country</th>
                    <th>Temperature (°C)</th>
                    <th>Feels Like (°C)</th>
                    <th>Description</th>
                    <th>Humidity (%)</th>
                    <th>Wind Speed (m/s)</th>
                    <th>Pressure (hPa)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{weather.name}</td>
                    <td>{weather.sys?.country}</td>
                    <td>{weather.main?.temp?.toFixed(1)}</td>
                    <td>{weather.main?.feels_like?.toFixed(1)}</td>
                    <td className="description-cell">
                      {weather.weather?.[0]?.description}
                      <img
                        src={`https://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}.png`}
                        alt={weather.weather?.[0]?.description}
                        className="weather-icon"
                      />
                    </td>
                    <td>{weather.main?.humidity}</td>
                    <td>{weather.wind?.speed}</td>
                    <td>{weather.main?.pressure}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {!weatherLoading && !weatherError && !weather && (
            <div className="empty-state">No weather data available</div>
          )}
        </section>
      </div>
    </div>
  );
};

export default App;
