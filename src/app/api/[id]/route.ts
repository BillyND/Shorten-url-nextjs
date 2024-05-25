import { getShortUrl } from "@/services/short-url-fetchers";
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
  context: { params: { id: string } }
): Promise<NextResponse> {
  const { id } = context.params;
  return NextResponse.json({ error: "URL not found" }, { status: 404 });

  try {
    const url: any = await getShortUrl(id);

    if (url) {
      return NextResponse.redirect(url);
    }

    return NextResponse.json({ error: "URL not found" }, { status: 404 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
