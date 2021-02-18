import React, { useContext } from 'react';
import Nav from '../components/Nav';
import { Context } from '../Context';

function Dashboard() {

    const { currentUser } = useContext(Context);

    return (
        <>
            <h1>Hello {currentUser.username}</h1>
            <Nav user={currentUser} />
        </>
    );
}

export default Dashboard;