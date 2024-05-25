import { NextRequest, NextResponse } from "next/server";

type RequestPayload = {
  originalUrl: string;
};

// This function handles POST requests for processing URLs.
export async function POST(req: NextRequest) {
  try {
    // Parse the request body to get the payload
    const { originalUrl }: RequestPayload = await req.json();

    // Process the URL (you can add your logic here)
    // For example, returning the received URL with a message
    const responseMessage = `Received URL: ${originalUrl}`;

    // Return the response as JSON
    return NextResponse.json({ message: responseMessage });
  } catch (error) {
    // Handle any errors that occur
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
