import { v4 as uuidv4 } from "uuid";

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

function getAllUrlMappings(): Map<string, string> {
  return mappingUrls;
}

function generateShortId(customAlias?: string): string {
  return customAlias || uuidv4().slice(-8);
}

export const UrlMappings = {
  addUrlMapping,
  getUrlMapping,
  deleteUrlMapping,
  getAllUrlMappings,
  generateShortId,
};
