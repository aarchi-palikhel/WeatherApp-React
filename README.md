# Weather App - React

A modern, responsive weather application built with React and Vite. Get real-time weather data and 5-day forecasts with a beautiful dark/light mode interface.

## Live Demo
🌐 https://weatherapp-aarchi.netlify.app/

## Features

- 🌍 **Current Weather Display** - Real-time temperature, humidity, wind speed, and weather conditions
- 📍 **Geolocation Support** - Automatically fetch weather for your current location
- 🔍 **City Search** - Search weather by city name
- 📅 **5-Day Forecast** - View upcoming weather predictions
- 🌓 **Dark/Light Mode** - Toggle between dark and light themes
- 🌡️ **Temperature Units** - Switch between Celsius and Fahrenheit
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

- **React** - UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **OpenWeather API** - Real-time weather data
- **Geolocation API** - User location detection

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

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

3. Create a `.env` file in the root directory and add your OpenWeather API key:
```
VITE_API_KEY=your_api_key_here
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
│   ├── CurrentWeather.jsx    # Current weather display
│   ├── ForecastCard.jsx      # 5-day forecast
│   ├── SearchBar.jsx         # City search input
│   └── WeatherCard.jsx       # Weather card component
├── hooks/
│   └── useGeolocation.js     # Custom geolocation hook
├── App.jsx                   # Main app component
├── index.css                 # Global styles
└── main.jsx                  # Entry point
```

## Usage

1. **Auto-detect location** - Grant permission to use your device location
2. **Search by city** - Use the search bar to find weather for any city
3. **Toggle theme** - Click the theme button to switch between dark/light modes
4. **Convert temperature** - Click the temperature unit button (°C/°F) to convert

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint


## Credits

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)
- Background video - https://pixabay.com/videos/rocky-rocks-beach-marine-waves-29830/
- Core concept learned from - https://www.youtube.com/@WebDevBey
