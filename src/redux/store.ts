import { configureStore } from '@reduxjs/toolkit'
import characterSlice from './slices/characters'
import authSlice from './slices/auth'

export const makeStore = () => {
  return configureStore({
    reducer: {
      characters: characterSlice,
      auth: authSlice,
    },
    devTools: process.env.NODE_ENV !== 'production',
  })
}

export const store = makeStore()

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = AppStore['dispatch']
