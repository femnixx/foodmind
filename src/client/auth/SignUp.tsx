import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
   <div className='w-screen h-screen'>
      <div className='p-5'>
        <h1>Login Page</h1>
        <div className='flex flex-col gap-y-2 w-fit mt-5'>
          <p>Username</p>
          <input type="text" className='border'/>
          <p>Email</p>
          <input type="email" className='border'/>
          <p>Password</p>
          <input type="password" className='border'/>
        <div className=' flex justify-center items-center'><button className='border px-2 cursor-pointer'>Submit</button></div>
        <nav>Don't have an account? <Link to="/sign-in" className='underline'>Sign In</Link></nav>
        </div>
      </div>
    </div>
  )
}

export default SignUp