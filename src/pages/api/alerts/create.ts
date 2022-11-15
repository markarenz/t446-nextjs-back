import { unstable_getServerSession } from 'next-auth/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../auth/[...nextauth]';
import { createAlert } from '../../../utility/db/queries/alerts';

// ALERT CREATE
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);
  let alert = null;
  if (!session) {
    return res.status(403);
  } else {
    let success = false;
    try {
      alert = await createAlert();
      success = true;
      return res.status(200).json({ success, alert });
    } catch (err) {
      console.error('ALERT:CREATE', err);
      return res.status(500);
    }
  }
}

export default handler;
