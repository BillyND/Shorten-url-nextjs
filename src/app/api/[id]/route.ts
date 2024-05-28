import { UrlMappings } from "@/app/utils/urlMappings";
import "@/lib/dbConnect";
import Url from "@/models/Url";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handle GET requests to retrieve the original URL based on the shortened URL ID.
 *
 * @param {NextRequest} req - The request object from Next.js.
 * @param {Object} context - The context object containing route parameters.
 * @returns {Promise<NextResponse>} - The response object with the original URL or an error message.
 */
export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    console.log("===>here");
    // Check cache for URL mapping
    const cachedUrl = UrlMappings.getUrlMapping(id);

    if (cachedUrl?.originalUrl) {
      return NextResponse.redirect(cachedUrl.originalUrl);
    }

    // Retrieve URL from database
    const existingUrl = await Url.findOne({ shortId: id }).exec();

    if (existingUrl?.originalUrl) {
      return NextResponse.redirect(existingUrl.originalUrl);
    }

    // URL not found response
    return NextResponse.json({ error: "URL not found" }, { status: 404 });
  } catch (error) {
    console.error("===> Error fetching URL:", error);

    return NextResponse.json(
      { error: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
