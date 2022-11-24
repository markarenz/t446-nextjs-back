import prisma from '../../../../lib/prismadb';
import AWS from 'aws-sdk';
import { Gallery } from '@prisma/client';
import { serializeDate } from '../../../helpers';

const serializeDatesGalleries = (dbResp: Gallery[]) =>
  dbResp.map((p) => ({
    ...p,
    pubDate: serializeDate(p.pubDate),
    dateCreated: serializeDate(p.dateCreated),
    dateModified: serializeDate(p.dateModified)
  }));

// CREATE
export const createGallery = async () =>
  await prisma.gallery.create({
    data: {
      title: 'Title',
      slug: 'test',
      status: 'inactive',
      content: '',
      images: '[]',
      pubDate: new Date(),
      dateCreated: new Date(),
      dateModified: new Date()
    }
  });

export const getItemsGalleries = async (
  searchText: string,
  skip: number,
  itemsPerPage: number
) => {
  const numItems: number = await prisma.gallery.count({
    where: {
      title: {
        contains: `${searchText}`,
        mode: 'insensitive'
      }
    }
  });
  const dbResp = await prisma.gallery.findMany({
    where: {
      title: {
        contains: `${searchText}`,
        mode: 'insensitive'
      }
    },
    orderBy: [{ title: 'asc' }],
    skip,
    take: itemsPerPage
  });
  const galleries = serializeDatesGalleries(dbResp);
  return {
    numItems,
    galleries
  };
};

export const getItemGallery = async (id: string) => {
  const dbResp = await prisma.gallery.findUnique({
    where: {
      id
    }
  });
  const gallery = dbResp
    ? {
        ...dbResp,
        pubDate: serializeDate(dbResp.pubDate),
        dateCreated: serializeDate(dbResp.dateCreated),
        dateModified: serializeDate(dbResp.dateModified)
      }
    : null;
  return {
    gallery
  };
};

// UPDATE
export const updateGallery = async (id: string, formData: Gallery) =>
  await prisma.gallery.update({
    where: {
      id
    },
    data: {
      title: formData.title,
      slug: formData.slug,
      status: formData.status,
      content: formData.content,
      images: formData.images,
      pubDate: formData.pubDate,
      dateModified: new Date()
    }
  });

// DELETE
export const deleteGallery = async (id: string) =>
  await prisma.gallery.delete({
    where: {
      id
    }
  });

// PUBLISH
export const publishGalleries = async () => {
  let success = false;
  try {
    const dbResp = await prisma.gallery.findMany({
      where: {
        status: 'active'
      },
      orderBy: [{ pubDate: 'desc' }]
    });
    const galleries = dbResp.map((p) => ({
      ...p,
      pubDate: serializeDate(p.pubDate),
      dateCreated: serializeDate(p.dateCreated),
      dateModified: serializeDate(p.dateModified)
    }));
    /* UPLOAD TO S3 */
    const data = JSON.stringify(galleries);
    const filename = 'galleries.json';
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
    await s3.upload(params, function (err: string, data: Gallery[]) {
      if (err) {
        console.error('JSON UPLOAD ERROR:', err);
      } else {
        success = true;
      }
    });
    console.log('UPLOADED:');
  } catch (err) {
    console.error('Publish Error:', err);
  }
  return {
    success
  };
};
