import axios from 'axios';

const API_KEY = process.env.OPENWEATHER_API_KEY;

export default async (req, context) => {
  const url = new URL(req.url);
  const city = url.searchParams.get('city');
  const lat = url.searchParams.get('lat');
  const lon = url.searchParams.get('lon');

  if (!city && (!lat || !lon)) {
    return new Response(
      JSON.stringify({ error: 'City or latitude/longitude parameters are required' }),
      { status: 400, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
    );
  }

  try {
    let apiUrl;
    let coords = {};
    
    if (city) {
      // First get coordinates from city name
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`;
      const geoResponse = await axios.get(geoUrl);
      
      if (geoResponse.data.length === 0) {
        return new Response(
          JSON.stringify({ error: 'City not found' }),
          { status: 404, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
        );
      }
      
      coords = { lat: geoResponse.data[0].lat, lon: geoResponse.data[0].lon };
      apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    } else {
      coords = { lat, lon };
      apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    }

    // Fetch weather data
    const weatherResponse = await axios.get(apiUrl);
    
    // Fetch UV Index (with error handling)
    let uvData = null;
    try {
      const uvUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`;
      const uvResponse = await axios.get(uvUrl);
      uvData = uvResponse.data;
    } catch (uvError) {
      console.warn('UV Index fetch failed:', uvError.message);
      uvData = { value: 0, max_uvi: 0 };
    }
    
    // Fetch Air Quality Index (with error handling)
    let aqiData = null;
    try {
      const aqiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`;
      const aqiResponse = await axios.get(aqiUrl);
      aqiData = aqiResponse.data;
    } catch (aqiError) {
      console.warn('AQI fetch failed:', aqiError.message);
      aqiData = { list: [{ main: { aqi: 1 }, components: {} }] };
    }

    const responseData = {
      ...weatherResponse.data,
      uvi: uvData,
      aqi: aqiData
    };

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    });
  } catch (error) {
    console.error('Error:', error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: error.response?.status || 500, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        } 
      }
    );
  }
};