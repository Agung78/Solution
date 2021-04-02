import { Switch, Route } from 'react-router';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import LandingPage from './pages/LandingPage'
import Edit from './pages/Edit'
import Comment from './pages/Comment'

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/landingpage">
        <LandingPage />
      </Route>
      <Route path="/edit">
        <Edit />
      </Route>
      <Route path="/comment">
        <Comment />
      </Route>
    </Switch>
  )
}

export default App;
