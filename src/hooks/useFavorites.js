import { useState, useEffect } from 'react';

const KEY = 'weather_favorites';
const MAX = 8;

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (city) => {
    const normalized = city.trim();
    if (!normalized) return;
    setFavorites((prev) => {
      if (prev.some((c) => c.toLowerCase() === normalized.toLowerCase())) return prev;
      return [normalized, ...prev].slice(0, MAX);
    });
  };

  const removeFavorite = (city) => {
    setFavorites((prev) => prev.filter((c) => c.toLowerCase() !== city.toLowerCase()));
  };

  const isFavorite = (city) => {
    if (!city) return false;
    return favorites.some((c) => c.toLowerCase() === city.toLowerCase());
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
};
