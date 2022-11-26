import { unstable_getServerSession } from 'next-auth/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../auth/[...nextauth]';
import { createPage } from '../../../utility/db/queries/pages';
import { getIsAdmin } from '../../../helpers';

// PAGE CREATE
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);
  let page = null;
  if (!session || !getIsAdmin(session)) {
    return res.status(403);
  } else {
    let success = false;
    try {
      page = await createPage();
      success = true;
      return res.status(200).json({ success, page });
    } catch (err) {
      console.error('PAGE:CREATE', err);
      return res.status(500);
    }
  }
}

export default handler;
