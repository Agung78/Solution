export function setUserComment(payload) {
    return {
      type: 'USER_COMMENT/SET_USER_COMMENT',
      payload
    }
  }
  
  export function setUserCommentError(payload) {
    return {
      type: 'USER_COMMENT/SET_USER_COMMENT',
      payload
    }
  }
  
  export function getUserComment(ContentId) {
    return async (dispatch) => {
      try {
        const response = await fetch('http://localhost:3001/comment/list', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ContentId })
        })
        const data = await response.json()
        dispatch(setUserComment(data))
        return data
      } catch (error) {
        dispatch(setUserCommentError(error.message))
      }
    }
  }