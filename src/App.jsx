import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import CurrentWeather from './components/CurrentWeather';
import ForecastCard from './components/ForecastCard';
import HealthCard from './components/HealthCard';
import ErrorBoundary from './components/ErrorBoundary';
import { useGeolocation } from './hooks/useGeolocation';
import { fetchWeather as fetchWeatherFromService, fetchForecast } from './services/weatherApi';
import video from './assets/weather.mp4';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);
  const { location, error: geoError, loading: geoLoading } = useGeolocation();

  // Fetch weather by coordinates 
  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError('');
    try {
      const weatherData = await fetchWeatherFromService({ lat, lon });
      const forecastData = await fetchForecast({ lat, lon });
      
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError('An error occurred while fetching the weather data. Please try again later.');
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch weather by city name
  const fetchWeather = async (city) => {
    setLoading(true);
    setError('');
    try {
      const weatherData = await fetchWeatherFromService(city);
      const forecastData = await fetchForecast(city);
      
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('City not found. Please try again with a valid city name !');
      } else {
        setError('An error occurred while fetching the weather data. Please try again later.');
      }
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch weather when geolocation is obtained
  useEffect(() => {
    if (location && !weather) {
      fetchWeatherByCoords(location.latitude, location.longitude);
    }
  }, [location]);

  const convertTemp = (celsius) => {
    return isCelsius ? Math.round(celsius) : Math.round((celsius * 9 / 5) + 32);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center relative overflow-hidden py-12 px-4 transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gray-900' 
        : 'bg-purple-300'
    }`}>
      <video 
        className='absolute top-0 left-0 w-full h-full object-cover' 
        autoPlay 
        loop 
        muted
        playsInline
      >
        <source src={video} type="video/mp4" />
        Your Browser does not support the video tag.
      </video>
      
      <div className={`absolute top-0 left-0 w-full h-full ${isDarkMode ? 'bg-black/40' : 'bg-black/20'}`}></div>

      {/* Dark Mode Toggle Button */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`absolute top-6 right-6 z-20 p-2 rounded-lg transition hover:scale-110 flex items-center justify-center ${
          isDarkMode
            ? 'text-yellow-300'
            : 'text-yellow-400'
        }`}
        title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
      >
        {isDarkMode ? (
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>

      <div className='relative z-10 w-full'>
        {/* Header Section */}
        <div className={`${isDarkMode ? 'bg-gray-800/80' : 'bg-purple-400/80'} text-white rounded-lg p-6 sm:p-8 mb-6 sm:mb-8 shadow-lg max-w-md mx-auto transition-all duration-300`}>
          <h1 className='text-3xl sm:text-4xl font-bold text-white text-center mb-6 sm:mb-7'>Weather App</h1>
          <SearchBar fetchWeather={fetchWeather} isDarkMode={isDarkMode} />
          {geoLoading && <p className='text-center mt-4 text-xs sm:text-sm font-semibold'>📍 Detecting your location...</p>}
          {geoError && <p className='text-center mt-4 text-xs sm:text-sm font-semibold text-yellow-300'>⚠️ {geoError}</p>}
          {loading && <p className='text-center mt-4 text-base sm:text-lg font-semibold'>Loading...</p>}
          {error && <p className='text-center mt-4 text-base sm:text-lg font-semibold text-red-300'>{error}</p>}
        </div>

        {/* Weather Data Section */}
        {weather && (
          <>
            {/* Current Weather and Weather Card - Responsive Grid */}
            <div className='w-full max-w-7xl mx-auto mb-6 sm:mb-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 px-2 sm:px-0'>
              {/* Left Column - Current Weather */}
              <div>
                <CurrentWeather weather={weather} isDarkMode={isDarkMode} isCelsius={isCelsius} convertTemp={convertTemp} setIsCelsius={setIsCelsius} />
              </div>

              {/* Right Column - Weather Details */}
              <div>
                <WeatherCard weather={weather} isDarkMode={isDarkMode} isCelsius={isCelsius} convertTemp={convertTemp} setIsCelsius={setIsCelsius} />
              </div>
            </div>

            {/* Forecast Card - Full Width */}
            {forecast && (
              <div className='w-full max-w-7xl mx-auto mb-6 sm:mb-8 px-2 sm:px-0'>
                <ErrorBoundary>
                  <ForecastCard forecast={forecast} isDarkMode={isDarkMode} isCelsius={isCelsius} convertTemp={convertTemp} />
                </ErrorBoundary>
              </div>
            )}

            {/* Health Card - Full Width */}
            <div className='w-full max-w-7xl mx-auto mb-6 sm:mb-8 px-2 sm:px-0'>
              <HealthCard weather={weather} isDarkMode={isDarkMode} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App
