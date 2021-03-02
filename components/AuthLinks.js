import Link from 'next/link';

function AuthLinks() {
    return (
        <nav className="auth-links">
            <Link href="/log-in">
                <a className="btn">Log in</a>
            </Link>
            <Link href="/register">
                <a className="btn">Register</a>
            </Link>
        </nav>
    );
}

export default AuthLinks;