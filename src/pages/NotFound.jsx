import { Link, useLocation } from 'react-router-dom';

export const NotFound = () => {
    const location = useLocation();
    return (
        <div style={{padding: '2rem', fontFamily: 'system-ui, sans-serif'}}>
            <h1 style={{fontSize: '2rem', marginBottom: '0.5rem'}}>404 — Page Not Found</h1>
            <p style={{marginBottom: '1rem'}}>No route matches <strong>{location.pathname}</strong></p>
            <Link to="/" style={{color: '#0969da'}}>Back to Home</Link>
        </div>
    );

};