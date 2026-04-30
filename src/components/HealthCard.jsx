import React from 'react';

const HealthCard = ({ weather, isDarkMode }) => {
  const getUVIndexLevel = (uvi) => {
    if (uvi < 3) return { level: 'Low', color: 'bg-green-500', recommendation: 'No protection required' };
    if (uvi < 6) return { level: 'Moderate', color: 'bg-yellow-500', recommendation: 'Wear sunscreen' };
    if (uvi < 8) return { level: 'High', color: 'bg-orange-500', recommendation: 'Extra protection needed' };
    if (uvi < 11) return { level: 'Very High', color: 'bg-red-500', recommendation: 'Limit sun exposure' };
    return { level: 'Extreme', color: 'bg-purple-600', recommendation: 'Avoid sun exposure' };
  };

  const getAQILevel = (aqi) => {
    const levels = [
      { index: 1, level: 'Good', color: 'bg-green-500', description: 'Air quality is excellent' },
      { index: 2, level: 'Fair', color: 'bg-yellow-500', description: 'Air quality is acceptable' },
      { index: 3, level: 'Moderate', color: 'bg-orange-500', description: 'Members of sensitive groups may experience health effects' },
      { index: 4, level: 'Poor', color: 'bg-red-500', description: 'Some members of the general public may experience health effects' },
      { index: 5, level: 'Very Poor', color: 'bg-purple-700', description: 'Health alert: The entire population is more likely to be affected' }
    ];
    return levels[aqi - 1] || levels[4];
  };

  const uvData = weather.uvi;
  const aqiData = weather.aqi?.list[0];
  const aqiIndex = aqiData?.main?.aqi;

  const uvLevel = getUVIndexLevel(uvData?.value || 0);
  const aqiLevel = getAQILevel(aqiIndex || 1);

  return (
    <div className={`text-white rounded-lg p-4 shadow-lg w-full border transition-all duration-300 ${
      isDarkMode
        ? 'bg-gray-800/80 border-gray-700'
        : 'bg-purple-400/80 border-purple-300'
    }`}>
      <h3 className="text-lg sm:text-xl font-bold mb-4">Health & Environment</h3>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {/* UV Index */}
        <div className={`rounded-lg p-4 border ${
          isDarkMode
            ? 'bg-gray-700/50 border-gray-600'
            : 'bg-purple-500/50 border-purple-200'
        }`}>
          <div className='flex items-center justify-between mb-3'>
            <p className="font-semibold text-base sm:text-lg">UV Index ☀️</p>
            <span className={`text-sm font-bold px-2 py-1 rounded ${uvLevel.color} text-white`}>
              {uvLevel.level}
            </span>
          </div>
          
          <p className="text-4xl sm:text-5xl font-bold mb-2">{(uvData?.value || 0).toFixed(1)}</p>
          
          {/* UV Index Bar */}
          <div className='w-full bg-gray-400/30 rounded-full h-2 mb-3 overflow-hidden'>
            <div 
              className={`h-full ${uvLevel.color}`}
              style={{ width: `${Math.min((uvData?.value || 0) / 11 * 100, 100)}%` }}
            />
          </div>
          
          <p className="text-sm opacity-90 mb-2">{uvLevel.recommendation}</p>
          <p className="text-sm opacity-75">Max UV Index: {(uvData?.max_uvi || 0).toFixed(1)} at 13:00</p>
        </div>

        {/* Air Quality Index */}
        <div className={`rounded-lg p-4 border ${
          isDarkMode
            ? 'bg-gray-700/50 border-gray-600'
            : 'bg-purple-500/50 border-purple-200'
        }`}>
          <div className='flex items-center justify-between mb-3'>
            <p className="font-semibold text-base sm:text-lg">Air Quality 💨</p>
            <span className={`text-sm font-bold px-2 py-1 rounded ${aqiLevel.color} text-white`}>
              {aqiLevel.level}
            </span>
          </div>
          
          <p className="text-4xl sm:text-5xl font-bold mb-2">{aqiIndex || 'N/A'}</p>
          
          {/* AQI Bar */}
          <div className='w-full bg-gray-400/30 rounded-full h-2 mb-3 overflow-hidden'>
            <div 
              className={`h-full ${aqiLevel.color}`}
              style={{ width: `${(aqiIndex || 1) / 5 * 100}%` }}
            />
          </div>
          
          <p className="text-sm opacity-90 mb-3">{aqiLevel.description}</p>
          
          {/* Pollutants */}
          {aqiData?.components && (
            <div className='text-sm space-y-2'>
              <p className='opacity-75 font-semibold'>Main Pollutants:</p>
              <div className='grid grid-cols-2 gap-2'>
                <span className='text-sm'>PM2.5: {(aqiData.components.pm2_5?.toFixed(1) || 'N/A')} μg/m³</span>
                <span className='text-sm'>PM10: {(aqiData.components.pm10?.toFixed(1) || 'N/A')} μg/m³</span>
                <span className='text-sm'>O₃: {(aqiData.components.o3?.toFixed(1) || 'N/A')} μg/m³</span>
                <span className='text-sm'>NO₂: {(aqiData.components.no2?.toFixed(1) || 'N/A')} μg/m³</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthCard;