import prisma from '../../../../lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';
import { serializeDates } from '../../../helpers';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;
  let success = false;
  // try {
  //   await prisma.page.delete({
  //     where: {
  //       id
  //     }
  //   });
  //   success = true;
  // } catch (err) {
  //   console.log('ERROR', err);
  // }
  return res.json({ success });
}

export default handler;
