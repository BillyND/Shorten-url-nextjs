import { UrlMappings } from "@/app/utils/urlMappings";
import "@/lib/dbConnect";
import Url from "@/models/Url";

/**
 * Asynchronously retrieves the original URL corresponding to a short URL ID.
 * @param shortId The short URL ID to look up.
 * @returns A Promise that resolves to the original URL, or null if not found.
 */
export const getShortUrl = async (shortId: string): Promise<string | null> => {
  try {
    // Check the in-memory cache first
    const cachedUrl = UrlMappings.getUrlMapping(shortId);

    if (cachedUrl.originalUrl) {
      return cachedUrl.originalUrl || null;
    }

    // If not in cache, query the database
    const existingUrl = await Url.findOne({ shortId }).exec();

    if (existingUrl) {
      const { originalUrl } = existingUrl;
      return originalUrl || null;
    }

    // If not found in database, return null
    return null;
  } catch (error) {
    console.error("Error fetching short URL:", error);
    return null;
  }
};
