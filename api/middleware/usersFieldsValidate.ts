import type { NextFunction, Response, Request } from 'express';

export const usersFieldsValidate = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.username || !req.body.password || !req.body.displayName) {
    return res.status(400).send({ error: 'Username, password and display name are required!' });
  }

  return next();
};
