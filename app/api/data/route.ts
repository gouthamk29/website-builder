import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/connectDb'
import User from '@/models/user'

export async function POST(req: NextRequest) {
  await connectDB()

  const formData = await req.formData()
  const name = formData.get('name') as string
  const age = formData.get('age') as string

  if (!name || !age) {
    return NextResponse.json({ error: 'Name and age are required' }, { status: 400 })
  }

  const person = new User({ name, age })
  await person.save()

  console.log('Saved to DB:', { name, age })

  return NextResponse.json({ success: true })
}
