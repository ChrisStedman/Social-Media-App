import axios from 'axios'

const baseURL = '/api/users'

//Return all users
const getAllUsers = async () => {
    const response = await axios.get(baseURL)
    return response.data
}

//Create new user
const createUser = async (username, password) => {
    const response = await axios.post(baseURL, { username, password })
    return response.data
}

//Update user - Add username param to follows list
const followUser = async (username, user) => {
    if (!user) {
        return new Promise(() => null)
    }

    const config = {
        headers: { Authorisation: "Bearer " + user.token }
    }

    const updatedUser = {
        ...user.details,
        follows: [...user.details.follows, username]
    }

    const response = await axios.put(baseURL + "/" + user.details.id, updatedUser, config)
    return response.data
}

//Update user - Remove username param from follows list
const unfollowUser = async (username, user) => {

    if (!user) {
        return new Promise(() => null)
    }

    const config = {
        headers: { Authorisation: "Bearer " + user.token }
    }

    const updatedUser = {
        ...user.details,
        follows: user.details.follows.filter(u => u !== username)
    }

    const response = await axios.put(baseURL + "/" + user.details.id, updatedUser, config)
    return response.data
}

//Delete user
const deleteUser = async (user) => {

    if (!user) {
        return new Promise(() => null)
    }

    const config = {
        headers: { Authorisation: "Bearer " + user.token }
    }

    const response = await axios.delete(baseURL + '/' + user.details.id, config)
    return response.data
}


export default { getAllUsers, followUser, unfollowUser, createUser, deleteUser }