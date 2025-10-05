import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({ 
    message: "Test webhook endpoint is working!",
    timestamp: new Date().toISOString()
  }, { status: 200 })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    return NextResponse.json({ 
      message: "Test webhook POST received!",
      data: body,
      timestamp: new Date().toISOString()
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ 
      error: "Invalid data",
      timestamp: new Date().toISOString()
    }, { status: 400 })
  }
}
