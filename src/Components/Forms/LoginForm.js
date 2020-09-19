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
            <div>
                <h1>Login Successful: Welcome {user.name}!</h1>
                <Button eventHandler={() => setUser(null)} action="Logout" />
            </div>
        )
    } else {

        return (
            
            <form onSubmit={formHandler}>
                <div className="field is-horizontal">
                    <div className="field-body">
                    
                    <div className="field">
                    <input type="text" name="username" value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Username"
                        className="input"
                    />
                    </div>

                    <div className="field">
                    <input type="password" name="password" value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                        className="input"
                    />
                    </div>
                    <div className="field">
                    <input type="submit" value="Login" className="button is-link"/>
                    </div>
                    </div>
                </div>
            </form>
        )

  

    }
}

export default LoginForm