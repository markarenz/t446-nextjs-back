import formidable, { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';
import sizeOf from 'image-size';
import sharp from 'sharp';
import AWS from 'aws-sdk';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth/next';
import { Files } from 'aws-sdk/clients/iotsitewise';

const readFile = (req: NextApiRequest) => {
  const form = formidable();
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

const getResizeConfig = (
  width: number | undefined,
  height: number | undefined
) => {
  const maxDimensions = { x: 1920, y: 1080 };
  console.log('width', width, 'height', height);
  if (width && height) {
    if (width > maxDimensions.x && height > maxDimensions.y) {
      if (width > height) {
        return { width: maxDimensions.x };
      }
      return { height: maxDimensions.y };
    }
    if (width > maxDimensions.x) {
      return { width: maxDimensions.x };
    }
    if (height > maxDimensions.y) {
      return { height: maxDimensions.y };
    }
  }
  return {};
};

async function endpoint(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(403);
  }
  const data = await new Promise(function (resolve, reject) {
    const form = new IncomingForm();
    form.parse(req, function (err, fields, files) {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
  // @ts-ignore
  const img = data?.files?.files;
  const contents = await fs.readFile(img.filepath, {
    encoding: 'utf8'
  });
  const filename = img?.originalFilename;
  const imgSize = sizeOf(img.filepath) || {};
  const resizeConfig = getResizeConfig(imgSize.width, imgSize.height);
  console.log('resizeConfig', resizeConfig);
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS__ACCESS_KEY,
    secretAccessKey: process.env.AWS__ACCESS_SECRET
  });

  sharp(img.filepath)
    .resize(resizeConfig) //{width: 1920, height: 1080}
    .toBuffer()
    .then((resizedImg) => {
      const params = {
        Bucket: process.env.AWS__BUCKET_NAME,
        Key: 'files-dev/' + filename,
        Body: resizedImg,
        ACL: 'public-read'
      };
      // @ts-ignore
      s3.upload(params, function (err) {
        if (err) {
          console.error(err);
        }
        console.log(
          'Image uploaded successfully.',
          `${process.env.AWS__BASE_DIR}files-dev/${filename}`
        );
      });
      res.send('OK');
    });

  return res.status(200);
}

export const config = {
  api: {
    bodyParser: false
  }
};

export default endpoint;
