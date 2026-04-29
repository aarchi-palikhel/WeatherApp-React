import axios from 'axios';

const API_BASE_URL = import.meta.env.DEV 
  ? 'http://localhost:8888'   
  : '';  // Empty for relative URLs (Netlify)

export const fetchWeather = async (cityOrCoords) => {
  try {
    let url = `${API_BASE_URL}/.netlify/functions/weather`;
    
    if (typeof cityOrCoords === 'string') {
      // City name
      url += `?city=${encodeURIComponent(cityOrCoords)}`;
    } else if (cityOrCoords && cityOrCoords.lat && cityOrCoords.lon) {
      // Coordinates
      url += `?lat=${cityOrCoords.lat}&lon=${cityOrCoords.lon}`;
    } else {
      throw new Error('Invalid input: must be city name or {lat, lon}');
    }
    
    console.log('Fetching weather from:', url);
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
};

export const fetchForecast = async (cityOrCoords) => {
  try {
    let url = `${API_BASE_URL}/.netlify/functions/forecast`;
    
    if (typeof cityOrCoords === 'string') {
      // City name
      url += `?city=${encodeURIComponent(cityOrCoords)}`;
    } else if (cityOrCoords && cityOrCoords.lat && cityOrCoords.lon) {
      // Coordinates
      url += `?lat=${cityOrCoords.lat}&lon=${cityOrCoords.lon}`;
    } else {
      throw new Error('Invalid input: must be city name or {lat, lon}');
    }
    
    console.log('Fetching forecast from:', url);
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};