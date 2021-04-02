import Link from 'next/link';
import { btn } from '../../styles/Btn.module.css';
import { authLinks } from '../../styles/AuthLinks.module.css';

function AuthLinks() {
    return (
        <div className={authLinks}>
            <Link href="/log-in">
                <a className={btn}>Log in</a>
            </Link>
            <Link href="/register">
                <a className={btn}>Register</a>
            </Link>
        </div>
    );
}

export default AuthLinks;