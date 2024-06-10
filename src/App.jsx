import { useState } from 'react'
import Navbar from './components/Navbar'
import Products from './components/Products'
import Cart from './components/Cart'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element:<><Navbar/>   <Products /></>
    },
    {
      path: '/cart',
      element: <><Navbar/> <Cart /></>
    }
  ])
  return (
    <>
      <RouterProvider router={router}>
       
      </RouterProvider>
    </>
  )
}

export default App
