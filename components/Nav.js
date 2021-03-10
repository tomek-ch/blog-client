import { useState } from 'react';
import UserOptions from './UserOptions';
import { nav, usernameBtn } from '../styles/Nav.module.css';

function Nav({ user: { username, _id } }) {

    const [optionsOpen, setOptionsOpen] = useState(false);
    const toggleOptions = () => setOptionsOpen(prev => !prev);
    const hideOptions = e => {
        if (!e.relatedTarget?.dataset.link) setOptionsOpen(false);
    };

    return (
        <nav className={nav}>
            <button
                className={usernameBtn}
                onClick={toggleOptions}
                onBlur={hideOptions}
            >
                {username}
            </button>
            {optionsOpen ? <UserOptions toggle={toggleOptions} uid={_id} /> : ''}
        </nav>
    );
}

export default Nav;