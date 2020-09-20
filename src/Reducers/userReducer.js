const userReducer = (state = [], action) => {
    switch (action.type){
      case 'INIT_USERS':
          return action.data
      case 'NEW_USER':
        return [...state, action.data]  
      case 'UPDATE_USER':
        const userID = action.data.id
        
        return state.map(u => u.id === userID ? action.data : u)
      default:
        return state
    }
  }

  //Create initial user store
  export const initialiseUsers = (users) => {
      return {
          type: 'INIT_USERS',
          data: users
      }
  }

  //Add new user to user store
  export const createUser = (user) => {
    return {
      type: "NEW_USER",
      data : user
    }
  }

  export const updateUser = (user) => {
    return {
      type: "UPDATE_USER",
      data: user
    }
  }

  export default userReducer