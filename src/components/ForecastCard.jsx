import React, { useState } from 'react';
import HourlyBreakdown from './HourlyBreakdown';

const ForecastCard = ({ forecast, isDarkMode, isCelsius, convertTemp }) => {
  const [selectedDay, setSelectedDay] = useState(null);

  const getDailyForecast = () => {
    const dailyData = {};
    forecast.list.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
      if (!dailyData[date]) {
        dailyData[date] = {
          date,
          dt: item.dt,
          weather: item.weather[0],
          temp: item.main.temp,
          icon: item.weather[0].icon,
          hourly: []
        };
      }
      dailyData[date].hourly.push(item);
    });
    return Object.values(dailyData);
  };

  const dailyForecast = getDailyForecast();
  const selectedDayData = selectedDay ? dailyForecast.find(d => d.dt === selectedDay) : null;

  if (selectedDayData) {
    return (
      <HourlyBreakdown
        dayData={selectedDayData}
        isDarkMode={isDarkMode}
        isCelsius={isCelsius}
        convertTemp={convertTemp}
        onBack={() => setSelectedDay(null)}
      />
    );
  }

  const text = isDarkMode ? 'text-white' : 'text-gray-800';
  const subText = isDarkMode ? 'text-white/70' : 'text-gray-500';
  const dayCard = isDarkMode
    ? 'bg-gray-700/50 border-gray-600/50 hover:border-pink-400 hover:bg-gray-700 hover:shadow-pink-400/20'
    : 'bg-pink-50/60 border-pink-200/60 hover:border-pink-400 hover:bg-pink-100/70 hover:shadow-pink-300/30';

  return (
    <div className={`${text} rounded-3xl p-4 shadow-2xl w-full border transition-all duration-300 backdrop-blur-md ${
      isDarkMode
        ? 'bg-gray-800/70 border-gray-600/50'
        : 'bg-white/60 border-white/60 shadow-pink-200/30'
    }`}>
      <h3 className="text-lg sm:text-xl font-extrabold mb-4">5-Day Forecast</h3>

      <div className='flex gap-3 overflow-x-auto pb-2 sm:pb-0 sm:grid sm:grid-cols-3 lg:grid-cols-5 sm:overflow-visible'>
        {dailyForecast.map((day) => (
          <button
            key={day.dt}
            onClick={() => setSelectedDay(day.dt)}
            className={`${text} rounded-2xl p-3 text-center transition transform hover:scale-105 flex flex-col justify-between items-center cursor-pointer border-2 shrink-0 w-32 sm:w-auto hover:shadow-lg ${dayCard}`}
          >
            <p className="font-extrabold text-sm sm:text-base mb-1">{day.date}</p>
            <img
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={day.weather.description}
              className="w-10 sm:w-12 h-10 sm:h-12 mx-auto mb-1 drop-shadow"
            />
            <p className="text-xl sm:text-2xl font-extrabold">{convertTemp(day.temp)}°</p>
            <p className={`text-xs sm:text-sm capitalize font-semibold ${subText}`}>{day.weather.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;
