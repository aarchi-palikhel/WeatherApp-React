import React, { useState, useEffect } from 'react';
import { getFeelsLikeReason, getCityLocalTime } from '../utils/weatherUtils';

// Ticking local time — updates every 30s
const useLocalTime = (timezoneOffset) => {
  const [time, setTime] = useState(() => getCityLocalTime(timezoneOffset));
  useEffect(() => {
    setTime(getCityLocalTime(timezoneOffset));
    const id = setInterval(() => setTime(getCityLocalTime(timezoneOffset)), 30000);
    return () => clearInterval(id);
  }, [timezoneOffset]);
  return time;
};

// Copy-to-clipboard hook — returns [copied, triggerCopy]
const useCopy = () => {
  const [copied, setCopied] = useState(false);
  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silently fail if permissions denied
    }
  };
  return [copied, copy];
};

const CurrentWeather = ({ weather, isDarkMode, isCelsius, convertTemp, setIsCelsius }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [copied, copy] = useCopy();

  const localTime = useLocalTime(weather.timezone);

  const text = isDarkMode ? 'text-white' : 'text-gray-800';
  const subText = isDarkMode ? 'opacity-80' : 'text-gray-500';
  const innerBg = isDarkMode ? 'bg-white/5' : 'bg-pink-50/60';
  const tileBg = isDarkMode
    ? 'bg-gray-700/50 border-gray-600/50 hover:bg-gray-600/50'
    : 'bg-pink-50/60 border-pink-200/60 hover:bg-pink-100/70';
  const tooltipBg = isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-700';

  const feelsLikeReason = getFeelsLikeReason(
    weather.main.temp,
    weather.main.feels_like,
    weather.main.humidity,
    weather.wind.speed
  );

  const copyText = `${weather.name}, ${convertTemp(weather.main.temp)}°${isCelsius ? 'C' : 'F'}, ${weather.weather[0].description} — Humidity ${weather.main.humidity}%, Wind ${weather.wind.speed} m/s`;

  return (
    <div className={`${text} rounded-3xl p-4 shadow-2xl w-full border transition-all duration-300 relative h-full backdrop-blur-md ${
      isDarkMode
        ? 'bg-gray-800/70 border-gray-600/50'
        : 'bg-white/60 border-white/60 shadow-pink-200/30'
    }`}>
      {/* Top-right buttons row */}
      <div className='absolute top-3 right-3 flex items-center gap-2'>
        {/* Copy button */}
        <button
          onClick={() => copy(copyText)}
          title='Copy weather summary'
          className={`p-1.5 rounded-full transition hover:scale-110 ${
            isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          {copied ? (
            // Checkmark
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            // Clipboard
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3" />
            </svg>
          )}
        </button>

        {/* Unit toggle */}
        <button
          onClick={() => setIsCelsius(!isCelsius)}
          className={`px-3 py-1 rounded-full font-bold text-xs transition-all hover:scale-110 shadow-md text-white ${
            isCelsius
              ? 'bg-linear-to-r from-pink-500 to-fuchsia-500'
              : 'bg-linear-to-r from-orange-400 to-rose-500'
          }`}
        >
          {isCelsius ? '°C' : '°F'}
        </button>
      </div>

      <div className='flex justify-center items-center flex-col pt-1 h-full'>
        {/* City, Country and local time */}
        <div className='text-center mb-2'>
          <h2 className="text-xl sm:text-2xl font-extrabold">{weather.name}</h2>
          <p className={`text-sm font-semibold ${subText}`}>{weather.sys.country}</p>
          {/* Local time */}
          <p className={`text-xs font-semibold mt-0.5 ${isDarkMode ? 'text-fuchsia-300' : 'text-fuchsia-600'}`}>
            Local time: {localTime}
          </p>
        </div>

        {/* Weather Icon and Temperature */}
        <div className={`flex justify-center items-center flex-col mb-3 rounded-2xl py-3 px-4 w-full ${innerBg}`}>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            className="w-14 sm:w-20 h-14 sm:h-20 drop-shadow-lg mb-1 animate-float"
          />
          <p className="text-4xl sm:text-5xl font-extrabold mb-1">{convertTemp(weather.main.temp)}°</p>
          <p className={`text-sm sm:text-base capitalize tracking-wide font-semibold ${subText}`}>
            {weather.weather[0].description}
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className='grid grid-cols-3 gap-2 w-full flex-1'>
          {/* Humidity */}
          <div className={`rounded-2xl p-2 border text-center hover:scale-105 transition duration-200 flex flex-col justify-center items-center ${tileBg}`}>
            <p className={`font-semibold text-xs mb-0.5 ${subText}`}>Humidity</p>
            <p className="text-base sm:text-lg font-extrabold">{weather.main.humidity}%</p>
          </div>

          {/* Wind */}
          <div className={`rounded-2xl p-2 border text-center hover:scale-105 transition duration-200 flex flex-col justify-center items-center ${tileBg}`}>
            <p className={`font-semibold text-xs mb-0.5 ${subText}`}>Wind</p>
            <p className="text-base sm:text-lg font-extrabold">{weather.wind.speed}</p>
            <p className={`text-xs ${subText}`}>m/s</p>
          </div>

          {/* Feels Like — with tooltip */}
          <div
            className={`rounded-2xl p-2 border text-center hover:scale-105 transition duration-200 flex flex-col justify-center items-center relative cursor-pointer ${tileBg}`}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onFocus={() => setShowTooltip(true)}
            onBlur={() => setShowTooltip(false)}
            tabIndex={0}
            aria-label={`Feels like ${convertTemp(weather.main.feels_like)}°. ${feelsLikeReason}`}
          >
            <p className={`font-semibold text-xs mb-0.5 flex items-center justify-center gap-1 ${subText}`}>
                Feels Like
                {/* subtle info icon next to label */}
                <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="8" strokeWidth="3" strokeLinecap="round" />
                  <line x1="12" y1="12" x2="12" y2="16" strokeLinecap="round" />
                </svg>
              </p>
            <p className="text-base sm:text-lg font-extrabold">{convertTemp(weather.main.feels_like)}°</p>

            {/* Tooltip */}
            {showTooltip && (
              <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 text-xs rounded-xl px-3 py-2 shadow-xl z-30 border text-left ${tooltipBg} ${
                isDarkMode ? 'border-gray-700' : 'border-pink-100'
              }`}>
                <p className="font-bold mb-1">Why feels different?</p>
                <p className="leading-snug">{feelsLikeReason}</p>
                {/* Arrow */}
                <div className={`absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent ${
                  isDarkMode ? 'border-t-gray-900' : 'border-t-white'
                }`} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
