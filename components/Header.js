import { useContext } from 'react';
import { Context } from './Context';
import Nav from './Nav';
import AuthLinks from './AuthLinks';
import Link from 'next/link';

function Header() {

    const { currentUser } = useContext(Context);

    return (
        <header className="header">
            <div className="container">
                <Link href="/">
                    <h1>Blogg</h1>
                </Link>
                {currentUser ? <Nav username={currentUser.username} /> : <AuthLinks />}
            </div>
        </header>
    );
}

export default Header;