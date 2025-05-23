export default async function getData<R>(url: string): Promise<R> {

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("There was a problem fetching data");
      }

      return response.json();
    })
}