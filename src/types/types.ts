import { ObjectId } from 'mongodb';

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export interface Session {
  user: User;
}

export type PageMeta = {
  title: string;
  metedesc: string;
};

export type FieldDef = {
  title: string;
  slug: string;
};

export type Page = {
  id: ObjectId;
  title: string;
  slug: string;
  status: string;
  metadesc: string;
  content: string;
  dateCreated: Date;
  dateModified: Date;
};

export type Alert = {
  id: ObjectId;
  title: string;
  status: string;
  content: string;
  dateStart: Date;
  dateEnd: Date;
  dateCreated: Date;
  dateModified: Date;
};

export type Gallery = {
  id: ObjectId;
  title: string;
  slug: string;
  status: string;
  content: string;
  images: string;
  pubDate: Date;
  dateCreated: Date;
  dateModified: Date;
};

export type AlertFormData = {
  title: string;
  status: string;
  content: string;
  dateStart: Date;
  dateEnd: Date;
};

export type PageFormData = {
  title: string;
  slug: string;
  status: string;
  metadesc: string;
  content: string;
};

export type GalleryFormData = {
  title: string;
  slug: string;
  status: string;
  content: string;
  images: string;
  pubDate: Date;
};

export type SettingFormData = {
  title: string;
  key: string;
  value: string;
};

export type Asset = {
  filename: string;
  fileDate: string;
  size: string;
  url: string;
  thumbnail: string;
};

export type SelectOption = {
  label: string;
  value: string | number;
};
