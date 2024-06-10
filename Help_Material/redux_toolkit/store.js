import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterState/counterSlice'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})