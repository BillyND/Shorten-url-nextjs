import { UrlMappings } from "@/app/utils/urlMappings";
import { urlsData } from "@/constants/app-script";
import Url from "@/models/Url";

/**
 * Asynchronously retrieves the original URL corresponding to a short URL ID.
 * @param shortId The short URL ID to look up.
 * @returns A Promise that resolves to the original URL, or null if not found.
 */
export const getShortUrl = async (shortId: string): Promise<string | null> => {
  try {
    const cachedUrl = UrlMappings.getUrlMapping(shortId)?.originalUrl;

    if (cachedUrl) {
      return cachedUrl || null;
    }

    // const response = await fetch(`${urlsData}?shortId=${shortId}`);
    // if (!response.ok) throw new Error("Failed to fetch URL mapping");

    const existingUrl: any = await Url.findOne({ shortId });

    const { originalUrl } = existingUrl;
    return originalUrl || null;
  } catch (error) {
    console.error("Error fetching short URL:", error);
    return null;
  }
};
