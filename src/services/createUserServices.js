import axios from 'axios'
const baseURL = 'http://localhost:3001/api/create-user'

const createUser = (username, password) => {
    return axios.post(baseURL, {username, password})
    .then(response => response.data)
}

export default {createUser}