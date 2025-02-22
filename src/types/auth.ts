

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  error: string | null;
  user: User | null;
  isLoading: boolean;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  token: string;
  avatar?: string;
}

export interface UserType {
  user: UserData;
}
