import { getShortUrl } from "@/services/short-url-fetchers";
import { permanentRedirect } from "next/navigation";

interface ShortIdPageProps {
  params: {
    shortId: string;
  };
}

/**
 * ShortIdPage function to handle redirection based on shortId.
 *
 * @param {ShortIdPageProps} props - The properties including params with shortId.
 * @returns {Promise<void>} - Redirects to the long URL if found.
 */
export default async function ShortIdPage({
  params,
}: ShortIdPageProps): Promise<void> {
  const { shortId } = params;

  let shortUrl: any = await getShortUrl(shortId);

  try {
    shortUrl = JSON.parse(shortUrl);
  } catch (error) {}

  if (shortUrl) {
    return permanentRedirect(shortUrl);
  }
}
