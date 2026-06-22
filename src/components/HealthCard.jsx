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
      { index: 3, level: 'Moderate', color: 'bg-orange-500', description: 'Sensitive groups may be affected' },
      { index: 4, level: 'Poor', color: 'bg-red-500', description: 'General public may experience effects' },
      { index: 5, level: 'Very Poor', color: 'bg-purple-700', description: 'Health alert: everyone may be affected' }
    ];
    return levels[aqi - 1] || levels[4];
  };

  const uvData = weather.uvi;
  const aqiData = weather.aqi?.list[0];
  const aqiIndex = aqiData?.main?.aqi;

  const uvLevel = getUVIndexLevel(uvData?.value || 0);
  const aqiLevel = getAQILevel(aqiIndex || 1);

  const text = isDarkMode ? 'text-white' : 'text-gray-800';
  const subText = isDarkMode ? 'text-white/70' : 'text-gray-500';
  const innerCard = isDarkMode
    ? 'bg-gray-700/50 border-gray-600/50'
    : 'bg-pink-50/60 border-pink-200/60';
  const barBg = isDarkMode ? 'bg-white/20' : 'bg-pink-100';

  return (
    <div className={`${text} rounded-3xl p-4 shadow-2xl w-full border transition-all duration-300 backdrop-blur-md ${
      isDarkMode
        ? 'bg-gray-800/70 border-gray-600/50'
        : 'bg-white/60 border-white/60 shadow-pink-200/30'
    }`}>
      <h3 className="text-lg sm:text-xl font-extrabold mb-4">Health & Environment</h3>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {/* UV Index */}
        <div className={`rounded-2xl p-4 border ${innerCard}`}>
          <div className='flex items-center justify-between mb-3'>
            <p className="font-extrabold text-base sm:text-lg">UV Index</p>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${uvLevel.color} text-white shadow`}>
              {uvLevel.level}
            </span>
          </div>
          <p className="text-4xl sm:text-5xl font-extrabold mb-2">{(uvData?.value || 0).toFixed(1)}</p>
          <div className={`w-full ${barBg} rounded-full h-2 mb-3 overflow-hidden`}>
            <div
              className={`h-full rounded-full ${uvLevel.color}`}
              style={{ width: `${Math.min((uvData?.value || 0) / 11 * 100, 100)}%` }}
            />
          </div>
          <p className={`text-sm mb-1 font-semibold ${subText}`}>{uvLevel.recommendation}</p>
          <p className={`text-xs ${subText}`}>Max UV: {(uvData?.max_uvi || 0).toFixed(1)} at 13:00</p>
        </div>

        {/* Air Quality Index */}
        <div className={`rounded-2xl p-4 border ${innerCard}`}>
          <div className='flex items-center justify-between mb-3'>
            <p className="font-extrabold text-base sm:text-lg">Air Quality</p>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${aqiLevel.color} text-white shadow`}>
              {aqiLevel.level}
            </span>
          </div>
          <p className="text-4xl sm:text-5xl font-extrabold mb-2">{aqiIndex || 'N/A'}</p>
          <div className={`w-full ${barBg} rounded-full h-2 mb-3 overflow-hidden`}>
            <div
              className={`h-full rounded-full ${aqiLevel.color}`}
              style={{ width: `${(aqiIndex || 1) / 5 * 100}%` }}
            />
          </div>
          <p className={`text-sm mb-3 font-semibold ${subText}`}>{aqiLevel.description}</p>

          {aqiData?.components && (
            <div className='text-xs space-y-1.5'>
              <p className={`font-extrabold text-sm mb-1 ${subText}`}>Main Pollutants:</p>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-1.5'>
                {[
                  ['PM2.5', aqiData.components.pm2_5],
                  ['PM10', aqiData.components.pm10],
                  ['O₃', aqiData.components.o3],
                  ['NO₂', aqiData.components.no2],
                ].map(([name, val]) => (
                  <span key={name} className={subText}>{name}: {val?.toFixed(1) || 'N/A'} μg/m³</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthCard;
