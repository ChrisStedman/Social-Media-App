import axios from 'axios'
const baseURL = 'http://localhost:3001/users'

const getAllUsers = () => {
    return axios.get(baseURL)
    .then(response => response.data)
}


export default {getAllUsers}