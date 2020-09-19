import React from 'react'
import CreateUserForm from '../CreateUserForm'

const CreateUser = ({setUser, addUser}) => {
    return(
    <CreateUserForm setUser={setUser} addUser={addUser} />
    )
}

export default CreateUser