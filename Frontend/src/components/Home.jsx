import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


const Home = () => {
  const [loggedInuser, setLoggedInuser] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInuser(localStorage.getItem('loggedInuser'))
  }, [])
  

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInuser');
    setTimeout(() => {
      navigate('/login')
    }, 500)
  }
  return (
    <div className="home-first flex justify-between  m-0 p-16">
      <h1 className="text-white name text-2xl font-semibold">Athaxv.io</h1>
      <button className="text-white home-home font-medium"  onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home
