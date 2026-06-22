import React from 'react';
import ErrorBoundary from './ErrorBoundary';

const HourlyBreakdown = ({ dayData, isDarkMode, isCelsius, convertTemp, onBack }) => {
  const text = isDarkMode ? 'text-white' : 'text-gray-800';
  const subText = isDarkMode ? 'text-white/70' : 'text-gray-500';
  const innerCard = isDarkMode
    ? 'bg-gray-700/50 border-gray-600/50 hover:bg-gray-600'
    : 'bg-pink-50/60 border-pink-200/60 hover:bg-pink-100/70';
  const pillBg = isDarkMode ? 'bg-white/10' : 'bg-pink-100/70';

  if (!dayData || !dayData.hourly || dayData.hourly.length === 0) {
    return (
      <div className={`${text} rounded-3xl p-4 sm:p-6 shadow-2xl w-full border backdrop-blur-md ${
        isDarkMode ? 'bg-gray-800/70 border-gray-600/50' : 'bg-white/60 border-white/60'
      }`}>
        <button
          onClick={onBack}
          className='px-5 py-2 rounded-full font-bold mb-4 bg-linear-to-r from-pink-500 to-fuchsia-500 hover:from-pink-600 hover:to-fuchsia-600 text-white transition hover:scale-105 shadow'
        >
          Back to Forecast
        </button>
        <p className={`text-center ${subText}`}>No hourly data available</p>
      </div>
    );
  }

  const formatTime = (dt) => {
    try {
      return new Date(dt * 1000).toLocaleTimeString('en-US', {
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
      <div className={`${text} rounded-3xl p-4 sm:p-6 shadow-2xl w-full border transition-all duration-300 backdrop-blur-md ${
        isDarkMode
          ? 'bg-gray-800/70 border-gray-600/50'
          : 'bg-white/60 border-white/60 shadow-pink-200/30'
      }`}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <h3 className="text-lg sm:text-xl font-extrabold text-center sm:text-left">
            Hourly Weather — {dayData?.date || 'N/A'}
          </h3>
          <button
            onClick={onBack}
            className='px-5 sm:px-6 py-2 rounded-full font-bold transition transform hover:scale-105 whitespace-nowrap bg-linear-to-r from-pink-500 to-fuchsia-500 hover:from-pink-600 hover:to-fuchsia-600 text-white shadow hover:shadow-pink-400/40'
          >
            Back
          </button>
        </div>

        {/* Hourly Grid */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3'>
          {dayData.hourly.map((hour, idx) => {
            try {
              const temp = hour?.main?.temp ? convertTemp(hour.main.temp) : 'N/A';
              const humidity = hour?.main?.humidity ?? 'N/A';
              const windSpeed = hour?.wind?.speed ? hour.wind.speed.toFixed(1) : 'N/A';
              const feelsLike = hour?.main?.feels_like ? convertTemp(hour.main.feels_like) : 'N/A';

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
                  className={`rounded-2xl p-2 sm:p-3 text-center border transition hover:shadow-lg hover:scale-105 ${innerCard}`}
                >
                  <p className="font-extrabold text-sm sm:text-base mb-2">{time}</p>

                  <img
                    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                    alt={description}
                    className="w-8 sm:w-12 h-8 sm:h-12 mx-auto mb-1 drop-shadow animate-float"
                    onError={(e) => { e.target.src = 'https://openweathermap.org/img/wn/01d@2x.png'; }}
                  />

                  <p className="text-lg sm:text-2xl font-extrabold mb-1">{temp}°</p>
                  <p className={`text-xs sm:text-sm capitalize mb-2 line-clamp-2 font-semibold ${subText}`}>{description}</p>

                  <div className='space-y-1.5 text-xs'>
                    {[
                      ['Humidity', `${humidity}%`],
                      ['Wind', `${windSpeed}m/s`],
                      ['Feels', `${feelsLike}°`],
                      ['Cloud', `${cloudsValue}%`],
                    ].map(([label, val]) => (
                      <div key={label} className={`flex items-center justify-center gap-1 rounded-full px-2 py-1 ${pillBg}`}>
                        <span className={`font-semibold ${subText}`}>{label}</span>
                        <span className='font-bold'>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            } catch (error) {
              console.error('Error rendering hour:', error);
              return (
                <div
                  key={`${hour?.dt}-${idx}`}
                  className={`rounded-2xl p-2 sm:p-3 text-center border ${innerCard}`}
                >
                  <p className="text-xs text-red-400">Error loading data</p>
                </div>
              );
            }
          })}
        </div>

        <p className={`text-sm mt-5 text-center font-semibold ${subText}`}>
          Showing {dayData.hourly.length} hourly updates for {dayData.date}
        </p>
      </div>
    </ErrorBoundary>
  );
};

export default HourlyBreakdown;
