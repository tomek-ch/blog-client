import { useAppContext } from './Context';
import Nav from './Nav';
import AuthLinks from './AuthLinks';
import Link from 'next/link';
import { container, header } from '../styles/Header.module.css';

function Header() {

    const { currentUser } = useAppContext();

    return (
        <header className={header}>
            <div className={container}>
                <Link href="/">
                    <a><h1>Blogg</h1></a>
                </Link>
                {currentUser ? <Nav user={currentUser} /> : <AuthLinks />}
            </div>
        </header>
    );
}

export default Header;