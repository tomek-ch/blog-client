import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context';

function LogIn() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setCurrentUser } = useContext(Context);

    const handleChange = cb => e => {
        const { value } = e.target;
        cb(value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        setCurrentUser({
            username,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
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
                    type="password"
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