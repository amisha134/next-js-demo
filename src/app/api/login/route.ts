import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Here you would typically validate credentials against your database
    // This is just a simple example
    if (email === 'test@example.com' && password === 'password123') {
      return NextResponse.json({ message: 'Login successful' }, { status: 200 })
    }

    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
