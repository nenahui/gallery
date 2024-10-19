import type { NextFunction, Response, Request } from 'express';

export const galleryValidateFields = (req: Request, res: Response, next: NextFunction) => {
  console.log(req);
  const { title, description } = req.body;

  if (!title?.trim() || !description?.trim()) {
    return res.status(400).send({ error: 'Title and description cannot be empty!' });
  }

  return next();
};
