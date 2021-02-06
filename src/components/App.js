import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LogIn from './pages/LogIn';
import Register from './pages/Register';

function App() {
    return (
        <Switch>
            <Route path="/sign-in">
                <LogIn />
            </Route>
            <Route path="/sign-up">
                <Register />
            </Route>
        </Switch>
    );
}

export default App;