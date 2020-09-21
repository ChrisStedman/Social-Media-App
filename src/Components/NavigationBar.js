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
        <div id="background-img">
            <nav className="navbar is-dark" role="navigation" aria-label="main navigation" id="see-through">
            <Link class="navbar-item" to="/" id="logo">
                <img src="https://pixabay.com/get/54e1dc414c53ab14f1dc8460da29317e1539d7e2525871_640.png" width="28" height="28" />
                    </Link>
                <div className={`navbar-burger burger ${isActive ? "is-active" : ""}`}>
                    <p onClick={() => setIsActive(!isActive)} role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </p>
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