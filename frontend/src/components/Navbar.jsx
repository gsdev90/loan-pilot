import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Define paths where staff nav should be hidden
    const hideStaffNav = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup';

    const handleLogout = () => {
        localStorage.removeItem('staffToken');
        navigate('/login');
    };

    return (
        <nav style={navStyle}>
            {/* <Link to="/" style={linkStyle}>Home</Link> */}

            {!hideStaffNav && (
                <>
                    <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
                    <Link to="/loans" style={linkStyle}>Loans</Link>
                    <Link to="/lenders" style={linkStyle}>Lenders</Link>
                    <button onClick={handleLogout} style={logoutButtonStyle}>Logout</button>
                </>
            )}
        </nav>
    );
};

// Simple inline styles (can be replaced by a CSS file)
const navStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    background: '#f5f5f5',
    padding: '10px 20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const linkStyle = {
    textDecoration: 'none',
    color: '#1976d2',
    fontWeight: 'bold',
};

const logoutButtonStyle = {
    padding: '6px 12px',
    background: '#e53935',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};

export default Navbar;
