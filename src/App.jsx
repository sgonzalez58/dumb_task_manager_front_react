import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path="taches" element={<Home/>}/>
            <Route path="login" element={<Home/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
