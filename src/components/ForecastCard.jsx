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

  // If a day is selected, show hourly breakdown
  if (selectedDayData) {
    return (
      <div>
        <HourlyBreakdown 
          dayData={selectedDayData} 
          isDarkMode={isDarkMode} 
          isCelsius={isCelsius}
          convertTemp={convertTemp}
          onBack={() => setSelectedDay(null)}
        />
      </div>
    );
  }

  return (
    <div className={`text-white rounded-lg p-3 shadow-lg w-full border transition-all duration-300 h-full flex flex-col ${
      isDarkMode
        ? 'bg-gray-800/80 border-gray-700'
        : 'bg-purple-400/80 border-purple-300'
    }`}>
      <h3 className="text-lg sm:text-xl font-bold mb-3">5-Day Forecast</h3>
      
      {/* Daily Forecast Grid */}
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 flex-1'>
        {dailyForecast.map((day) => (
          <button
            key={day.dt}
            onClick={() => setSelectedDay(day.dt)}
            className={`rounded-lg p-1.5 text-center transition transform hover:scale-105 flex flex-col justify-between h-full cursor-pointer border-2 ${
              isDarkMode
                ? 'bg-gray-700/50 border-gray-600 hover:border-blue-400 hover:bg-gray-700'
                : 'bg-purple-500/50 border-purple-200 hover:border-blue-300 hover:bg-purple-400'
            }`}
          >
            <p className="font-semibold text-base sm:text-lg mb-1">{day.date}</p>
            <img 
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} 
              alt={day.weather.description}
              className="w-10 sm:w-12 h-10 sm:h-12 mx-auto mb-1"
            />
            <p className="text-xl sm:text-2xl font-bold">{convertTemp(day.temp)}°</p>
            <p className="text-sm sm:text-base capitalize opacity-75">{day.weather.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;