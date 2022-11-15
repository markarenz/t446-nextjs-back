import prisma from '../../../../lib/prismadb';
import { Page } from '@prisma/client';
import { serializeDate } from '../../../helpers';

const serializeDatesPages = (dbResp: Page[]) =>
  dbResp.map((p) => ({
    ...p,
    dateCreated: serializeDate(p.dateCreated),
    dateModified: serializeDate(p.dateModified)
  }));

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
    }
  });
  const dbResp = await prisma.page.findMany({
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
  const pages = serializeDatesPages(dbResp);
  return {
    numItems,
    pages
  };
};
