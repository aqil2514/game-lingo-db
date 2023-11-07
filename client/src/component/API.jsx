export default async function API(label) {
  const key = "AIzaSyB7KoRVBAojtfvAuRkG95N6KhnRGzvFTg4";
  const apiUrl = "https://www.googleapis.com/blogger/v3/blogs";
  const blogId = "1645572543431077439";
  const maxResult = 100;
  const url = `${apiUrl}/${blogId}/posts?key=${key}&fetchBodies=false&fetchImages=true&labels=${label}&maxResults=${maxResult}`;

  const res = await fetch(url);
  const result = await res.json();
  const data = result.items;
  return data;
}
