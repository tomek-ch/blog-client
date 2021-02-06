import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function LogIn() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = cb => e => {
        const { value } = e.target;
        cb(value);
    };

    return (
        <form>
            <p>
                Sign in to manage blog's content.
                <br />
                Don't have an account? <Link to="/sign-up">Sign up</Link>
            </p>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={handleChange(setUsername)}
                />
            </label>
            <label>
                Password:
                <input
                    type="text"
                    value={password}
                    onChange={handleChange(setPassword)}
                />
            </label>
        </form>
    );
}

export default LogIn;