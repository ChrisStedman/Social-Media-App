import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

import LoginForm from './Forms/LoginForm'

const NavigationBar = ({setUser}) => {
    const user = useSelector(state => state.user)
    const [isActive, setIsActive] = useState(false);

    return(
    <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
        
        <div className={`navbar-burger burger ${isActive ? "is-active" : ""}`}>
            <p onClick={() => setIsActive(!isActive)} role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </p>
        </div>

        <div className={`navbar-menu ${isActive ? "is-active has-text-centered" : ""}`}>
            <div className="navbar-start is-half">
                <Link to="/" className="navbar-item">Home</Link>
                <Link to="/explore" className="navbar-item">Explore</Link>
                <Link to="/search" className="navbar-item">Search</Link>

                {user !== null ?
                    <>
                        <Link to="/users" className="navbar-item">Users</Link>
                        <Link to="/follows" className="navbar-item">My Follows</Link>
                        <Link to="/profile" className="navbar-item">Your Profile</Link>
                    </> : <>
                        <Link to="/create-account" className="navbar-item">Create Account</Link>
                    </>
                } </div>

            <div className="navbar-end">
                <LoginForm setUser={setUser} className="navbar-item" /></div>
        </div>
    </nav>
    )

}

export default NavigationBar