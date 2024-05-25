import { urlsData } from "@/constants/app-scipt";
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
    // await dbConnect();

    // Parse the request body to get the payload
    const { originalUrl, customAlias }: RequestPayload = await req.json();
    const id = customAlias || nanoid(8);
    const shorterUrl = `${req.nextUrl.protocol}//${req.nextUrl.host}/${id}`;

    // Check if the ID already exists
    const resExistingUrl: { originalUrl: string } = await fetch(
      `${urlsData}?shortId=${id}`
    ).then((res) => res.json());

    console.log("===>resExistingUrl:", resExistingUrl);

    if (resExistingUrl?.originalUrl) {
      // Return the response as JSON
      return NextResponse.json({
        message: "Custom alias already in use",
        data: { shorterUrl: null },
      });
    }

    const resNewUrl: any = await fetch(`${urlsData}`, {
      method: "post",
      body: JSON.stringify({ shortId: id, originalUrl }),
    }).then((res) => res.json());

    // // Create a new URL mapping
    // const newUrl = new Url({ shortId: id, originalUrl });
    // await newUrl.save();

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
