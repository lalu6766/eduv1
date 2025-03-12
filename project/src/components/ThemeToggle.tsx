import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = React.useState(true);

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-[#282828] text-gray-400 hover:text-white transition-colors"
    >
      {darkMode ? (
        <>
          <Sun className="w-5 h-5" />
          <span>Light Mode</span>
        </>
      ) : (
        <>
          <Moon className="w-5 h-5" />
          <span>Dark Mode</span>
        </>
      )}
    </button>
  );
}