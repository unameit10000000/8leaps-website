import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    console.log("Webhook received from GoHighLevel:", body)
    
    // Log the webhook data for debugging
    console.log("Webhook payload:", JSON.stringify(body, null, 2))
    
    // You can process the webhook data here
    // For example, save to database, trigger additional actions, etc.
    
    // Return success response to GoHighLevel
    return NextResponse.json({ 
      received: true, 
      message: "Webhook processed successfully",
      timestamp: new Date().toISOString()
    }, { status: 200 })
    
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ 
      error: "Invalid webhook data",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 400 })
  }
}

// Handle GET requests (for testing)
export async function GET() {
  return NextResponse.json({ 
    message: "GoHighLevel webhook endpoint is active",
    timestamp: new Date().toISOString()
  }, { status: 200 })
}
