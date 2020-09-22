import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { setSearch } from '../Reducers/filterPostReducer'

import LoginForm from './Forms/LoginForm'
import Hero from './Hero'

const NavigationBar = ({ setUser }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [isActive, setIsActive] = useState(false);

    return (
        <div className="field" id="background-img">
            <nav className="navbar is-dark" role="navigation" aria-label="main navigation" id="see-through">
                <div className="navbar-brand">
                <a className="navbar-item" href="/" id="logo">
                    <img src="/robot_logo.png" alt="logo" width="28" height="28" />
                </a>
                <div className={`navbar-burger burger ${isActive ? "is-active" : ""}`}>
                    <p onClick={() => setIsActive(!isActive)} role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </p>
                </div>
                </div>
                <div className={`navbar-menu ${isActive ? "is-active has-text-centered" : ""}`}>
                    <div className="navbar-start is-half" id="white-text">
                        <Link to="/" className="navbar-item">Home</Link>
                        <Link to="/explore" className="navbar-item">Explore</Link>
                        <Link to="/search" className="navbar-item" onClick={() => dispatch(setSearch(null))}>Search</Link>

                        {user !== null ?
                            <>
                                <Link to="/users" className="navbar-item" onClick={() => dispatch(setSearch(null))}>Users</Link>
                                <Link to="/follows" className="navbar-item">My Follows</Link>
                                <Link to="/profile" className="navbar-item" onClick={() => dispatch(setSearch(null))}>Your Profile</Link>
                            </> : <>
                                <Link to="/create-account" className="navbar-item">Create Account</Link>
                            </>
                        } </div>

                    <div className="navbar-end">
                        <LoginForm setUser={setUser} className="navbar-item" /></div>
                </div>
            </nav>
            {user ? <> </> :
                <Hero />
            }
        </div>
    )

}

export default NavigationBar