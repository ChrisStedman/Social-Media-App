import axios from 'axios'
const baseURL = 'http://localhost:3001/api/posts'

const getAllPosts = () => {
    return axios.get(baseURL)
    .then(response => response.data)
}

const createPost = (newPost, user) => {
    
    if(!user){
        return new Promise(() => null)
    }

    const config = {
        headers: {Authorisation: "Bearer " + user.token}
    }

    return axios.post(baseURL, newPost, config)
    .then(response => response.data)
}

const updatePost = (updatedUnit, user) => {

    if(!user){
        return new Promise(() => null)
    }

    const config = {
        headers: {Authorisation: "Bearer " + user.token}
    }

    return axios.put(baseURL + "/" + updatedUnit.id, updatedUnit, config)
    .then(response => response.data)
}

export default {getAllPosts, createPost, updatePost}