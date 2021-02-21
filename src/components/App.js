import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LogIn from '../pages/LogIn';
import Register from '../pages/Register';
import { Context } from '../Context';
import MainPage from '../pages/MainPage';
import Post from '../pages/Post';

function App() {

    const { currentUser } = useContext(Context);

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