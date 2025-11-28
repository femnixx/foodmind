import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './frontend/auth/LoginPage'
import HomePage from './frontend/client/HomePage'
import SignUp from './frontend/auth/SignUp'
import UploadPage from './frontend/client/UploadPage'
import Dashboard from './frontend/client/Dashboard'
import Home from './frontend/client/Home'
import AboutUs from './frontend/client/AboutUs'
import Products from './frontend/client/Products'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/sign-in' element={<LoginPage />}></Route>
          <Route path='/sign-up' element={<SignUp />}></Route>
          <Route path='/' element={<HomePage />} />
          <Route path='/upload' element={<UploadPage />}/>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/home' element={<Home />}/>
          <Route path='/about-us' element={<AboutUs />}/>
          <Route path='/products' element={<Products />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
