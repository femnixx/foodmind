import React from 'react'
import { Link } from 'react-router-dom'
import SignUp from './SignUp'

const LoginPage = () => {
  return (
    <div className='w-screen h-screen'>
      <div className='p-5'>
        <h1>Login Page</h1>
        <div className='flex flex-col gap-y-2 w-fit mt-5'>
          <p>Email</p>
          <input type="email" className='border'/>
          <p>Password</p>
          <input type="password" className='border'/>
        <div className=' flex justify-center items-center'><button className='border px-2 cursor-pointer'>Submit</button></div>
        <nav>Don't have an account? <Link to="/sign-up" className='underline'>Sign Up</Link></nav>
        </div>
      </div>
    </div>
  )
}

export default LoginPage