import { Character } from './character'

export interface CharactersState {
  characters: Character[]
  loading: boolean
  error: string | null
  currentPage: number
}
