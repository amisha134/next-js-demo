import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  results: [],
  loading: false,
  error: null,
}

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters: (state, action) => {
      state.results = action.payload
    },
  },
})

export const { setCharacters } = charactersSlice.actions
export default charactersSlice.reducer
