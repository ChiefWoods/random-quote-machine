export interface Collection {
  fullName: string,
  colors: string[],
  quotes: Quote[],
}

export interface Quote {
  _id: number,
  title: string,
  desc: string,
}

export interface CollectionName {
  name: string;
  fullName: string;
}

export function getCollection(name: string): Promise<Collection> {
  return fetch(`${import.meta.env.VITE_QUOTE_API_URL}/api/collections/${name}`)
    .then((res) => res.json())
    .then((data) => data)
}

export function getCollectionNames(): Promise<CollectionName[]> {
  return fetch(`${import.meta.env.VITE_QUOTE_API_URL}/api/collections`)
    .then((res) => res.json())
    .then((data) => data)
}

export function isVillains(fullName: string): Boolean {
  return fullName === "Villains";
}
