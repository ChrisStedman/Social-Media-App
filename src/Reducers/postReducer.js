import postServices from '../services/postServices'

const postReducer = (state = [], action) => {
    switch (action.type){
      case 'INIT_POSTS':
          return action.data
      case 'NEW_POST':
        return [action.data, ...state]
      case 'TOGGLE_LIKES': {
        const id = action.data.id
        return state.map(post => post.id === id ? action.data : post)
      }
      case 'DELETE_POST':
        return state.filter(post => post.id !== action.data)
      default:
        return state
    }
  }

  //Create initial post store
  //Await response from server - Sort & then set state
  export const initialisePosts = () => {
      return async dispatch => {
        const posts = await postServices.getAllPosts()
        const sortedPosts = posts.sort((post1, post2) =>
        new Date(post2.timestamp) - new Date(post1.timestamp)
          )
        dispatch({ 
          type: 'INIT_POSTS',
          data: sortedPosts
      })
  }
}

  //Add new post to store
  //Await response from server then set state
  export const createPost = (post, user) => {
    return async dispatch => {
      const newPost = await postServices.createPost(post, user)
      dispatch({
        type: "NEW_POST",
        data : newPost
      })
    }
  }
  
  //Add likes to post
  //Await response from server then set state
  export const toggleLikes = (postID, likes, user) => {
    return async dispatch => {
      const updatedPost = await postServices.updatePost(postID, likes, user)
      dispatch({
        type: "TOGGLE_LIKES",
        data : updatedPost
      })
    }
  }

  //Delete Post
  //Await response from server then set state
  export const deletePostID = (id, user) => {
    return async dispatch => {
      await postServices.deletePost(id, user)
      dispatch({
        type: "DELETE_POST",
        data : id
      })
    }
  }

  export default postReducer