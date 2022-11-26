import AWS from 'aws-sdk';
import moment from 'moment';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth/next';
import { Asset } from '../../../types/types';

async function endpoint(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(403);
  }
  const directoryName = `files/`;
  let assets: Asset[] = [];
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS__ACCESS_KEY,
    secretAccessKey: process.env.AWS__ACCESS_SECRET
  });
  var params = {
    Bucket: process.env.AWS__BUCKET_NAME,
    Delimiter: '/',
    Prefix: directoryName
  };
  // @ts-ignore
  s3.listObjects(params, function (err, data) {
    if (err) throw err;
    const items = data.Contents;
    items?.map((object, index) => {
      if (
        typeof object !== 'undefined' &&
        typeof object.Size === 'number' &&
        object.Size > 0
      ) {
        let asset: Asset = {
          filename: '',
          thumbnail: '',
          fileDate: '',
          size: '',
          url: ''
        };
        let sizeSuffix = 'KB';
        let size = object.Size / 1024;
        if (size / 1024 > 1024) {
          size = size / 1024;
          sizeSuffix = 'MB';
        }
        size = Math.floor(size * 100) / 100;
        asset.filename =
          typeof object.Key === 'string'
            ? object?.Key.replace(directoryName, '')
            : 'no-name';
        asset.fileDate = moment(object.LastModified).format(
          'YYYY-MM-DD HH:mm:ss'
        );
        asset.size = size + ' ' + sizeSuffix;
        asset.url = `${process.env.AWS__BASE_DIR}files/${asset.filename}`;
        asset.thumbnail = `${process.env.AWS__BASE_DIR}files/thumbnails/${asset.filename}`;
        assets.push(asset);
      }
    });
    const sortedAssets = assets.sort((a, b) => {
      if (a.fileDate < b.fileDate) {
        return 1;
      }
      if (a.fileDate > b.fileDate) {
        return -1;
      }
      return 0;
    });
    res.json(sortedAssets);
  });
}

export default endpoint;
