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
                Sign up to manage blog's content.
                <br />
                Already have an account? <Link to="/sign-in">Sign in</Link>
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
            <button
                type="submit"
                disabled={!username || !password}
            >Sign up</button>
        </form>
    );
}

export default LogIn;