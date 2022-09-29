// ** Redux Imports
import rootReducer from './rootReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: rootReducer
})
// store.subscribe(() => console.log("store.getState()", store.getState()))

export { store }
