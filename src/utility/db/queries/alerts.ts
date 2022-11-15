import prisma from '../../../../lib/prismadb';
const AWS = require('aws-sdk');
import { Alert } from '@prisma/client';
import { serializeDate } from '../../../helpers';

const serializeDatesAlerts = (dbResp: Alert[]) =>
  dbResp.map((p) => ({
    ...p,
    dateStart: serializeDate(p.dateStart),
    dateEnd: serializeDate(p.dateEnd),
    dateCreated: serializeDate(p.dateCreated),
    dateModified: serializeDate(p.dateModified)
  }));

// CREATE
export const createAlert = async () =>
  await prisma.alert.create({
    data: {
      title: 'Title',
      status: 'inactive',
      content: '',
      alwaysOn: false,
      dateStart: new Date(),
      dateEnd: new Date(),
      dateCreated: new Date(),
      dateModified: new Date()
    }
  });

// READ MANY
export const getItemsAlerts = async (
  searchText: string,
  skip: number,
  itemsPerPage: number
) => {
  const numItems: number = await prisma.alert.count({
    where: {
      title: {
        contains: `${searchText}`,
        mode: 'insensitive'
      }
    }
  });
  const dbResp = await prisma.alert.findMany({
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
  const alerts = serializeDatesAlerts(dbResp);
  return {
    numItems,
    alerts
  };
};

// READ ONE
export const getItemAlert = async (id: string) => {
  const dbResp = await prisma.alert.findUnique({
    where: {
      id
    }
  });
  const alert = dbResp
    ? {
        ...dbResp,
        dateStart: serializeDate(dbResp.dateStart),
        dateEnd: serializeDate(dbResp.dateEnd),
        dateCreated: serializeDate(dbResp.dateCreated),
        dateModified: serializeDate(dbResp.dateModified)
      }
    : null;
  return {
    alert
  };
};

// UPDATE
export const updateAlert = async (id: string, formData: Alert) =>
  await prisma.alert.update({
    where: {
      id
    },
    data: {
      title: formData.title,
      status: formData.status,
      content: formData.content,
      alwaysOn: formData.alwaysOn,
      dateStart: formData.dateStart,
      dateEnd: formData.dateEnd,
      dateModified: new Date()
    }
  });

// DELETE
export const deleteAlert = async (id: string) =>
  await prisma.alert.delete({
    where: {
      id
    }
  });

// PUBLISH
export const publishAlerts = async () => {
  let success = false;
  try {
    const dbResp = await prisma.alert.findMany({
      where: {
        status: 'active'
      },
      orderBy: [{ dateStart: 'asc' }]
    });
    const alerts = dbResp.map((p) => ({
      ...p,
      dateStart: serializeDate(p.dateStart),
      dateEnd: serializeDate(p.dateEnd),
      dateCreated: serializeDate(p.dateCreated),
      dateModified: serializeDate(p.dateModified)
    }));
    /* UPLOAD TO S3 */
    const data = JSON.stringify(alerts);
    const filename = 'alerts.json';
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
    console.log('UPLOAD PARAMS', params);
    s3.upload(params, function (err: string, data: Alert[]) {
      if (err) {
        console.log(err);
      } else {
        success = true;
      }
    });
  } catch (err) {
    console.error('publishAlerts:', err);
  }
  return {
    success
  };
};
