import { useState } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import { useAppContext } from '../components/Context';
import { ctaBtn } from '../styles/CtaBtn.module.css';
import { link } from '../styles/InlineLink.module.css'
import { form, input } from '../styles/Form.module.css';
import Meta from '../components/Meta';
import api from '../components/apiServerUrl';

function LogIn() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signIn, currentUser } = useAppContext();

    const router = useRouter();
    if (currentUser?._id)
        router.push('/');

    const handleChange = cb => e => {
        const { value } = e.target;
        cb(value);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch(`${api}/log-in`, {
                method: 'post',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.status === 200)
                signIn(await response.json());
            else if (response.status === 400)
                setError((await response.json()).message);

        } catch {
            setError('There was a network error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={form}>
            <Meta title="Sign in to blogg" />
            <h2>Sign in</h2>
            <label>
                Username
                <input
                    type="text"
                    value={username}
                    onChange={handleChange(setUsername)}
                    className={input}
                    maxLength={20}
                    autoFocus
                />
            </label>
            <label>
                Password
                <input
                    type="password"
                    value={password}
                    onChange={handleChange(setPassword)}
                    className={input}
                />
            </label>
            <button
                type="submit"
                className={ctaBtn}
                disabled={!username || !password}
            >Sign in</button>
            <div>{error}</div>
            <p>
                Don't have an account? <Link href="/register"><a className={link}>Sign up</a></Link>
            </p>
        </form>
    );
}

export default LogIn;