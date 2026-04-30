import axios from 'axios';

const API_BASE_URL = import.meta.env.DEV 
  ? 'http://localhost:8888'   
  : '';  // Empty for relative URLs (Netlify)

const createUrl = (endpoint, cityOrCoords) => {
  let url = `${API_BASE_URL}/.netlify/functions/${endpoint}`;
  
  if (typeof cityOrCoords === 'string') {
    url += `?city=${encodeURIComponent(cityOrCoords)}`;
  } else if (cityOrCoords && cityOrCoords.lat && cityOrCoords.lon) {
    url += `?lat=${cityOrCoords.lat}&lon=${cityOrCoords.lon}`;
  } else {
    throw new Error('Invalid input: must be city name or {lat, lon}');
  }
  
  return url;
};

export const fetchWeather = async (cityOrCoords) => {
  try {
    const url = createUrl('weather', cityOrCoords);
    console.log('Fetching weather from:', url);
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather:', error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch weather data');
  }
};

export const fetchForecast = async (cityOrCoords) => {
  try {
    const url = createUrl('forecast', cityOrCoords);
    console.log('Fetching forecast from:', url);
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast:', error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch forecast data');
  }
};