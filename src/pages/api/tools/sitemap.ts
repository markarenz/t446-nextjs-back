import { unstable_getServerSession } from 'next-auth/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../auth/[...nextauth]';
import { getIsAdmin } from '../../../helpers';
import { getItemsPages } from '../../../utility/db/queries/pages';
import { getItemsGalleries } from '../../../utility/db/queries/galleries';
const AWS = require('aws-sdk');
import fs from 'fs';

const base_url = 'https://www.indytroop446.org';
const zPad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`);

const formatSitemapDate = (dateModified: string) => {
  // 2019-11-17T13:52:18-05:00
  const d = new Date(dateModified);
  const yyyy = d.getFullYear();
  const mm = zPad2(d.getMonth() + 1);
  const dd = zPad2(d.getDate());
  const hh = zPad2(d.getHours());
  const m = zPad2(d.getMinutes());
  const ss = zPad2(d.getSeconds());
  return `${yyyy}-${mm}-${dd}T${hh}:${m}:${ss}-05:00`;
};

const draw_sitemap_node = (
  slug: string,
  dateModified: string,
  prefix: string
) => `<url>
    <loc>${base_url}${prefix}/${slug}</loc>
    <lastmod>${formatSitemapDate(dateModified)}</lastmod>
</url>`;

// UPDATE SITEMAP
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session || !getIsAdmin(session)) {
    res.status(403);
  } else {
    try {
      const xmlPrefix = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;
      const xmlSuffix = `</urlset>`;
      let str = xmlPrefix;
      const { numItems: _np, pages } = await getItemsPages('', 0, 999);
      const { numItems: _ng, galleries } = await getItemsGalleries('', 0, 999);
      pages
        .filter((item) => item.status === 'active')
        .map((item) => {
          const this_slug = item.slug === 'home' ? '' : item.slug;
          const newLine = draw_sitemap_node(this_slug, item.dateModified, '');
          str = `${str}\n${newLine}`;
        });
      galleries
        .filter((item) => item.status === 'active')
        .map((item) => {
          const newLine = draw_sitemap_node(
            item.slug,
            item.dateModified,
            '/gallery'
          );
          str = `${str}\n${newLine}`;
        });
      str = `${str}
${xmlSuffix}`;
      const s3 = new AWS.S3({
        accessKeyId: process.env.AWS__ACCESS_KEY,
        secretAccessKey: process.env.AWS__ACCESS_SECRET
      });
      const sitemapFilename = 'sitemap-t446.xml';
      fs.writeFile(sitemapFilename, str, function (err) {
        if (err) {
          return console.log(err);
        }
        // file saved successfully to root
        const fileContent = fs.createReadStream(sitemapFilename);
        const params = {
          Bucket: process.env.AWS__BUCKET_NAME,
          Key: sitemapFilename,
          Body: fileContent,
          ACL: 'public-read',
          ContentType: 'application/xml'
        };
        s3.putObject(params, function (err: string) {
          if (err) {
            console.log(err);
          }
          console.log(`Sitemap uploaded successfully.`);
          return res.json({ success: true });
        });
      });
    } catch (err) {
      console.error('SETTING:UPDATE', err);
      return res.json({ success: false });
    }
  }
}

export default handler;
