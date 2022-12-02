import { unstable_getServerSession } from 'next-auth/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../auth/[...nextauth]';
import { getIsAdmin } from '../../../helpers';
import { validateFormAlert } from '../../../helpers/alerts';
import { updateAlert } from '../../../utility/db/queries/alerts';

// ALERT UPDATE
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session || !getIsAdmin(session)) {
    res.status(403);
  } else {
    let success = false;
    try {
      const { id, formData } = JSON.parse(req.body);
      const { isFormValid } = validateFormAlert(formData);
      if (isFormValid) {
        const updateResult = await updateAlert(id, formData);
        success = !!updateResult?.id;
      } else {
        success = false;
      }
    } catch (err) {
      console.error('ALERT:UPDATE', err);
    }
    return res.json({ success });
  }
}

export default handler;
