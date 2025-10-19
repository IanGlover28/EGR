export default function sitemap() {
  const baseUrl = "https://www.evergreenremedyghana.com";

  return [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/benefits`, lastModified: new Date() },
    { url: `${baseUrl}/product`, lastModified: new Date() },
    { url: `${baseUrl}/reviews`, lastModified: new Date() },
    { url: `${baseUrl}/pricing`, lastModified: new Date() },
  ];
}
