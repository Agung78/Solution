import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getUserComment, setUserCommentError } from '../store/actions/userComment'
export default function Comment() {
  const [comment, setComment] = useState('')
  const [userComment, setUserComment] = useState([])
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(async () => {
    try {
      const data = await dispatch(getUserComment(location.state))
      setUserComment(data)
    } catch (error) {
      setUserCommentError(error.message)
    }
  }, [dispatch])

  function handleChange(e) {
    if (e.target.name === 'comment') {
      setComment(e.target.value)
    }
  }
  async function post() {
    try {
      const response = await fetch('http://localhost:3001/comment/create', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: comment, poster: JSON.parse(localStorage.getItem('userLogin')).email, ContentId: location.state
        })
      })
      const data = await dispatch(getUserComment(location.state))
      setUserComment(data)
      setComment('')
    } catch (error) {
      console.log(error)
    }
  }

  function check() {
    console.log(userComment)
  }

  return (
    <div className="container">
      <p className="text-center">Ini Comment</p>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <form>
            <p className="text-center">Create Comment</p>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Content</label>
              <input type="text" className="form-control" placeholder="Enter title"
                onChange={(e) => handleChange(e)} name="comment" value={comment} />
            </div>
            <button type="button" className="btn btn-primary" onClick={post}>Submit</button>
            {/* <button type="button" className="btn btn-primary ml-2" onClick={check}>Check</button> */}
          </form>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-8 offset-md-2">
          {
            userComment.map((val, id) =>
              <div key={id} className="card mb-2 p-3 text-right">
                <p>{val.content}</p>
                <p>Posted by : {val.poster}</p>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}