import type { Collection } from "../types/collection";

export async function getCollectionNames(): Promise<
  Pick<Collection, "id" | "name">[]
  > {
  return await fetch(`${import.meta.env.VITE_QUOTE_API_URL}/collections`).then(
    (res) => res.json(),
  );
}

export async function getCollection(id: number): Promise<Collection> {
  return await fetch(
    `${import.meta.env.VITE_QUOTE_API_URL}/collections/${id}`,
  ).then((res) => res.json());
}
