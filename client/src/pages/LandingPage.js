import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import { useDispatch, useSelector } from 'react-redux'
import { getUserContent, setUserContentError } from '../store/actions/userContent'

export default function LandingPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userContent, setUserContent] = useState([])
  const dataContent = useSelector(state => state.userContentReducer.userContent)
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(async () => {
    try {
      const data = await dispatch(getUserContent(JSON.parse(localStorage.getItem('userLogin')).id))
      setUserContent(data)
    } catch (error) {
      setUserContentError(error.message)
    }
  }, [location.key])

  function handleChange(e) {
    if (e.target.name === 'title') {
      setTitle(e.target.value)
    } else {
      setContent(e.target.value)
    }
  }
  async function post() {
    try {
      const response = await fetch('http://localhost:3001/content/create', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content, UserId: JSON.parse(localStorage.getItem('userLogin')).id })
      })
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  async function check() {
    console.log(dataContent)
  }

  return (
    <div className="container">
      <p className="text-center">Ini LandingPage</p>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <form>
            <p className="text-center">Create Task</p>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Title</label>
              <input type="text" className="form-control" placeholder="Enter title"
                onChange={(e) => handleChange(e)} name="title" />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="text" className="form-control" placeholder="Enter content"
                onChange={(e) => handleChange(e)} name="content" />
            </div>
            <button type="button" className="btn btn-primary" onClick={post}>Submit</button>
            <button type="button" className="btn btn-primary" onClick={check}>Check</button>
          </form>
        </div>
      </div>
      <div className="row">
        <p>{JSON.stringify(userContent)}</p>
      </div>
    </div>
  )
}