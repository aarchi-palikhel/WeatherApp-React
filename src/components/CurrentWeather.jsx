import React from 'react';

const CurrentWeather = ({ weather, isDarkMode, isCelsius, convertTemp, setIsCelsius }) => {
  const text = isDarkMode ? 'text-white' : 'text-gray-800';
  const subText = isDarkMode ? 'opacity-80' : 'text-gray-500';
  const innerBg = isDarkMode ? 'bg-white/5' : 'bg-pink-50/60';
  const tileBg = isDarkMode
    ? 'bg-gray-700/50 border-gray-600/50 hover:bg-gray-600/50'
    : 'bg-pink-50/60 border-pink-200/60 hover:bg-pink-100/70';

  return (
    <div className={`${text} rounded-3xl p-4 shadow-2xl w-full border transition-all duration-300 relative h-full backdrop-blur-md ${
      isDarkMode
        ? 'bg-gray-800/70 border-gray-600/50'
        : 'bg-white/60 border-white/60 shadow-pink-200/30'
    }`}>
      {/* Unit Converter Button */}
      <button
        onClick={() => setIsCelsius(!isCelsius)}
        className={`absolute top-3 right-3 px-3 py-1 rounded-full font-bold text-xs transition-all hover:scale-110 shadow-md text-white ${
          isCelsius
            ? 'bg-linear-to-r from-pink-500 to-fuchsia-500'
            : 'bg-linear-to-r from-orange-400 to-rose-500'
        }`}
      >
        {isCelsius ? '°C' : '°F'}
      </button>

      <div className='flex justify-center items-center flex-col pt-1 h-full'>
        {/* City and Country */}
        <div className='text-center mb-2'>
          <h2 className="text-xl sm:text-2xl font-extrabold">{weather.name}</h2>
          <p className={`text-sm font-semibold ${subText}`}>{weather.sys.country}</p>
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
          {[
            { label: 'Humidity', value: `${weather.main.humidity}%` },
            { label: 'Wind', value: weather.wind.speed, unit: 'm/s' },
            { label: 'Feels Like', value: `${convertTemp(weather.main.feels_like)}°` },
          ].map(({ label, value, unit }) => (
            <div key={label} className={`rounded-2xl p-2 border text-center hover:scale-105 transition duration-200 flex flex-col justify-center items-center ${tileBg}`}>
              <p className={`font-semibold text-xs mb-0.5 ${subText}`}>{label}</p>
              <p className="text-base sm:text-lg font-extrabold">{value}</p>
              {unit && <p className={`text-xs ${subText}`}>{unit}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
