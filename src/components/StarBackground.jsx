import { useState, useEffect } from 'react';

export const StarBackground = () => {
    const [stars, setStars] = useState([]);
    const [meteors, setMeteors] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Check if dark mode is active
    useEffect(() => {
        const checkDarkMode = () => {
            const isDark = document.documentElement.classList.contains('dark');
            setIsDarkMode(isDark);
        };

        // Check on mount
        checkDarkMode();

        // Watch for changes to the dark class
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const generateStars = () => {
            const width = window.innerWidth || 1920;
            const height = window.innerHeight || 1080;
            const numberOfStars = Math.max(100, Math.floor((width * height) / 10000));
            const newStars = [];

            for (let i = 0; i < numberOfStars; i++) {
                newStars.push({
                    id: i,
                    size: Math.random() * 3 + 1,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    opacity: Math.random() * 0.5 + 0.5,
                    animationDuration: Math.random() * 4 + 2,
                });
            }
            setStars(newStars);
        };

        const generateMeteors = () => {
            const numberOfMeteors = 5;
            const newMeteors = [];

            for (let i = 0; i < numberOfMeteors; i++) {
                newMeteors.push({
                    id: i,
                    size: Math.random() * 1.5 + 1,
                    x: Math.random() * 100,
                    y: Math.random() * 15, // Start from top 15% of screen
                    delay: Math.random() * 25, // Stagger the appearance
                    animationDuration: Math.random() * 1.5 + 2.5, // 2.5-4 seconds
                });
            }
            setMeteors(newMeteors);
        };

        generateStars();
        generateMeteors();

        const handleResize = () => {
            generateStars();
            generateMeteors();
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Only render stars in dark mode
    if (!isDarkMode) {
        return null;
    }
    
    return (
        <div 
            style={{ 
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                pointerEvents: 'none',
                zIndex: 1
            }}
        >
            {stars.map((star) => (
                <div 
                    key={star.id} 
                    style={{
                        position: 'absolute',
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        backgroundColor: '#ffffff',
                        borderRadius: '50%',
                        opacity: star.opacity,
                        boxShadow: '0 0 10px 2px rgba(255,255,255,0.4)',
                        animation: `pulse-subtle ${star.animationDuration}s ease-in-out infinite`,
                    }}
                />
            ))}
            {meteors.map((meteor) => (
                <div 
                    key={meteor.id} 
                    style={{
                        position: 'absolute',
                        width: `${meteor.size * 10}px`,
                        height: '2px',
                        left: `${meteor.x}%`,
                        top: `${meteor.y}%`,
                        background: 'linear-gradient(to right, rgba(255,255,255,1), rgba(173,216,230,0.8), rgba(255,255,255,0))',
                        borderRadius: '2px',
                        boxShadow: '0 0 10px 1px rgba(173,216,230,0.5), 0 0 20px 2px rgba(255,255,255,0.3)',
                        animation: `meteor ${meteor.animationDuration}s ease-out infinite`,
                        animationDelay: `${meteor.delay}s`,
                        transformOrigin: 'left center',
                    }}
                />
            ))}
        </div>
    );
};