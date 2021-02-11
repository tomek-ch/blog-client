import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context';

function LogIn() {

    const [userData, setUserData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
    });
    const { setCurrentUser } = useContext(Context);

    const handleChange = e => {
        const { value, name } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        setCurrentUser(userData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <p>
                Sign up to manage blog's content.
                <br />
                Already have an account? <Link to="/sign-in">Sign in</Link>
            </p>
            <label>
                Username:
                <input
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                />
            </label>
            <label>
                First name:
                <input
                    type="text"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                />
            </label>
            <label>
                Last name:
                <input
                    type="text"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                />
            </label>
            <button
                type="submit"
                disabled={!userData.username || !userData.password || !userData.firstName}
            >Sign up</button>
        </form>
    );
}

export default LogIn;