import { useState, useEffect } from 'react';

const KEY = 'weather_search_history';
const MAX = 6;

export const useSearchHistory = () => {
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(history));
  }, [history]);

  const addToHistory = (city) => {
    const normalized = city.trim();
    if (!normalized) return;
    setHistory((prev) => {
      const filtered = prev.filter((c) => c.toLowerCase() !== normalized.toLowerCase());
      return [normalized, ...filtered].slice(0, MAX);
    });
  };

  const clearHistory = () => setHistory([]);

  return { history, addToHistory, clearHistory };
};
