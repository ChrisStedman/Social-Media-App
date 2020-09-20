import axios from 'axios'

const baseURL = 'http://localhost:3001/api/users'

//Return all users
const getAllUsers = () => {
    return axios.get(baseURL)
    .then(response => response.data)
}

//Create new user
const createUser = (username, password) => {
    return axios.post(baseURL, {username, password})
    .then(response => response.data)
}

//Update user - Add username param to follows list
const followUser = (username, user) => {
    if(!user){
        return new Promise(() => null)
    }

    const config = {
        headers: {Authorisation: "Bearer " + user.token}
    }

    const updatedUser = {
        ...user.details,
        follows: [...user.details.follows, username]
    }
    
    return axios.put(baseURL + "/" + user.details.id, updatedUser, config)
    .then(response => response.data)
}

//Update user - Remove username param to follows list
const unfollowUser = (username, user) => {
    if(!user){
        return new Promise(() => null)
    }

    const config = {
        headers: {Authorisation: "Bearer " + user.token}
    }

    const updatedUser = {
        ...user.details,
        follows: user.details.follows.filter(u => u !== username)
    }
    
    return axios.put(baseURL + "/" + user.details.id, updatedUser, config)
    .then(response => response.data)
}


export default {getAllUsers, followUser, unfollowUser, createUser}