import dbConnect from "@/lib/dbConnect";
import Url from "@/models/Url";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

type RequestPayload = {
  originalUrl: string;
  customAlias: string;
};

/**
 * Handles POST requests for processing URLs.
 *
 * @param {NextRequest} req - The request object from Next.js.
 * @returns {Promise<NextResponse>} - The response object.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    await dbConnect();

    // Parse the request body to get the payload
    const { originalUrl, customAlias }: RequestPayload = await req.json();
    const id = customAlias || nanoid(8);
    const shorterUrl = `${req.nextUrl.protocol}//${req.nextUrl.host}/${id}`;

    // Check if the ID already exists
    const existingUrl = await Url.findOne({ shortId: id });

    if (existingUrl) {
      // Return the response as JSON
      return NextResponse.json({
        message: "Custom alias already in use",
        data: { shorterUrl: null },
      });
    }

    // Create a new URL mapping
    const newUrl = new Url({ shortId: id, originalUrl });
    await newUrl.save();

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
