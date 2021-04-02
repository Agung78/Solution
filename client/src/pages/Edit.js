import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory, useLocation } from "react-router-dom"
import { updateUserContentId, setUserContentError, getUserContentId } from '../store/actions/userContent'

export default function Edit() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  useEffect(async () => {
    console.log(location.state)
    try {
      const data = await dispatch(getUserContentId(location.state))
      setTitle(data.title)
      setContent(data.content)
    } catch (error) {
      setUserContentError(error.message)
    }
  }, [dispatch])
  function handleChange(e) {
    if (e.target.name === 'title') {
      setTitle(e.target.value)
    } else {
      setContent(e.target.value)
    }
  }
  async function edit() {
    try {
      const data = await dispatch(updateUserContentId(title, content, location.state))
      history.push('/landingpage')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="container">
      <p className="text-center">Ini Edit</p>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <form>
            <p className="text-center">Create Task</p>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Title</label>
              <input type="text" className="form-control" placeholder="Enter title"
                onChange={(e) => handleChange(e)} name="title" value={title} />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Content</label>
              <input type="text" className="form-control" placeholder="Enter content"
                onChange={(e) => handleChange(e)} name="content" value={content} />
            </div>
            <button type="button" className="btn btn-primary" onClick={edit}>Edit</button>
            {/* <button type="button" className="btn btn-primary" onClick={check}>Check</button> */}
          </form>
        </div>
      </div>
    </div>
  )
}