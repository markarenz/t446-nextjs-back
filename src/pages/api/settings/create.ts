import { unstable_getServerSession } from 'next-auth/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../auth/[...nextauth]';
import { createSetting } from '../../../utility/db/queries/settings';

// SETTING CREATE
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);
  let setting = null;
  if (!session) {
    return res.status(403);
  } else {
    let success = false;
    try {
      setting = await createSetting();
      success = true;
      return res.status(200).json({ success, setting });
    } catch (err) {
      console.error('GALLERY:CREATE', err);
      return res.status(500);
    }
  }
}

export default handler;
