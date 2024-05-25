import { urlsData } from "@/constants/app-scipt";
import dbConnect from "@/lib/dbConnect";
import { cache } from "react";

export const getShortUrl = cache(async (shortId: string) => {
  // await dbConnect();

  const resExistingUrl: { originalUrl: string } = await fetch(
    `${urlsData}?shortId=${shortId}`
  ).then((res) => res.json());

  console.log("===>resExistingUrl:", resExistingUrl);

  return resExistingUrl?.originalUrl;
});
