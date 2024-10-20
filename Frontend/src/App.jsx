
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Home from './components/Home'
import Signup from './components/Signup'
import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from the deployed server
    fetch(`${process.env.REACT_APP_API_URL}/login`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
    <div>
    {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
      <Routes>
        <Route path='/login'  element={<Login/>}/>
        <Route path='/' element={<Navigate to= "/login"/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </div>
    </>
  )
}

export default App
