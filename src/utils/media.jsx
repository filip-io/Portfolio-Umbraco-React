export function getMediaUrl(mediaItem) {
  if (!mediaItem) return null;

  const url = mediaItem.url;
  if (!url) return null;

  if (url.startsWith("/")) {
    const BASE = import.meta.env.VITE_UMBRACO_AZURE;
    
    // Check if URL already starts with /media
    if (url.startsWith("/media")) {
      return `${BASE}${url}`; // Use as-is: /media/xxx
    } else {
      return `${BASE}/media${url}`; // Add prefix: /other-path
    }
  }

  return url;
}