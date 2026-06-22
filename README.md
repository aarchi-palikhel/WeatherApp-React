# Weather App — React 🌤️

A responsive weather application built with React and Vite. Get real-time weather, 5-day forecasts with hourly breakdowns, UV index, air quality data, saved cities, and search history — all wrapped in a glassmorphism UI with dark and light mode support.

## Live Demo

🔗 https://weatherapp-aarchi.netlify.app/

---

## Features

- **Current Weather** — Real-time temperature, humidity, wind speed, and conditions
- **Geolocation** — Auto-fetches weather for your current location on load
- **City Search** — Search any city worldwide
- **5-Day Forecast** — Clickable daily cards that expand into hourly breakdowns
- **Hourly Breakdown** — Temperature, feels like, humidity, wind, and cloud coverage per hour
- **UV Index** — Live UV levels with sun protection recommendations
- **Air Quality (AQI)** — Pollutant breakdown including PM2.5, PM10, O3, and NO2
- **Saved Cities ⭐** — Bookmark favorite cities with one click, persisted via localStorage
- **Search History** — Tracks recently searched cities, clearable anytime
- **Local Time Display** — Shows the current local time of the searched city based on its timezone
- **Sunrise / Sunset Countdown** — Live countdown to the next sunrise or sunset, ticking every 30 seconds
- **Feels Like Tooltip** — Hover the Feels Like tile for an explanation of why it differs from actual temperature
- **Weather-based Background Tint** — Overlay color shifts based on current conditions (clear, rain, storm, snow, fog)
- **Copy to Clipboard** — Copy a weather summary for the current city with one click
- **Dark / Light Mode** — Toggle with the sun/moon icon
- **Temperature Units** — Switch between Celsius and Fahrenheit
- **Typewriter Animation** — Title and subtitle animate in on page load
- **Responsive Design** — Works on mobile, tablet, and desktop

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI | React 18 |
| Build | Vite |
| Styling | Tailwind CSS 4 |
| Font | Butler (via CDN Fonts) |
| HTTP | Axios |
| Weather Data | OpenWeatherMap API |
| Serverless | Netlify Functions |
| Hosting | Netlify |

---

## Getting Started 🚀

### Prerequisites

- Node.js v14 or higher
- Netlify CLI (`npm install -g netlify-cli`)

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

3. Create a `.env` file in the root directory:
```
OPENWEATHER_API_KEY=your_api_key_here
```

Get a free API key at [openweathermap.org](https://openweathermap.org/api).

4. Start the development server:
```bash
netlify dev
```

> Use `netlify dev` instead of `npm run dev`. It starts both the Vite dev server and the Netlify Functions server together, which is required for the weather API calls to work locally.

The app runs at `http://localhost:8888`.

---

## Project Structure

```
src/
├── components/
│   ├── CurrentWeather.jsx      # Temperature, conditions, quick stats
│   ├── WeatherCard.jsx         # Extended weather details grid
│   ├── ForecastCard.jsx        # 5-day forecast with day selection
│   ├── HourlyBreakdown.jsx     # Per-hour weather detail view
│   ├── HealthCard.jsx          # UV index and AQI
│   ├── SearchBar.jsx           # City search input
│   ├── CityChips.jsx           # Saved cities and search history chips
│   └── ErrorBoundary.jsx       # React error boundary
├── hooks/
│   ├── useGeolocation.js       # Browser geolocation
│   ├── useFavorites.js         # Saved cities via localStorage
│   ├── useSearchHistory.js     # Recent searches via localStorage
│   ├── useTypewriter.js        # Sequential typewriter animation
│   └── useCountdown.js         # Live countdown to a unix timestamp
├── utils/
│   └── weatherUtils.js         # Feels like reason, weather tint, local time helpers
├── services/
│   └── weatherApi.js           # API call helpers
├── assets/
│   └── weather.mp4             # Background video
├── index.css                   # Global styles
└── main.jsx                    # Entry point

netlify/
└── functions/
    ├── weather.js              # Current weather + UV + AQI
    └── forecast.js             # 5-day forecast
```

---

## Usage

| Action | How |
|---|---|
| Auto-detect location | Allow location permission on load |
| Search a city | Type in the search bar and press Search |
| Save a city | Click the star button after loading weather |
| Quick-load a saved city | Click its chip under the search bar |
| View hourly forecast | Click any day in the 5-day forecast |
| Toggle dark / light mode | Click the sun or moon icon (top right) |
| Switch temperature units | Click the °C / °F button on the weather card |
| Clear search history | Click "Clear" next to Recent Searches |
| Copy weather summary | Click the clipboard icon on the current weather card |
| See feels like reason | Hover the Feels Like tile for an explanation |
| Check sunrise/sunset | Countdown shown live on each tile in Weather Details |

---

## Deployment

Deployed on Netlify with automatic deployments from the main branch. Netlify Functions handle all OpenWeatherMap API calls server-side, keeping the API key out of the client bundle.

---

## API Endpoints Used

- `GET /data/2.5/weather` — Current weather
- `GET /data/2.5/forecast` — 5-day / 3-hour forecast
- `GET /data/2.5/uvi` — UV index
- `GET /data/2.5/air_pollution` — Air quality
- `GET /geo/1.0/direct` — City geocoding

---

## Credits 🙏

- Weather data — [OpenWeatherMap](https://openweathermap.org/)
- Background video — [Pixabay](https://pixabay.com/videos/rocky-rocks-beach-marine-waves-29830/)
- Core concept — [WebDevBey](https://www.youtube.com/@WebDevBey)
- Hosting — [Netlify](https://netlify.com/)

---

For issues or suggestions, open an issue on [GitHub](https://github.com/aarchi-palikhel/WeatherApp-React/issues).
