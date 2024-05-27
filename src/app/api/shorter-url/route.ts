import { UrlMappings } from "@/app/utils/urlMappings";
import dbConnect from "@/lib/dbConnect";
import Url from "@/models/Url";
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
    const { originalUrl, customAlias }: RequestPayload = await req.json();
    const id = UrlMappings.generateShortId(customAlias);
    const shorterUrl = `${req.nextUrl.protocol}//${req.nextUrl.host}/${id}`;

    // Check if the ID already exists
    const existingUrl = await Url.findOne({ shortId: id }).lean();

    if (existingUrl) {
      return NextResponse.json({
        success: false,
        message: "custom_alias_already_used",
        data: { shorterUrl: null },
      });
    }

    UrlMappings.addUrlMapping(id, originalUrl);

    const newUrl = new Url({ shortId: id, originalUrl });
    await newUrl.save();

    return NextResponse.json({
      success: true,
      message: "success_shorter_url",
      data: { shorterUrl },
    });
  } catch (error) {
    console.error("===> Error processing URL:", error);
    return NextResponse.json(
      { success: false, message: "error_server" },
      { status: 400 }
    );
  }
}
