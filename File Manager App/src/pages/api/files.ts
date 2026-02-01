import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const uploadDir = path.join(process.cwd(), 'uploads');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    const files = fs.readdirSync(uploadDir).map((name) => {
      const stat = fs.statSync(path.join(uploadDir, name));
      return { name, size: stat.size, mtime: stat.mtime };
    });
    res.status(200).json({ files });
  } else {
    res.status(405).end('Method not allowed');
  }
}
