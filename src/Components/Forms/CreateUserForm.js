import React, { useState } from 'react'
import userServices from '../../services/userServices'

const CreateUserForm = ({ setUser, addUser }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [notification, setNotification] = useState({show: false, message: ""})

    //Check provided passwords match makes necessary calls to update DB and state
    const formHandler = (event) => {
        event.preventDefault()
        if (password !== confirmPassword) {
            alert("Passwords do not match. Please try again.")
        } else {

            userServices.createUser(username, password)
                .then(data => {
                    window.localStorage.setItem('loggedUser', JSON.stringify(data))
                    setUser(data)
                    addUser(data.details)
                    setUsername("")
                    setPassword("")
                    setConfirmPassword("")
                    setNotification({show: true, 
                        message : "Sorry,  user with that username already exists."})
                    
                }
                ).catch((error) => {
                    console.log("eror rinfo",error.message)
                    setUsername("")
                    setPassword("")
                    setConfirmPassword("")
                    setNotification({show: true, 
                        message : "Sorry,  user with that username already exists."})
                })
        }
    }

    return (
        <div className="card column is-half is-offset-one-quarter">
            <div className="card-content">
                <p className="title has-text-centered">Create New Account</p>
                {notification.show ?
                    <div className="notification is-small is-danger has-text-centered">
                        <p>{notification.message}</p>
                    </div> :
                    <> </>
                }
                <form onSubmit={formHandler}>
                    <div className="field">
                        <label className="label">Select Username</label>
                        <input type="text" name="username" value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Username"
                            className="input"
                        />
                    </div>

                    <div className="field">
                        <label className="label">Password</label>
                        <input type="password" name="password" value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="***********"
                            className="input"
                        />
                    </div>

                    <div className="field">
                        <label className="label">Confirm Password</label>
                        <input type="password" name="checkPassword" value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            placeholder="***********"
                            className="input"
                        />

                    </div>
                    <div className="field has-text-centered">
                        <input type="submit" value="Create Account" className="button is-dark is-fullwidth" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateUserForm



