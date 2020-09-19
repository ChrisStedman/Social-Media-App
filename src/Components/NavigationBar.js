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
            <a onClick={() => setIsActive(!isActive)} role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div className={`navbar-menu ${isActive ? "is-active has-text-centered" : ""}`}>
            <div className="navbar-start">
                <Link to="/" className="navbar-item">Home</Link>
                <Link to="/explore" className="navbar-item">Explore</Link>

                {user !== null ?
                    <>
                        <Link to="/users" className="navbar-item">Users</Link>
                        <Link to="/follows" className="navbar-item">Follows</Link>
                    </> : <>
                        <Link to="/create-account" className="navbar-item">Create Account</Link>
                    </>
                } </div>

            <div className="navbar-end">
            
                {user === null ?
                    <LoginForm setUser={setUser} className="navbar-item" /> : 
                        <Link to="/profile" className="navbar-item">Profile</Link>
                   
                } </div>
        </div>
    </nav>
    )

}

export default NavigationBar