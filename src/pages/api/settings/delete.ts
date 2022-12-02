import { unstable_getServerSession } from 'next-auth/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../auth/[...nextauth]';
import { getIsAdmin } from '../../../helpers';
import { deleteSetting } from '../../../utility/db/queries/settings';

// SETTING DELETE
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session || !getIsAdmin(session)) {
    res.status(403);
  } else {
    let success = false;
    try {
      const { id } = JSON.parse(req.body);
      const updateResult = await deleteSetting(id);
      success = !!updateResult?.id;
    } catch (err) {
      console.error('SETTING:DELETE', err);
    }
    return res.json({ success });
  }
}

export default handler;
