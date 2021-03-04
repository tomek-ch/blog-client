import { useState, useContext } from 'react';
import Link from 'next/link';
import { Context } from '../components/Context';
import { btn } from '../styles/Btn.module.css';
import { form, input } from '../styles/Form.module.css';

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
            const response = await fetch('http://localhost:5000/login', {
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
        <form onSubmit={handleSubmit} className={form}>
            <h2>Sign in</h2>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={handleChange(setUsername)}
                    className={input}
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={handleChange(setPassword)}
                    className={input}
                />
            </label>
            <button
                type="submit"
                className={btn}
                disabled={!username || !password}
            >Sign up</button>
            <ul>{errors}</ul>
            <p>Don't have an account? <Link href="/register">Sign up</Link></p>
        </form>
    );
}

export default LogIn;