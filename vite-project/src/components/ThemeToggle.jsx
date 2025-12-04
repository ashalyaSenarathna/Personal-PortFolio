import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Default to light mode unless user previously selected dark
        const stored = localStorage.getItem('theme');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initial = stored ? stored === 'dark' : prefersDark;
        // Per request, default should be light mode; override prefersDark if no stored value
        const effective = stored ? initial : false;
        setIsDark(effective);
        document.documentElement.classList.toggle('dark', effective);
    }, []);

    const toggle = () => {
        const next = !isDark;
        setIsDark(next);
        document.documentElement.classList.toggle('dark', next);
        localStorage.setItem('theme', next ? 'dark' : 'light');
    };

    return (
        <button
            onClick={toggle}
            aria-label="Toggle theme"
            style={{background: 'transparent', border: 'none', cursor: 'pointer'}}
            title={isDark ? 'Switch to light' : 'Switch to dark'}
        >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
};