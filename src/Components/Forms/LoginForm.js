import React, { useState } from 'react'
import loginService from '../../services/loginServices'
import Button from '../Button'
import { useSelector } from 'react-redux'

const LoginForm = ({setUser}) => {
    const user = useSelector(state => state.user)
    

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const formHandler = (event) => {
        event.preventDefault()
        loginService.login(username, password)
            .then(data => {
                
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

    if (user) {
        return (
            <div className="field is-horizontal">
                <div className="field-body">
                <div className="field is-hidden-touch mt-3">
                    <h1>Logged in as: {user.details.username}!</h1>
                </div>
                <div className="field mt-1 mr-5">
                <Button eventHandler={() => setUser(null)} action="Logout" addStyle="is-danger"/>
                </div>
                </div>
            </div>
        )
    } else {

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
                    <input type="submit" value="Login" className="button is-link"/>
                    </div>
                    </div>
                </div>
            </form>
        )

  

    }
}

export default LoginForm