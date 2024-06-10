import { createSlice } from '@reduxjs/toolkit'

  export const productSlice = createSlice({
    name: 'products',
    initialState: {
        data: []
    },
    reducers: {
      fetchProducts: (state,action) => {
        state.data = action.payload
      },
    },
  })
  
  
  export const { fetchProducts } = productSlice.actions
  
  export default productSlice.reducer 
  
  
  export function getProducts(){
    return async function getProductsThunk(dispatch){
   const data = await fetch('https://fakestoreapi.com/products')
    const result = await  data.json()
    dispatch(fetchProducts(result))
    }
  }