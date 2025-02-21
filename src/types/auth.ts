import type { IdType } from './index'

export type UserType = {
  id: IdType
  name: string
  avatar?: string
  email: string
  token: string
}

export interface User {
  id: string
  email: string
  name?: string
}

export interface AuthState {
  isAuthenticated: boolean
  error: string | null
  user: User | null
  isLoading: boolean
}
