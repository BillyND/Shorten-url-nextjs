import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

type RequestPayload = {
  originalUrl: string;
  customAlias: string;
};

export const urlMappings = new Map<string, string>();

// This function handles POST requests for processing URLs.
export async function POST(req: NextRequest) {
  try {
    // Parse the request body to get the payload
    const { originalUrl, customAlias }: RequestPayload = await req.json();

    const id = customAlias || nanoid(8);
    let shorterUrl: any = `${req.nextUrl.protocol}//${req.nextUrl.host}/api/${id}`;

    if (urlMappings.has(id)) {
      // Return the response as JSON
      return NextResponse.json({
        message: "Done!",
        data: { shorterUrl: null },
      });
    }

    urlMappings.set(id, originalUrl);

    // Return the response as JSON
    return NextResponse.json({
      message: "Done!",
      data: { shorterUrl },
    });
  } catch (error) {
    // Handle any errors that occur
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
