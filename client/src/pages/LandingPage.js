import { useEffect } from "react"
import { useLocation } from "react-router"

export default function LandingPage() {
  const location = useLocation()
  useEffect(() => {
    console.log(localStorage.getItem('userLogin'))
  }, [location.key])
  return (
    <div className="container">
      <p className="text-center">Ini LandingPage</p>
      <div className="row">
        <div className="col-md-8">
        </div>
      </div>
    </div>
  )
}