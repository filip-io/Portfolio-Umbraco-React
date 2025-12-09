const BASE = import.meta.env.VITE_UMBRACO_BASE;

async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

// Updated functions to use Cloudflare cache endpoints
export const fetchAbout = () => getJson(`${BASE}/api/about`);
export const fetchProjects = () => getJson(`${BASE}/api/projects`);
export const fetchExperiences = () => getJson(`${BASE}/api/experience`);
export const fetchEducations = () => getJson(`${BASE}/api/education`);