const currentUserReducer = (state = null, action) => {
    switch (action.type){
      case 'LOGIN':
        return action.data  
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

  export default currentUserReducer