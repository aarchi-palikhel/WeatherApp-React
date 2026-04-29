import React from 'react';

const SearchBar = ({ fetchWeather, isDarkMode }) => {
    const [city, setCity] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(city.trim()){
            fetchWeather(city);
            setCity('');
        }
    }
    
    return (
        <form className='flex gap-2 w-full' onSubmit={handleSubmit}>
            <input 
                type="text" 
                id="city" 
                name="city" 
                placeholder='Enter city name...' 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
                autoComplete="off"
                className={`flex-1 px-4 py-3 rounded-lg outline-none focus:ring-2 transition ${
                  isDarkMode
                    ? 'bg-gray-700 text-white placeholder-gray-400 focus:ring-yellow-400'
                    : 'bg-white/90 text-gray-800 placeholder-gray-500 focus:ring-blue-400'
                }`}
            />
            <button 
                type='submit' 
                className={`text-white font-bold px-6 py-3 rounded-lg cursor-pointer transition shadow-lg hover:shadow-xl
                    bg-blue-500 hover:bg-blue-600'
                }`}
            >
                Search
            </button>
        </form>
    );
};

export default SearchBar;
