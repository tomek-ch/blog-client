import React from 'react';
import { Link } from 'react-router-dom';

function AuthLinks() {
    return (
        <nav className="auth-links">
            <Link to="/log-in" className="btn">Log in</Link>
            <Link to="/register" className="btn">Register</Link>
        </nav>
    );
}

export default AuthLinks;