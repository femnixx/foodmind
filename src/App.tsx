import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './client/auth/LoginPage'
import HomePage from './client/HomePage'
import SignUp from './client/auth/SignUp'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/sign-in' element={<LoginPage />}></Route>
          <Route path='/sign-up' element={<SignUp />}></Route>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
