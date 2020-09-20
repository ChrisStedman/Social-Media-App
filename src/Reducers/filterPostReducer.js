const filterPostReducer = (state = null, action) => {
    switch (action.type){
      case 'ALL':
          return state
      case 'USER_POSTS':
        return action.data

      default:
        return state
    }
  }

  //Create initial post store
  export const initialiseFilteredPosts = (posts) => {
      return {
          type: 'ALL',
          data: posts
      }
  }

  //Add new post to store
  export const userPosts = (usernames) => {
    return {
      type: "USER_POSTS",
      data : usernames
    }
  }

  export default filterPostReducer