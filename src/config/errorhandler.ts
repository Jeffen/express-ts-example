import { Request, Response, NextFunction } from 'express';
import dayjs from 'dayjs';
import { createLogger, format, transports } from 'winston';
const { simple, prettyPrint, errors } = format;

const logger = createLogger({
  transports: [
    new transports.Console({ level: 'error', format: prettyPrint() }),
    // new transports.File({ filename: 'log/error.log', level: 'error', format: prettyPrint() }),
    new transports.File({ filename: 'log/combined.log', format: simple() })
  ],
  exceptionHandlers: [new transports.File({ filename: 'log/exceptions.log' })]
});

export function clientErrHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.xhr) {
    logger.log({
      level: 'info',
      method: req.method,
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      user: req.user ? req.user.id : 'Unknown User ID',
      url: req.originalUrl,
      message: err,
      timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss.SSS')
    });
    return res
      .status(400)
      .json({ status: 'ERROR', result: err })
      .end();
  } else {
    next(err);
  }
}

export function exceptionErrHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.log({
    level: 'error',
    method: req.method,
    ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    user: req.user ? req.user.id : 'Unknown User ID',
    url: req.originalUrl,
    message: err,
    timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss.SSS')
  });
  return res
    .status(500)
    .json({ status: 'ERROR', result: err })
    .end();
}
