import React, { useContext } from 'react';
import { Context } from '../Context';
import Nav from './Nav';
import AuthLinks from './AuthLinks';
import { Link } from 'react-router-dom';

function Header() {

    const { currentUser } = useContext(Context);

    return (
        <header>
            <Link to="/">
                <h1>Blogg</h1>
            </Link>
            {currentUser ? <Nav /> : <AuthLinks />}
        </header>
    );
}

export default Header;