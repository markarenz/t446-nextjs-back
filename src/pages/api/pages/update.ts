import { unstable_getServerSession } from 'next-auth/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../auth/[...nextauth]';
import { getIsAdmin } from '../../../helpers';
import { validateFormPage } from '../../../helpers/pages';
import { updatePage } from '../../../utility/db/queries/pages';

// PAGE UPDATE
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session || !getIsAdmin(session)) {
    res.status(403);
  } else {
    let success = false;
    try {
      const { id, formData } = JSON.parse(req.body);
      const { isFormValid } = validateFormPage(formData);
      if (isFormValid) {
        const updateResult = await updatePage(id, formData);
        success = !!updateResult?.id;
      } else {
        success = false;
      }
    } catch (err) {
      console.error('PAGE:UPDATE', err);
    }
    return res.json({ success });
  }
}

export default handler;
