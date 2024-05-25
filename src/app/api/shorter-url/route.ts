import { UrlMappings } from "@/app/utils/urlMappings";
import { urlsData } from "@/constants/app-script";
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
    const { originalUrl, customAlias }: RequestPayload = await req.json();
    const id = UrlMappings.generateShortId(customAlias);
    const shorterUrl = `${req.nextUrl.protocol}//${req.nextUrl.host}/${id}`;

    // Check if the ID already exists
    const existingUrl = await fetch(`${urlsData}?shortId=${id}`).then((res) =>
      res.json()
    );

    UrlMappings.addUrlMapping(id, originalUrl);

    if (existingUrl?.originalUrl) {
      return NextResponse.json({
        message: "Custom alias already in use",
        data: { shorterUrl: null },
      });
    }
    console.log(
      "===>UrlMappings.getAllUrlMappings():",
      UrlMappings.getAllUrlMappings()
    );

    fetch(`${urlsData}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shortId: id, originalUrl }),
    }).then((res) => res.json());

    return NextResponse.json({
      message: "Done!",
      data: { shorterUrl, all: UrlMappings.getAllUrlMappings() },
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
