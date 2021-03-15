import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppContext } from '../components/Context';
import { btn } from '../styles/Btn.module.css';
import { form, input } from '../styles/Form.module.css';
import Meta from '../components/Meta';

function LogIn() {

    const [userData, setUserData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
    });

    const [errors, setErrors] = useState([]);
    const { signIn, currentUser } = useAppContext();

    const router = useRouter();
    if (currentUser) router.push('/');

    const handleChange = e => {
        const { value, name } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/users', {
                method: 'post',
                body: JSON.stringify(userData),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.status === 200)
                signIn(await response.json());
            else if (response.status === 400)
                setErrors((await response.json()).map(err => <li key={err}>{err}</li>));

        } catch {
            setErrors(['There was a network error']);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={form}>
            <Meta title="Sign up to blogg" />
            <h2>Sign up</h2>
            <label>
                Username:
                <input
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                    className={input}
                />
            </label>
            <label>
                First name:
                <input
                    type="text"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                    className={input}
                />
            </label>
            <label>
                Last name:
                <input
                    type="text"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                    className={input}
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    className={input}
                />
            </label>
            <button
                type="submit"
                className={btn}
                disabled={!userData.username || !userData.password || !userData.firstName}
            >Sign up</button>
            <ul>{errors}</ul>
            <p>Already have an account? <Link href="/log-in">Sign in</Link></p>
        </form>
    );
}

export default LogIn;