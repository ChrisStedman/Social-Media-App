import axios from 'axios'
const baseURL = '/api/posts'

//Return All posts
const getAllPosts = () => {
    return axios.get(baseURL)
    .then(response => response.data)
}

//Create new post
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

//Update post - General
const updatePost = (updatedPost, user) => {

    if(!user){
        return new Promise(() => null)
    }

    const config = {
        headers: {Authorisation: "Bearer " + user.token}
    }

    return axios.put(baseURL + "/" + updatedPost.id, updatedPost, config)
    .then(response => response.data)
}

const deletePost =  (postID, user) => {

    if(!user){
        return new Promise(() => null)
    }

    const config = {
        headers: {Authorisation: "Bearer " + user.token}
    }
   
    return axios.delete(baseURL + '/'+postID, config)
    .then(response => response)
}

export default {getAllPosts, createPost, updatePost, deletePost}