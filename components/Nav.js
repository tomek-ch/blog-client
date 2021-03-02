import { useState } from 'react';
import UserOptions from './UserOptions';

function Nav({ username }) {

    const [optionsOpen, setOptionsOpen] = useState(false);
    const toggleOptions = () => setOptionsOpen(prev => !prev);

    return (
        <nav>
            <div onClick={toggleOptions}>{username}</div>
            {optionsOpen ? <UserOptions toggle={toggleOptions}/> : ''}
        </nav>
    );
}

export default Nav;