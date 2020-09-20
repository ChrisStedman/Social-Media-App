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
  export const initialisePosts = (posts) => {
      return {
          type: 'INIT_POSTS',
          data: posts
      }
  }

  //Add new post to store
  export const createPost = (post) => {
    return {
      type: "NEW_POST",
      data : post
    }
  }
  
  //Add likes to post
  export const toggleLikes = (post) => {
    return {
      type: "TOGGLE_LIKES",
      data : post
    }
  }

  export const deletePostID = (id) => {
    return {
      type: "DELETE_POST",
      data : id
    }
  }

  export default postReducer