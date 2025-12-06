import { useEffect } from 'react';
import { ThemeToggle } from '../components/ThemeToggle';
import { StarBackground } from '../components/StarBackground';

export const Home = () => {
    useEffect(() => {
        // Ensure dark mode is enabled by default to show stars
        if (!localStorage.getItem('theme')) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    }, []);

    return (
        <div 
            className="min-h-screen bg-background text-foreground"
            style={{
                minHeight: '100vh',
                width: '100%',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Star Background - Only shows in dark mode */}
            <StarBackground />
            
            {/* Content layer */}
            <div style={{ position: 'relative', zIndex: 10 }}>
                {/* Theme Toggle */}
                <ThemeToggle />

                {/* NavBar */}

                {/* Main Content */}

                {/* Footer */}
            </div>
        </div>
    );
};

