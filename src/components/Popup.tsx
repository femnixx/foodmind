import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const Popup = ({ onClose }) => {

  return (
    <div className={`w-screen bg-white`}>
        <div className="flex flex-col m-3 justify-center items-center gap-y-8">
          <div className='flex justify-between w-full'>
            <div>FoodMind</div>
            <button className='cursor-pointer border' onClick={onClose}>X</button>
          </div>
          <div className='flex-col gap-y-3 flex justify-center items-center'>
            <Link to="/home">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/about-us">About us</Link>
          </div>
          <div className='flex-col gap-x-3 items-center justify-center flex'>
            <Link to="/sign-in">Sign in</Link>
            <div className='border m-2 px-8'></div>
            <Link to="/sign-up">Sign up</Link>
          </div>
        </div>
    </div>
  )
}

export default Popup