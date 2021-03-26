import { useAppContext } from './Context';
import AuthLinks from './AuthLinks';
import Link from 'next/link';
import { container, header } from '../styles/Header.module.css';
import SearchBar from './SearchBar';
import UserOptions from './UserOptions';

function Header() {

    const { currentUser, signOut } = useAppContext();

    return (
        <header className={header}>
            <div className={container}>
                <Link href="/">
                    <a><h1>Blogg</h1></a>
                </Link>
                <SearchBar />
                {currentUser ? <UserOptions {...{ currentUser, signOut }} /> : <AuthLinks />}
            </div>
        </header>
    );
}

export default Header;