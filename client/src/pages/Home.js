import { useHistory } from "react-router"

export default function Home() {
  const history = useHistory()
  function login() {
    history.push('/login')
  }
  function register() {
    history.push('/register')
  }
  return (
    <div className="container">
      <p className="text-center">Ini Home</p>
      <div className="row text-center">
        <div className="col-md-2 offset-md-4">
          <button className="btn btn-primary" type="button" onClick={login}>Login</button>
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary" onClick={register}>Register</button>
        </div>
      </div>
    </div>
  )
}