import React from 'react';
import { Link } from 'react-router-dom';

function AuthLinks() {
    return (
        <nav>
            <Link to="/log-in">Log in</Link>
            <Link to="/register">Register</Link>
        </nav>
    );
}

export default AuthLinks;