import React from 'react';

// A single clickable chip
const Chip = ({ label, onClick, onRemove, isDarkMode, variant = 'default' }) => {
  const base =
    'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition hover:scale-105 select-none';

  const styles = {
    history: isDarkMode
      ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
      : 'bg-pink-100 text-pink-800 hover:bg-pink-200',
    favorite: isDarkMode
      ? 'bg-fuchsia-800/60 text-fuchsia-200 hover:bg-fuchsia-700/70'
      : 'bg-fuchsia-100 text-fuchsia-800 hover:bg-fuchsia-200',
  };

  return (
    <span className={`${base} ${styles[variant]}`} onClick={onClick} title={`Search ${label}`}>
      {label}
      {onRemove && (
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className='ml-0.5 opacity-60 hover:opacity-100 font-extrabold leading-none'
          title={`Remove ${label}`}
          aria-label={`Remove ${label}`}
        >
          ×
        </button>
      )}
    </span>
  );
};

const CityChips = ({
  isDarkMode,
  favorites,
  history,
  onCityClick,
  onRemoveFavorite,
  onClearHistory,
}) => {
  const hasFavorites = favorites.length > 0;
  const hasHistory = history.length > 0;

  if (!hasFavorites && !hasHistory) return null;

  const label = isDarkMode ? 'text-gray-400' : 'text-gray-500';

  return (
    <div className='mt-4 space-y-3'>
      {/* Favorites */}
      {hasFavorites && (
        <div>
          <p className={`text-xs font-bold mb-1.5 ${label}`}>Saved Cities</p>
          <div className='flex flex-wrap gap-1.5'>
            {favorites.map((city) => (
              <Chip
                key={city}
                label={city}
                isDarkMode={isDarkMode}
                variant='favorite'
                onClick={() => onCityClick(city)}
                onRemove={() => onRemoveFavorite(city)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Search History */}
      {hasHistory && (
        <div>
          <div className='flex items-center justify-between mb-1.5'>
            <p className={`text-xs font-bold ${label}`}>Recent Searches</p>
            <button
              onClick={onClearHistory}
              className={`text-xs font-semibold hover:underline ${label} hover:text-red-400 transition`}
            >
              Clear
            </button>
          </div>
          <div className='flex flex-wrap gap-1.5'>
            {history.map((city) => (
              <Chip
                key={city}
                label={city}
                isDarkMode={isDarkMode}
                variant='history'
                onClick={() => onCityClick(city)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CityChips;
