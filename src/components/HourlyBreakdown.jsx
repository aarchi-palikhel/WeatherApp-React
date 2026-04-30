import React from 'react';
import ErrorBoundary from './ErrorBoundary';

const HourlyBreakdown = ({ dayData, isDarkMode, isCelsius, convertTemp, onBack }) => {
  // Safety check
  if (!dayData || !dayData.hourly || dayData.hourly.length === 0) {
    return (
      <div className={`text-white rounded-lg p-4 sm:p-6 shadow-lg w-full border ${
        isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-purple-400/80 border-purple-300'
      }`}>
        <button
          onClick={onBack}
          className={`px-4 py-2 rounded font-semibold mb-4 ${
            isDarkMode
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          ← Back to Forecast
        </button>
        <p className="text-center">No hourly data available</p>
      </div>
    );
  }

  const formatTime = (dt) => {
    try {
      const date = new Date(dt * 1000);
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true
      });
    } catch (e) {
      return 'N/A';
    }
  };

  return (
    <ErrorBoundary>
      <div className={`text-white rounded-lg p-4 sm:p-6 shadow-lg w-full border transition-all duration-300 ${
        isDarkMode
          ? 'bg-gray-800/80 border-gray-700'
          : 'bg-purple-400/80 border-purple-300'
      }`}>
        {/* Header with Back Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-center sm:text-left">
            Hourly Weather - {dayData?.date || 'N/A'}
          </h3>
          <button
            onClick={onBack}
            className={`px-4 sm:px-6 py-2 rounded font-semibold transition transform hover:scale-105 whitespace-nowrap ${
              isDarkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            ← Back
          </button>
        </div>

        {/* Hourly Grid */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3'>
          {dayData.hourly.map((hour, idx) => {
            try {
              // Safe data extraction
              const temp = hour?.main?.temp ? convertTemp(hour.main.temp) : 'N/A';
              const humidity = hour?.main?.humidity ?? 'N/A';
              const windSpeed = hour?.wind?.speed ? hour.wind.speed.toFixed(1) : 'N/A';
              const feelsLike = hour?.main?.feels_like ? convertTemp(hour.main.feels_like) : 'N/A';
              
              // FIX: Handle clouds - can be object or number
              let cloudsValue = 'N/A';
              if (hour?.clouds !== undefined && hour?.clouds !== null) {
                if (typeof hour.clouds === 'object' && hour.clouds.all !== undefined) {
                  cloudsValue = hour.clouds.all;
                } else if (typeof hour.clouds === 'number') {
                  cloudsValue = hour.clouds;
                }
              }
              
              const description = hour?.weather?.[0]?.description ?? 'No data';
              const icon = hour?.weather?.[0]?.icon ?? '01d';
              const time = formatTime(hour?.dt);

              return (
                <div
                  key={`${hour.dt}-${idx}`}
                  className={`rounded-lg p-2 sm:p-3 text-center border transition hover:shadow-lg ${
                    isDarkMode
                      ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-600'
                      : 'bg-white/20 border-purple-200 hover:bg-white/30'
                  }`}
                >
                  {/* Time */}
                  <p className="font-bold text-sm sm:text-base mb-2">
                    {time}
                  </p>

                  {/* Weather Icon */}
                  <img 
                    src={`https://openweathermap.org/img/wn/${icon}@2x.png`} 
                    alt={description}
                    className="w-8 sm:w-12 h-8 sm:h-12 mx-auto mb-2"
                    onError={(e) => {
                      e.target.src = 'https://openweathermap.org/img/wn/01d@2x.png';
                    }}
                  />

                  {/* Temperature */}
                  <p className="text-lg sm:text-2xl font-bold mb-2">
                    {temp}°
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm capitalize opacity-85 mb-3 line-clamp-2">
                    {description}
                  </p>

                  {/* Weather Details */}
                  <div className='space-y-2 text-xs sm:text-sm'>
                    <div className='flex items-center justify-center gap-2 bg-gray-600/30 rounded px-1.5 py-1'>
                      <span className='font-semibold'>Humidity:</span>
                      <span className='font-bold'>{humidity}%</span>
                    </div>
                    <div className='flex items-center justify-center gap-2 bg-gray-600/30 rounded px-1.5 py-1'>
                      <span className='font-semibold'>Wind:</span>
                      <span className='font-bold'>{windSpeed}m/s</span>
                    </div>
                    <div className='flex items-center justify-center gap-2 bg-gray-600/30 rounded px-1.5 py-1'>
                      <span className='font-semibold'>Feels:</span>
                      <span className='font-bold'>{feelsLike}°</span>
                    </div>
                    <div className='flex items-center justify-center gap-2 bg-gray-600/30 rounded px-1.5 py-1'>
                      <span className='font-semibold'>Cloud:</span>
                      <span className='font-bold'>{cloudsValue}%</span>
                    </div>
                  </div>
                </div>
              );
            } catch (error) {
              console.error('Error rendering hour:', error);
              return (
                <div
                  key={`${hour?.dt}-${idx}`}
                  className={`rounded-lg p-2 sm:p-3 text-center border ${
                    isDarkMode
                      ? 'bg-gray-700/50 border-gray-600'
                      : 'bg-white/20 border-purple-200'
                  }`}
                >
                  <p className="text-xs text-red-300">Error loading data</p>
                </div>
              );
            }
          })}
        </div>

        {/* Info Text */}
        <p className="text-sm opacity-75 mt-4 sm:mt-6 text-center">
          Showing {dayData.hourly.length} hourly updates for {dayData.date}
        </p>
      </div>
    </ErrorBoundary>
  );
};

export default HourlyBreakdown;