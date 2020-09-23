import userServices from '../services/userServices'

const userReducer = (state = [], action) => {
    switch (action.type){
      case 'INIT_USERS':
          return action.data
      case 'NEW_USER':
        return [...state, action.data]  
      case 'UPDATE_USER':
        const userID = action.data.id     
        return state.map(user => user.id === userID ? action.data : user)
      case 'DELETE_USER':
          return state.filter(user => user.id !== action.data)
      default:
        return state
    }
  }

  //Create initial user store
  //Await response from server then set state
  export const initialiseUsers = () => {
    return async dispatch => {
      const users = await userServices.getAllUsers()
      dispatch({
        type: 'INIT_USERS',
          data: users
      })
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

  //Delete user
  //Await response from server then set state
  export const removeUser = (user) => {
    return async dispatch => {
      await userServices.deleteUser(user)
      dispatch({
        type: "DELETE_USER",
        data : user
      })
    }
  }

  export default userReducer