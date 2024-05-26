import { UrlMappings } from "@/app/utils/urlMappings";
import { urlsData } from "@/constants/app-script";
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
  const { originalUrl, customAlias }: RequestPayload = await req.json();
  const id = UrlMappings.generateShortId(customAlias);
  const shorterUrl = `${req.nextUrl.protocol}//${req.nextUrl.host}/${id}`;

  try {
    await dbConnect();

    // Check if the ID already exists
    const existingUrl: any = await Url.findOne({ shortId: id });

    if (existingUrl?.originalUrl) {
      return NextResponse.json({
        message: "Custom alias already in use",
        data: { shorterUrl: null },
      });
    }

    UrlMappings.addUrlMapping(id, originalUrl);

    const newUrl: any = new Url({ shortId: id, originalUrl });

    await newUrl.save();

    // const existingUrl = await fetch(`${urlsData}?shortId=${id}`).then((res) =>
    //   res.json()
    // );

    // fetch(`${urlsData}`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ shortId: id, originalUrl }),
    // }).then((res) => res.json());

    return NextResponse.json({
      message: "Done!",
      data: { shorterUrl, all: UrlMappings.getAllUrlMappings() },
    });
  } catch (error) {
    const existingUrl = await fetch(`${urlsData}?shortId=${id}`).then((res) =>
      res.json()
    );

    if (existingUrl?.originalUrl) {
      return NextResponse.json({
        message: "Custom alias already in use",
        data: { shorterUrl: null },
      });
    }

    UrlMappings.addUrlMapping(id, originalUrl);

    fetch(`${urlsData}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shortId: id, originalUrl }),
    }).then((res) => res.json());

    return NextResponse.json({
      message: "Done!",
      success: true,
      data: { shorterUrl },
    });

    return NextResponse.json({ error: error, success: false }, { status: 400 });
  }
}
