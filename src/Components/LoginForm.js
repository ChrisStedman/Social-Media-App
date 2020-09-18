import React, { useState } from 'react'
import loginService from '../services/loginServices'
import Button from './Button'

const LoginForm = ({ user, setUser }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const formHandler = (event) => {
        event.preventDefault()

        loginService.login(username, password)
            .then(data => {
                
                setUser(data)
                setUsername("")
                setPassword("")
                console.log(data)
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
                <div >
                    <input type="text" name="username" value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                
                    <input type="password" name="password" value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="***********"
                    />
                    <input type="submit" value="Login" />
                </div>
            </form>
        )

  

    }
}

export default LoginForm