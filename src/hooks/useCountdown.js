import { useState, useEffect } from 'react';

/**
 * Given a unix timestamp (seconds) and the city's UTC offset (seconds),
 * returns a live countdown string like "2h 34m" or "Passed" if the time has passed.
 * Ticks every 30 seconds.
 */
export const useCountdown = (targetUnix, timezoneOffset) => {
  const getRemaining = () => {
    // Current UTC time in ms + city's UTC offset → city local time in ms
    const nowUtcMs = Date.now();
    const cityNowMs = nowUtcMs + timezoneOffset * 1000;
    const targetMs = targetUnix * 1000;
    const diffMs = targetMs - cityNowMs;

    if (diffMs <= 0) return null; // already passed

    const totalMins = Math.floor(diffMs / 60000);
    const hours = Math.floor(totalMins / 60);
    const mins = totalMins % 60;

    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  const [remaining, setRemaining] = useState(getRemaining);

  useEffect(() => {
    setRemaining(getRemaining());
    const interval = setInterval(() => setRemaining(getRemaining()), 30000);
    return () => clearInterval(interval);
  }, [targetUnix, timezoneOffset]);

  return remaining;
};
