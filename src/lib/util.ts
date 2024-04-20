export function getRandomQuote(name: string): Promise<any> {
  return fetch(`${import.meta.env.VITE_QUOTE_API_URL}api/quotes/${name}/random`)
    .then((res) => res.json())
    .then((data) => data)
}

export function getAllQuotes(name: string): Promise<any[]> {
  return fetch(`${import.meta.env.VITE_QUOTE_API_URL}api/quotes/${name}`)
    .then((res) => res.json())
    .then((data) => data)
}