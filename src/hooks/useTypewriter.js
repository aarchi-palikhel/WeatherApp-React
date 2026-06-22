import { useState, useEffect } from 'react';

/**
 * Sequentially types out an array of strings.
 * Returns the current displayed strings for each index.
 *
 * @param {string[]} texts   - Array of strings to type in order
 * @param {number}   speed   - Ms per character (default 60)
 * @param {number}   delay   - Ms to wait before starting the next string (default 300)
 */
export const useTypewriter = (texts, speed = 60, delay = 300) => {
  // displayed[i] holds how many chars of texts[i] are currently visible
  const [counts, setCounts] = useState(texts.map(() => 0));
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    // All strings fully typed
    if (currentIdx >= texts.length) return;

    const target = texts[currentIdx].length;
    const current = counts[currentIdx];

    if (current < target) {
      const timer = setTimeout(() => {
        setCounts((prev) => {
          const next = [...prev];
          next[currentIdx] = current + 1;
          return next;
        });
      }, speed);
      return () => clearTimeout(timer);
    } else if (currentIdx < texts.length - 1) {
      // Current string done, wait then move to next
      const timer = setTimeout(() => {
        setCurrentIdx((i) => i + 1);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [counts, currentIdx, texts, speed, delay]);

  return texts.map((t, i) => t.slice(0, counts[i]));
};
