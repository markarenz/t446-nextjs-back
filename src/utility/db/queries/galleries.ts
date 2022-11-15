import prisma from '../../../../lib/prismadb';
import { Gallery } from '@prisma/client';
import { serializeDate } from '../../../helpers';

const serializeDatesGalleries = (dbResp: Gallery[]) =>
  dbResp.map((p) => ({
    ...p,
    pubDate: serializeDate(p.pubDate),
    dateCreated: serializeDate(p.dateCreated),
    dateModified: serializeDate(p.dateModified)
  }));

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
