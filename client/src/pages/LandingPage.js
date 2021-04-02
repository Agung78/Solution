import { useContext, useEffect, useState } from "react"
import { useLocation, useHistory } from "react-router"
import { useDispatch, useSelector } from 'react-redux'
import { getUserContent, setUserContentError, deleteUserContentId } from '../store/actions/userContent'
import Swal from 'sweetalert2'

export default function LandingPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userContent, setUserContent] = useState([])
  const location = useLocation()
  const dispatch = useDispatch()
  const history = useHistory()

  const fetchData = async () => {
    try {
      const data = await dispatch(getUserContent(JSON.parse(localStorage.getItem('userLogin')).id))
      setUserContent(data)
    } catch (error) {
      setUserContentError(error.message)
    }
  }

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
      const data = await dispatch(getUserContent(JSON.parse(localStorage.getItem('userLogin')).id))
      setUserContent(data)
      setTitle('')
      setContent('')
    } catch (error) {
      console.log(error)
    }
  }

  function edit(id) {
    history.push({ pathname: '/edit', state: id })
  }

  async function deleter(id) {
    Swal.fire({
      title: 'Do you want to delete the task ?',
      showDenyButton: true,
      confirmButtonText: `Delete`,
      denyButtonText: `Nope`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          dispatch(deleteUserContentId(id))
          fetchData()
          history.push('/landingpage')
          Swal.fire('Saved!', '', 'success')
        } catch (error) {
          console.log(error)
        }
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  function comment(id) {
    history.push({ pathname: '/comment', state: id })
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
                onChange={(e) => handleChange(e)} name="title" value={title} />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Content</label>
              <input type="text" className="form-control" placeholder="Enter content"
                onChange={(e) => handleChange(e)} name="content" value={content} />
            </div>
            <button type="button" className="btn btn-primary" onClick={post}>Submit</button>
          </form>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-8 offset-md-2">
          {
            userContent.map((val, id) =>
              <div key={id} className="card mb-2 p-3">
                <h3>Title   :</h3>
                <p>{val.Content.title}</p>
                <h3>Content :</h3>
                <p>{val.Content.content}</p>
                <div className="row">
                  <button type="button" className="btn btn-warning col-md-2 ml-2" onClick={() => edit(val.Content.id)}>Edit</button>
                  <button type="button" className="btn btn-danger col-md-2 ml-2" onClick={() => deleter(val.Content.id)}>Delete</button>
                  <button type="button" className="btn btn-primary col-md-2 ml-2" onClick={() => comment(val.Content.id)}>Comment</button>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}