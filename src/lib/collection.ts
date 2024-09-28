import type { Collection, CollectionName } from "../types/collection";

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

export function isRandomOnly(fullName: string): Boolean {
  return [
    "Villains",
    "How to Win Friends and Influence People",
  ].includes(fullName);
}
