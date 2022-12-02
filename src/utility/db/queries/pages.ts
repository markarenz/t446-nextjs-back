import AWS from 'aws-sdk';
import prisma from '../../../../lib/prismadb';
import { Page } from '@prisma/client';
import { serializeDate } from '../../../helpers';

const serializeDatesPages = (dbResp: Page[]) =>
  dbResp.map((p) => ({
    ...p,
    dateCreated: serializeDate(p.dateCreated),
    dateModified: serializeDate(p.dateModified)
  }));

// CREATE
export const createPage = async () =>
  await prisma.page.create({
    data: {
      title: 'Title',
      slug: 'page-slug',
      status: 'inactive',
      metadesc: '',
      content: '[]',
      dateCreated: new Date(),
      dateModified: new Date()
    }
  });

// READ MANY
export const getItemsPages = async (
  searchText: string,
  skip: number,
  itemsPerPage: number
) => {
  const numItems: number = await prisma.page.count({
    where: {
      title: {
        contains: `${searchText}`,
        mode: 'insensitive'
      }
    },
    orderBy: [{ title: 'asc' }]
  });
  const dbResp = await prisma.page.findMany({
    where: {
      title: {
        contains: `${searchText}`,
        mode: 'insensitive'
      }
    },
    orderBy: [{ dateModified: 'desc' }],
    skip,
    take: itemsPerPage
  });
  const pages = serializeDatesPages(dbResp);
  return {
    numItems,
    pages
  };
};

// READ ONE
export const getItemPage = async (id: string) => {
  const dbResp = await prisma.page.findUnique({
    where: {
      id
    }
  });
  const page = dbResp
    ? {
        ...dbResp,
        dateCreated: serializeDate(dbResp.dateCreated),
        dateModified: serializeDate(dbResp.dateModified)
      }
    : null;
  return {
    page
  };
};

// UPDATE
export const updatePage = async (id: string, formData: Page) =>
  await prisma.page.update({
    where: {
      id
    },
    data: {
      title: formData.title,
      slug: formData.slug,
      status: formData.status,
      metadesc: formData.metadesc,
      content: formData.content,
      dateModified: new Date()
    }
  });

// DELETE
export const deletePage = async (id: string) =>
  await prisma.page.delete({
    where: {
      id
    }
  });

// PUBLISH
export const publishPages = async () => {
  let success = false;
  try {
    const dbResp = await prisma.page.findMany({
      where: {
        status: 'active'
      },
      orderBy: [{ title: 'asc' }]
    });
    const pages = dbResp.map((p) => ({
      ...p,
      dateCreated: serializeDate(p.dateCreated),
      dateModified: serializeDate(p.dateModified)
    }));
    /* UPLOAD TO S3 */
    const data = JSON.stringify(pages);
    const filename = 'pages.json';
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS__ACCESS_KEY,
      secretAccessKey: process.env.AWS__ACCESS_SECRET
    });
    const params = {
      Bucket: process.env.AWS__BUCKET_NAME,
      Key: `data-${process.env.CONTENT_STAGE}/${filename}`,
      Body: data,
      ACL: 'public-read'
    };
    //@ts-ignore
    await s3.upload(params, function (err: string, data: Page[]) {
      console.log('UPLOAD', err);
      if (err) {
        console.error('JSON UPLOAD ERROR:', err);
      } else {
        success = true;
      }
    });
  } catch (err) {
    console.error('Publish Error:', err);
  }
  return {
    success
  };
};
