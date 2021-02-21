import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Post from './Post';

function MainPage() {
    return (
        <Switch>
            <Route exact path="/">
                <Dashboard />
            </Route>
            <Route path="/posts/:postId">
                <Post />
            </Route>
        </Switch>
    )
}

export default MainPage;