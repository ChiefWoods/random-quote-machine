import type { Collection } from "../types/collection";

export async function getCollectionNames(): Promise<
  Pick<Collection, "id" | "name">[]
  > {
  const res = await fetch(`${import.meta.env.VITE_QUOTE_API_URL}/collections`);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }

  return data;
}

export async function getCollection(id: number): Promise<Collection> {
  const res = await fetch(
    `${import.meta.env.VITE_QUOTE_API_URL}/collections/${id}`,
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }

  return data;
}
