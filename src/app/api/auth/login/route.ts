import { NextResponse } from 'next/server'
import * as yup from 'yup'

export type UserType = {
  id: string
  name: string
  avatar?: string
  email: string
  token: string
}

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

const mockUsers: UserType[] = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://some-url.com/avatar1.jpg',
    email: 'john@example.com',
    token: 'jwt-token-john',
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: 'https://some-url.com/avatar2.jpg',
    email: 'jane@example.com',
    token: 'jwt-token-jane',
  },
]

export async function POST(req: Request) {
  const data = await req.json()
  try {
    await loginSchema.validate(data)
    const { email, password } = data
    const user = mockUsers.find((user: UserType) => user.email === email)
    if (user) {
      if (password === 'password123') {
        return NextResponse.json({ user }, { status: 200 })
      } else {
        return NextResponse.json(
          { message: 'Incorrect password' },
          { status: 400 }
        )
      }
    } else {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }
  } catch (error) {
    console.log('🚀 ~ :50 ~ POST ~ error:', error)
    if (error instanceof yup.ValidationError) {
      return NextResponse.json(
        { message: error.errors.join(', ') },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
