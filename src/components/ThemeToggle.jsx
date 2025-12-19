import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Default to light mode unless user previously selected dark
        const stored = localStorage.getItem('theme');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initial = stored ? stored === 'dark' : prefersDark;
        // If no stored preference, check whether the document already has a .dark class
        const classDark = document.documentElement.classList.contains('dark');
        // Per request, default should be light mode; but honor an existing .dark class if present
        const effective = stored ? initial : (classDark ? true : false);
        setIsDark(effective);
        document.documentElement.classList.toggle('dark', effective);
    }, []);

    const toggle = () => {
        const next = !isDark;
        setIsDark(next);
        document.documentElement.classList.toggle('dark', next);
        localStorage.setItem('theme', next ? 'dark' : 'light');
    };

    const toggleTheme = () => {
        // reuse the existing toggle logic
        toggle();
    };

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                position: 'fixed',
                top: '1rem',
                right: '3.5rem',
                zIndex: 11000,
                padding: '0.5rem',
                borderRadius: '9999px'
            }}
            title={isDark ? 'Switch to light' : 'Switch to dark'}
        >
            {isDark ? <Sun className="h-6 w-6 text-yellow-300" style={{color: '#fcd34d'}} /> : <Moon className="h-6 w-6 text-yellow-900" style={{color: '#78350f'}} />}
        </button>
    );
};