const currentUserReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'UPDATE_USER':
      return { token: state.token, details: action.data }
    default:
      return state
  }
}

//Set user in store
export const setUserLogin = (user) => {
  console.log("Set user login", user )
  return {
    type: "SET_USER",
    data: user
  }
}

//Update user in store
export const updateCurrentUser = (user) => {
  return {
    type: "UPDATE_USER",
    data: user
  }
}

export default currentUserReducer