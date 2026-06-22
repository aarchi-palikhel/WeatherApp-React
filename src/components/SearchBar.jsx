import React from 'react';

const SearchBar = ({ fetchWeather, isDarkMode }) => {
    const [city, setCity] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) {
            fetchWeather(city);
            setCity('');
        }
    };

    return (
        <form className='flex gap-2 w-full flex-col sm:flex-row' onSubmit={handleSubmit}>
            <input
                type="text"
                id="city"
                name="city"
                placeholder='Search a city...'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                autoComplete="off"
                className={`flex-1 px-4 py-2 sm:py-3 text-sm sm:text-base rounded-full outline-none focus:ring-2 transition ${
                    isDarkMode
                        ? 'bg-gray-700/80 text-white placeholder-gray-400 focus:ring-pink-400 border border-gray-600'
                        : 'bg-white/70 text-gray-800 placeholder-gray-400 focus:ring-pink-400 border border-white/50 backdrop-blur-sm'
                }`}
            />
            <button
                type='submit'
                className='text-white font-bold px-5 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-full cursor-pointer transition shadow-lg hover:shadow-pink-400/50 hover:scale-105 whitespace-nowrap bg-gradient-to-r from-pink-500 to-fuchsia-500 hover:from-pink-600 hover:to-fuchsia-600'
            >
                Search
            </button>
        </form>
    );
};

export default SearchBar;
