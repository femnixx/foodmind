import { Link } from 'react-router-dom'
import Popup from './Popup'
import { useState } from 'react'

const Navbar = () => {
  const [hidePopUp, setHidePopup] = useState(true)

  function handlePopUp() { 
    setHidePopup(!hidePopUp)
  }

  return (
    <div className='w-screen'>
      <div className={`${hidePopUp ? "hidden" : "absolute"} w-screen h-screen`}>
           <Popup onClose={handlePopUp}></Popup>
         </div>
        <div className='flex gap-x-5 p-5 justify-between '>
          <div>
            FoodMind
          </div>
          <div className='flex gap-x-5 max-sm:hidden'>
            <h1 className='cursor-pointer'>Home</h1>
            <h1 className='cursor-pointer'>Products</h1>
            <h1 className='cursor-pointer'>About Us</h1>
          </div>
          <div className='flex gap-x-3 max-sm:hidden'>
           <Link className='cursor-pointer' to="/sign-in">Login</Link>
           <div className='border'></div>
           <Link className='cursor-pointer' to="sign-up">Signup</Link>
          </div>
           <button className='font-bold w-fit rounded-full border cursor-pointer sm:hidden' onClick={handlePopUp}> 
            - 
           </button>
        </div>
    </div>
  )
}

export default Navbar