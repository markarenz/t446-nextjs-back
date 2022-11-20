import { unstable_getServerSession } from 'next-auth/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../auth/[...nextauth]';
import { deleteGallery } from '../../../utility/db/queries/galleries';

// GALLERY DELETE
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    res.status(403);
  } else {
    let success = false;
    try {
      const { id } = JSON.parse(req.body);
      const updateResult = await deleteGallery(id);
      success = !!updateResult?.id;
    } catch (err) {
      console.error('GALLERY:DELETE', err);
    }
    return res.json({ success });
  }
}

export default handler;
