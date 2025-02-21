'use client'
import {
  createAsyncThunk,
  createSlice,
  type ActionReducerMapBuilder,
} from '@reduxjs/toolkit'
// import { type WritableDraft } from 'immer'

import type { CharacterType } from '@/types/data'
import HttpClient from '@/libs/http'
import { API_ROUTES } from '@/config/constants'

type CharacterStateType = {
  count: number
  pages: number
  next: string | null
  prev: string | null
  results: CharacterType[]
  currentPage: number
}

const initialState: CharacterStateType = {
  count: 0,
  pages: 0,
  next: null,
  prev: null,
  results: [],
  currentPage: 1,
}

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async () => {
    try {
      const response = await HttpClient.get(`${API_ROUTES.SHOW}`)
      return response?.data
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
    }
  }
)

const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<CharacterStateType>) => {
    builder.addCase(fetchCharacters.fulfilled, (state, action) => {
      console.log('action.payload', action.payload)
      state.count = action.payload.total
      state.pages = action.payload.pages
      state.next = action.payload.next
      state.prev = action.payload.prev
      state.results = action.payload.products
    })
  },
})

export const { setCurrentPage } = characterSlice.actions
export default characterSlice.reducer
