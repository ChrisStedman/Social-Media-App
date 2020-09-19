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

  export const userLogin = (user) => {
    return {
      type: "LOGIN",
      data : user
    }
  }

  export const updateUser = (user) => {
      
    return {
        type: "UPDATE_USER",
        data : user
    }
}

  export default currentUserReducer