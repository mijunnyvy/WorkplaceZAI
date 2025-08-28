'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sun, Moon, Landmark, Clock, BookOpen } from 'lucide-react';

const Header = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDark(savedTheme === 'dark');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="relative z-10 p-6 bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center space-x-3">
          <Link href="/">
            <Landmark className="w-6 h-6 text-gray-900 dark:text-white" />
          </Link>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Islamic Companion
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <button
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            onClick={toggleTheme}
          >
            {isDark ? (
              <Sun className="w-6 h-6 text-yellow-500" />
            ) : (
              <Moon className="w-6 h-6 text-gray-500" />
            )}
          </button>
          <Link href="/prayer-times">
            <Clock className="w-6 h-6 text-gray-900 dark:text-white" />
          </Link>
          <Link href="/quran">
            <BookOpen className="w-6 h-6 text-gray-900 dark:text-white" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;