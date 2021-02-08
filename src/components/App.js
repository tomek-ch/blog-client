import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LogIn from '../pages/LogIn';
import Register from '../pages/Register';
import { Context } from '../Context';
import Dashboard from '../pages/Dashboard';

function App() {

    const { currentUser } = useContext(Context);

    return (
        <Switch >
            <Route path="/sign-in">
                {currentUser ? <Dashboard /> : <LogIn />}
            </Route>
            <Route path="/sign-up">
                {currentUser ? <Dashboard /> : <Register />}
            </Route>
            <Route path="/">
                {currentUser ? <Dashboard /> : <Redirect to="/sign-in" />}
            </Route>
        </Switch >
    );
}

export default App;