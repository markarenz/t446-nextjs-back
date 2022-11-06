export type User = {
  id: string;
  username: string;
  email: string;
  role: string;
};

export type PageMeta = {
  title: string;
  metedesc: string;
};

export type Page = {
  id: string;
  title: string;
  slug: string;
  status: number;
  metadesc: string;
  content: string;
  dateCreated: Date;
  dateModified: Date;
};
