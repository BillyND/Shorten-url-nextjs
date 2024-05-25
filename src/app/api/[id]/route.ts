import { NextResponse, NextRequest } from "next/server";
import { urlMappings } from "../shorter-url/route";

/**
 * Handle GET requests to retrieve the original URL based on the shortened URL ID.
 *
 * @param {NextRequest} req - The request object from Next.js.
 * @param {Object} context - The context object containing route parameters.
 * @returns {Promise<NextResponse>} - The response object with the original URL or an error message.
 */
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
): Promise<NextResponse> {
  const { id } = context.params;

  // Remove leading slash and find the original URL
  const originalUrl = urlMappings.get(id);

  console.log("===>urlMappings:", urlMappings);

  if (originalUrl) {
    return NextResponse.redirect(originalUrl);
  } else {
    return NextResponse.json({ error: "URL not found" }, { status: 404 });
  }
}
