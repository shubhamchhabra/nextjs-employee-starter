// utils/fetchWithType.ts

export async function fetchPageData(slug) {
  const res = await fetch(`http://localhost:1337/api/pages?filters[slug][$eq]=${slug}&populate=*`);

  if (!res.ok) {
    throw new Error('Failed to fetch page content');
  }

  const data = await res.json();
  if (data.data.length === 0) {
    throw new Error('Page not found');
  }

  return data.data[0]; // Return the first page
}
