import React from 'react'
import { useState } from 'react'

const Popup = ({ onClose }) => {

  return (
    <div className={`w-screen bg-white`}>
        <div className="flex flex-col m-3 justify-center items-center gap-y-8">
          <div className='flex justify-between w-full'>
            <div>FoodMind</div>
            <button className='cursor-pointer border' onClick={onClose}>X</button>
          </div>
          <div className='flex-col gap-y-3 flex'>
            <h1>Home</h1>
            <h1>Products</h1>
            <h1>About Us</h1>
          </div>
          <div className='flex-col gap-x-3'>
            <div>Sign in</div>
            <div className='border m-2'></div>
            <div>Sign up</div>
          </div>
        </div>
    </div>
  )
}

export default Popup