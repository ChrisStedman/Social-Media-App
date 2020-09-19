import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Users from './Users'
import User from './User'
import Home from './Views/Home'
import CreateUser from './Views/CreateUser'
import Explore from './Views/Explore'

const NavigationRoutes = ({ likePost, setUser, addUser, addPost, followUser, unfollowUser }) => {
   

    return (
        <Switch>

            <Route path="/explore">
                <Explore likeHandler={likePost} />
            </Route>

            <Route path="/users/:username">
                <User likeHandler={likePost} followUser={followUser} unfollowUser={unfollowUser}/>
            </Route>

            <Route path="/users">
                <Users />
            </Route>

            <Route path="/follows"></Route>

            <Route path="/profile"></Route>

            <Route path="/create-account">
                <CreateUser setUser={setUser} addUser={addUser} />
            </Route>

            <Route path="/">
                <Home addPost={addPost} likePost={likePost} ></Home>

            </Route>
        </Switch>
    )
}

export default NavigationRoutes