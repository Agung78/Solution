const initialState = {
  userComment: [],
  errors: ''
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case 'USER_COMMENT/SET_USER_COMMENT':
      return { ...state, userComment: payload }
    case 'USER_COMMENT/SET_USER_COMMENT_ERROR':
      return { ...state, errors: payload }
    default:
      return state
  }
}

export default reducer