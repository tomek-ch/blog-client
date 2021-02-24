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

    const [errors, setErrors] = useState([]);
    const { setCurrentUser } = useContext(Context);

    const handleChange = e => {
        const { value, name } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/users', {
                method: 'post',
                body: JSON.stringify(userData),
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
            <h2>Sign up</h2>
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
                className="btn"
                disabled={!userData.username || !userData.password || !userData.firstName}
            >Sign up</button>
            <ul>{errors}</ul>
            <p>Already have an account? <Link to="/sign-in">Sign in</Link></p>
        </form>
    );
}

export default LogIn;