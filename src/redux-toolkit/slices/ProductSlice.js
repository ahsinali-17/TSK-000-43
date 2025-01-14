import { createSlice } from '@reduxjs/toolkit'

  export const productSlice = createSlice({
    name: 'products',
    initialState: {
      data: [],
      page:0,
      loading: false,
    },
    reducers: {
      fetchProducts: (state,action) => {
        state.data = action.payload
      },
      incPage: (state) => {
        if(state.page*6<state.data.length)
        state.page += 1
      else return state 
      },
      decPage: (state) => {
        if(state.page>0)
        state.page -= 1
      else return state 
      },
      setLoad: (state,action) => {
        state.loading = action.payload
      },
    },
  })
  
  
  export const { fetchProducts, incPage, decPage, setLoad } = productSlice.actions
  
  export default productSlice.reducer 
  
  
  // export function getProducts(){
    // return async function getProductsThunk(dispatch){
  //  const data = await fetch('https://fakestoreapi.com/products')
    // const result = await  data.json()
    // dispatch(fetchProducts(result))
    // }
  // }