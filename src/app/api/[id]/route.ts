import { UrlMappings } from "@/app/utils/urlMappings";
import { urlsData } from "@/constants/app-script";
import dbConnect from "@/lib/dbConnect";
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
    await dbConnect();

    const cachedUrl = UrlMappings.getUrlMapping(id)?.originalUrl;

    if (cachedUrl) {
      return NextResponse.redirect(cachedUrl);
    }

    const existingUrl: any = await Url.findOne({ shortId: id });

    // const response = await fetch(`${urlsData}?shortId=${id}`);

    // if (!response.ok) {
    //   return NextResponse.json({ error: "URL not found" }, { status: 404 });
    // }

    // const { originalUrl } = await response.json();

    const { originalUrl } = existingUrl;

    if (originalUrl) {
      return NextResponse.redirect(originalUrl);
    }

    return NextResponse.json({ error: "URL not found" }, { status: 404 });
  } catch (error) {
    const response = await fetch(`${urlsData}?shortId=${id}`);

    if (!response.ok) {
      return NextResponse.json({ error: "URL not found" }, { status: 404 });
    }

    const { originalUrl } = await response.json();

    if (originalUrl) {
      return NextResponse.redirect(originalUrl);
    }

    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
