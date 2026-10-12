import { useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

export function initializeTheme() {
  let saved;
  try { saved = localStorage.getItem('irrigation_theme'); } catch { /* Use the device preference when storage is unavailable. */ }
  const theme = saved === 'dark' || saved === 'light' ? saved : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.dataset.theme = theme;
}

export default function ThemeToggle({ className = '' }) {
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === 'dark');
  const toggle = () => {
    const theme = dark ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    setDark(!dark);
    try { localStorage.setItem('irrigation_theme', theme); } catch { /* The selected theme still applies for this session. */ }
  };
  return <button type="button" className={`theme-toggle ${className}`} onClick={toggle} aria-label="Dark mode" aria-pressed={dark} title={dark ? 'Switch to light mode' : 'Switch to dark mode'}>{dark ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}</button>;
}
