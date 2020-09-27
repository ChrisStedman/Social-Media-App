import axios from 'axios'
const baseURL = '/api/posts'

//Return All posts
const getAllPosts = async () => {
    const response = await axios.get(baseURL)
    return response.data
}

//Create new post
const createPost = async (newPost, user) => {
    if(!user){
        return new Promise(() => null)
    }
    
    const config = {
        headers: {Authorisation: "Bearer " + user.token}
    }

    const response = await axios.post(baseURL, newPost, config)
    return response.data    
}

//Update post - General
const updatePost = async (postID, likes, user) => {

    if(!user){
        return new Promise(() => null)
    }

    const config = {
        headers: {Authorisation: "Bearer " + user.token}
    }
    
    const response = await axios.put(baseURL + "/" + postID, likes, config)
 
    return response.data
}

//Delete post
const deletePost =  async (postID, user) => {

    if(!user){
        return new Promise(() => null)
    }

    const config = {
        headers: {Authorisation: "Bearer " + user.token}
    }
   
    const response = await axios.delete(baseURL + '/'+postID, config)
    return response.data
}

export default {getAllPosts, createPost, updatePost, deletePost}