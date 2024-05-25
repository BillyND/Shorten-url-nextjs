import dbConnect from "@/lib/dbConnect";
import Url from "@/models/Url";
import { cache } from "react";

export const getShortUrl = cache(async (shortId: string) => {
  await dbConnect();

  const urlDoc: any = await Url.findOne({ shortId });

  return urlDoc?.originalUrl;
});
