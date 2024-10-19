import type { NextFunction, Response, Request } from 'express';

export const galleryValidateFields = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.title || !req.body.description) {
    return res.status(400).send({ error: 'Title and description are required!' });
  }

  return next();
};
