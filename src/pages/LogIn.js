import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context';

function LogIn() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const { setCurrentUser } = useContext(Context);

    const handleChange = cb => e => {
        const { value } = e.target;
        cb(value);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'post',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.status === 200)
                setCurrentUser(await response.json());
            else if (response.status === 400)
                setErrors((await response.json()).map(err => <li key={err}>{err}</li>));

        } catch {
            setErrors(['There was a network error']);
        }
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
            <ul>{errors}</ul>
        </form>
    );
}

export default LogIn;