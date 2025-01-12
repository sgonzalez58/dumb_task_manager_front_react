import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Tasks from './components/Tasks/Tasks'
import Administration from './components/Administration/Administration'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home />}/>
            <Route path="tasks" element={<Tasks/>}/>
            <Route path="login" element={<Login />}/>
            <Route path="register" element={<Register />}/>
            <Route path="admin" element={<Administration />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
