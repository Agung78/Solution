export function setUserContent(payload) {
  return {
    type: 'USER_CONTENT/SET_USER_CONTENT',
    payload
  }
}

export function setUserContentError(payload) {
  return {
    type: 'USER_CONTENT/SET_USER_CONTENT',
    payload
  }
}

export function getUserContent(id) {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:3001/content/list', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      })
      const data = await response.json()
      dispatch(setUserContent(data))
      return data
    } catch (error) {
      dispatch(setUserContentError(error.message))
    }
  }
}

export function getUserContentId(id) {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:3001/content/listid', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      })
      const data = await response.json()
      return data
    } catch (error) {
      dispatch(setUserContentError(error.message))
    }
  }
}

export function updateUserContentId(title, content, id) {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:3001/content/update', {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content, id })
      })
      const data = await response.json()
      return data
    } catch (error) {
      dispatch(setUserContentError(error.message))
    }
  }
}

export function deleteUserContentId(id) {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:3001/content/delete', {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      })
      const data = await response.json()
      return data
    } catch (error) {
      dispatch(setUserContentError(error.message))
    }
  }
}
