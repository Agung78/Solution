const initialState = {
  userContent: [],
  errors: ''
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case 'USER_CONTENT/SET_USER_CONTENT':
      return { ...state, userContent: payload }
    case 'USER_CONTENT/SET_USER_CONTENT_ERROR':
      return { ...state, errors: payload }
    default:
      return state
  }
}

export default reducer