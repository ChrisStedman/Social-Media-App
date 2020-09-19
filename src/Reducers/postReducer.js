const postReducer = (state = [], action) => {
    switch (action.type){
      case 'INIT_POSTS':
          return action.data
      case 'NEW_POST':
        return [action.data, ...state]
      case 'UPDATE_LIKES': {
        const id = action.data.id
        const productToChange = state.find(p => p.id === id)
        const updatedProduct = {
          ...productToChange,
          likes : [action.data.user, ...productToChange.likes]
        }
        return state.map(post => post.id === id ? updatedProduct : post)
      }
  
      default:
        return state
    }
  }

  export const initialisePosts = (posts) => {
      return {
          type: 'INIT_POSTS',
          data: posts
      }
  }

  export const createPost = (post) => {
    return {
      type: "NEW_POST",
      data : post
    }
  }
  
  export const addLikes = (id, user) => {
    return {
      type: "UPDATE_LIKES",
      data : {
        id : id,
        user : user
      }
    }
  }

  export default postReducer