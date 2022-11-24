import { unstable_getServerSession } from 'next-auth/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../auth/[...nextauth]';
import { validateFormGallery } from '../../../helpers/galleries';
import { updateGallery } from '../../../utility/db/queries/galleries';

// GALLERY UPDATE
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    res.status(403);
  } else {
    let success = false;
    try {
      const { id, formData } = JSON.parse(req.body);
      const { isFormValid } = validateFormGallery(formData);
      if (isFormValid) {
        const updateResult = await updateGallery(id, formData);
        success = !!updateResult?.id;
      } else {
        success = false;
      }
    } catch (err) {
      console.error('GALLERY:UPDATE', err);
    }
    return res.json({ success });
  }
}

export default handler;
