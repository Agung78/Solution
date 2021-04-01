import { useState } from "react"
import { useHistory } from "react-router"

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const history = useHistory()

  function handleChange(e) {
    if (e.target.name === 'name') {
      setName(e.target.value)
    }
    if (e.target.name === 'email') {
      setEmail(e.target.value)
    }
    if (e.target.name === 'password') {
      setPassword(e.target.value)
    }
    if (e.target.name === 'role') {
      setRole(e.target.value)
    }
  }

  async function register() {
    // console.log(name, email, password, role)
    try {
      let response
      if (role === 'owner') response = await fetch('http://localhost:3001/owner/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, role })
      })
      if (role === 'worker') response = await fetch('http://localhost:3001/worker/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, role })
      })
      const data = await response.json()
      // console.log(data)
      history.push('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container">
      <p className="text-center">Ini Register</p>
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Name</label>
              <input type="text" className="form-control" name="name" placeholder="Name"
                onChange={(e) => handleChange(e)} />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" name="email" aria-describedby="emailHelp" placeholder="Enter email"
                onChange={(e) => handleChange(e)} />
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" name="password" placeholder="Password"
                onChange={(e) => handleChange(e)} />
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">Options</label>
              </div>
              <select class="custom-select" id="inputGroupSelect01" name="role" onChange={(e) => handleChange(e)}>
                <option selected>Choose...</option>
                <option value="owner">Owner</option>
                <option value="worker">Worker</option>
              </select>
            </div>
            <button type="button" className="btn btn-primary" onClick={register}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}