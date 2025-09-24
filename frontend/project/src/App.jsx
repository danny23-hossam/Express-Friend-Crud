import { Routes } from 'react-router-dom'
import './App.css'
import Allfriends from './Components/Allfriends'
import { Route } from 'react-router-dom'
import Addfriend from './Components/Addfriend'
import Login from './Components/Login'

function App() {
  return (
    <>
 

      { <Routes>
        <Route path="/" element={<Login/>} />
         <Route path="/show-friend" element={<Allfriends />} />
      <Route path="/add-friend" element={<Addfriend />} />

      </Routes> }
    </>
  )
}

export default App
