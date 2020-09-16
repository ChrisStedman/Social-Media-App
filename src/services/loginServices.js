import axios from 'axios'
const baseURL = 'http://localhost:3001/api/login'

const login = (username, password) => {
    return axios.post(baseURL, {username, password})
    .then(response => response.data)
}

export default {login}