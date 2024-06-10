import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux'
import { remove } from '../redux-toolkit/slices/CartSlice'

export default function navbar() {
  const cart = useSelector(state => state.cart)
  const items = cart.length
  return(
     <>
     <div className='flex justify-between px-3 py-2 bg-black'>
      <div className="left flex gap-6 items-center">
       <span className='text-white text-xl italic font-bold'>TSK-000-43</span>
       <Link to="/"><span className='text-gray-500 hover:text-white font-semibold'>Products</span></Link>
       </div>
       <div className="right flex">
         <Link to="/cart"><img src="src\assets\cart.svg" alt="cart"/></Link>
         <span className='text-white'>{items}</span>
       </div>
       </div>
     </>
  );
}
