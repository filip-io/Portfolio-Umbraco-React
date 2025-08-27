const BASE = import.meta.env.VITE_UMBRACO_BASE

async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Umbraco API error ${res.status}`);
  return res.json();
}

/**
 * Generic function to fetch Umbraco content
 * @param {string} contentId - The root node/content id in Umbraco
 * @param {string} [fetchType="children"] - Whether to fetch children or descendants
 */
export async function fetchContent(contentId, fetchType = "children") {
  const url = `${BASE}/umbraco/delivery/api/v2/content?fetch=${fetchType}:${contentId}&sort=sortOrder:asc`;
  return getJson(url);
}

// About (includes technologies data)
export const fetchAbout = () => 
  fetchContent("c3dab8ba-54d3-4b26-8cc4-4ca6267f43d8")

// Projects
export const fetchProjects = () => 
  fetchContent("517dcc45-4ed1-4a1f-8c61-4fc5d8dcadfb")

// Experiences
export const fetchExperiences = () => 
  fetchContent("4657057a-2d55-4597-87d5-4c09094b7320")

// Educations
export const fetchEducations = () => 
  fetchContent("1be509d1-f9b1-40e8-a253-4c8e88cb0c3b")