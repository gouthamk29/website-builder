// import user from "../../Model/user";
// import connectDB from "../lib/connectDb"

// export default async function handler(req, res) {
//     await connectDB()
    
//     const {name , age } = req.body;
//     const person = new user({
//         name:name,
//         age:age
//     })
//     await person.save()
//     console.log("inside api",name , age)
//     res.status(200).json({ done: true })
//   }


// app/api/data/route.ts
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
