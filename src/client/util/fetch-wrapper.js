export default async function fetchWrapper(url, options) {
  const response = await fetch(url, options);
  const body = await response.json();

  if (response.ok) {
    return body;
  } else {
    throw body;
  }
}
