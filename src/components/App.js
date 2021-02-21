import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LogIn from '../pages/LogIn';
import Register from '../pages/Register';
import MainPage from '../pages/MainPage';
import Post from '../pages/Post';

function App() {
    return (
        <Switch>
            <Route path="/log-in">
                <LogIn />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
            <Route exact path="/">
                <MainPage />
            </Route>
            <Route path="/posts/:postId">
                <Post />
            </Route>
        </Switch>
    );
}

export default App;