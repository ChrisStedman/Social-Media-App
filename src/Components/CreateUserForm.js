import React, { useState } from 'react'
import createUserServices from '../services/createUserServices'
import Notification from './Notification'

const CreateUserForm = ({setUser}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const formHandler = (event) => {
        event.preventDefault()

        if(password !== confirmPassword){
            alert("Passwords do not match. Please try again.")
        } else {
        
        ////////////////////////////////////////////////////////////////Need better error checking
        createUserServices.createUser(username, password)
            .then(data => {
                
                setUser(data)
                setUsername("")
                setPassword("")
                setConfirmPassword("")
                
            }
            ).catch(error => {
                alert("Create User Unsuccessful")
                
            })
        }
    }


    return (
        <div>
        <h2>Create New Account</h2>
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

            <input type="password" name="checkPassword" value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="***********"
            />

            <input type="submit" value="Login" />
        </div>
        </form>
        </div>
    )

}


export default CreateUserForm