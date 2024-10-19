import multer from 'multer';
import { randomUUID } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'path';
import { config } from './config';

const imageStorage = multer.diskStorage({
  destination: async (_req, _file, callback) => {
    const destDir = path.join(config.publicPath, 'images');

    await fs.mkdir(destDir, { recursive: true });

    callback(null, config.publicPath);
  },
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname);
    const newFileName = randomUUID() + extension;
    callback(null, 'images/' + newFileName);
  },
});

export const imagesUpload = multer({ storage: imageStorage });
