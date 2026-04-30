import React from 'react';

const CurrentWeather = ({ weather, isDarkMode, isCelsius, convertTemp, setIsCelsius }) => {
  return (
    <div className={`text-white rounded-lg p-3 shadow-lg w-full border transition-all duration-300 relative h-full ${
      isDarkMode
        ? 'bg-gray-800/80 border-gray-700'
        : 'bg-purple-400/80 border-purple-300'
    }`}>
      {/* Unit Converter Button - Top Right */}
      <button 
        onClick={() => setIsCelsius(!isCelsius)}
        className={`absolute top-2 sm:top-3 right-2 sm:right-3 px-2 py-1 rounded font-bold text-xs transition-all whitespace-nowrap ${
          isCelsius 
            ? 'bg-blue-500 text-white shadow-lg hover:bg-blue-600' 
            : 'bg-orange-500 text-white shadow-lg hover:bg-orange-600'
        }`}
      >
        {isCelsius ? '°C' : '°F'}
      </button>

      {/* Weather Display */}
      <div className='flex justify-center items-center flex-col pt-1 h-full'>
        {/* City and Country */}
        <div className='text-center mb-2'>
          <h2 className="text-xl sm:text-2xl font-bold">{weather.name}</h2>
          <p className="text-sm opacity-90">{weather.sys.country}</p>
        </div>

        {/* Weather Icon and Temperature */}
        <div className='flex justify-center items-center flex-col mb-3 bg-linear-to-b from-transparent to-white/10 rounded-lg py-2 px-2 w-full'>
          <img 
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
              alt={weather.weather[0].description} 
              className="w-12 sm:w-16 h-12 sm:h-16 drop-shadow-lg mb-1" 
          />
          <p className="text-4xl sm:text-5xl font-bold mb-1">{convertTemp(weather.main.temp)}°</p>
          <p className="text-sm sm:text-base capitalize text-opacity-90 tracking-wide">{weather.weather[0].description}</p>
        </div>

        {/* Quick Stats Grid */}
        <div className='grid grid-cols-3 gap-1.5 w-full flex-1'>
          <div className={`rounded-lg p-1.5 border text-center hover:scale-105 transition duration-200 flex flex-col justify-center items-center ${
            isDarkMode
              ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-600/50'
              : 'bg-purple-500/50 border-purple-200 hover:bg-purple-600/50'
          }`}>
            <p className="font-semibold text-sm opacity-90 mb-0.5">Humidity</p>
            <p className="text-base sm:text-lg font-bold">{weather.main.humidity}%</p>
          </div>
          <div className={`rounded-lg p-1.5 border text-center hover:scale-105 transition duration-200 flex flex-col justify-center items-center ${
            isDarkMode
              ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-600/50'
              : 'bg-purple-500/50 border-purple-200 hover:bg-purple-600/50'
          }`}>
            <p className="font-semibold text-sm opacity-90 mb-0.5">Wind</p>
            <p className="text-base sm:text-lg font-bold">{weather.wind.speed}</p>
            <p className="text-xs opacity-75">m/s</p>
          </div>
          <div className={`rounded-lg p-1.5 border text-center hover:scale-105 transition duration-200 flex flex-col justify-center items-center ${
            isDarkMode
              ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-600/50'
              : 'bg-purple-500/50 border-purple-200 hover:bg-purple-600/50'
          }`}>
            <p className="font-semibold text-sm opacity-90 mb-0.5">Feels Like</p>
            <p className="text-base sm:text-lg font-bold">{convertTemp(weather.main.feels_like)}°</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;