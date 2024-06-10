import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './redux_toolkit/counterState/counterSlice'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  return (
    <>
      <Navbar/>
      <button onClick={()=>dispatch(decrement())}>-</button>
       counter's value is {count}
       <button onClick={()=>dispatch(increment())}>+</button>
    </>
  )
}

export default App
