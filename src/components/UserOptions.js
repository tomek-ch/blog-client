import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../Context';

function UserOptions({ toggle }) {

    const { setCurrentUser } = useContext(Context);
    const history = useHistory();

    const signOut = () => {
        setCurrentUser(null);
        history.replace('/');
    };

    return (
        <div className="options">
            <Link to="/profile" onClick={toggle} className="option">Profile</Link>
            <Link to="/settings" onClick={toggle} className="option">Settings</Link>
            <div onClick={signOut} className="option">Sign out</div>
        </div>
    );
}

export default UserOptions;