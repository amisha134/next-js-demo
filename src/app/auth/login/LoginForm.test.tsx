import React from "react";
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import configureStore, { MockStoreEnhanced } from 'redux-mock-store'
import { useRouter } from 'next/navigation'
import LoginForm from './LoginForm'
import '@testing-library/jest-dom'
import { useDispatch } from 'react-redux'
import { saveSession } from '@/redux/slices/auth'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}))

jest.mock('@/redux/slices/auth', () => ({
  saveSession: jest.fn(),
}))

const mockDispatch = jest.fn()
;(useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch)

describe('LoginForm Component', () => {
  const mockStore = configureStore([])
  let store: MockStoreEnhanced<unknown>
  let pushMock: jest.Mock

  const renderComponent = () => {
    return render(<LoginForm />)
  }

  beforeEach(() => {
    store = mockStore({
      auth: {
        isAuthenticated: false,
        isLoading: false,
        error: null,
        user: null,
      },
    })
    store.dispatch = jest.fn()
    pushMock = jest.fn()
    ;(useRouter as jest.Mock).mockReturnValue({ push: pushMock })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    renderComponent()
  })

  it('renders the form inputs and button', () => {
    renderComponent()
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument()
  })

  it('displays validation errors when inputs are empty', () => {
    renderComponent()

    fireEvent.click(screen.getByRole('button', { name: /Login/i }))

    waitFor(() => {
      expect(screen.getByText(/Please enter email/i)).toBeInTheDocument()
      expect(screen.getByText(/Please enter password/i)).toBeInTheDocument()
    })
  })

  it('calls saveSession action when valid data is submitted', () => {
    renderComponent()

    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    })
    fireEvent.click(screen.getByRole('button', { name: /Login/i }))

    waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        saveSession({ email: 'test@example.com', password: 'password123' })
      )
    })
  })

  it('redirects to home page if authenticated', () => {
    store = mockStore({
      auth: { isAuthenticated: true, user: { name: 'John Doe' } },
    })

    renderComponent()
    waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/home')
    })
  })

  it('displays an error message if login fails', () => {
    store = mockStore({ auth: { error: 'Invalid credentials' } })

    renderComponent()
    waitFor(() => {
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument()
    })
  })
})
