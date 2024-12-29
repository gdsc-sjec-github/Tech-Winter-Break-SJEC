import Register from './components/Register'
import Login from './components/Login'
import Admin from './components/Admin'
import Home from './components/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path='*' element={<div>Error 404</div>} />
      </Routes>
    </Router>
  )
}

export default App
