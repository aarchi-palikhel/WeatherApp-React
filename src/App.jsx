import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import CurrentWeather from './components/CurrentWeather';
import ForecastCard from './components/ForecastCard';
import HealthCard from './components/HealthCard';
import ErrorBoundary from './components/ErrorBoundary';
import CityChips from './components/CityChips';
import { useGeolocation } from './hooks/useGeolocation';
import { useFavorites } from './hooks/useFavorites';
import { useSearchHistory } from './hooks/useSearchHistory';
import { useTypewriter } from './hooks/useTypewriter';
import { fetchWeather as fetchWeatherFromService, fetchForecast } from './services/weatherApi';
import { getWeatherTint } from './utils/weatherUtils';
import video from './assets/weather.mp4';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);

  const { location, error: geoError, loading: geoLoading } = useGeolocation();
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { history, addToHistory, clearHistory } = useSearchHistory();
  const [typedTitle, typedSubtitle] = useTypewriter(['Weather App', 'Your daily sky companion'], 65, 250);

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError('');
    try {
      const weatherData = await fetchWeatherFromService({ lat, lon });
      const forecastData = await fetchForecast({ lat, lon });
      setWeather(weatherData);
      setForecast(forecastData);
    } catch {
      setError('An error occurred while fetching the weather data. Please try again later.');
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeather = async (city) => {
    setLoading(true);
    setError('');
    try {
      const weatherData = await fetchWeatherFromService(city);
      const forecastData = await fetchForecast(city);
      setWeather(weatherData);
      setForecast(forecastData);
      // Save to history on successful fetch
      addToHistory(city.trim());
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('City not found. Please try again with a valid city name!');
      } else {
        setError('An error occurred while fetching the weather data. Please try again later.');
      }
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location && !weather) {
      fetchWeatherByCoords(location.latitude, location.longitude);
    }
  }, [location]);

  const convertTemp = (celsius) =>
    isCelsius ? Math.round(celsius) : Math.round((celsius * 9 / 5) + 32);

  // The city name from the current weather result
  const currentCity = weather?.name || null;
  const toggleFavorite = () => {
    if (!currentCity) return;
    isFavorite(currentCity) ? removeFavorite(currentCity) : addFavorite(currentCity);
  };

  // Dynamic overlay tint based on weather condition
  const conditionCode = weather?.weather?.[0]?.id;
  const overlayClass = conditionCode
    ? getWeatherTint(conditionCode, isDarkMode)
    : isDarkMode ? 'bg-black/50' : 'bg-black/10';

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center relative overflow-hidden py-12 px-4 transition-all duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-linear-to-br from-pink-300 via-purple-300 to-fuchsia-400'
    }`}>
      {/* Background video */}
      <video className='absolute top-0 left-0 w-full h-full object-cover' autoPlay loop muted playsInline>
        <source src={video} type="video/mp4" />
      </video>

      {/* Overlay — weather-condition tinted */}
      <div className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ${overlayClass}`} />

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`absolute top-4 right-4 sm:top-6 sm:right-6 z-20 p-1 transition hover:scale-110 flex items-center justify-center ${
          isDarkMode ? 'text-yellow-300' : 'text-gray-800'
        }`}
        title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {isDarkMode ? (
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
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
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>

      <div className='relative z-10 w-full'>
        {/* Header Section */}
        <div className={`backdrop-blur-md rounded-3xl p-6 sm:p-8 mb-6 sm:mb-8 shadow-2xl max-w-lg mx-auto transition-all duration-300 border ${
          isDarkMode
            ? 'bg-gray-800/70 border-gray-600/50'
            : 'bg-white/60 border-white/60 shadow-pink-300/30'
        }`}>
          <div className="text-center mb-1 text-xl select-none">🌸</div>

          <h1 className={`text-3xl sm:text-4xl font-extrabold text-center mb-1 ${
            isDarkMode
              ? 'text-white'
              : 'bg-linear-to-r from-pink-600 via-fuchsia-600 to-purple-600 bg-clip-text text-transparent'
          }`}>
            {typedTitle}
            {/* cursor shown while title is still typing */}
            {typedTitle.length < 'Weather App'.length && (
              <span className="animate-blink">|</span>
            )}
          </h1>
          <p className={`text-center text-sm sm:text-base mb-5 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {typedSubtitle}
            {/* cursor shown while subtitle is typing */}
            {typedTitle.length === 'Weather App'.length && (
              <span className="animate-blink">|</span>
            )}
          </p>

          <SearchBar fetchWeather={fetchWeather} isDarkMode={isDarkMode} />

          {/* Favorites & History chips */}
          <CityChips
            isDarkMode={isDarkMode}
            favorites={favorites}
            history={history}
            onCityClick={fetchWeather}
            onRemoveFavorite={removeFavorite}
            onClearHistory={clearHistory}
          />

          {geoLoading && (
            <p className={`text-center mt-4 text-xs sm:text-sm font-semibold ${isDarkMode ? 'text-white/90' : 'text-gray-700'}`}>
              Detecting your location...
            </p>
          )}
          {geoError && (
            <p className='text-center mt-4 text-xs sm:text-sm font-semibold text-yellow-600'>{geoError}</p>
          )}
          {loading && (
            <p className={`text-center mt-4 text-base sm:text-lg font-semibold ${isDarkMode ? 'text-white/90' : 'text-gray-700'}`}>
              Loading...
            </p>
          )}
          {error && (
            <p className='text-center mt-4 text-base sm:text-lg font-semibold text-red-500'>{error}</p>
          )}
        </div>

        {/* Weather Data Section */}
        {weather && (
          <>
            {/* Favorite toggle for current city */}
            <div className='w-full max-w-7xl mx-auto px-2 sm:px-0 mb-3 flex items-center gap-2'>
              <button
                onClick={toggleFavorite}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold transition hover:scale-105 shadow ${
                  isFavorite(currentCity)
                    ? 'bg-fuchsia-500 text-white hover:bg-fuchsia-600'
                    : isDarkMode
                      ? 'bg-gray-700/80 text-gray-200 hover:bg-gray-600'
                      : 'bg-white/70 text-gray-700 hover:bg-white'
                }`}
                title={isFavorite(currentCity) ? `Remove ${currentCity} from favorites` : `Save ${currentCity} to favorites`}
              >
                <svg className="w-4 h-4" fill={isFavorite(currentCity) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                {isFavorite(currentCity) ? `Saved` : `Save ${currentCity}`}
              </button>
            </div>

            {/* Current Weather and Weather Card */}
            <div className='w-full max-w-7xl mx-auto mb-6 sm:mb-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 px-2 sm:px-0'>
              <CurrentWeather weather={weather} isDarkMode={isDarkMode} isCelsius={isCelsius} convertTemp={convertTemp} setIsCelsius={setIsCelsius} />
              <WeatherCard weather={weather} isDarkMode={isDarkMode} isCelsius={isCelsius} convertTemp={convertTemp} setIsCelsius={setIsCelsius} />
            </div>

            {/* Forecast Card */}
            {forecast && (
              <div className='w-full max-w-7xl mx-auto mb-6 sm:mb-8 px-2 sm:px-0'>
                <ErrorBoundary>
                  <ForecastCard forecast={forecast} isDarkMode={isDarkMode} isCelsius={isCelsius} convertTemp={convertTemp} />
                </ErrorBoundary>
              </div>
            )}

            {/* Health Card */}
            <div className='w-full max-w-7xl mx-auto mb-6 sm:mb-8 px-2 sm:px-0'>
              <HealthCard weather={weather} isDarkMode={isDarkMode} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
