export function getMediaUrl(mediaItem) {
  if (!mediaItem) return null;

  const url = mediaItem.url;
  if (!url) return null;

  if (url.startsWith("/")) {
    const BASE = import.meta.env.VITE_UMBRACO_BASE;
    return `${BASE}${url}`;
  }

  return url;
}