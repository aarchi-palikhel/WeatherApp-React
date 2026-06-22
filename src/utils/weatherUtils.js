/**
 * Returns a human-readable explanation for why "feels like" differs from actual temp.
 * Based on the dominant meteorological factor.
 *
 * @param {number} tempC        - Actual temperature in Celsius
 * @param {number} feelsLikeC   - Feels like temperature in Celsius
 * @param {number} humidity     - Humidity percentage (0–100)
 * @param {number} windSpeed    - Wind speed in m/s
 * @returns {string}
 */
export const getFeelsLikeReason = (tempC, feelsLikeC, humidity, windSpeed) => {
  const diff = feelsLikeC - tempC;

  // Cold + wind → wind chill
  if (tempC < 10 && windSpeed > 3) {
    return 'Wind chill is making it feel colder than it is.';
  }
  // Hot + humid → heat index
  if (tempC >= 27 && humidity > 60) {
    return 'High humidity is trapping heat, making it feel hotter.';
  }
  // Warm + dry + wind → feels cooler
  if (tempC >= 20 && windSpeed > 5 && humidity < 40) {
    return 'Dry breeze is cooling things down a bit.';
  }
  // Generic warmer
  if (diff > 2) return 'Humidity is adding to the warmth.';
  // Generic cooler
  if (diff < -2) return 'Wind is drawing heat away from your body.';

  return 'Conditions closely match the actual temperature.';
};

/**
 * Returns a Tailwind overlay gradient class based on the OWM weather condition code.
 * Used to tint the background depending on current conditions.
 *
 * @param {number} conditionCode  - OWM weather condition code
 * @param {boolean} isDarkMode
 * @returns {string} Tailwind class string
 */
export const getWeatherTint = (conditionCode, isDarkMode) => {
  if (isDarkMode) return 'bg-black/50'; // dark mode keeps its own overlay

  // Thunderstorm
  if (conditionCode >= 200 && conditionCode < 300)
    return 'bg-linear-to-br from-slate-700/40 to-purple-900/50';
  // Drizzle / Rain
  if (conditionCode >= 300 && conditionCode < 600)
    return 'bg-linear-to-br from-blue-400/30 to-slate-500/40';
  // Snow
  if (conditionCode >= 600 && conditionCode < 700)
    return 'bg-linear-to-br from-blue-100/40 to-slate-200/40';
  // Atmosphere (fog, haze, mist)
  if (conditionCode >= 700 && conditionCode < 800)
    return 'bg-linear-to-br from-gray-400/40 to-slate-400/40';
  // Clear sky
  if (conditionCode === 800)
    return 'bg-linear-to-br from-amber-300/20 to-sky-400/20';
  // Partly cloudy (801–802)
  if (conditionCode <= 802)
    return 'bg-linear-to-br from-sky-300/25 to-slate-300/30';
  // Overcast (803–804)
  return 'bg-linear-to-br from-slate-400/35 to-gray-500/35';
};

/**
 * Returns the local time string for a city given its UTC offset in seconds.
 *
 * @param {number} timezoneOffset  - UTC offset in seconds (from OWM `weather.timezone`)
 * @returns {string}  e.g. "03:45 PM"
 */
export const getCityLocalTime = (timezoneOffset) => {
  const nowUtcMs = Date.now();
  const cityMs = nowUtcMs + timezoneOffset * 1000;
  return new Date(cityMs).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC', // we already shifted manually
  });
};
