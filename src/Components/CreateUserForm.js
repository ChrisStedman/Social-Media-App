import React, { useState } from 'react'
import createUserServices from '../services/createUserServices'


const CreateUserForm = ({ setUser, addUser }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const formHandler = (event) => {
        event.preventDefault()

        if (password !== confirmPassword) {
            alert("Passwords do not match. Please try again.")
        } else {

            ////////////////////////////////////////////////////////////////Need better error checking
            createUserServices.createUser(username, password)
                .then(data => {

                    setUser(data)
                    addUser(data.details)
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
        <div className="card column is-half is-offset-one-quarter">
            <div className="card-content">
                <p className="title has-text-centered">Create New Account</p>
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
                    <input type="submit" value="Login" className="button is-dark is-fullwidth" />
                    </div>

                </form>
            </div>
        </div>
    )

}


export default CreateUserForm



