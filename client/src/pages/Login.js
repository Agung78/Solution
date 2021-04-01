import { useState } from "react"
import { useHistory } from "react-router"

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  function handleChange(e) {
    if (e.target.name === 'email') {
      setEmail(e.target.value)
    } else {
      setPassword(e.target.value)
    }
  }
  async function login() {
    console.log(email, password)
    try {
      const response = await fetch('http://localhost:3001/owner/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()
      if (data.msg) {
        throw false
      } else {
        localStorage.setItem('userLogin', JSON.stringify(data))
        history.push('/landingpage')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="container">
      <p className="text-center">Ini Login</p>
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                onChange={(e) => handleChange(e)} name="email" />
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                onChange={(e) => handleChange(e)} name="password" />
            </div>
            <button type="button" className="btn btn-primary" onClick={login}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}