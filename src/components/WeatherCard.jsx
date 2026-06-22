import React from 'react';

const WeatherCard = ({ weather, isDarkMode }) => {
  const text = isDarkMode ? 'text-white' : 'text-gray-800';
  const subText = isDarkMode ? 'text-white/70' : 'text-gray-500';
  const tileBg = isDarkMode
    ? 'bg-gray-700/50 border-gray-600/50 hover:bg-gray-600/50'
    : 'bg-pink-50/60 border-pink-200/60 hover:bg-pink-100/70';

  const tile = `rounded-2xl p-2 border text-center hover:scale-110 transition duration-200 flex flex-col justify-center items-center cursor-pointer min-h-[80px] ${tileBg}`;

  const stats = [
    { label: 'Wind Dir', value: `${weather.wind.deg}°` },
    { label: 'Pressure', value: weather.main.pressure, unit: 'hPa' },
    { label: 'Visibility', value: `${(weather.visibility / 1000).toFixed(1)}`, unit: 'km' },
    { label: 'Cloud', value: `${weather.clouds.all}%` },
    { label: 'Sunrise', value: new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    { label: 'Sunset', value: new Date(weather.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    { label: 'Latitude', value: `${weather.coord.lat.toFixed(2)}°` },
    { label: 'Longitude', value: `${weather.coord.lon.toFixed(2)}°` },
  ];

  return (
    <div className={`${text} rounded-3xl p-4 shadow-2xl w-full border transition-all duration-300 backdrop-blur-md ${
      isDarkMode
        ? 'bg-gray-800/70 border-gray-600/50'
        : 'bg-white/60 border-white/60 shadow-pink-200/30'
    }`}>
      <h3 className="text-base sm:text-lg font-extrabold mb-4">Weather Details</h3>

      <div className='grid grid-cols-2 sm:grid-cols-4 gap-2 w-full'>
        {stats.map(({ label, value, unit }) => (
          <div key={label} className={tile}>
            <p className={`font-semibold text-xs mb-1 ${subText}`}>{label}</p>
            <p className="text-base font-extrabold">{value}</p>
            {unit && <p className={`text-xs ${subText}`}>{unit}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCard;
