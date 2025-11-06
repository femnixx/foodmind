import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'



const SignUp = () => {
  const [userData, setUserData] = useState({username: "", email: "", password: ""});
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/users/sign-up", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(userData)
    });
    
    const data = await response.json();
    console.log(data);
  }
  
  return (
     <div className='w-screen h-screen'>
        <div className='p-5'>
          <h1>Login Page</h1>
          <div className='flex flex-col gap-y-2 w-fit mt-5'>
            <p>Username</p>
            <input type="text" className='border' onChange={(e) => setUserData({...userData, username: e.target.value})}/>
            <p>Email</p>
            <input type="email" className='border' onChange={(e) => setUserData({...userData, email: e.target.value})}/>
            <p>Password</p>
            <input type="password" className='border' onChange={(e) => setUserData({...userData, password: e.target.value})}/>
          <div className=' flex justify-center items-center'><button className='border px-2 cursor-pointer' onClick={handleSubmit}>Submit</button></div>
          <nav>Don't have an account? <Link to="/sign-in" className='underline'>Sign In</Link></nav>
          </div>
        </div>
      </div>
    )
  }


export default SignUp;