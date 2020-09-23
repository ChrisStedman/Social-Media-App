const filterPostReducer = (state = null, action) => {
  switch (action.type) {
    case 'ALL':
      return state
    case 'USER_POSTS':
      return action.data
    case 'SEARCH':
      return action.data
    default:
      return state
  }
}

//Create initial post store
export const initialiseFilteredPosts = () => {
  return dispatch => {
    dispatch({
      type: 'ALL',
      data: null
    })
  }
}

//Set filter by user posts
export const userPosts = (usernames) => {
  return {
    type: "USER_POSTS",
    data: usernames
  }
}

export const setSearch = (search) => {
  return {
    type: "SEARCH",
    data: search
  }
}

export default filterPostReducer