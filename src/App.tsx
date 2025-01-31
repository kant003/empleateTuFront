import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import UserList from './pages/UserList'
import Navbar from './components/Navbar'
import Layout from './layout/Layout'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path='home' element={<Home />}/>
            <Route path="login" index element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="userList" element={<UserList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
