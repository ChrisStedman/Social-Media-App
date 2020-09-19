const userReducer = (state = [], action) => {
    switch (action.type){
      case 'INIT_USERS':
          return action.data
      case 'NEW_USER':
        return [...state, action.data]  
      default:
        return state
    }
  }

  export const initialiseUsers = (users) => {
      return {
          type: 'INIT_USERS',
          data: users
      }
  }

  export const createUser = (user) => {
    return {
      type: "NEW_USER",
      data : user
    }
  }



  export default userReducer