import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { remove } from '../redux-toolkit/slices/CartSlice'

const Cart = () => {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)

  return (
    <div className="products w-[90vw] m-auto flex flex-wrap justify-center gap-6 mt-6">
       {cart.map((item) => {
            return(
            <div key={item.id} className='flex flex-col gap-3 items-center w-[45%] lg:w-1/4 h-[40vh] lg:h-[53vh] border border-black rounded-xl p-6 cursor-pointer shadow-lg hover:shadow-gray-500'>
               <img src={`${item.image}`} className='w-24 h-32'></img>
                <h1 className='text-md font-semibold text-center h-[7vh]'>{item.title.slice(0,30)}</h1>
                <span className='font-semibold text-lg'>{item.price} $</span>
                <button className='bg-red-500 text-md text-white p-2 rounded-2xl cursor-pointer hover:text-gray-500' onClick={()=>{dispatch(remove(item))}}>Remove</button>
            </div>
            );
        })}
    </div>
  )
}

export default Cart