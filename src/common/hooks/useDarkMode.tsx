import { useEffect, useState } from 'react';

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Create a matchMedia query for dark mode
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Set initial value
    setIsDarkMode(darkModeQuery.matches);

    // Event listener to handle changes
    const handleChange = (e: { matches: any; }) => {
      setIsDarkMode(e.matches);
    };

    // Listen for changes to the dark mode preference
    darkModeQuery.addEventListener('change', handleChange);

    // Cleanup listener on component unmount
    return () => {
      darkModeQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return isDarkMode;
};

export default useDarkMode
