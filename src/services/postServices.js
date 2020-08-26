import axios from 'axios'
const baseURL = 'http://localhost:3001/posts'

const getAllPosts = () => {
    return axios.get(baseURL)
    .then(response => response.data)
}

const createPost = (newPost) => {
    return axios.post(baseURL, newPost)
    .then(response => response.data)
}

export default {getAllPosts, createPost}