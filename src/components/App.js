import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LogIn from '../pages/LogIn';
import Register from '../pages/Register';
import MainPage from '../pages/MainPage';
import Post from '../pages/Post';
import Header from './Header';
import { Context } from '../Context';

function App() {

    const { currentUser } = useContext(Context);

    return (
        <>
            <Header />
            <Switch>
                <Route path="/log-in">
                    {currentUser ? <Redirect to="/" /> : <LogIn />}
                </Route>
                <Route path="/register">
                    {currentUser ? <Redirect to="/" /> : <Register />}
                </Route>
                <Route exact path="/">
                    <MainPage />
                </Route>
                <Route path="/posts/:postId">
                    <Post />
                </Route>
            </Switch>
        </>
    );
}

export default App;