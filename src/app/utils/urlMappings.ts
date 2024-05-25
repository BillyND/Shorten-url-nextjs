import { nanoid } from "nanoid";

export interface UrlMapping {
  shortId: string;
  originalUrl: string;
}

const mappingUrls = new Map<string, string>();

function addUrlMapping(shortId: string, originalUrl: string): void {
  mappingUrls.set(shortId, originalUrl);
}

function getUrlMapping(shortId: string): UrlMapping {
  const originalUrl = mappingUrls.get(shortId) || "";
  return { shortId, originalUrl };
}

function deleteUrlMapping(shortId: string): void {
  mappingUrls.delete(shortId);
}

function getAllUrlMappings(): UrlMapping[] {
  return Array.from(mappingUrls, ([shortId, originalUrl]) => ({
    shortId,
    originalUrl,
  }));
}

function generateShortId(customAlias?: string): string {
  return customAlias || nanoid(8);
}

export const UrlMappings = {
  addUrlMapping,
  getUrlMapping,
  deleteUrlMapping,
  getAllUrlMappings,
  generateShortId,
};
