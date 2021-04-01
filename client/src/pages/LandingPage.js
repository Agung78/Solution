import { useEffect, useState } from "react"
import { useLocation } from "react-router"

export default function LandingPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const location = useLocation()

  useEffect(() => {
    console.log(localStorage.getItem('userLogin'))
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
          </form>
        </div>
      </div>
    </div>
  )
}