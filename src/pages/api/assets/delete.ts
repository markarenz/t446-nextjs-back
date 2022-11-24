import AWS from 'aws-sdk';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth/next';

async function endpoint(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(403);
  }
  try {
    const { filename } = JSON.parse(req.body);
    console.log('DELETING FILENAME', filename);
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS__ACCESS_KEY,
      secretAccessKey: process.env.AWS__ACCESS_SECRET
    });

    const params = {
      Bucket: process.env.AWS__BUCKET_NAME,
      Key: `files/${filename}`
    };
    console.log('DELETING PARAMS', params);

    // @ts-ignore
    s3.deleteObject(params, function (err, data) {
      if (err) console.log(err, err.stack);
      // an error occurred
      else console.log(data); // successful response
    });
    res.json({ success: true });
  } catch (err) {
    console.error('DELETE ASSET', err);
    return res.status(500);
    res.json({ success: false });
  }
}

export default endpoint;
