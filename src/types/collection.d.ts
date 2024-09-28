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
