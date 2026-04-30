import React from 'react';

const WeatherCard = ({ weather, isDarkMode, isCelsius, convertTemp, setIsCelsius }) => {
  return (
    <div className={`text-white rounded-lg p-4 shadow-lg w-full border transition-all duration-300 ${
      isDarkMode
        ? 'bg-gray-800/80 border-gray-700'
        : 'bg-purple-400/80 border-purple-300'
    }`}>
      <h3 className="text-base sm:text-lg font-bold mb-4">Weather Details</h3>
      
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-2 w-full'>
        <div className={`rounded-lg p-2 border text-center hover:scale-110 transition duration-200 aspect-square flex flex-col justify-center items-center cursor-pointer ${
          isDarkMode
            ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-600/50'
            : 'bg-purple-500/50 border-purple-200 hover:bg-purple-600/50'
        }`}>
          <p className="font-semibold text-xs opacity-90 mb-1">Wind Dir</p>
          <p className="text-lg font-bold">{weather.wind.deg}°</p>
        </div>

        <div className={`rounded-lg p-2 border text-center hover:scale-110 transition duration-200 aspect-square flex flex-col justify-center items-center cursor-pointer ${
          isDarkMode
            ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-600/50'
            : 'bg-purple-500/50 border-purple-200 hover:bg-purple-600/50'
        }`}>
          <p className="font-semibold text-xs opacity-90 mb-1">Pressure</p>
          <p className="text-base font-bold">{weather.main.pressure}</p>
          <p className="text-xs opacity-75">hPa</p>
        </div>

        <div className={`rounded-lg p-2 border text-center hover:scale-110 transition duration-200 aspect-square flex flex-col justify-center items-center cursor-pointer ${
          isDarkMode
            ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-600/50'
            : 'bg-purple-500/50 border-purple-200 hover:bg-purple-600/50'
        }`}>
          <p className="font-semibold text-xs opacity-90 mb-1">Visibility</p>
          <p className="text-base font-bold">{(weather.visibility / 1000).toFixed(1)}</p>
          <p className="text-xs opacity-75">km</p>
        </div>

        <div className={`rounded-lg p-2 border text-center hover:scale-110 transition duration-200 aspect-square flex flex-col justify-center items-center cursor-pointer ${
          isDarkMode
            ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-600/50'
            : 'bg-purple-500/50 border-purple-200 hover:bg-purple-600/50'
        }`}>
          <p className="font-semibold text-xs opacity-90 mb-1">Cloud</p>
          <p className="text-lg font-bold">{weather.clouds.all}%</p>
        </div>

        <div className={`rounded-lg p-2 border text-center hover:scale-110 transition duration-200 aspect-square flex flex-col justify-center items-center cursor-pointer ${
          isDarkMode
            ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-600/50'
            : 'bg-purple-500/50 border-purple-200 hover:bg-purple-600/50'
        }`}>
          <p className="font-semibold text-xs opacity-90 mb-1">Sunrise</p>
          <p className="text-xs font-bold">{new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
        </div>

        <div className={`rounded-lg p-2 border text-center hover:scale-110 transition duration-200 aspect-square flex flex-col justify-center items-center cursor-pointer ${
          isDarkMode
            ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-600/50'
            : 'bg-purple-500/50 border-purple-200 hover:bg-purple-600/50'
        }`}>
          <p className="font-semibold text-xs opacity-90 mb-1">Sunset</p>
          <p className="text-xs font-bold">{new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
        </div>

        <div className={`rounded-lg p-2 border text-center hover:scale-110 transition duration-200 aspect-square flex flex-col justify-center items-center cursor-pointer ${
          isDarkMode
            ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-600/50'
            : 'bg-purple-500/50 border-purple-200 hover:bg-purple-600/50'
        }`}>
          <p className="font-semibold text-xs opacity-90 mb-1">Latitude</p>
          <p className="text-xs font-bold">{weather.coord.lat.toFixed(2)}°</p>
        </div>

        <div className={`rounded-lg p-2 border text-center hover:scale-110 transition duration-200 aspect-square flex flex-col justify-center items-center cursor-pointer ${
          isDarkMode
            ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-600/50'
            : 'bg-purple-500/50 border-purple-200 hover:bg-purple-600/50'
        }`}>
          <p className="font-semibold text-xs opacity-90 mb-1">Longitude</p>
          <p className="text-xs font-bold">{weather.coord.lon.toFixed(2)}°</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
