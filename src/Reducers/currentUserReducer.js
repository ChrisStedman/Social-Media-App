const currentUserReducer = (state = null, action) => {
    switch (action.type){
      case 'LOGIN':
        return action.data
    case 'UPDATE_USER':
            return {token: state.token, details : action.data}
      default:
        return state
    }
  }

  //Set user in store
  export const userLogin = (user) => {
    return {
      type: "LOGIN",
      data : user
    }
  }

  //Update user in store
  export const updateCurrentUser = (user) => {
    return {
        type: "UPDATE_USER",
        data : user
    }
}

  export default currentUserReducer