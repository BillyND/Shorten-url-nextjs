import { getShortUrl } from "@/services/short-url-fetchers";
import { permanentRedirect } from "next/navigation";

type ShortIdPageProps = {
  params: {
    shortId: string;
  };
};

export default async function ShortIdPage({ params }: ShortIdPageProps) {
  const { shortId } = params;

  if (shortId !== "undefined") {
    const shortUrl: any = await getShortUrl(shortId);
    return permanentRedirect(shortUrl);
  }
}
