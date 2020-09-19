import axios from 'axios'
const baseURL = 'http://localhost:3001/api/users'

const getAllUsers = () => {
    return axios.get(baseURL)
    .then(response => response.data)
}

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


export default {getAllUsers, followUser, unfollowUser}