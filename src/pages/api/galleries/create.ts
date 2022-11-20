import { unstable_getServerSession } from 'next-auth/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../auth/[...nextauth]';
import { createGallery } from '../../../utility/db/queries/galleries';

// GALLERY CREATE
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);
  let gallery = null;
  if (!session) {
    return res.status(403);
  } else {
    let success = false;
    try {
      gallery = await createGallery();
      success = true;
      return res.status(200).json({ success, gallery });
    } catch (err) {
      console.error('GALLERY:CREATE', err);
      return res.status(500);
    }
  }
}

export default handler;
