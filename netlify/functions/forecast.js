import axios from 'axios';

const API_KEY = process.env.OPENWEATHER_API_KEY;

export default async (req, context) => {
  // Get query parameters from URL
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
    if (city) {
      apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    } else {
      apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    }

    console.log('Calling OpenWeatherMap:', apiUrl);
    const response = await axios.get(apiUrl);
    
    return new Response(JSON.stringify(response.data), {
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