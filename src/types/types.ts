export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type PageMeta = {
  title: string;
  metedesc: string;
};

export type Alert = {
  id: string;
  title: string;
  status: string;
  content: string;
  dateStart: Date;
  dateEnd: Date;
  dateCreated: Date;
  dateModified: Date;
};

export type Page = {
  id: string;
  title: string;
  slug: string;
  status: string;
  metadesc: string;
  content: string;
  dateCreated: Date;
  dateModified: Date;
};
