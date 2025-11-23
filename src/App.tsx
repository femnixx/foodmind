import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './client/auth/LoginPage'
import HomePage from './client/HomePage'
import SignUp from './client/auth/SignUp'
import UploadPage from './client/UploadPage'
import Dashboard from './client/Dashboard'
import Home from './client/Home'
import AboutUs from './client/AboutUs'
import Products from './client/Products'

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
