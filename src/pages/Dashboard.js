import React, { useContext } from 'react';
import { Context } from '../Context';

function Dashboard() {

    const currentUser = useContext(Context);

    return (
        <h1>Hello {currentUser.name}</h1>
    );
}

export default Dashboard;