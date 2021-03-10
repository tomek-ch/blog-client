import { useState } from 'react';
import UserOptions from './UserOptions';
import { nav } from '../styles/Nav.module.css';

function Nav({ username }) {

    const [optionsOpen, setOptionsOpen] = useState(false);
    const toggleOptions = () => setOptionsOpen(prev => !prev);

    return (
        <nav className={nav}>
            <div onClick={toggleOptions}>{username}</div>
            {optionsOpen ? <UserOptions toggle={toggleOptions}/> : ''}
        </nav>
    );
}

export default Nav;