import { Request, Response, NextFunction } from 'express';

export const asyncUtil = (fn: Function) =>
(req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next))
    .catch(next);
};