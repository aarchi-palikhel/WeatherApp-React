import React from 'react';

const ForecastCard = ({ forecast, isDarkMode, isCelsius, convertTemp }) => {
  // Group forecast data by day (5-day forecast shows one entry per day)
  const getDailyForecast = () => {
    const dailyData = {};
    
    forecast.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString('en-US');
      if (!dailyData[date]) {
        dailyData[date] = item;
      }
    });
    
    return Object.values(dailyData).slice(0, 5);
  };

  const dailyForecast = getDailyForecast();

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className={`text-white rounded-lg p-4 shadow-lg w-full border transition-all duration-300 h-full flex flex-col ${
      isDarkMode
        ? 'bg-gray-800/80 border-gray-700'
        : 'bg-purple-400/80 border-purple-300'
    }`}>
      <h3 className="text-lg font-bold mb-4">5-Day Forecast</h3>
      
      <div className='grid grid-cols-5 gap-2 flex-1'>
        {dailyForecast.map((day, index) => (
          <div 
            key={index}
            className={`rounded-lg p-2 text-center hover:scale-105 transition flex flex-col justify-between h-full ${
              isDarkMode
                ? 'bg-gray-700/50 border border-gray-600'
                : 'bg-purple-500/50 border border-purple-200'
            }`}
          >
            <p className="font-semibold text-xs mb-2">{formatDate(day.dt)}</p>
            <img 
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} 
              alt={day.weather[0].description}
              className="w-10 h-10 mx-auto mb-1"
            />
            <p className="text-xs capitalize text-opacity-90 mb-1">{day.weather[0].description}</p>
            <p className="text-lg font-bold mb-2">
              {convertTemp(day.main.temp)}°
            </p>
            <div className='flex flex-col text-xs opacity-75 border-t border-opacity-30 pt-2'>
              <div className='mb-1'>
                <p className='text-opacity-75'>Humidity</p>
                <p className='font-semibold'>{day.main.humidity}%</p>
              </div>
              <div>
                <p className='text-opacity-75'>Wind</p>
                <p className='font-semibold text-xs'>{day.wind.speed} m/s</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;