import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '../Button'
import loginService from '../../services/loginServices'

const LoginForm = ({ setUser }) => {
    const user = useSelector(state => state.user)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    //Attempts login with server - sets user or raises alert in error
    const formHandler = (event) => {
        event.preventDefault()
        loginService.login(username, password)
            .then(data => {
                window.localStorage.setItem('loggedUser', JSON.stringify(data))
                setUser(data)
                setUsername("")
                setPassword("")
            }
            ).catch(error => {
                alert("Login Unsuccessful")
                setUsername("")
                setPassword("")
            })
    }

    const logout = () => {
        window.localStorage.removeItem('loggedUser')
        setUser(null)
    }

    //If user logged in
    if (user) {
        return (
            <div className="field is-horizontal">
                <div className="field-body">
                    <div className="field is-hidden-touch mt-3">
                        <h1>Logged in as: {user.details.username}!</h1>
                    </div>
                    <div className="field mt-1 mr-5">
                        <Button eventHandler={logout} action="Logout" addStyle="is-danger" />
                    </div>
                </div>
            </div>
        )
    } else {
        //If user not logged in
        return (
            <form onSubmit={formHandler}>
                <div className="field is-horizontal">
                    <div className="field-body mr-5">

                        <div className="field mt-1">
                            <input type="text" name="username" value={username}
                                onChange={e => setUsername(e.target.value)}
                                placeholder="Username"
                                className="input"
                            />
                        </div>

                        <div className="field mt-1">
                            <input type="password" name="password" value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Password"
                                className="input"
                            />
                        </div>
                        <div className="field mt-1">
                            <input type="submit" value="Login" className="button is-link" />
                        </div>
                    </div>
                </div>
            </form>
        )



    }
}

export default LoginForm