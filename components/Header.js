import { useContext } from 'react';
import { Context } from './Context';
import Nav from './Nav';
import AuthLinks from './AuthLinks';
import Link from 'next/link';
import { container } from '../styles/Header.module.css';

function Header() {

    const { currentUser } = useContext(Context);

    return (
        <header>
            <div className={container}>
                <Link href="/">
                    <a><h1>Blogg</h1></a>
                </Link>
                {currentUser ? <Nav username={currentUser.username} /> : <AuthLinks />}
            </div>
        </header>
    );
}

export default Header;