export default function getData(url: string) {

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("There was a problem fetching data");
      }

      return response.json();
    })
}