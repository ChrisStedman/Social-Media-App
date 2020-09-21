import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import Users from './Users'
import User from './Views/User'
import Home from './Views/Home'
import CreateUser from './Views/CreateUser'
import Explore from './Views/Explore'
import MyFollows from './Views/MyFollows'
import Search from './Views/Search'
import { useSelector } from 'react-redux';



const NavigationRoutes = ({ likePost, setUser, addUser, addPost, deleteUser }) => {
    const user = useSelector(state => state.user)


    return (
        <Switch>

            <Route path="/explore">
                <Explore likeHandler={likePost} />
            </Route>

            <Route path="/users/:username">
                <User likeHandler={likePost} addPost={addPost} deleteUser={deleteUser}/>
            </Route>

            <Route path="/users">
                <Users />
            </Route>

            <Route path="/follows">
                <MyFollows likeHandler={likePost}/>
            </Route>

            <Route path="/search/:query">
                <Search likeHandler={likePost} />
            </Route>


            <Route path="/search">
                <Search likeHandler={likePost} />
            </Route>

            <Route path="/profile">
                {user ?  <Redirect to={`/users/${user.details.username}`} /> : <Redirect to={`/`} />}
               
            </Route>

            <Route path="/create-account">
                {user ? <Redirect to={`/users/${user.details.username}`} /> :
                <CreateUser setUser={setUser} addUser={addUser} />}
            </Route>

            <Route path="/">
                <Home addPost={addPost} likePost={likePost} ></Home>

            </Route>
        </Switch>
    )
}

export default NavigationRoutes