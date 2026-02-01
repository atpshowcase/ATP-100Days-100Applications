import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, uploadDir);
  },
  filename: function (_req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage });

const apiRoute = nextConnect({
  onError: (err: any, _req: NextApiRequest, res: NextApiResponse) => {
    console.error(err);
    res.status(500).end('Something went wrong');
  },
  onNoMatch: (_req: NextApiRequest, res: NextApiResponse) => {
    res.status(405).end('Method not allowed');
  },
});

apiRoute.use(upload.single('file'));

apiRoute.post((req: any, res: NextApiResponse) => {
  res.status(200).json({ file: req.file });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
