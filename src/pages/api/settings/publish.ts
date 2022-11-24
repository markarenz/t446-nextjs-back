import { unstable_getServerSession } from 'next-auth/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../auth/[...nextauth]';
import { publishSettings } from '../../../utility/db/queries/settings';

// SETTINGS PUBLISH
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);
  let alert = null;
  if (!session) {
    return res.status(403);
  } else {
    try {
      await publishSettings();
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error('PUBLISH:SETTINGS', err);
      return res.status(500).json({ success: false });
    }
  }
}

export default handler;
