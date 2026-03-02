import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

const BotonOscuro = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors border border-emerald-600 dark:border-slate-600"
      aria-label="Cambiar tema"
    >
      {theme === 'dark' ? (
        <Sun size={20} className="text-yellow-400 fill-yellow-400" />
      ) : (
        <Moon size={20} className="text-white fill-white" />
      )}
    </button>
  );
};

export default BotonOscuro;