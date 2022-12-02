import prisma from '../../../../lib/prismadb';
import AWS from 'aws-sdk';
import { Setting } from '@prisma/client';
import { serializeDate } from '../../../helpers';

const serializeDatesSettings = (dbResp: Setting[]) =>
  dbResp.map((p) => ({
    ...p,
    dateCreated: serializeDate(p.dateCreated),
    dateModified: serializeDate(p.dateModified)
  }));

// CREATE
export const createSetting = async () =>
  await prisma.setting.create({
    data: {
      title: 'Title',
      key: 'key...',
      value: 'value...',
      dateCreated: new Date(),
      dateModified: new Date()
    }
  });

// READ MANY
export const getItemsSettings = async (
  searchText: string,
  skip: number,
  itemsPerPage: number
) => {
  const numItems: number = await prisma.setting.count({
    where: {
      title: {
        contains: `${searchText}`,
        mode: 'insensitive'
      }
    }
  });
  const dbResp = await prisma.setting.findMany({
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
  const settings = serializeDatesSettings(dbResp);
  return {
    numItems,
    settings
  };
};

// READ ONE
export const getItemSetting = async (id: string) => {
  const dbResp = await prisma.setting.findUnique({
    where: {
      id
    }
  });
  const setting = dbResp
    ? {
        ...dbResp,
        dateCreated: serializeDate(dbResp.dateCreated),
        dateModified: serializeDate(dbResp.dateModified)
      }
    : null;
  return {
    setting
  };
};

// UPDATE
export const updateSetting = async (id: string, formData: Setting) =>
  await prisma.setting.update({
    where: {
      id
    },
    data: {
      title: formData.title,
      key: formData.key,
      value: formData.value,
      dateModified: new Date()
    }
  });

// DELETE
export const deleteSetting = async (id: string) =>
  await prisma.setting.delete({
    where: {
      id
    }
  });

// PUBLISH
export const publishSettings = async () => {
  let success = false;
  try {
    const dbResp = await prisma.setting.findMany({});
    const settings = dbResp.map((p) => ({
      ...p,
      dateCreated: serializeDate(p.dateCreated),
      dateModified: serializeDate(p.dateModified)
    }));
    /* UPLOAD TO S3 */
    const data = JSON.stringify(settings);
    const filename = 'settings.json';
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
    await s3.upload(params, function (err: string, data: Setting[]) {
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
