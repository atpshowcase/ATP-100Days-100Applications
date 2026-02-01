import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

const uploadDir = path.join(process.cwd(), 'uploads');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.query;
  if (!name || Array.isArray(name)) return res.status(400).end('Invalid name');

  const filePath = path.join(uploadDir, name);
  if (!fs.existsSync(filePath)) return res.status(404).end('Not found');

  if (req.method === 'GET') {
    const stat = fs.statSync(filePath);
    res.setHeader('Content-Length', String(stat.size));
    res.setHeader('Content-Disposition', `attachment; filename="${name}"`);
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  } else if (req.method === 'DELETE') {
    fs.unlinkSync(filePath);
    res.status(200).json({ ok: true });
  } else {
    res.status(405).end('Method not allowed');
  }
}
