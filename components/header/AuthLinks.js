import Link from 'next/link';
import { ctaBtn } from '../../styles/CtaBtn.module.css';
import { link } from '../../styles/InlineLink.module.css';
import { authLinks } from '../../styles/AuthLinks.module.css';

function AuthLinks() {
    return (
        <div className={authLinks}>
            <Link href="/log-in">
                <a className={link}>Log in</a>
            </Link>
            <Link href="/register">
                <a className={ctaBtn}>Register</a>
            </Link>
        </div>
    );
}

export default AuthLinks;