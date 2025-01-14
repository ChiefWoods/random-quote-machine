export type Quote = {
  id: number;
  collection_id: number;
  main: string;
  sub?: string;
};

export type Collection = {
  id: number;
  name: string;
  colors: string[];
  quotes: Quote[];
};
