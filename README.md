# Weather App - React

A modern, fully responsive weather application built with **React** and **Vite**. Get real-time weather data, 5-day forecasts with hourly breakdowns, UV index, and air quality information. Features dark/light mode toggle, temperature unit conversion (°C/°F), and geolocation support.

## Live Demo
🌐 https://weatherapp-aarchi.netlify.app/

## Features

- 🌍 **Current Weather Display** - Real-time temperature, humidity, wind speed, and weather conditions
- 📍 **Geolocation Support** - Automatically fetch weather for your current location
- 🔍 **City Search** - Search weather by city name
- 📅 **5-Day Forecast** - View upcoming weather predictions with clickable daily cards
- ⏰ **Hourly Detailed Breakdown** - View hourly weather updates for each day with:
  - Temperature and "feels like" temperature
  - Humidity percentage
  - Wind speed
  - Cloud coverage
- ☀️ **UV Index** - Real-time UV index levels with sun protection recommendations
- 💨 **Air Quality Index (AQI)** - Monitor air quality with pollutant breakdown (PM2.5, PM10, O₃, NO₂)
- 🌓 **Dark/Light Mode** - Toggle between dark and light themes for comfortable viewing
- 🌡️ **Temperature Units** - Switch between Celsius and Fahrenheit
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- ⚡ **Optimized Performance** - Compressed background video for fast loading

## Tech Stack

- **React 18** - UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS 4** - Utility-first styling
- **OpenWeather API** - Real-time weather, forecast, UV index, and air quality data
- **Geolocation API** - User location detection
- **Netlify Functions** - Serverless backend for API calls
- **Error Boundaries** - React error handling for stability
- **Axios** - HTTP client for API requests

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/aarchi-palikhel/WeatherApp-React.git
cd WeatherApp-React
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your OpenWeather API key:
```
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

Get your free API key at [OpenWeatherMap](https://openweathermap.org/api)

4. Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── App.jsx                 # Main app component
│   ├── CurrentWeather.jsx      # Current weather display with unit conversion
│   ├── ForecastCard.jsx        # 5-day forecast with navigation to hourly breakdown
│   ├── HourlyBreakdown.jsx     # 12-hour detailed weather breakdown
│   ├── HealthCard.jsx          # UV index and air quality information
│   ├── SearchBar.jsx           # City search input
│   ├── WeatherCard.jsx         # Additional weather details
│   └── ErrorBoundary.jsx       # React error boundary component
├── hooks/
│   └── useGeolocation.js       # Custom geolocation hook
├── services/
│   └── weatherApi.js           # Weather API service
├── assets/
│   └── weather-optimized.mp4   # Optimized background video
├── index.css                   # Global styles
└── main.jsx                    # Entry point

netlify/
└── functions/
    ├── weather.js              # Weather + UV + AQI API function
    └── forecast.js             # 5-day forecast API function
```

## Usage

1. **Auto-detect location** - Grant permission to use your device location for immediate weather data
2. **Search by city** - Use the search bar to find weather for any city worldwide
3. **View hourly forecast** - Click on any day in the 5-day forecast to see 12-hour detailed breakdown
4. **Toggle theme** - Click the sun/moon icon to switch between dark/light modes
5. **Convert temperature** - Click the °C/°F button to toggle temperature units
6. **Check health data** - View UV index levels and air quality information in the Health & Environment card


## Deployment

This project is deployed on **Netlify** with automatic deployments from the main branch.

## Performance Optimizations

- ✅ Compressed background video (~2-3MB) for fast loading
- ✅ Responsive grid layouts for all screen sizes
- ✅ Error boundaries for graceful error handling
- ✅ Lazy loading for hourly forecast data
- ✅ Optimized API calls with fallback values

## API Reference

### OpenWeatherMap Endpoints Used

- **Current Weather** - `/data/2.5/weather`
- **5-Day Forecast** - `/data/2.5/forecast`
- **UV Index** - `/data/2.5/uvi`
- **Air Quality** - `/data/2.5/air_pollution`
- **Geocoding** - `/geo/1.0/direct`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- [ ] Weather alerts and notifications
- [ ] Saved favorite locations
- [ ] Historical weather data
- [ ] Weather comparison between cities
- [ ] Sunrise/sunset times
- [ ] Precipitation probability


## Credits

- **Weather Data** - [OpenWeatherMap](https://openweathermap.org/)
- **Frontend Framework** - [React](https://react.dev/)
- **Build Tool** - [Vite](https://vitejs.dev/)
- **Styling** - [Tailwind CSS](https://tailwindcss.com/)
- **Background Video** - [Pixabay](https://pixabay.com/videos/rocky-rocks-beach-marine-waves-29830/)
- **Hosting** - [Netlify](https://netlify.com/)
- **Core Concept** - Inspired by [WebDevBey](https://www.youtube.com/@WebDevBey)

## Contact & Support

For issues, suggestions, or contributions, please open an issue on [GitHub](https://github.com/aarchi-palikhel/WeatherApp-React/issues).

---
