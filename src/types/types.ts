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
  dateStart: Date;
  dateEnd: Date;
};
export type AlertFormErrors = {
  title: string | null;
  dateEnd: string | null;
};
export type AlertFormValidReturn = {
  isFormValid: boolean;
  formErrors: AlertFormErrors;
};
