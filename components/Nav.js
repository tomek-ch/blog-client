import { useState } from 'react';
import UserOptions from './UserOptions';
import { nav, usernameBtn } from '../styles/Nav.module.css';

function Nav({ username }) {

    const [optionsOpen, setOptionsOpen] = useState(false);
    const toggleOptions = () => setOptionsOpen(prev => !prev);
    const hideOptions = () => setOptionsOpen(false);

    return (
        <nav className={nav}>
            <button
                className={usernameBtn}
                onClick={toggleOptions}
                onBlur={hideOptions}
            >
                {username}
            </button>
            {optionsOpen ? <UserOptions toggle={toggleOptions} /> : ''}
        </nav>
    );
}

export default Nav;